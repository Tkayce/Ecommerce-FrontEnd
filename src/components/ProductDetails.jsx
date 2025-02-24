import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart, FaStar, FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showNotification, setShowNotification] = useState("");
  const { addToCart, cartItems, isAuthenticated } = useCart();
  const [ratings, setRatings] = useState(0);
  const [quantity, setQuantity] = useState(1); // New state for quantity

  useEffect(() => {
    fetch(`https://localhost:44329/api/product/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    if (!isAuthenticated) {
      setShowNotification("Please sign in to purchase!");
    } else if (!cartItems.find((item) => item.id === product.id)) {
      addToCart({ ...product, quantity });
      setShowNotification("Added to Cart!");
    }

    setTimeout(() => setShowNotification(""), 3000);
  };

  const handleStarClick = (starIndex) => {
    setRatings((prev) => (prev === starIndex ? 0 : starIndex));
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) return <p>Loading product details...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Notification (Appears on top) */}
      {showNotification && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded shadow-lg z-50 text-center transition-opacity duration-500">
          {showNotification}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Image */}
        <div className="w-full">
          <img
            src={product.imageUrl}
            alt={product.name}
            onError={(e) => (e.target.src = "/fallback-image.jpg")}
            className="w-full h-[400px] md:h-[500px] object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Details */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>

          {/* Star Rating */}
          <div className="flex space-x-1 my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer text-2xl ${
                  ratings >= star ? "text-yellow-500" : "text-gray-400"
                }`}
                onClick={() => handleStarClick(star)}
              />
            ))}
          </div>

          {/* Price */}
          <p className="text-orange-500 text-xl font-semibold">${product.price}</p>

          {/* Stock Availability */}
          <p className="text-gray-700">Stock: <span className="font-medium">{product.stock}</span></p>

          {/* Selectable Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <h4 className="font-semibold text-lg">Choose Size:</h4>
              <div className="flex space-x-2 mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded ${
                      selectedSize === size ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <button
              onClick={decreaseQuantity}
              className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              <FaMinus />
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              <FaPlus />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center"
          >
            <FaShoppingCart className="mr-2" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
