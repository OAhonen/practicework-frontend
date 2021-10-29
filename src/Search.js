import React, { useState } from 'react';
import AdvancedSearch from './AdvancedSearch';
import Navbar from './Navbar';
import Product from './Product';
import Cookies from 'universal-cookie';

function Search(props) {
  const [gtinResult, setGtinResult] = useState([]);
  const [loading, isLoading] = useState(false);
  const cookies = new Cookies();
  let gtinNumber = "";
  let gtinReceived = false;

  if (props.location.state !== undefined) {
    gtinNumber = props.location.state.gtin;
    gtinReceived = true;
  }

  if (cookies.get('authCookie') === undefined || cookies.get('authCookie') === 'false') {
    return <div>You are not logged in.</div>
  }
  console.log(cookies.get('authCookie'));
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
    const hr = await fetch(`https://practicework-backend.herokuapp.com/product/search/${g.gtin}`);
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
          {!gtinReceived ?
          <input type="text"
                id="gtin"
                name="gtin"/>
          :
          <input type="text"
                id="gtin"
                name="gtin"
                defaultValue={gtinNumber}/>
          }
        </label>
        <input type="submit" value="Submit" />
      </form>
      {!loading ? null : <Product result={gtinResult[0]}></Product>}
    </div>
  );
}

export default Search;