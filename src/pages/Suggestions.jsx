

const Suggestions = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Submit Your Suggestions</h1>
      <p className="text-gray-600">We value your feedback. Let us know how we can improve.</p>
      <textarea
        className="w-full p-2 border rounded mt-4"
        placeholder="Write your suggestion here..."
        rows="5"
      ></textarea>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Submit</button>
    </div>
  );
};

export default Suggestions;