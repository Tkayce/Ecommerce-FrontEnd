import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch("https://localhost:44329/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Error resetting password");
      alert("Password reset successful! Please sign in.");
      navigate("/signin");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Reset Password</h2>

        {message && <p className="mt-3 text-red-600 text-center">{message}</p>}

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-600">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400"
            />
          </div>

          <button type="submit" className="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
