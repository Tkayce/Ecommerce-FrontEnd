import { useState, useEffect } from "react";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://localhost:44329/api/product") // Replace with your backend API URL
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert("Please sign in or sign up before making a purchase.");
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
          <div className="w-full h-40 bg-cover bg-center rounded-t-lg" style={{ backgroundImage: `url(${product.imageUrl})` }}></div>
          <div className="p-2">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-orange-500 font-bold">${product.price}</p>
            <div className="flex justify-between items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className="cursor-pointer text-gray-300 hover:text-yellow-500" />
                ))}
              </div>
              <FaShoppingCart className="text-blue-500 cursor-pointer text-xl" onClick={() => handleAddToCart(product)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
