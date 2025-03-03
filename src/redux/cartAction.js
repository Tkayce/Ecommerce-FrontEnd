import axios from "axios";

export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_QUANTITY = "UPDATE_QUANTITY";

// Remove item from cart
export const removeFromCart = (id) => async (dispatch) => {
  try {
    await axios.delete(`https://localhost:44329/api/Product/${id}`);
    dispatch({
      type: REMOVE_FROM_CART,
      payload: id,
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
