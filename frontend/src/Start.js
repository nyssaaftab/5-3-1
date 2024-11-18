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

  // getcurrent location and update the location state
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // fix later to make more readable
          setLocation(`${lat}, ${lon}`);  // currently set location as coordinates
        },
        (err) => {
          console.error('Error retrieving location:', err);
          alert('Could not fetch your location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const radiusInMeters = radiusMiles * 1609.34;
    try {
      const response = await axios.get('http://localhost:8081/api/restaurants/random', {
        params: {
          cuisineType: cuisineType === 'all' ? '' : cuisineType,
          priceLevel: priceValue,
          location: location, 
          radius: radiusInMeters,
        },
      });
      setRestaurants(response.data); // Display results
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
          <label>Your Location</label>
          <div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter address or use current location"
            />
            <button type="button" onClick={getCurrentLocation}>Use My Location</button>
          </div>
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