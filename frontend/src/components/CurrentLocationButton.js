import React, { useCallback } from "react";
import '../styles/CurrentLocationButton.css';

const CurrentLocationButton = ({ setCurrLocation, setUseCurrLocation, useCurrLocation }) => {

  const handleLocationClick = useCallback((e) => {
    if (useCurrLocation) {
      // If already selected, deselect the button and reset location
      setCurrLocation(null);  // Clear the location (or set it to a default value)
      setUseCurrLocation(false); // Flip using current location flag
    } else {
      // If not selected, get the current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const location = `${lat}, ${lon}`;
            setCurrLocation(location);
            setUseCurrLocation(true); //Flip using current location flag to true
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
  }, [useCurrLocation, setCurrLocation, setUseCurrLocation]);

  return (
    <button
      type="button"
      className={`current-location-button ${useCurrLocation ? "selected" : ""}`}
      onClick={handleLocationClick}
    >
      {useCurrLocation ? "Using Current Location" : "Use My Current Location"}
    </button>
  );
};

export default CurrentLocationButton;
