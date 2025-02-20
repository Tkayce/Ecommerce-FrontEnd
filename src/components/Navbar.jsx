import { FaHome, FaShoppingCart, FaUser, FaHeadset } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useCart();
  const [showSupport, setShowSupport] = useState(false);

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-3 shadow-md">
      <NavLink to="/" className="text-gray-600">
        <FaHome className="text-2xl" />
      </NavLink>

      <NavLink to="/cart" className="relative text-gray-600">
        <FaShoppingCart className="text-2xl" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {cartItems.length}
          </span>
        )}
      </NavLink>

      <NavLink to="/signin" className="text-gray-600">
        <FaUser className="text-2xl" />
      </NavLink>

      <button onClick={() => setShowSupport(!showSupport)} className="text-gray-600">
        <FaHeadset className="text-2xl" />
      </button>
    </nav>
  );
};

export default Navbar;
