import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

// مزامنة عناصر السلة مع Firebase
export const syncCartToFirebase = async (userId, cartItems) => {
  if (!userId) return;
  try {
    const cartRef = doc(db, "carts", userId);
    await setDoc(cartRef, {
      items: cartItems,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Firebase Cart Sync Error:", error.message);
  }
};

// جلب السلة المحفوظة سحابياً
export const fetchCartFromFirebase = async (userId) => {
  if (!userId) return [];
  try {
    const cartRef = doc(db, "carts", userId);
    const cartSnap = await getDoc(cartRef);
    if (cartSnap.exists()) {
      return cartSnap.data().items || [];
    }
    return [];
  } catch (error) {
    console.error("Firebase Cart Fetch Error:", error.message);
    return [];
  }
};
