import React from 'react';
import RestaurantCard from './RestaurantCard';
import canesImage from '../assets/images/canes.jpg';
import bangkokImage from '../assets/images/bangkok.jpg';
import burritoImage from '../assets/images/burrito.png'
import midsummerImage from '../assets/images/midsummer.webp';
import chipotleImage from '../assets/images/chipotle.jpg';
import miaImage from '../assets/images/miaza.jpeg';
import oozuImage from '../assets/images/oozu.png';
import forageImage from '../assets/images/forage.png';
import sigImage from '../assets/images/sig.jpg';

const restaurants = [
  { id: 1, name: 'Bangkok Thai', image: bangkokImage },
  { id: 2, name: 'Burrito King', image: burritoImage },
  { id: 3, name: 'Chipotle', image: chipotleImage},
  { id: 4, name: 'Forage Kitchem', image: forageImage},
  { id: 5, name: 'Mia Zas', image: miaImage},
  { id: 6, name: 'Midsummer Lounge', image: midsummerImage},
  { id: 7, name: 'Oozu Ramen', image: oozuImage},
  { id: 8, name: 'Raising Canes', image: canesImage },
  { id: 9, name: 'Signature Grill', image: sigImage},
];


function Restaurants() {
  return (
    <><div className="restaurant-container">
      <h1>Popular Restaurants at UIUC</h1>
      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div><p>and more!</p></>
  );
}

export default Restaurants;
