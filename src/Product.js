import React, { useEffect, useState } from 'react';

function Product(props) {
  let pr = props.result;

  const deleteProduct = async (event) => {
    console.log(pr.id)
    await fetch(`http://localhost:8080/product/delete/${pr.id}`, {
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