import React, { useState } from 'react';
import AdvancedSearch from './AdvancedSearch';
import Navbar from './Navbar';
import Product from './Product';

function Search() {
  const [gtinResult, setGtinResult] = useState([]);
  const [loading, isLoading] = useState(false);

  /*
  useEffect(() => {
    const url = 'http://localhost:8080/product/all';

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setProducts(json);
        console.log(json[0].id)
      } catch (error) {
        console.log("error", error);
      }
    }
  });
  */

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const g = {gtin: data.get('gtin')};
    const hr = await fetch(`http://localhost:8080/product/search/${g.gtin}`);
    const json = await hr.json();
    setGtinResult(json);
    isLoading(true)
  }

  return (
    <div>
      <Navbar></Navbar>
      <form onSubmit={handleSubmit}>
        <label>
          Gtin:
          <input type="text"
                id="gtin"
                name="gtin"/>
        </label>
        <input type="submit" value="Submit" />
      </form>
      {!loading ? null : <Product result={gtinResult[0]}></Product>}
    </div>
  );
}

export default Search;