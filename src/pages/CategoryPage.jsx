import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { categoryName } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold capitalize">{categoryName.replace(/-/g, " ")}</h1>
      <p>Products for {categoryName.replace(/-/g, " ")}</p>
      {/* Fetch and display products related to this category */}
    </div>
  );
};

export default CategoryPage;
