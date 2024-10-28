import React, { useState } from 'react';

function FilterPage() {
  const [priceValue, setPriceValue] = useState(1); // State to track selected price

  const handleRangeChange = (e) => {
    setPriceValue(e.target.value);
  };

  const priceLabels = ["$", "$$", "$$$", "$$$$", "$$$$$"]; // Array for labels

  return (
    <div className="filter-page">
      <h1>Choose Your Preferences</h1>
      <form className="filter-form">
        <div className="filter-group">
          <label>Cuisine Type</label>
          <select>
            <option value="all">All</option>
            <option value="thai">Thai</option>
            <option value="mexican">Mexican</option>
            <option value="american">American</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Price Range</label>
          <input 
            type="range" 
            min="1" 
            max="5" 
            value={priceValue}
            onChange={handleRangeChange}
          />
          <div className="selected-price">
            Price: {priceLabels[priceValue - 1]}
          </div>
        </div>
        <div className="filter-group">
          <label>Dietary Preferences</label>
          <input type="checkbox" /> Vegetarian
          <input type="checkbox" /> Vegan
        </div>
        <button type="submit">Generate Restaurants</button>
      </form>
    </div>
  );
}

export default FilterPage;
