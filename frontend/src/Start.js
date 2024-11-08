import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FilterPage() {
  const [priceValue, setPriceValue] = useState(1);
  const [cuisines, setCuisines] = useState([]);

  // Fetch cuisine types from backend
  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cuisines');
        setCuisines(response.data); // Assuming backend sends an array of cuisine names
      } catch (error) {
        console.error('Error fetching cuisines:', error);
      }
    };
    fetchCuisines();
  }, []);

  const handleRangeChange = (e) => {
    setPriceValue(e.target.value);
  };

  const priceLabels = ["$", "$$", "$$$", "$$$$", "$$$$$"];

  return (
    <div className="filter-page">
      <h1>Choose Your Preferences</h1>
      <form className="filter-form">
        <div className="filter-group">
          <label>Cuisine Type</label>
          <select>
            <option value="all">All</option>
            {cuisines.map((cuisine) => (
              <option key={cuisine} value={cuisine.toLowerCase()}>
                {cuisine}
              </option>
            ))}
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
