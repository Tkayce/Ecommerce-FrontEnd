import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ✅ Load cart from local storage on mount
  useEffect(() => {
    console.log("🔄 Loading Cart from localStorage...");
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCartItems(parsedCart);
        console.log("✅ Loaded Cart from Storage:", parsedCart);
      } catch (error) {
        console.error("❌ Error parsing cart from storage:", error);
      }
    } else {
      console.log("🛒 No cart data found in storage");
    }
  }, []);

  // ✅ Function to add items to cart
  const addToCart = (product) => {
    console.log("🛒 Attempting to add product:", product);

    setCartItems((prevCart) => {
      const updatedCart = [...prevCart, product];
      console.log("📂 Updating Cart State:", updatedCart);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      console.log("🛒 Cart Updated in Context:", JSON.parse(localStorage.getItem("cart")));
      
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
