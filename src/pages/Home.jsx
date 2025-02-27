import SearchBar from "../components/Searchbar";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import CategoryList from "../components/CategoryList";
const Home = () => {
  return (
    <div className="relative min-h-screen pb-16">
      <SearchBar />
      <div className="p-4">
        <h2 className="text-xl font-semibold">Featured Products</h2>
        <ProductList />
        <CategoryList />
      </div>
      <Navbar />
    </div>
  );
};

export default Home;
