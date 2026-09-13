import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="bg-card border border-border rounded-2xl p-8 sm:p-12 max-w-md w-full text-center shadow-xs flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-3xl mb-6 select-none">
          🛒
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
          Your shopping cart is empty
        </h2>

        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          You haven't added any products yet. Browse catalog variations to fill
          your order.
        </p>

        <Link
          to="/"
          className="w-full bg-[#eb5b00] hover:bg-[#cc4f00] text-white font-bold py-3 px-6 rounded-full transition-colors duration-200 shadow-xs text-center inline-block"
        >
          Start Sourcing
        </Link>
      </div>
    </div>
  );
}
