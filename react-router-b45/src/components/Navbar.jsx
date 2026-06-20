import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          Product Store
        </h1>

        <div className="flex gap-6">
          <Link to="/">Home</Link>

          <Link to="/products">
            Products
          </Link>

          <Link to="/orders">
            My Orders
          </Link>

          <Link to="/tensorflow">Image Classifier</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;