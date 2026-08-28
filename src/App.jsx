import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// 1. استيراد شريط التنقل (Navbar)
import Navbar from "./components/layout/Navbar";

// 2. استيراد الصفحات
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import AddProductPage from "./pages/AddProductPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import MessagesPage from "./pages/MessagesPage";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { useState } from "react";
import SocialButton from "./components/ui/SocialButton";

// مكون فرعي للتحكم في ظهور الـ Navbar بناءً على الرابط الحالي
function AppContent() {
  const location = useLocation();
  // فحص هل الصفحة الحالية هي صفحة تسجيل الدخول
  const isAuthPage = location.pathname === "/auth";
  const [email, setEmail] = useState("");
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
      {/* <div className="flex flex-col gap-3 w-full">
        <SocialButton
          provider="google"
          onClick={() => console.log("Google login")}
        />
        <SocialButton
          provider="facebook"
          onClick={() => console.log("Facebook login")}
        />
        <SocialButton
          provider="linkedin"
          onClick={() => console.log("LinkedIn login")}
        />
      </div>
      <div className="max-w-md p-6 space-y-4">
        <Input
          placeholder="Entesdsdsdsd address"
          type="email"
          value={email}
          error="helelo"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4 max-w-sm p-10 bg-white">
        <Button onClick={() => console.log("Primary clicked")}>Continue</Button>

        <Button className="w-full" type="submit">
          Sign In
        </Button>

        <Button variant="outline" onClick={() => console.log("Back clicked")}>
          Go back
        </Button>

        <Button variant="gradient">Explore AI Mode</Button>

        <Button variant="secondary">Skip for now</Button>
        <Button disabled={true}>Processing...</Button>

        <Button variant="danger">Delete Account</Button>
      </div> */}

      {/* إظهار الـ Navbar في جميع الصفحات، وإخفاؤه في صفحة /auth فقط */}
      {!isAuthPage && <Navbar />}
      {/* منطقة عرض الصفحات */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route
            path="*"
            element={
              <div className="p-16 text-center text-2xl font-bold text-red-500">
                404 - الصفحة غير موجودة
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
