import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function NavBar() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-xl font-bold italic">
          <Link to="/">JPORTAL</Link>
        </h2>
        {!isAuthenticated && (
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
