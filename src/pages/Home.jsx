import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/Searchbar";
import Navbar from "../components/Navbar"; // Update this to show user options
import ProductList from "../components/ProductList";
import CategoryList from "../components/CategoryList";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin");
  };

  return (
    <div className="relative min-h-screen pb-16">
      {/* Pass user info to Navbar */}
      <Navbar user={user} onLogout={handleLogout} />

      <SearchBar />
      <div className="p-4">
        <h2 className="text-xl font-semibold">Featured Products</h2>
        <ProductList />
        <CategoryList />
      </div>
    </div>
  );
};

export default Home;
