import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { productService } from "../services/productService";

import ProductGallery from "../components/products/ProductGallery";
import ProductInfo from "../components/products/ProductInfo";
import ActionCard from "../components/products/ActionCard";
import SupplierCard from "../components/products/SupplierCard";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const reduxProducts = useSelector((state) => state.products?.items || []);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      // 1. التحقق من وجود المنتج في Redux أولاً
      const existingProduct = reduxProducts.find((p) => p.id === id);

      if (existingProduct) {
        setProduct(existingProduct);
        setLoading(false);
      } else {
        // 2. الجلب عبر productService من json-server
        try {
          const data = await productService.getById(id);
          setProduct(data);
        } catch (error) {
          console.error("Error fetching product:", error);
          setProduct(null);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [id, reduxProducts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground font-medium">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-destructive font-medium">
        Product not found.
      </div>
    );
  }

  // مصفوفة الصور الآمنة
  const productImages =
    product.images?.length > 0 ? product.images : [product.image];

  return (
    <div className="bg-background text-foreground min-h-screen pb-12 pt-4 transition-colors">
      <div className="container max-w-7xl">
        {/* شريط المسار (Breadcrumbs) الديناميكي */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {/* عرض فتات الخبز القادمة من السيرفر كروابط تصنيف */}
            {product.breadcrumbs && product.breadcrumbs.length > 0 ? (
              product.breadcrumbs.map((crumb) => (
                <React.Fragment key={crumb.category}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link
                        to={`/products?category=${encodeURIComponent(crumb.category)}`}
                        className="capitalize hover:text-primary transition-colors whitespace-nowrap"
                      >
                        {crumb.name}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </React.Fragment>
              ))
            ) : (
              // مسار احتياطي في حال عدم توفر مصفوفة breadcrumbs
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      to={`/products?category=${encodeURIComponent(product.category || "")}`}
                      className="capitalize hover:text-primary transition-colors"
                    >
                      {product.category || "General"}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}

            {/* اسم المنتج الحالي */}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="max-w-xs truncate font-medium text-foreground sm:max-w-md">
                {product.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* توزيع الشبكة (Grid) كما هي بدون أي تغيير */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* العمود الأيسر: الصور ومعلومات المورد */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <ProductGallery images={productImages} />
            <SupplierCard supplier={product.supplier} />
          </div>

          {/* العمود الأوسط: بطاقة تفاصيل المنتج */}
          <ProductInfo product={product} />

          {/* العمود الأيمن: بطاقة اتخاذ الإجراء والشراء */}
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
