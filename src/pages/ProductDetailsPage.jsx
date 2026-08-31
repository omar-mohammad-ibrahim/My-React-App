import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase"; // تأكد من مسار التكوين
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ActionCard from "./ActionCard";
import SupplierCard from "./SupplierCard";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. البحث في Redux أولاً لسرعة الأداء
  const reduxProducts = useSelector((state) => state.products.items);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      // التحقق مما إذا كان المنتج موجوداً مسبقاً في الـ Store
      const existingProduct = reduxProducts.find((p) => p.id === id);

      if (existingProduct) {
        setProduct(existingProduct);
        setLoading(false);
      } else {
        // إذا لم يكن موجوداً، نجلبه من Firebase مباشرة
        try {
          const docRef = doc(db, "products", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProduct({ id: docSnap.id, ...docSnap.data() });
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [id, reduxProducts]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Product not found.
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto max-w-7xl px-4">
        {/* شريط المسار */}
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <span>Home</span> <span className="text-gray-300">&gt;</span>
          <span className="capitalize">{product.category}</span>{" "}
          <span className="text-gray-300">&gt;</span>
          <span className="text-gray-900 font-medium">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* العمود الأيسر: الصور والمورد */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <ProductGallery images={product.images || [product.image]} />
            <SupplierCard supplier={product.supplier} />
          </div>

          {/* العمود الأوسط: التفاصيل */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <ProductInfo product={product} />
          </div>

          {/* العمود الأيمن: الشراء */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <ActionCard product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
