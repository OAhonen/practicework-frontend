import React, { useEffect, useState } from 'react';

function AdvancedSearch() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, isLoading] = useState(false);
  const [searchValues, setSearchValues] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [finalResult, setFinalResult] = useState([]);
  let searchResult = [];
  let table = "";

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
    allProducts.forEach( e => {
      if (e.name.toLowerCase().includes(searchValues.name.toLowerCase()) &&
          (e.weight >= searchValues.minWeight && e.weight <= searchValues.maxWeight) &&
          (e.energy >= searchValues.minEnergy && e.energy <= searchValues.maxEnergy)) {
        searchResult.push({gtin: e.gtin})
      }
    })
    setFinalResult(searchResult);
    isLoading(false);
    setShowResult(true);
  }

  if (showResult) {
    if (finalResult.length > 0) {
      console.log('yes')
      table = <div>{finalResult.map(result => <div key={result.gtin}>{result.gtin}</div>)}</div>
    } else {
      console.log('no')
      table = <p>No data found.</p>
    }
  }

  return (
    <div>
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
              placeholder="0"/>
      </label>&nbsp;
      <label>
        Max weight:&nbsp;
        <input type="number"
              min="0"
              id="maxWeight"
              name="maxWeight"
              placeholder="0"/>
      </label><br/>
      <label>
        Min energy:&nbsp;
        <input type="number"
              min="0"
              id="minEnergy"
              name="minEnergy"
              placeholder="0"/>
      </label>&nbsp;
      <label>
        Max energy:&nbsp;
        <input type="number"
              min="0"
              id="maxEnergy"
              name="maxEnergy"
              placeholder="0"/>
      </label><br/>
      <input type="submit" value="Submit" />
    </form>
    {table}
  </div>
  )
}

export default AdvancedSearch;