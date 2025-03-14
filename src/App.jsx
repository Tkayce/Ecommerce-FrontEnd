import AppRoutes from "./route/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="font-sans">
      <AppRoutes />
      <ToastContainer /> {/* Add this line to enable toast notifications */}
    </div>
  );
}

export default App;
