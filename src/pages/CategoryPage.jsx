import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, fetchCart } from "../redux/cartSlice";

const CategoryPage = () => {
    const { categoryId } = useParams();
    console.log("Category ID from params:", categoryId);
    const [products, setProducts] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ratings, setRatings] = useState({});
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => Array.isArray(state.cart.cartItems) ? state.cart.cartItems : []);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const customerId = useSelector((state) => state.auth.user?.id);

    const handleStarClick = (productId, starIndex) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [productId]: prevRatings[productId] === starIndex ? 0 : starIndex,
        }));
    };

    const handleAddToCart = (product) => {
        if (!isAuthenticated) {
            alert("Please log in to add items to your cart.");
            return;
        }

        const isInCart = cartItems.some((item) => item.productId === product.id);
        if (isInCart) return;

        dispatch(addToCart({ customerId, productId: product.id, quantity: 1 }))
            .then(() => dispatch(fetchCart(customerId)))
            .catch((error) => console.error("Error adding to cart:", error));
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`https://localhost:44329/api/Product/category/${categoryId}`);
                setProducts(response.data.sort(() => Math.random() - 0.5));

                const otherCategoriesResponse = await axios.get(`https://localhost:44329/api/Product`);
                const filteredSuggestions = otherCategoriesResponse.data
                    .filter(product => product.categoryId !== parseInt(categoryId))
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 5);
                setSuggestions(filteredSuggestions);
            } catch (error) {
                console.error("Error fetching products by category:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <Navbar />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4 capitalize">{categoryId ? categoryId.replace(/-/g, " ") : "Unknown Category"}</h1>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {products.map((product) => {
                        const isInCart = cartItems.some((item) => item.productId === product.id);
                        return (
                            <div key={product.id} className="rounded-lg shadow-md p-4 bg-white transition-transform transform hover:scale-105">
                                <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-lg" />
                                <h3 className="mt-2 text-lg font-semibold text-gray-800">{product.name}</h3>
                                <div className="flex space-x-1 my-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            className={`cursor-pointer text-2xl ${ratings[product.id] >= star ? "text-yellow-500" : "text-gray-400"}`}
                                            onClick={() => handleStarClick(product.id, star)}
                                        />
                                    ))}
                                </div>
                                <p className="text-orange-500 font-bold">${product.price}</p>
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    disabled={isInCart}
                                    className={`mt-2 px-4 py-2 rounded flex items-center transition ${isInCart ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700 text-white"}`}
                                >
                                    <FaShoppingCart className="mr-2" />
                                    {isInCart ? "Added" : "Add to Cart"}
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-2">You May Also Like</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {suggestions.map((product) => (
                            <div key={product.id} className="rounded-lg shadow-md p-4 bg-white transition-transform transform hover:scale-105">
                                <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-lg" />
                                <h3 className="mt-2 text-lg font-semibold text-gray-800">{product.name}</h3>
                                <p className="text-orange-500 font-bold">${product.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
