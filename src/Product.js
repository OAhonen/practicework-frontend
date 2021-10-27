import React, { useEffect, useState } from 'react';
import Search from './Search';

function Product() {
  const [products, setProducts] = useState([]);
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
    };

    const gtin = '6420256001547'
    const url2 = 'http://localhost:8080/product/search/' + gtin

    const findByGtin = async () => {
      try {
        const response = await fetch(url2);
        const json = await response.json();
        setGtinResult(json);
        console.log(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
    findByGtin();
}, []);
*/

/*
  const handleSubmit = ((event) => {
    event.preventDefault();
    console.log(gtin)
    fetch('http://localhost:8080/product/search/' + gtin)
      .then(response => response.json)
      .then(json => setGtinResult(json));
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
      <form onSubmit={handleSubmit}>
        <label>
          Gtin:
          <input type="text"
                id="gtin"
                name="gtin"/>
        </label>
        <input type="submit" value="Submit" />
      </form>
      {!loading ? null : <Search result={gtinResult[0]}></Search>}
    </div>
  );
}

export default Product;