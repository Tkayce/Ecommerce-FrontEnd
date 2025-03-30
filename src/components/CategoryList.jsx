import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const categories = [
  { id: 1, name: "Home & Kitchen" },
  { id: 2, name: "Women's Clothing" },
  { id: 3, name: "Men's Clothing" },
  { id: 4, name: "Jewelry and Accessory" },
  { id: 5, name: "Instrument" },
  { id: 6, name: "Cell Phones and accessories" },
  { id: 7, name: "Tools and Equipment" },
  { id: 8, name: "Bags and Luggage" },
  { id: 9, name: "Electronics" },
  { id: 10, name: "Upholstery" },
];

const CategoryList = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold p-4 shadow-md">Categories</h2>
      <div className="relative flex items-center">
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-0 p-2 bg-white shadow-md rounded-full"
        >
          <FaChevronLeft />
        </button>
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide p-3 rounded-md"
          style={{ scrollbarWidth: "none" }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => navigate(`/category/${category.id}`)}
              className="whitespace-nowrap px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md shadow-md"
            >
              {category.name}
            </button>
          ))}
        </div>
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-0 p-2 bg-white shadow-md rounded-full"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default CategoryList;
