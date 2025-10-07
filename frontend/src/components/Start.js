import React, { useState } from 'react';
import axios from 'axios';
import RestaurantCard from './FilterRestaurantCard';
import LocationSearch from './LocationSearch.js';
import CurrentLocationButton from './CurrentLocationButton';
import { MapPin, DollarSign, Navigation, Star } from 'lucide-react';
import { API_BASE_URL } from '../config';

function FilterPage() {
  const [maxPrice, setMaxPrice] = useState(4);
  const [cuisineType, setCuisineType] = useState('all');
  const [restaurants, setRestaurants] = useState([]);
  const [cuisines] = useState(['Italian', 'Japanese', 'Mexican', 'Indian', 'American', 'Thai', 'Chinese']);
  const [searchLocation, setSearchLocation] = useState('40.1106,-88.2073');
  const [currLocation, setCurrLocation] = useState('');
  const [useCurrLocation, setUseCurrLocation] = useState(false);
  const [formattedAddress, setFormattedAddress] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [radiusMiles, setRadiusMiles] = useState(0.5);
  const [openNow, setOpenNow] = useState(true);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [chosenRestaurant, setChosenRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setRestaurants([]);
    setSelectedRestaurants([]);

    const radiusInMeters = radiusMiles * 1609.34;

    let loc = '';
    if (useCurrLocation && currLocation) {
      loc = currLocation;
    } else if (searchLocation) {
      loc = searchLocation;
    }

    if (!loc || loc.trim() === '') {
      setError('Please select a location or use your current location');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get(`${API_BASE_URL}/api/restaurants/random`, {
        params: {
          cuisine: cuisineType === 'all' ? '' : cuisineType,
          minPrice: 1,
          maxPrice: maxPrice,
          location: loc,
          radius: radiusInMeters,
          openNow: openNow,
        },
      });

      const restaurants = response.data.restaurants || response.data;

      if (!restaurants || restaurants.length === 0) {
        setError('No restaurants found. Try expanding your search radius or changing your filters.');
        setRestaurants([]);
        return;
      }

      if (restaurants.length < 5) {
        setError(`Only found ${restaurants.length} restaurants. Please expand your search radius or change your filters to find at least 5 restaurants.`);
        setRestaurants([]);
        return;
      }

      const restaurantsWithIds = restaurants.map((restaurant, index) => ({
        ...restaurant,
        id: `${restaurant.name}-${index}`
      }));

      setRestaurants(restaurantsWithIds);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      if (error.response) {
        let errorMessage = 'Failed to fetch restaurants';

        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. There might not be enough restaurants matching your filters. Try expanding your radius or changing filters.';
        } else if (error.response.status === 400) {
          errorMessage = 'Invalid search parameters. Please check your location and filters.';
        }

        setError(errorMessage);
      } else if (error.request) {
        setError('Unable to reach the server. Please make sure the backend is running.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectRestaurant = (restaurantId) => {
    setSelectedRestaurants((prevSelected) => {
      const updated = prevSelected.includes(restaurantId)
        ? prevSelected.filter((id) => id !== restaurantId)
        : prevSelected.length < 3
        ? [...prevSelected, restaurantId]
        : prevSelected;
      return updated;
    });
  };

  const submitSelection = () => {
    const selectedRestaurantObjects = selectedRestaurants.map(id =>
      restaurants.find(r => r.id === id)
    );

    const randomIndex = Math.floor(Math.random() * selectedRestaurantObjects.length);
    const chosenOne = selectedRestaurantObjects[randomIndex];

    setChosenRestaurant(chosenOne);
  };

  const reset = () => {
    setRestaurants([]);
    setSelectedRestaurants([]);
    setChosenRestaurant(null);
    setError(null);
    // Keep location state unchanged
  };

  const renderPriceLevel = (level) => {
    if (!level) return '';
    return '$'.repeat(level);
  };

  // Step 0: No restaurants yet - show search form
  if (!chosenRestaurant && restaurants.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-800 mb-2">5-3-1</h1>
            <p className="text-gray-600 text-lg">Take a chance and find your new favorite spot!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Your Location
              </label>
              <div className="space-y-2">
                <LocationSearch
                  searchLocation={searchLocation}
                  setSearchLocation={setSearchLocation}
                  setUseCurrLocation={setUseCurrLocation}
                  formattedAddress={formattedAddress}
                  setFormattedAddress={setFormattedAddress}
                  selectedPlace={selectedPlace}
                  setSelectedPlace={setSelectedPlace}
                />
                <CurrentLocationButton setCurrLocation={setCurrLocation} setUseCurrLocation={setUseCurrLocation} useCurrLocation={useCurrLocation} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Navigation className="inline w-4 h-4 mr-1" />
                Search Radius: {radiusMiles.toFixed(1)} miles
              </label>
              <input
                type="range"
                min="0.1"
                max="25"
                step="0.1"
                value={radiusMiles}
                onChange={(e) => setRadiusMiles(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cuisine Type
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={cuisineType}
                onChange={(e) => setCuisineType(e.target.value)}
              >
                <option value="all">All Cuisines</option>
                {cuisines.map((cuisine) => (
                  <option key={cuisine} value={cuisine.toLowerCase()}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="inline w-4 h-4 mr-1" />
                Max Price: {'$'.repeat(maxPrice)}
              </label>
              <input
                type="range"
                min="1"
                max="4"
                step="1"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$</span>
                <span>$$</span>
                <span>$$$</span>
                <span>$$$$</span>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="openNow"
                checked={openNow}
                onChange={(e) => setOpenNow(e.target.checked)}
                className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="openNow" className="ml-2 text-sm text-gray-700">
                Only show restaurants open now
              </label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                <strong>Error:</strong> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-semibold text-lg shadow-lg transition-all ${
                isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-xl hover:scale-105'
              }`}
            >
              {isLoading ? 'Loading...' : 'Find 5 Restaurants'}
            </button>
          </form>

          {isLoading && (
            <div className="mt-6 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
              <p className="mt-2 text-gray-600">Finding restaurants...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Step 1: Select 3 from 5
  if (!chosenRestaurant && restaurants.length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-6xl font-bold text-orange-500">5</span>
              <span className="text-4xl text-gray-400">→</span>
              <span className="text-4xl font-bold text-gray-300">3</span>
              <span className="text-4xl text-gray-400">→</span>
              <span className="text-4xl font-bold text-gray-300">1</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Top 3</h2>
            <p className="text-gray-600">Selected: {selectedRestaurants.length}/3</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-8 max-w-5xl mx-auto">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                isSelected={selectedRestaurants.includes(restaurant.id)}
                onSelect={handleSelectRestaurant}
              />
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={reset}
              className="px-8 py-3 bg-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-400 transition-colors"
            >
              Start Over
            </button>
            <button
              onClick={submitSelection}
              disabled={selectedRestaurants.length !== 3}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                selectedRestaurants.length === 3
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-xl hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Pick My Restaurant!
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Final Pick
  if (chosenRestaurant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-4xl font-bold text-gray-300">5</span>
              <span className="text-4xl text-gray-400">→</span>
              <span className="text-4xl font-bold text-gray-300">3</span>
              <span className="text-4xl text-gray-400">→</span>
              <span className="text-6xl font-bold text-orange-500">1</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">You're Going To...</h2>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {chosenRestaurant.photoUrl && (
              <div className="h-64 overflow-hidden">
                <img
                  src={chosenRestaurant.photoUrl}
                  alt={chosenRestaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-12 text-center">
              <h3 className="text-4xl font-bold text-gray-800 mb-4">{chosenRestaurant.name}</h3>
              <p className="text-xl text-gray-600 mb-6">{chosenRestaurant.address || chosenRestaurant.vicinity}</p>
              <div className="flex items-center justify-center gap-8 text-lg text-gray-500 mb-8">
                {chosenRestaurant.rating && (
                  <span className="flex items-center">
                    <Star className="w-6 h-6 text-yellow-500 mr-2 fill-yellow-500" />
                    {chosenRestaurant.rating}
                  </span>
                )}
                {chosenRestaurant.price_level && (
                  <span className="text-2xl">{renderPriceLevel(chosenRestaurant.price_level)}</span>
                )}
              </div>
              {chosenRestaurant.overview && (
                <p className="text-gray-600 mb-6">{chosenRestaurant.overview}</p>
              )}
              {chosenRestaurant.opening_hours && (
                <div className="mb-6">
                  <div className={`text-lg font-semibold mb-2 ${chosenRestaurant.opening_hours.open_now ? 'text-green-600' : 'text-red-600'}`}>
                    {chosenRestaurant.opening_hours.open_now ? '✓ Open Now' : '✗ Closed'}
                  </div>
                  {chosenRestaurant.opening_hours.weekday_text && chosenRestaurant.opening_hours.weekday_text.length > 0 && (
                    <div className="text-left max-w-md mx-auto bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Hours</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        {chosenRestaurant.opening_hours.weekday_text.map((day, index) => (
                          <div key={index}>{day}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {chosenRestaurant.website && (
                <a
                  href={chosenRestaurant.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-orange-500 text-white rounded-xl font-semibold mr-4 hover:bg-orange-600 transition-colors"
                >
                  Visit Website
                </a>
              )}
              {chosenRestaurant.phone && (
                <a
                  href={`tel:${chosenRestaurant.phone}`}
                  className="inline-block px-8 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
                >
                  {chosenRestaurant.phone}
                </a>
              )}
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={reset}
              className="px-12 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Pick Again
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FilterPage;
