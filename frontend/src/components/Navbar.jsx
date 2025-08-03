import { Link, useNavigate } from "react-router-dom"; // Use react-router-dom for useNavigate
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for the token in local storage on component mount
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    toast.success("Logged out successfully!");
    navigate("/login"); // Redirect to the login page
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-3xl font-bold text-primary font-mono tracking-tight">
            MemoNest
          </Link>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/create" className="btn btn-primary">
                  <PlusIcon className="size-5" />
                  <span>New Memo</span>
                </Link>
                <button onClick={handleLogout} className="btn btn-ghost">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;