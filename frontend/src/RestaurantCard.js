import React from 'react';
import './RestaurantCard.css';

function RestaurantCard({ restaurant, onSelect, isSelected }) {
  const handleCardClick = () => {
    if (onSelect) {
      onSelect(restaurant.id); // Call the function passed from the parent
    } else {
      console.error("onSelect function is not provided.");
    }
  };

  return (
    <div
      className={`restaurant-card ${isSelected ? 'selected' : ''}`}
      onClick={handleCardClick}
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
