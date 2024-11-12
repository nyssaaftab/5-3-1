import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FilterPage() {
  const [priceValue, setPriceValue] = useState(1);
  const [cuisineType, setCuisineType] = useState('all');
  const [restaurants, setRestaurants] = useState([]);
  const [cuisines, setCuisines] = useState(['Italian', 'Japanese', 'Mexican', 'Indian', 'American', 'Thai', 'Chinese']);  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8081/api/restaurants', {
        params: {
          cuisineType: cuisineType === 'all' ? '' : cuisineType,
          priceLevel: priceValue,
        },
      });
      setRestaurants(response.data);  // Display results
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  return (
    <div className="filter-page">
      <h1>Choose Your Preferences</h1>
      <form onSubmit={handleSubmit} className="filter-form">
        <div className="filter-group">
          <label>Cuisine Type</label>
          <select value={cuisineType} onChange={(e) => setCuisineType(e.target.value)}>
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
            onChange={(e) => setPriceValue(e.target.value)}
          />
          <div>Price: {"$".repeat(priceValue)}</div>
        </div>
        <button type="submit">Generate Restaurants</button>
      </form>

      {/* Display fetched restaurants */}
      <div className="restaurant-results">
        {restaurants.map((restaurant) => (
          <div key={restaurant.place_id} className="restaurant-card">
            <h2>{restaurant.name}</h2>
            <p>{restaurant.vicinity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterPage;
