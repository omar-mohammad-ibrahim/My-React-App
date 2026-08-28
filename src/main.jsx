import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./app/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);

// src/
//  ├── components/
//  │    ├── layout/        # الهياكل العامة الثابتة (Navbar, Footer, Sidebar)
//  │    ├── common/        # قطع UI عامة وقابلة لإعادة الاستخدام (Button, Modal, Badge)
//  │    ├── products/      # المكونات الخاصة بالمنتجات (ProductCard, ProductList, ProductFilter)
//  │    └── cart/          # مكونات السلة (CartDrawer, CartItem, CartSummary)
//  └── pages/              # الصفحات المربوطة بالـ Router (HomePage, ProductDetailsPage, CheckoutPage)
