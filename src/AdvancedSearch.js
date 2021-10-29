import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import Navbar from './Navbar';
import Product from './Product';
import Cookies from 'universal-cookie';

function AdvancedSearch() {
  const cookies = new Cookies();
  const [allProducts, setAllProducts] = useState([]);
  const [loaded, hasLoaded] = useState(false);
  const [searchValues, setSearchValues] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [finalResult, setFinalResult] = useState([]);
  const [showProduct, setShowProduct] = useState(false);
  let searchResult = [];
  let table = "";
  const [gtinNumber, setGtinNumber] = useState("");

  if (cookies.get('authCookie') === undefined || cookies.get('authCookie') === 'false') {
    return <div>You are not logged in.</div>
  }
  console.log(cookies.get('authCookie'));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const values = {name: data.get('name'),
                    minWeight: data.get('minWeight'),
                    maxWeight: data.get('maxWeight'),
                    minEnergy: data.get('minEnergy'),
                    maxEnergy: data.get('maxEnergy')};
    setSearchValues(values);
    const hr = await fetch(`/product/all`);
    const json = await hr.json();
    setAllProducts(json);
    hasLoaded(true);
    console.log(values);
  }

  const handeClick = (event) => {
    setGtinNumber(event.target.outerText);
    setShowProduct(true);
  }

  if (loaded) {
    allProducts.forEach( e => {
      if (e.name.toLowerCase().includes(searchValues.name.toLowerCase()) &&
          (e.weight >= searchValues.minWeight && e.weight <= searchValues.maxWeight) &&
          (e.energy >= searchValues.minEnergy && e.energy <= searchValues.maxEnergy)) {
        searchResult.push({gtin: e.gtin, name: e.name, weight: e.weight, energy: e.energy})
      }
    })
    setFinalResult(searchResult);
    hasLoaded(false);
    setShowResult(true);
  }

  if (showResult) {
    if (finalResult.length > 0) {
      table = 
      <table>
        <tbody>
        <tr>
          <th>Gtin</th>
          <th>Name</th>
        </tr>
        {finalResult.map(result => 
        <tr key={result.gtin}>
          <td onClick={handeClick}>
            {result.gtin}
          </td>
          <td>
            {result.name}
          </td>
          </tr>)}
        </tbody>
      </table>
    } else {
      table = <p>No data found.</p>
    }
  }

  if (showProduct) {
    console.log('hello')
    return (
    <Redirect push to={{
      pathname:"/search",
      state: {gtin: gtinNumber}
    }}/>
    )
  }

  return (
    <div>
      <Navbar></Navbar>
    <form onSubmit={handleSubmit}>
      <label>
        Name:&nbsp;
        <input type="text"
              id="name"
              name="name"
              required/>
      </label><br/>
      <label>
        Min weight:&nbsp;
        <input type="number"
              min="0"
              id="minWeight"
              name="minWeight"
              defaultValue="0"/>
      </label>&nbsp;
      <label>
        Max weight:&nbsp;
        <input type="number"
              min="0"
              id="maxWeight"
              name="maxWeight"
              defaultValue="0"/>
      </label><br/>
      <label>
        Min energy:&nbsp;
        <input type="number"
              min="0"
              id="minEnergy"
              name="minEnergy"
              defaultValue="0"/>
      </label>&nbsp;
      <label>
        Max energy:&nbsp;
        <input type="number"
              min="0"
              id="maxEnergy"
              name="maxEnergy"
              defaultValue="0"/>
      </label><br/>
      <input type="submit" value="Submit" />
    </form>
    {table}
  </div>
  )
}

export default AdvancedSearch;