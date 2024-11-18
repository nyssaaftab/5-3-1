import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard from './RestaurantCard'; 

function FilterPage() {
  const [priceValue, setPriceValue] = useState(1);
  const [cuisineType, setCuisineType] = useState('all');
  const [restaurants, setRestaurants] = useState([]);
  const [cuisines, setCuisines] = useState(['Italian', 'Japanese', 'Mexican', 'Indian', 'American', 'Thai', 'Chinese']);  
  const [location, setLocation] = useState('');
  const [radiusMiles, setRadiusMiles] = useState(0.5);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8081/api/restaurants/random', {
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
    /* Added */
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
          <label>Your Location </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter address"
            />
        </div>
        <div className="filter-group">
          <label>Search Radius</label>
          <input 
            type="range" 
            min="0.1" 
            max="10" 
            step="0.1" 
            value={radiusMiles}
            onChange={(e) => setRadiusMiles(parseFloat(e.target.value))}
            />
        <div>Radius: {radiusMiles.toFixed(1)} miles</div>
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
        <div className="filter-group">
          <label>Dietary Preferences</label>
          <input type="checkbox" /> Vegetarian
          <input type="checkbox" /> Vegan
        </div>
        <button type="submit">Generate Restaurants</button>
      </form>

      {/* Render restaurant cards */}
      <div className="restaurant-results">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}

export default FilterPage;
