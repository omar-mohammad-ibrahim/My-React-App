import FiltersSidebar from "@/components/filters/FiltersSidebar";
import PlpControlBar from "@/components/products/PlpControlBar";
import ProductList from "@/components/products/ProductList";
import SupplierList from "@/components/suppliers/SupplierList";
import { useProductFilters } from "../hooks/useProductFilters";

export default function ProductsListingPage() {
  const { filters } = useProductFilters();

  // الاعتماد الآمن: الافتراضي دائماً منتجات طالما لم نكن في suppliers
  const isProducts = filters.view !== "suppliers";

  return (
    <div className="min-h-screen bg-background py-6">
      {/* حاوية متجاوبة بمسافات احترافية وتوسيط متناسق */}
      <div className="container max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* القائمة الجانبية (3 أعمدة من أصل 12 أي ~25%) وتثبيت خفيف أثناء النزول */}
        <aside className="lg:col-span-3 sticky top-4">
          <FiltersSidebar />
        </aside>

        {/* مساحة العرض الرئيسية (9 أعمدة من أصل 12 أي ~75%) */}
        <main className="lg:col-span-9 flex flex-col gap-6">
          {/* شريط التحكم (الترتيب، عدد النتائج، وطريقة العرض) */}
          <PlpControlBar />

          {/* تبديل العرض الشرطي الصارم لمنع ظهور القائمتين معاً */}
          {isProducts ? <ProductList /> : <SupplierList />}
        </main>
      </div>
    </div>
  );
}
