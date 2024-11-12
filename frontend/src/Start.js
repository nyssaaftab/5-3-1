import React, { useState } from 'react';
import axios from 'axios';

function FilterPage() {
  const [priceValue, setPriceValue] = useState(1);
  const [cuisineType, setCuisineType] = useState('all');
  const [diet, setDiet] = useState(''); // Track dietary preference
  const [restaurants, setRestaurants] = useState([]);

  const handleGenerateRestaurants = async (e) => {
    e.preventDefault();
    try {
      //change based on url
      const response = await axios.get(`http://localhost::8081/api/restaurants/random`, {
        params: { cuisine: cuisineType, price: priceValue, diet }
      });
      setRestaurants(response.data.slice(0, 5)); // Show only 5 restaurants
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  return (
    <div className="filter-page">
      <h1>Choose Your Preferences</h1>
      <form className="filter-form" onSubmit={handleGenerateRestaurants}>
        {/* Your existing inputs for cuisine, price, etc. */}
        <button type="submit">Generate Restaurants</button>
      </form>
      <div className="restaurant-results">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id}>{restaurant.name}</div>
        ))}
      </div>
    </div>
  );
}

export default FilterPage;
