import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState({});
  const [addedToCart, setAddedToCart] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://localhost:44329/api/product")
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

  const handleStarClick = (productId, starIndex) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: prevRatings[productId] === starIndex ? 0 : starIndex,
    }));
  };

  const handleAddToCart = (product) => {
    if (!addedToCart[product.id]) {
      addToCart(product);
      setAddedToCart((prev) => ({ ...prev, [product.id]: true }));
      setShowNotification(true);

      // Hide notification after 3 seconds
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="p-4">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-10 right-10 bg-blue-500 text-white px-4 py-2 rounded shadow-lg">
          Please sign in to complete your purchase!
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
              onClick={() => handleAddToCart(product)}
              className={`mt-2 px-4 py-2 rounded flex items-center transition ${
                addedToCart[product.id]
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700 text-white"
              }`}
              disabled={addedToCart[product.id]}
            >
              <FaShoppingCart className="mr-2" /> {addedToCart[product.id] ? "Added" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
