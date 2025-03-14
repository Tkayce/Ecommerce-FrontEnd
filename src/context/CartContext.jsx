import { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, addToCart } from "../redux/cartSlice";
import React, {  useState, useEffect } from "react";


const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children, customerId }) => {
  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector((state) => state.cart);

  // Fetch cart when customerId changes
  useEffect(() => {
    if (customerId) {
      dispatch(fetchCart(customerId));
    }
  }, [customerId, dispatch]);

  const addProductToCart = (productId, quantity = 1) => {
    dispatch(addToCart({ customerId, productId, quantity }));
  };

  return (
    <CartContext.Provider value={{ cartItems, addProductToCart, loading, error }}>
      {children}
    </CartContext.Provider>
  );
};
