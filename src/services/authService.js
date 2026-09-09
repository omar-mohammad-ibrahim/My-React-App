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

// دالة مساعدة لتوحيد صيغة البريد الإلكتروني في كامل التطبيق
const cleanEmail = (email) => email?.trim().toLowerCase() || "";

export const authService = {
  // 1. فحص وجود البريد ودور المستخدم
  checkEmail: async (email) => {
    const sanitizedEmail = cleanEmail(email);
    const userDoc = await getDoc(doc(db, "users", sanitizedEmail));
    return userDoc.exists()
      ? { exists: true, role: userDoc.data().role }
      : { exists: false };
  },

  // 2. تسجيل الدخول بالبريد وكلمة المرور
  login: async (email, password) => {
    const sanitizedEmail = cleanEmail(email);
    const cred = await signInWithEmailAndPassword(
      auth,
      sanitizedEmail,
      password,
    );
    let role = "Buyer";
    const userDoc = await getDoc(doc(db, "users", sanitizedEmail));
    if (userDoc.exists()) {
      role = userDoc.data().role || role;
    }
    return { user: cred.user, role };
  },

  // 3. الدخول عبر المنصات الاجتماعية بنمط Upsert
  socialLogin: async (providerName) => {
    const provider =
      providerName === "google" ? googleProvider : facebookProvider;
    const cred = await signInWithPopup(auth, provider);
    const email = cleanEmail(cred.user.email);
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

  // 4. التسجيل المبدئي بكلمة مرور مؤقتة عشوائية مشفرة
  registerInitial: async (email, role) => {
    const sanitizedEmail = cleanEmail(email);
    // كلمة مرور عشوائية وفريدة لكل مستخدم لمنع الاختراق المسبق
    const tempPassword = `Tmp_${crypto.randomUUID().slice(0, 12)}!Aa1`;

    const cred = await createUserWithEmailAndPassword(
      auth,
      sanitizedEmail,
      tempPassword,
    );
    await sendEmailVerification(cred.user);

    await setDoc(doc(db, "users", sanitizedEmail), {
      uid: cred.user.uid,
      email: sanitizedEmail,
      role,
      createdAt: serverTimestamp(),
    });

    return cred.user;
  },

  // 5. فحص حالة تفعيل رابط البريد
  verifyStatus: async () => {
    if (!auth.currentUser) return false;
    await auth.currentUser.reload();
    return auth.currentUser.emailVerified;
  },

  // 6. إعادة إرسال رابط التفعيل
  resendLink: async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  },

  // 7. إنهاء إعداد الحساب وتحديث كلمة المرور النهائية
  finalizeAccount: async (
    email,
    role,
    { country, firstName, lastName, password },
  ) => {
    const sanitizedEmail = cleanEmail(email);
    const fullName = `${firstName} ${lastName}`.trim();

    if (!auth.currentUser) {
      throw new Error("No authenticated session found to finalize account.");
    }

    await updatePassword(auth.currentUser, password);
    await updateProfile(auth.currentUser, { displayName: fullName });

    await setDoc(
      doc(db, "users", sanitizedEmail),
      {
        uid: auth.currentUser.uid,
        email: sanitizedEmail,
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
