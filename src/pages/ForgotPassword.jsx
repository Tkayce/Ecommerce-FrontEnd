import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const backendUrl = "https://localhost:44329"; // ✅ Update with your backend URL
  const frontendUrl = window.location.origin; // ✅ This gets the current frontend URL

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${backendUrl}/api/ForgotPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, frontendUrl }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Password reset email sent! Check your inbox.");
      } else {
        setMessage(data.message || "❌ Something went wrong.");
      }
    } catch (error) {
      setMessage("❌ Failed to send reset email.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Forgot Password
        </h2>
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Send Reset Link
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm font-medium text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
