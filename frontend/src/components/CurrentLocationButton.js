import React, { useCallback } from "react";
import '../styles/CurrentLocationButton.css';

const CurrentLocationButton = ({ setCurrLocation, setUseCurrLocation, useCurrLocation, setFormattedAddress, setSelectedPlace }) => {

  const handleLocationClick = useCallback((e) => {
    if (useCurrLocation) {
      // If already selected, deselect the button and reset location
      setCurrLocation(null);  // Clear the location (or set it to a default value)
      setUseCurrLocation(false); // Flip using current location flag
      setFormattedAddress(''); // Clear formatted address
      setSelectedPlace(null); // Clear selected place
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
            setSelectedPlace(null); // Clear selected place when using current location
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
  }, [useCurrLocation, setCurrLocation, setUseCurrLocation, setFormattedAddress, setSelectedPlace]);

  return (
    <button
      type="button"
      className={`current-location-button ${useCurrLocation ? "selected" : ""}`}
      onClick={handleLocationClick}
      title={useCurrLocation ? "Using Current Location" : "Use My Current Location"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="20"
        height="20"
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    </button>
  );
};

export default CurrentLocationButton;
