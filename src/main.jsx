import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "./i18n";
import { Toaster } from "sonner";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense>
      <Provider store={store}>
        <App />
        <Toaster richColors position="top-right" />
      </Provider>
    </Suspense>
  </StrictMode>,
);
