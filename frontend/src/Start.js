import React from 'react';

function FilterPage() {
    return (
      <div className="filter-page">
        <h1>Choose Your Preferences</h1>
        <form className="filter-form">
          <div className="filter-group">
            <label>Cuisine Type</label>
            <select>
              <option value="all">All</option>
              <option value="thai">Thai</option>
              <option value="mexican">Mexican</option>
              <option value="american">American</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Price Range</label>
            <input type="range" min="1" max="5" />
          </div>
          <div className="filter-group">
            <label>Dietary Preferences</label>
            <input type="checkbox" /> Vegetarian
            <input type="checkbox" /> Vegan
          </div>
          <button type="submit">Generate Restaurants</button>
        </form>
      </div>
    );
  }
  
  export default FilterPage;