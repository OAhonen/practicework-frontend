import Navbar from "./Navbar";
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const cookies = new Cookies();
  //const url = 'http://localhost:8080/product/all';
  const url = 'https://practicework-backend.herokuapp.com/product/all';

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(url)
      let json = await response.json()
      setProducts(json)
      console.log(json[0].id)
    }

    fetchData()
  }, [])

  if (cookies.get('authCookie') === undefined || cookies.get('authCookie') === 'false') {
    return <div>You are not logged in.</div>
  }
  console.log(cookies.get('authCookie'));

  return (
    <div>
    <Navbar></Navbar>
      <table>
        <tbody>
        <tr>
          <th>Gtin</th>
          <th>Name</th>
          <th>Weight</th>
          <th>Energy</th>
        </tr>
        {products.map(result => 
        <tr key={result.gtin}>
          <td>
            {result.gtin}
          </td>
          <td>
            {result.name}
          </td>
          <td>
            {result.weight}
          </td>
          <td>
            {result.energy}
          </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default AllProducts;