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
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [chosenRestaurant, setChosenRestaurant] = useState(null);

  const getSelectionMessage = () => {
    switch (selectedRestaurants.length) {
      case 0:
        return "Please select 3 restaurants to continue";
      case 1:
        return "Great! You've selected 1 restaurant. Please select 2 more";
      case 2:
        return "Almost there! Select 1 more restaurant";
      case 3:
        return "Perfect! You've selected 3 restaurants";
      default:
        return "";
    }
  };

  // Get current location and update the location state
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation(`${lat}, ${lon}`);
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
      // Add unique IDs to the restaurants
      const restaurantsWithIds = response.data.map((restaurant, index) => ({
        ...restaurant,
        id: `${restaurant.name}-${index}` // Create unique ID using name and index
      }));
      console.log("Restaurants with IDs:", restaurantsWithIds);
      setRestaurants(restaurantsWithIds);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const handleSelectRestaurant = (restaurantId) => {
    console.log("Selected Restaurants Before:", selectedRestaurants);
    setSelectedRestaurants((prevSelected) => {
      const updated = prevSelected.includes(restaurantId)
        ? prevSelected.filter((id) => id !== restaurantId)
        : prevSelected.length < 3
        ? [...prevSelected, restaurantId]
        : prevSelected;
      console.log("Selected Restaurants After:", updated);
      return updated;
    });
  };

  const submitSelection = () => {
    // Get the full restaurant objects for the selected IDs
    const selectedRestaurantObjects = selectedRestaurants.map(id => 
      restaurants.find(r => r.id === id)
    );
    
    // Randomly select one restaurant
    const randomIndex = Math.floor(Math.random() * selectedRestaurantObjects.length);
    const chosenOne = selectedRestaurantObjects[randomIndex];
    
    setChosenRestaurant(chosenOne);
  };

  return (
    <div className="filter-page">
      <h1>Choose Your Preferences</h1>
      {!chosenRestaurant ? (
        <>
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

            <button type="submit">Generate Restaurants</button>
          </form>

          <div className="restaurant-results">
  {restaurants.map((restaurant) => (
    <div key={restaurant.id}>
      <RestaurantCard 
        restaurant={restaurant} 
        isSelected={selectedRestaurants.includes(restaurant.id)}
        onSelect={handleSelectRestaurant}
      />
    </div>
  ))}
</div>


          <div className="restaurant-selection-status">
            <p className="selection-message">{getSelectionMessage()}</p>
            {selectedRestaurants.length === 3 && (
              <button 
                onClick={submitSelection}
                className="submit-button"
              >
                Choose My Restaurant
              </button>
            )}
          </div>
        </>
      ) : (
        <div>
          <h2>We chose this restaurant for you:</h2>
          <RestaurantCard restaurant={chosenRestaurant} />
        </div>
      )}
    </div>
  );
}

export default FilterPage;