import { Link } from "react-router-dom";
import './css/nav.css';

function Navbar() {
  return (
    <div className="wholenavi">
      <Link className="navi" to="/search">Search </Link>
      <Link className="navi" to="/advanced">Advanced search </Link>
      <Link className="navi" to="/allproducts">All products</Link>
      <Link className="navi" to="/logout">Logout</Link>
    </div>
  );
};

export default Navbar;