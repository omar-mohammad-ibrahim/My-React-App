import { useSelector } from "react-redux";
import CartItemList from "../components/cart/CartItemList";
import OrderSummary from "../components/cart/OrderSummary";
import BuyerProtection from "../components/cart/BuyerProtection";
import EmptyCart from "../components/cart/EmptyCart";

export default function CartPage() {
  const items = useSelector((state) => state.cart.items);

  // 1. حالة السلة الفارغة
  if (!items || items.length === 0) {
    return <EmptyCart />;
  }

  // 2. حساب عدد المنتجات المحددة
  const selectedCount = items.filter((item) => item.selected).length;

  return (
    <main className="min-h-screen bg-background text-foreground py-8 transition-colors duration-200">
      {/* الحاوية المتجاوبة المتوافقة مع Tailwind v4 */}
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-350 mx-auto">
        {/* عنوان الصفحة مع التدرج الحجمي */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 sm:mb-8">
          Shopping Cart
        </h1>

        {/* توزيع شبكة الأعمدة الـ 12 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* العمود الأيسر: قائمة الأصناف (8 أعمدة) */}
          <section className="lg:col-span-8 flex flex-col gap-4">
            <CartItemList items={items} />
          </section>

          {/* العمود الأيمن: الفاتورة والضمانات (4 أعمدة - مثبت عند التمرير) */}
          <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-8">
            <OrderSummary items={items} selectedCount={selectedCount} />
            <BuyerProtection />
          </aside>
        </div>
      </div>
    </main>
  );
}
