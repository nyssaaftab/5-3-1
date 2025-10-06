import React from 'react';
import '../styles/RestaurantCard.css';

function RestaurantCard({ restaurant, onSelect, isSelected }) {
  const handleCardClick = () => {
    if (onSelect) {
      onSelect(restaurant.id);
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
        <h2>{restaurant.name}</h2>
        <p className="description">
          {restaurant.openingHours?.openNow === true ? '✓ Open Now' : 
           restaurant.openingHours?.openNow === false ? '✗ Closed' : 
           '⏰ Hours Unknown'}
        </p>
      </div>
    </div>
  );
}


export default RestaurantCard;
