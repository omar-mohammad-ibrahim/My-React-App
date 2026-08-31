import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import ProductGallery from "../components/products/ProductGallery";
import ProductInfo from "../components/products/ProductInfo";
import ActionCard from "../components/products/ActionCard";
import SupplierCard from "../components/products/SupplierCard";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const reduxProducts = useSelector((state) => state.products.items);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      // 1. البحث في Redux أولاً لتقليل استهلاك قاعدة البيانات
      const existingProduct = reduxProducts.find((p) => p.id === id);

      if (existingProduct) {
        setProduct(existingProduct);
        setLoading(false);
      } else {
        // 2. إذا لم يكن موجوداً، نجلبه من Firebase
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 font-medium">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-medium">
        Product not found.
      </div>
    );
  }

  // تجهيز مصفوفة الصور (إذا لم يكن هناك حقل images، نستخدم حقل image المفرد كعنصر وحيد)
  const productImages =
    product.images?.length > 0 ? product.images : [product.image];

  return (
    <div className="bg-gray-50 min-h-screen pb-12 pt-4">
      <div className="container mx-auto max-w-7xl px-4">
        {/* شريط المسار (Breadcrumbs) */}
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-[#eb5b00]">
            Home
          </Link>{" "}
          <span className="text-gray-300">&gt;</span>
          <span className="capitalize">
            {product.category || "General"}
          </span>{" "}
          <span className="text-gray-300">&gt;</span>
          <span className="text-gray-900 font-medium truncate max-w-xs">
            {product.title}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* العمود الأيسر: الصور ومعلومات المورد */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <ProductGallery images={productImages} />
            <SupplierCard supplier={product.supplier} />
          </div>

          {/* العمود الأوسط: التفاصيل والوصف */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
            <ProductInfo product={product} />
          </div>

          {/* العمود الأيمن: بطاقة الطلب العائمة */}
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
