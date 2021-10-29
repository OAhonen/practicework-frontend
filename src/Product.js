import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

function Product(props) {
  let pr = props.result;
  const cookies = new Cookies();

  if (cookies.get('authCookie') === undefined || cookies.get('authCookie') === 'false') {
    return <div>You are not logged in.</div>
  }
  console.log(cookies.get('authCookie'));

  const deleteProduct = async (event) => {
    console.log(pr.id)
    await fetch(`/product/delete/${pr.id}`, {
      method: 'DELETE',
    })
    window.location.reload();
  }

  if (pr === undefined) {
    return <div></div>
  } else {
    return (
      <div>
      Id: {pr.id}<br/>
      GTIN: {pr.gtin}<br/>
      Name: {pr.name}<br/>
      Weight: {pr.weight}<br/>
      Energy: {pr.energy}<br/>
      <p onClick={deleteProduct}>DELETE PRODUCT</p>
      </div>
    )
  }
}

export default Product;