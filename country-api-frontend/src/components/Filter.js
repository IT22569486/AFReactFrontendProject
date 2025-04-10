import React from 'react';

function Filter({ onFilter }) {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  const handleFilter = (e) => {
    const region = e.target.value;
    fetch(`https://restcountries.com/v3.1/region/${region}`)
      .then((response) => response.json())
      .then((data) => onFilter(data))
      .catch((error) => console.error('Error filtering:', error));
  };

  return (
    <select className="form-select mb-3" onChange={handleFilter}>
      <option value="">Filter by Region</option>
      {regions.map((region) => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </select>
  );
}

export default Filter;