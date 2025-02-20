import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <input type="text" placeholder="Full Name" className="border p-2 mb-2 w-80" />
      <input type="email" placeholder="Email" className="border p-2 mb-2 w-80" />
      <input type="password" placeholder="Password" className="border p-2 mb-2 w-80" />
      <button className="bg-green-500 text-white px-4 py-2 rounded-md w-80">Sign Up</button>
      <p className="mt-2">Already have an account? <Link to="/signin" className="text-blue-500">Sign In</Link></p>
    </div>
  );
};

export default SignUp;
