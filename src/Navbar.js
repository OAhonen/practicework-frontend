import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <Link to="/">Search </Link>
      <Link to="/advanced">Advanced search </Link>
      <Link to="/allproducts">All products</Link>
    </div>
  );
};

export default Navbar;