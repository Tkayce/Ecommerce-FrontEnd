import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch("https://localhost:44329/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Error sending reset link");
      setMessage("Check your email for the reset link.");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Forgot Password</h2>

        {message && <p className="mt-3 text-center text-blue-600">{message}</p>}

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400"
            />
          </div>

          <button type="submit" className="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
