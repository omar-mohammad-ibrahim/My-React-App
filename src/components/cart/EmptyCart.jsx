import Button from "../ui/Button";

export default function EmptyCart() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-card border border-border rounded-2xl p-8 sm:p-12 max-w-md w-full text-center shadow-xs flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-3xl mb-6 select-none">
          🛒
        </div>

        <h2 className="text-xl sm:text-2xl font-bold mb-2">
          Your shopping cart is empty
        </h2>

        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          You haven't added any products yet. Browse catalog variations to fill
          your order.
        </p>

        <Button to="/" className="w-full">
          Start Sourcing
        </Button>
      </div>
    </div>
  );
}
