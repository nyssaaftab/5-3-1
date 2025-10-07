import React from 'react';
import { Star } from 'lucide-react';

function FilterRestaurantCard({ restaurant, onSelect, isSelected }) {
  const handleCardClick = () => {
    if (onSelect) {
      onSelect(restaurant.id);
    }
  };

  const renderPriceLevel = (level) => {
    if (!level) return '';
    return '$'.repeat(level) + '·'.repeat(3 - level);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all hover:scale-105 ${
        isSelected ? 'ring-4 ring-orange-500' : ''
      }`}
    >
      <div className="h-32 bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-5xl">
        🍽️
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">{restaurant.name}</h3>
        <p className="text-sm text-gray-600 mb-3 truncate">{restaurant.address || restaurant.vicinity}</p>
        <div className="flex flex-col gap-1 text-xs text-gray-500">
          {restaurant.rating && (
            <span className="flex items-center">
              <Star className="w-3 h-3 text-yellow-500 mr-1 fill-yellow-500" />
              {restaurant.rating}
            </span>
          )}
          {restaurant.price_level && (
            <span>{renderPriceLevel(restaurant.price_level)}</span>
          )}
          {restaurant.openingHours && (
            <span className={restaurant.openingHours.openNow ? 'text-green-600' : 'text-red-600'}>
              {restaurant.openingHours.openNow ? '✓ Open Now' : '✗ Closed'}
            </span>
          )}
        </div>
      </div>
      {isSelected && (
        <div className="bg-orange-500 text-white text-center py-2 font-semibold text-sm">
          ✓ Selected
        </div>
      )}
    </div>
  );
}

export default FilterRestaurantCard;
