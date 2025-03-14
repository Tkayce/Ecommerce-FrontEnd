import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, removeFromCart, updateQuantity, clearCart } from "../redux/cartSlice";
import Navbar from "../components/Navbar";
import axios from "axios";

const AddToCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => Array.isArray(state.cart.cartItems) ? state.cart.cartItems : []);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser?.id) {
          setUser(storedUser);
          setIsAuthenticated(true);
          
          // Dispatch fetchCart and wait for the response
          const response = await dispatch(fetchCart(storedUser.id)).unwrap();
  
          console.log("✅ Fetched Cart Data:", response);
  
          // If the cart is empty in the API, clear localStorage
          if (!response?.cartItems?.length) {
            console.warn("🚨 Cart is empty from API, clearing local storage.");
            localStorage.removeItem("cartItems");
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("❌ Error fetching user or cart:", error);
      }
    };
  
    fetchUserCart();
  }, [dispatch]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://localhost:44329/api/Product");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const mergedCartItems = useMemo(() => {
    return cartItems.map((item) => {
      const product = products.find((p) => p.id === item.productId) || {};
      return {
        ...item,
        name: product.name || "Unknown Product",
        imageUrl: product.imageUrl || "https://via.placeholder.com/150",
        price: product.price || 0,
      };
    });
  }, [cartItems, products]);

  const handleIncrease = async (item) => {
    if (!user?.id) return;
    try {
      const response = await axios.put(`https://localhost:44329/api/Cart/update`, {
        customerId: user.id,
        productId: item.productId,
        quantity: item.quantity + 1,
      });

      if (response.status === 200) {
        dispatch(fetchCart(user.id));
      }
    } catch (error) {
      console.error("Error increasing quantity:", error.response?.data || error.message);
    }
  };

  const handleDecrease = async (item) => {
    if (!user?.id || item.quantity <= 1) return;
    try {
      const response = await axios.put(`https://localhost:44329/api/Cart/update`, {
        customerId: user.id,
        productId: item.productId,
        quantity: item.quantity - 1,
      });

      if (response.status === 200) {
        dispatch(fetchCart(user.id));
      }
    } catch (error) {
      console.error("Error decreasing quantity:", error.response?.data || error.message);
    }
  };

  const handleRemoveItem = async (productId) => {
    if (!user?.id) return;
    if (!window.confirm("Do you want to remove this item from the cart?")) return;

    try {
      const response = await axios.delete(`https://localhost:44329/api/Cart/delete/${user.id}/${productId}`);
      if (response.status === 200) {
        dispatch(fetchCart(user.id));
      }
    } catch (error) {
      console.error("Error removing item:", error.response?.data || error.message);
    }
  };

  const handleClearCart = () => {
    if (!window.confirm("Are you sure you want to clear your cart?")) {
      console.log("🛑 Clear cart canceled.");
      return;
    }
  
    console.log("🟡 Clearing cart for user:", user.id);
  
    dispatch(clearCart(user.id))
      .then(() => {
        console.log("✅ Cart cleared. Removing localStorage...");
  
        localStorage.removeItem("cartItems"); // Ensure localStorage is cleared
  
        setTimeout(() => {
          dispatch(fetchCart(user.id));  // Fetch updated cart
        }, 500); // Short delay for update
      })
      .catch((error) => {
        console.error("❌ Error clearing cart:", error);
      });
  };
  
  
  return (
    <div className="max-w-2xl mx-auto p-5 bg-gray-100 rounded-lg shadow-lg mt-24 lg:mt-32">
      <Navbar />
      <h2 className="text-center text-2xl font-semibold mb-4">
        {isAuthenticated && user?.name ? `Welcome, ${user.name}!` : "Shopping Cart"}
      </h2>
      {mergedCartItems.length === 0 ? (
        <p className="text-center text-lg text-gray-600">Your cart is empty</p>
      ) : (
        <>
          {mergedCartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b border-gray-300 py-3">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1 px-4">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-gray-700 font-bold">
                  ${item.price ? (item.price * item.quantity).toFixed(2) : "0.00"}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="border border-blue-500 text-blue-500 px-2 py-1 rounded" onClick={() => handleDecrease(item)}>
                  -
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button className="border border-blue-500 text-blue-500 px-2 py-1 rounded" onClick={() => handleIncrease(item)}>
                  +
                </button>
              </div>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => handleRemoveItem(item.productId)}>
                Remove
              </button>
            </div>
          ))}
          <div className="flex flex-col lg:flex-row justify-between items-center mt-4">
            <h3 className="text-xl font-semibold">
              Total: ${mergedCartItems.reduce((acc, item) => acc + (item.price ? item.price * item.quantity : 0), 0).toFixed(2)}
            </h3>
            <div className="flex flex-col gap-2">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Proceed to Payment
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={handleClearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddToCart;
