import { Link } from "react-router-dom";
import Logout from "./Logout";

function Navbar() {
  return (
    <div>
      <Link to="/search">Search </Link>
      <Link to="/advanced">Advanced search </Link>
      <Link to="/allproducts">All products</Link>
      <Link to="/logout">Logout</Link>
    </div>
  );
};

export default Navbar;