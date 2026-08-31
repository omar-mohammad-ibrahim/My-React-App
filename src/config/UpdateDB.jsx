import { useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export default function UpdateDB() {
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));

      querySnapshot.forEach(async (documentSnapshot) => {
        const productRef = doc(db, "products", documentSnapshot.id);
        const existingData = documentSnapshot.data();

        await updateDoc(productRef, {
          images: existingData.image ? [existingData.image] : [],
          moq: 50,
          rating: 4.8,
          sold: Math.floor(Math.random() * 500) + 20,
          supplier: { name: "Global Trade Co.", country: "CN" },
          description: existingData.description || "High quality product.",
        });
      });

      alert("تم تحديث جميع المنتجات بنجاح في Firebase!");
    } catch (error) {
      alert("حدث خطأ: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-10 flex justify-center">
      <button
        onClick={handleUpdate}
        disabled={loading}
        className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold cursor-pointer"
      >
        {loading ? "جاري التحديث..." : "تحديث قاعدة البيانات الآن"}
      </button>
    </div>
  );
}
