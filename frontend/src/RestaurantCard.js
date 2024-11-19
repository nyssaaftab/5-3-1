import React from 'react';
import './RestaurantCard.css';

function RestaurantCard({ restaurant, onSelect, isSelected }) {
  return (
    <div
      className={`restaurant-card ${isSelected ? 'selected' : ''}`}
      onClick={() => {
        console.log(`Card clicked: ${restaurant.id}, Selected: ${isSelected}`);
        onSelect(restaurant.id); // Pass ID to parent handler
      }}
    >
      <img
        src={restaurant.image || 'fallback-image-url.jpg'}
        alt={restaurant.name || 'Restaurant'}
      />
      <div className="overlay">
        <h2>{restaurant.name || 'Unknown Restaurant'}</h2>
        <p className="description">{restaurant.description || 'No description available'}</p>
      </div>
    </div>
  );
}


export default RestaurantCard;
