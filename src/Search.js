import React, { useState } from 'react';
import Navbar from './Navbar';
import Product from './Product';
import Cookies from 'universal-cookie';

function Search(props) {
  const [gtinResult, setGtinResult] = useState([]);
  const [loading, isLoading] = useState(false);
  const cookies = new Cookies();
  let gtinNumber = "";
  let gtinReceived = false;

  /**
   * If user is coming from AdvancedSearch, get the GTIN-number from props.
   */
  if (props.location.state !== undefined) {
    gtinNumber = props.location.state.gtin;
    gtinReceived = true;
  }

  if (cookies.get('authCookie') === undefined || cookies.get('authCookie') === 'false') {
    return <div>You are not logged in.</div>
  }

  /**
   * Fetch the product with GTIN-number.
   * @param {*} event 
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const gt = {gtin: data.get('gtin')};
    const hr = await fetch(`https://practicework-backend.herokuapp.com/product/search/${gt.gtin}`);
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