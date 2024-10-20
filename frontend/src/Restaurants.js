import React from 'react';
import RestaurantCard from './RestaurantCard'; 
import canesImage from './canes.jpg';
import bangkokImage from './bangkok.jpg';
import burritoImage from './burrito.png'
import midsummerImage from './midsummer.webp';
import chipotleImage from './chipotle.jpg';

const restaurants = [
  { id: 1, name: 'Bangkok Thai', image: bangkokImage },
  { id: 2, name: 'Burrito King', image: burritoImage },
  { id: 3, name: 'Raising Canes', image: canesImage },
  { id: 4, name: 'Midsummer Lounge', image: midsummerImage},
  { id: 5, name: 'Chipotle', image: chipotleImage},
];


function Restaurants() {
  return (
    <div className="restaurant-container">
      <h1>Restaurants</h1>
      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}

export default Restaurants;
