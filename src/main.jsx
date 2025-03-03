import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // Import Redux Provider
import App from "./App";
import store from "./redux/store";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}> {/* Wrap with Redux Provider */}
      <AuthProvider> {/* Wrap with AuthProvider */}
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>
);
