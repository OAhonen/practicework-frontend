import React, { useEffect, useState } from 'react';

function Product(props) {
  let pr = props.result;
  if (pr === undefined) {
    return <div></div>
  } else {
    return (
      <div>
      GTIN: {pr.gtin}<br/>
      Name: {pr.name}<br/>
      Weight: {pr.weight}<br/>
      Energy: {pr.energy}<br/>
      </div>
    )
  }
}

export default Product;