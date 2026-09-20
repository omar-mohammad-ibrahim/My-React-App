import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItemList from "../components/cart/CartItemList";
import OrderSummary from "../components/cart/OrderSummary";
import BuyerProtection from "../components/cart/BuyerProtection";
import EmptyCart from "../components/cart/EmptyCart";
import { fetchUserCart, syncCartToFirebase } from "../features/cart/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();

  const { items, loading, error, isInitialized } = useSelector(
    (state) => state.cart,
  );
  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchUserCart(user.uid));
    }
  }, [user?.uid, dispatch]);

  useEffect(() => {
    if (user?.uid) {
      if (isInitialized) {
        dispatch(syncCartToFirebase({ userId: user.uid, items }));
      }
    } else {
      try {
        localStorage.setItem("nexus_cart", JSON.stringify(items));
      } catch (err) {
        console.error("LocalStorage write error:", err);
      }
    }
  }, [items, user?.uid, isInitialized, dispatch]);

  if (loading && !isInitialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground font-medium">
        Loading cart...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-destructive gap-2">
        <p className="font-semibold text-lg">Failed to load cart</p>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return <EmptyCart />;
  }

  const selectedCount = items.filter((item) => item.selected).length;

  return (
    <main className="min-h-screen py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 sm:mb-8">
          Shopping cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <section className="lg:col-span-8 flex flex-col gap-4">
            <CartItemList items={items} />
          </section>

          <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-8">
            <OrderSummary items={items} selectedCount={selectedCount} />
            <BuyerProtection />
          </aside>
        </div>
      </div>
    </main>
  );
}
