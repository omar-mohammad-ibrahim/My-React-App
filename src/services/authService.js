import { auth, db, googleProvider, facebookProvider } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export const authService = {
  checkEmail: async (email) => {
    const userDoc = await getDoc(doc(db, "users", email));
    return userDoc.exists()
      ? { exists: true, role: userDoc.data().role }
      : { exists: false };
  },

  login: async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    let role = "Buyer";
    const userDoc = await getDoc(doc(db, "users", email));
    if (userDoc.exists()) role = userDoc.data().role || role;
    return { user: cred.user, role };
  },

  socialLogin: async (providerName) => {
    const provider =
      providerName === "google" ? googleProvider : facebookProvider;
    const cred = await signInWithPopup(auth, provider);
    const email = cred.user.email.toLowerCase();
    const userDocRef = doc(db, "users", email);
    const userDocSnap = await getDoc(userDocRef);

    let role = "Buyer";
    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, {
        uid: cred.user.uid,
        email,
        displayName: cred.user.displayName || "",
        photoURL: cred.user.photoURL || "",
        role,
        createdAt: serverTimestamp(),
      });
    } else {
      role = userDocSnap.data().role || role;
    }
    return { user: cred.user, role };
  },

  registerInitial: async (email, role) => {
    const tempPassword = "User@123456";
    const cred = await createUserWithEmailAndPassword(
      auth,
      email,
      tempPassword,
    );
    await sendEmailVerification(cred.user);
    try {
      await setDoc(doc(db, "users", email), {
        uid: cred.user.uid,
        email,
        role,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.warn("Firestore save skipped:", e.message);
    }
    return cred.user;
  },

  verifyStatus: async () => {
    if (!auth.currentUser) return false;
    await auth.currentUser.reload();
    return auth.currentUser.emailVerified;
  },
  resendLink: async () => {
    if (auth.currentUser) await sendEmailVerification(auth.currentUser);
  },

  finalizeAccount: async (
    email,
    role,
    { country, firstName, lastName, password },
  ) => {
    const fullName = `${firstName} ${lastName}`;
    await updatePassword(auth.currentUser, password);
    await updateProfile(auth.currentUser, { displayName: fullName });

    await setDoc(
      doc(db, "users", email),
      {
        uid: auth.currentUser.uid,
        email,
        role,
        country,
        firstName,
        lastName,
        displayName: fullName,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );

    return { user: auth.currentUser, role, country, firstName, lastName };
  },
};
