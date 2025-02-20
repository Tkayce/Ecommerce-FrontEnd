import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
// import CartPage from "../pages/CartPage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import LiveChat from "../pages/LiveChat";
import Help from "../pages/Help";
import Suggestions from "../pages/Suggestions";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/cart" element={<CartPage />} /> */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/livechat" element={<LiveChat />} />
        <Route path="/help" element={<Help />} />
        <Route path="/suggestions" element={<Suggestions />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
