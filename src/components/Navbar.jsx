import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUser, FaHeadset } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [showSupport, setShowSupport] = useState(false);
  const { cartItems = [] } = useCart() || {};

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-3 shadow-md">
      {/* Home */}
      <NavLink to="/" className="flex flex-col items-center text-gray-600">
        <FaHome className="text-xl" />
      </NavLink>

      {/* Cart */}
      <div className="relative cursor-pointer">
        <FaShoppingCart className="text-2xl text-gray-600" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {cartItems.length}
          </span>
        )}
      </div>

      {/* Sign In */}
      <NavLink to="/signin" className="flex flex-col items-center text-gray-600">
        <FaUser className="text-xl" />
      </NavLink>

      {/* Support Dropdown */}
      <div className="relative">
        <button 
          onClick={() => setShowSupport(!showSupport)} 
          className="flex flex-col items-center text-gray-600 focus:outline-none"
        >
          <FaHeadset className="text-xl" />
        </button>

        {showSupport && (
          <div className="absolute bottom-12 right-0 bg-white shadow-md rounded-md p-2 w-40">
            <NavLink to="/suggestions" className="block px-4 py-2 hover:bg-gray-200">
              Suggestions
            </NavLink>
            <NavLink to="/tech-support" className="block px-4 py-2 hover:bg-gray-200">
              Tech Support
            </NavLink>
            <NavLink to="/privacy-policy" className="block px-4 py-2 hover:bg-gray-200">
              Privacy Policy
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
