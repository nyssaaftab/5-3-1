import React, { useCallback } from "react";
import '../styles/CurrentLocationButton.css';

const CurrentLocationButton = ({ setCurrLocation, setUseCurrLocation, useCurrLocation, setFormattedAddress }) => {

  const handleLocationClick = useCallback((e) => {
    if (useCurrLocation) {
      // If already selected, deselect the button and reset location
      setCurrLocation(null);  // Clear the location (or set it to a default value)
      setUseCurrLocation(false); // Flip using current location flag
      setFormattedAddress(''); // Clear formatted address
    } else {
      // If not selected, get the current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const location = `${lat},${lon}`;
            setCurrLocation(location);
            setUseCurrLocation(true); //Flip using current location flag to true
            setFormattedAddress(`Current Location (${lat.toFixed(4)}, ${lon.toFixed(4)})`);
          },
          (error) => {
            console.error("Error getting location:", error);
            alert("Unable to get your location. Please enable location services.");
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
  }, [useCurrLocation, setCurrLocation, setUseCurrLocation, setFormattedAddress]);

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
