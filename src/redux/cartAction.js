import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import Auth Context if using

export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_QUANTITY = "UPDATE_QUANTITY";

// Remove item from cart using CustomerId and ProductId
export const removeFromCart = (customerId, productId) => async (dispatch) => {
  try {
    await axios.delete(`https://localhost:44329/api/Cart/delete/${customerId}/${productId}`);

    dispatch({
      type: REMOVE_FROM_CART,
      payload: productId,
    });
  } catch (error) {
    console.error("Error removing item:", error);
  }
};

// Update item quantity in cart
export const updateQuantity = (id, quantity) => (dispatch) => {
  dispatch({
    type: UPDATE_QUANTITY,
    payload: { id, quantity },
  });
};
