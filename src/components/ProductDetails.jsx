import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://localhost:44329/api/product/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Product details:", data);
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading product details...</p>;

  return (
    <div className="p-4">
      <img
        src={product.imageUrl}
        alt={product.name}
        onError={(e) => (e.target.src = "/fallback-image.jpg")}
        className="w-full h-80 object-cover rounded-lg"
      />
      <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
      <p className="text-orange-500 font-bold text-lg">${product.price}</p>
      <p className="mt-2">{product.description}</p>
    </div>
  );
};

export default ProductDetails;
