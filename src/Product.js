import React, { useEffect, useState } from 'react';

function Product() {
  const [products, setProducts] = useState([])

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

    fetchData();
}, []);

  return (
    <div>
      hello
    </div>
  );
}

export default Product;