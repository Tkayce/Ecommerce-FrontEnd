import {
  FaHome,
  FaShoppingCart,
  FaUserCircle,
  FaHeadset,
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaMapMarkerAlt,
  FaCreditCard,
  FaBell
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart); // ✅ Get cart from Redux

  const [showSupport, setShowSupport] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    console.log("🛒 Cart Updated in Navbar:", cartItems);
    setCartCount(cartItems.length); // ✅ Ensure cart count updates dynamically
  }, [cartItems]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-3 shadow-md z-50">
      {/* Home Link */}
      <NavLink to="/" className="text-gray-600">
        <FaHome className="text-2xl" />
      </NavLink>

      {/* Cart Link with Badge */}
      {isAuthenticated ? (
        <NavLink to="/add-to-cart" className="relative text-gray-600">
          <FaShoppingCart className="text-2xl" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {cartCount}
            </span>
          )}
        </NavLink>
      ) : (
        <FaShoppingCart className="text-2xl text-gray-400 cursor-not-allowed" />
      )}

      {/* If Logged In: Show User Menu */}
      {isAuthenticated ? (
        <div className="relative">
          <FaUserCircle className="text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} />

          {menuOpen && (
            <div className="absolute bottom-14 right-0 bg-white border shadow-md p-3 rounded-lg w-48 text-gray-700">
              <p className="text-sm font-semibold mb-3 text-center">Welcome, {user?.name}!</p>

              <button className="flex items-center w-full py-2 px-3 hover:bg-gray-100 rounded-md" onClick={toggleDarkMode}>
                {darkMode ? <FaSun className="mr-2 text-yellow-500" /> : <FaMoon className="mr-2 text-gray-600" />}
                Dark Mode
              </button>

              <NavLink to="/add-to-cart" className="flex items-center w-full py-2 px-3 hover:bg-gray-100 rounded-md">
                <FaShoppingCart className="mr-2 text-black-500" /> View Cart
              </NavLink>

              <button className="flex items-center w-full py-2 px-3 hover:bg-gray-100 rounded-md">
                <FaMapMarkerAlt className="mr-2 text-black-500" /> Manage Address
              </button>

              <button className="flex items-center w-full py-2 px-3 hover:bg-gray-100 rounded-md">
                <FaCreditCard className="mr-2 text-black-500" /> Payment Methods
              </button>

              <button className="flex items-center w-full py-2 px-3 hover:bg-gray-100 rounded-md">
                <FaBell className="mr-2 text-black-500" /> Notifications
              </button>

              <button className="flex items-center w-full py-2 px-3 text-red-500 hover:bg-red-100 rounded-md" onClick={handleLogout}>
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        // If Not Logged In: Show Sign In Button
        <NavLink to="/signin" className="text-gray-600">
          <FaUserCircle className="text-2xl" />
        </NavLink>
      )}

      {/* Support Button with Dropdown */}
      <div className="relative">
        <button onClick={() => setShowSupport(!showSupport)} className="text-gray-600">
          <FaHeadset className="text-2xl" />
        </button>

        {showSupport && (
          <div className="absolute bottom-14 right-0 bg-white border shadow-md p-3 rounded-lg w-40 text-gray-700">
            <NavLink to="/help" className="block py-2 px-3 hover:bg-gray-100 rounded-md">
              Help
            </NavLink>
            <NavLink to="/livechat" className="block py-2 px-3 hover:bg-gray-100 rounded-md">
              Live Chat
            </NavLink>
            <NavLink to="/privacy-policy" className="block py-2 px-3 hover:bg-gray-100 rounded-md">
              Privacy Policy
            </NavLink>
            <NavLink to="/suggestions" className="block py-2 px-3 hover:bg-gray-100 rounded-md">
              Suggestions
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
