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
import TechSupport from "../pages/TechSupport";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import CategoryPage from "../pages/CategoryPage";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/cart" element={<CartPage />} /> */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/livechat" element={<LiveChat />} />
        <Route path="/" element={<Home />} />  
        <Route path="/product/:id" element={<ProductDetails />} /> 
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/tech-support" element={<TechSupport />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/help" element={<Help />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      
      </Routes>
    </Router>
  );
};

export default AppRoutes;
