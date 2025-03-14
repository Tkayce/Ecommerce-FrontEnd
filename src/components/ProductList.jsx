import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, fetchCart } from "../redux/cartSlice"; // ✅ Import Redux actions

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState({});
  const [notification, setNotification] = useState({ message: "", type: "" });

  const dispatch = useDispatch();
  const cartItems = useSelector((state) =>
    Array.isArray(state.cart.cartItems) ? state.cart.cartItems : []
  );
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const customerId = useSelector((state) => state.auth.user?.id); // ✅ Get from Redux store

  // ✅ Load cart from API for logged-in users
  useEffect(() => {
    console.log("🔄 Fetching latest products & cart data...");

    // Fetch Products (Force Fresh Data)
    fetch(`https://localhost:44329/api/Product?nocache=${Date.now()}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("✅ Products fetched:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching products:", error);
        setLoading(false);
      });

    // Fetch Cart Data If Authenticated & CustomerId Exists
    if (isAuthenticated && customerId) {
      console.log("🔄 Fetching cart for customer:", customerId);

      dispatch(fetchCart(customerId))
        .then((action) => {
          console.log("✅ Cart fetched:", action.payload);
          if (action.payload?.totalItems === 87) {
            console.warn("⚠️ Cart still showing 87 items! Forcing refresh...");
            dispatch(fetchCart(customerId)); // Re-fetch to ensure update
          }
        })
        .catch((error) => console.error("❌ Fetch cart failed:", error));
    } else {
      console.warn("⚠️ Customer not authenticated or ID missing!");
    }
  }, [dispatch, isAuthenticated, customerId]); // ✅ Updated dependencies

  const handleStarClick = (productId, starIndex) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: prevRatings[productId] === starIndex ? 0 : starIndex,
    }));
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {  
      setNotification({ message: "❌ Please, sign in to add items to cart!", type: "error" });
      setTimeout(() => setNotification({ message: "", type: "" }), 2000);
      return;
    }

    // ✅ Check if product already exists in Redux cartItems
    if (cartItems.some((item) => item.productId === product.id)) {
      console.log("🛒 Item already in cart:", product.name);
      return;
    }

    console.log("🛒 Adding to cart:", product.name);

    dispatch(addToCart({ customerId, productId: product.id, quantity: 1 }))
      .then(() => {
        console.log("✅ Item added to cart!");
        setNotification({ message: "✅ Added to cart!", type: "success" });

        // ✅ Fetch updated cart
        dispatch(fetchCart(customerId))
          .then((action) => console.log("🔄 Updated cart after adding:", action.payload))
          .catch((error) => console.error("❌ Fetch cart failed after add:", error));
      })
      .catch((error) => {
        console.error("❌ Add to cart failed:", error);
        setNotification({ message: "❌ Failed to add to cart", type: "error" });
      });

    setTimeout(() => setNotification({ message: "", type: "" }), 2000);
  };

  return (
    <div className="p-4 relative">
      {/* Notification */}
      {notification.message && (
        <div className={`fixed top-10 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg z-50 text-center transition-opacity duration-500 ${
          notification.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}>
          {notification.message}
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product) => {
          const isInCart = cartItems.some((item) => item.productId === product.id);
          return (
            <div key={product.id} className="rounded-lg shadow-md p-4 bg-white transition-transform transform hover:scale-105">
              {/* Image */}
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  onError={(e) => (e.target.src = "/fallback-image.jpg")}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </Link>

              {/* Product Name */}
              <h3 className="mt-2 text-lg font-semibold text-gray-800">{product.name}</h3>

              {/* Star Rating */}
              <div className="flex space-x-1 my-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`cursor-pointer text-2xl ${
                      ratings[product.id] >= star ? "text-yellow-500" : "text-gray-400"
                    }`}
                    onClick={() => handleStarClick(product.id, star)}
                  />
                ))}
              </div>

              {/* Price */}
              <p className="text-orange-500 font-bold">${product.price}</p>

              {/* Add to Cart */}
              <button
                onClick={() => handleAddToCart(product)}
                className={`mt-2 px-4 py-2 rounded flex items-center transition ${
                  isInCart ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700 text-white"
                }`}
                disabled={isInCart}
              >
                <FaShoppingCart className="mr-2" />
                {isInCart ? "Added" : "Add to Cart"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
