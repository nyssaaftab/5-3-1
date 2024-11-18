import React, { useState } from 'react';
import RestaurantCard from './RestaurantCard';
import axios from 'axios';

function RestaurantList({ restaurants }) {
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [finalChoice, setFinalChoice] = useState(null);

  const handleSelect = (restaurant) => {
    setSelectedRestaurants((prev) =>
      prev.includes(restaurant)
        ? prev.filter((r) => r !== restaurant)
        : [...prev, restaurant]
    );
  };

  const handleSubmit = async () => {
    if (selectedRestaurants.length !== 3) {
      alert("Please select exactly 3 restaurants.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/api/restaurants/choose', {
        selected: selectedRestaurants,
      });
      setFinalChoice(response.data);
    } catch (error) {
      console.error("Error choosing a restaurant:", error);
    }
  };

  return (
    <div>
      {finalChoice ? (
        <div>
          <h1>Selected Restaurant:</h1>
          <RestaurantCard restaurant={finalChoice} />
        </div>
      ) : (
        <>
          <div className="restaurant-list">
            {restaurants.map((restaurant) => (
              <div key={restaurant.place_id}>
                <input
                  type="checkbox"
                  checked={selectedRestaurants.includes(restaurant)}
                  onChange={() => handleSelect(restaurant)}
                />
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}
    </div>
  );
}

export default RestaurantList;
