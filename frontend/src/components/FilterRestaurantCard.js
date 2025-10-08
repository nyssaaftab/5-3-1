import React from 'react';
import { Star } from 'lucide-react';

function FilterRestaurantCard({ restaurant, onSelect, isSelected, isLast }) {
  const handleCardClick = () => {
    if (onSelect) {
      onSelect(restaurant.id);
    }
  };

  const renderPriceLevel = (level) => {
    if (!level) return '';
    return '$'.repeat(level);
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full cursor-pointer relative"
      style={{ borderBottom: !isLast ? '2px solid #1e3a8a' : 'none' }}
    >
      <div className="flex items-center py-3 relative">
        {/* Checkbox */}
        <div className="w-[80px] flex items-center justify-center flex-shrink-0">
          <div className={`w-6 h-6 border-2 border-blue-900 flex items-center justify-center ${
            isSelected ? 'bg-blue-900' : 'bg-white'
          }`}>
            {isSelected && (
              <span className="text-white text-sm font-bold">✓</span>
            )}
          </div>
        </div>

        {/* Picture */}
        <div className="w-[100px] flex items-center justify-center flex-shrink-0 pl-4">
          <div className="w-16 h-16 border-2 border-blue-900 overflow-hidden">
            {restaurant.photoUrl ? (
              <img
                src={restaurant.photoUrl}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-green-50 text-2xl">
                🍽️
              </div>
            )}
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="flex-1 min-w-0 pl-4">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-blue-900 truncate" style={{ fontFamily: '"Courier New", monospace' }}>
              {restaurant.name}
            </h3>
            {restaurant.opening_hours && (
              <p className="text-xs text-gray-600 flex-shrink-0" style={{ fontFamily: '"Courier New", monospace' }}>
                {restaurant.opening_hours.open_now ? 'Open Now' : 'Closed'}
              </p>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="w-[80px] flex-shrink-0 flex items-center justify-center">
          {restaurant.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-blue-900 fill-blue-900" />
              <span className="text-blue-900 font-semibold" style={{ fontFamily: '"Courier New", monospace' }}>
                {restaurant.rating}
              </span>
            </div>
          )}
        </div>

        {/* Price Level */}
        <div className="w-[60px] pl-2 pr-2 flex-shrink-0">
          {restaurant.price_level && (
            <span className="text-blue-900 font-bold" style={{ fontFamily: '"Courier New", monospace' }}>
              {renderPriceLevel(restaurant.price_level)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterRestaurantCard;
