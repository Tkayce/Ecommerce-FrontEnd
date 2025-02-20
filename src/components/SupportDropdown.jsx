import { NavLink } from "react-router-dom";

const SupportDropdown = () => {
  return (
    <div className="absolute bottom-12 left-0 bg-white border rounded-md shadow-md w-32 text-center">
      <NavLink to="/livechat" className="block py-2 px-4 hover:bg-gray-100">Live Chat</NavLink>
      <NavLink to="/help" className="block py-2 px-4 hover:bg-gray-100">Help</NavLink>
      <NavLink to="/suggestions" className="block py-2 px-4 hover:bg-gray-100">Suggestions</NavLink>
    </div>
  );
};

export default SupportDropdown;
