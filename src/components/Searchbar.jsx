const SearchBar = () => {
    return (
      <div className="w-full p-4 bg-gray-100">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  };
  
  export default SearchBar;
  