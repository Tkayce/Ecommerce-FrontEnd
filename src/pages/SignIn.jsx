import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
      <input type="email" placeholder="Email" className="border p-2 mb-2 w-80" />
      <input type="password" placeholder="Password" className="border p-2 mb-2 w-80" />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-80">Sign In</button>
      <p className="mt-2">Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link></p>
    </div>
  );
};

export default SignIn;
