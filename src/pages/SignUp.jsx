import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("https://localhost:44329/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Signup failed");
      alert("Signup successful! Please Sign in.");
      navigate("/signin");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Sign Up</h2>

        {error && <p className="mt-3 text-red-600 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6">
          {/* Full Name Input */}
          <div className="mb-4">
            <label className="block text-gray-600">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <label className="block text-gray-600">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-9 text-sm text-blue-600 hover:text-blue-800"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
