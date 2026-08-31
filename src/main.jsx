import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "./i18n";
import { Suspense } from "react";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-bold">
          Loading Languages...
        </div>
      }
    >
      {" "}
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </StrictMode>,
);
