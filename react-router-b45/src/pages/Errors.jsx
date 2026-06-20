import { Link } from "react-router-dom";

function Errors() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>

      <p className="text-gray-600 mb-6">
        Oops! Page not found.
      </p>

      <Link
        to="/"
        className="bg-black text-white px-4 py-2 rounded"
      >
        Go Home
      </Link>
    </div>
  );
}

export default Errors;