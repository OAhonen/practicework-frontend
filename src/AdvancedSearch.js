import React, { useEffect, useState } from 'react';

function AdvancedSearch() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, isLoading] = useState(false);
  const [searchValues, setSearchValues] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const values = {name: data.get('name'),
                    minWeight: data.get('minWeight'),
                    maxWeight: data.get('maxWeight'),
                    minEnergy: data.get('minEnergy'),
                    maxEnergy: data.get('maxEnergy')};
    setSearchValues(values);
    const hr = await fetch(`http://localhost:8080/product/all`);
    const json = await hr.json();
    setAllProducts(json);
    isLoading(true);
    console.log(values);
  }

  if (loading) {
    console.log(searchValues.name)
    console.log(allProducts[0].name)
    console.log(searchValues.minWeight.length)
    if (searchValues.minWeight < 3) {
      console.log('pienempi kun 3')
    }
    allProducts.forEach( e => {
      if (searchValues.name.length > 0) {
        if (e.name.toLowerCase().includes(searchValues.name.toLowerCase())) {
          console.log('yep');
        }
      }
    })
  }

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label>
        Name:&nbsp;
        <input type="text"
              id="name"
              name="name"/>
      </label><br/>
      <label>
        Min weight:&nbsp;
        <input type="number"
              min="0"
              id="minWeight"
              name="minWeight"/>
      </label>&nbsp;
      <label>
        Max weight:&nbsp;
        <input type="number"
              min="0"
              id="maxWeight"
              name="maxWeight"/>
      </label><br/>
      <label>
        Min energy:&nbsp;
        <input type="number"
              min="0"
              id="minEnergy"
              name="minEnergy"/>
      </label>&nbsp;
      <label>
        Max energy:&nbsp;
        <input type="number"
              min="0"
              id="maxEnergy"
              name="maxEnergy"/>
      </label><br/>
      <input type="submit" value="Submit" />
    </form>
  </div>
  )
}

export default AdvancedSearch;