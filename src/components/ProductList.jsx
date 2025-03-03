import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useSelector, useDispatch } from "react-redux";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState({});
  const [addedToCart, setAddedToCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("addedToCart")) || {};
    return savedCart;
  });
  const [showNotification, setShowNotification] = useState(false);

  const { addToCart, cartItems } = useCart();
  const { isAuthenticated } = useAuth();
  const reduxAuth = useSelector((state) => state.auth.isAuthenticated); // ✅ Moved outside

  useEffect(() => {
    fetch("https://localhost:44329/api/Product")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched products:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("addedToCart", JSON.stringify(addedToCart));
  }, [addedToCart]);

  const handleStarClick = (productId, starIndex) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: prevRatings[productId] === starIndex ? 0 : starIndex,
    }));
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated && !reduxAuth) {  
      setShowNotification(true);
      console.log("❌ User not authenticated. Showing notification.");
      setTimeout(() => setShowNotification(false), 2000);
      return;
    }
  
    addToCart(product); // This should update the context/state immediately
    console.log("✅ Product Added to Cart:", product);
  
    setAddedToCart((prev) => ({ ...prev, [product.id]: true }));
  
    // 🔥 Update UI instantly by forcing a re-render
    setCartCount([...cartItems, product]); // ✅ This ensures instant UI update
    
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };
  

  return (
    <div className="p-4 relative">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 text-center transition-opacity duration-500">
          Added to Cart!
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-lg shadow-md p-4 bg-white transition-transform transform hover:scale-105"
          >
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
              onClick={() => {
                console.log("🛒 Add to Cart Clicked for:", product);
                handleAddToCart(product);
              }}
              className={`mt-2 px-4 py-2 rounded flex items-center transition ${
                addedToCart[product.id]
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700 text-white"
              }`}
              disabled={addedToCart[product.id]}
            >
              <FaShoppingCart className="mr-2" />
              {addedToCart[product.id] ? "Added" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
