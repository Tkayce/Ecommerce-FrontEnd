import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const categories = [
  "Home & Kitchen",
  "Women's Clothing",
  "Men's Clothing",
  "Jewelry and Accessory",
  "Instrument",
  "Cell Phones and accessories",
  "Tools and Equipment",
  "Bags and Luggage",
  "Electronics",
  "Upholstery",
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
      {/* Category Header */}
      <h2 className="text-xl font-bold p-4 shadow-md ">Categories</h2>

      {/* Scrollable Category List */}
      <div className="relative flex items-center">
        {/* Left Scroll Button */}
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-0 p-2 bg-white shadow-md rounded-full"
        >
          <FaChevronLeft />
        </button>

        {/* Category Items */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide  p-3 rounded-md"
          style={{ scrollbarWidth: "none" }}
        >
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => navigate(`/category/${category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`)}
              className="whitespace-nowrap px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md shadow-md"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Right Scroll Button */}
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
