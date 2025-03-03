import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartAction";
import Navbar from "../components/Navbar";

const AddToCart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const dispatch = useDispatch();

  // Increase quantity
  const handleIncrease = (item) => {
    dispatch(updateQuantity(item.id, item.quantity + 1));
  };

  // Decrease quantity (minimum 1)
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity(item.id, item.quantity - 1));
    }
  };

  // Remove item with confirmation
  const handleRemoveItem = (id) => {
    if (window.confirm("Do you want to remove this item from cart?")) {
      dispatch(removeFromCart(id));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-5 bg-gray-100 rounded-lg shadow-lg mt-24">
      <Navbar />
      <h2 className="text-center text-2xl font-semibold mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-lg text-gray-600">Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b border-gray-300 py-3">
              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
              <div className="flex-1 px-4">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-gray-700 font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="border border-blue-500 text-blue-500 px-2 py-1 rounded" onClick={() => handleDecrease(item)}>-</button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button className="border border-blue-500 text-blue-500 px-2 py-1 rounded" onClick={() => handleIncrease(item)}>+</button>
              </div>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </div>
          ))}

          <div className="flex justify-between items-center mt-4">
            <h3 className="text-xl font-semibold">Total: ${totalAmount.toFixed(2)}</h3>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Proceed to Payment</button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddToCart;
