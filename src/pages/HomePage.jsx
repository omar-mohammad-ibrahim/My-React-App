import ProductGrid from "../components/products/ProductGrid";
import WelcomeBar from "../components/home/WelcomeBar";
export default function HomePage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <WelcomeBar />
      <ProductGrid />
    </div>
  );
}
