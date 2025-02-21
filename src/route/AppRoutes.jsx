import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
// import CartPage from "../pages/CartPage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import LiveChat from "../pages/LiveChat";
import Help from "../pages/Help";
import Suggestions from "../pages/Suggestions";
import ProductList from "../components/ProductList";
import ProductDetails from "../components/ProductDetails";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/cart" element={<CartPage />} /> */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/livechat" element={<LiveChat />} />
        <Route path="/" element={<Home />} />  {/* Home contains ProductList */}
        <Route path="/product/:id" element={<ProductDetails />} /> {/* Product Details Page */}
        <Route path="/help" element={<Help />} />
        <Route path="/suggestions" element={<Suggestions />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
