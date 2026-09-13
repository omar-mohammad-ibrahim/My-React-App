import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { setCartItems } from "../features/cart/cartSlice";
import CartItemList from "../components/cart/CartItemList";
import OrderSummary from "../components/cart/OrderSummary";
import BuyerProtection from "../components/cart/BuyerProtection";
import EmptyCart from "../components/cart/EmptyCart";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth?.user);
  const [loadingCloud, setLoadingCloud] = useState(false);

  // جلب السلة من Firebase إذا كان هناك مستخدم وسلة المتصفح فارغة
  useEffect(() => {
    const fetchCloudCart = async () => {
      const userUid = user?.uid;
      if (userUid && items.length === 0) {
        setLoadingCloud(true);
        try {
          const docRef = doc(db, "carts", userUid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && docSnap.data().items) {
            dispatch(setCartItems(docSnap.data().items));
          }
        } catch (error) {
          console.error("Firestore cart fetch error:", error);
        } finally {
          setLoadingCloud(false);
        }
      }
    };

    fetchCloudCart();
  }, [user, dispatch]);

  if (loadingCloud) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground font-medium">
        Loading cart...
      </div>
    );
  }

  if (!items || items.length === 0) {
    return <EmptyCart />;
  }

  const selectedCount = items.filter((item) => item.selected).length;

  return (
    <main className="min-h-screen bg-background text-foreground py-8 transition-colors duration-200">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 sm:mb-8">
          Shopping cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* العمود الأيسر (8 أعمدة) */}
          <section className="lg:col-span-8 flex flex-col gap-4">
            <CartItemList items={items} />
          </section>

          {/* العمود الأيمن (4 أعمدة - Sticky) */}
          <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-8">
            <OrderSummary items={items} selectedCount={selectedCount} />
            <div className="bg-card border border-border p-5 rounded-xl shadow-xs">
              <BuyerProtection showDetails={true} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
