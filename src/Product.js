import React, { useEffect, useState } from 'react';

function Product() {
  const [products, setProducts] = useState([]);
  const [gtinResult, setGtinResult] = useState([]);

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

  return (
    <div>
      {products[0].id}
    </div>
  );
}

export default Product;