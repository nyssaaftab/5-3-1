import React, {useState, useEffect} from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import "../styles/LocationSearch.css";
import axios from 'axios';

const LocationSearch = ({ searchLocation, setSearchLocation }) => {
  //get the formatted address
  const [formattedAddress, setFormattedAddress] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Debug: Log API key status
  console.log('API Key loaded:', !!process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  console.log('API Key value:', process.env.REACT_APP_GOOGLE_MAPS_API_KEY?.substring(0, 10) + '...');
    // Handle place selection
    const handleLocationSelect = async (value) => {
      // Update the selected place for the autocomplete component
      setSelectedPlace(value);

      if (value && value.value && value.value.place_id) {
        const placeId = value.value.place_id; // Get placeId from Autocomplete result

        console.log("Place selected");

        try {
          // Send placeId to Spring Boot backend to get place details
          console.log("Sending placeId to backend:", placeId);
          const response = await axios.get(`http://localhost:8081/api/restaurants/google-places`, {
            params: {
              placeId: placeId,
            },
          });

          if (response.data.status === "OK") {
            //console.log(response.data.result);
            const { lat, lng } = response.data.result.geometry.location;
            const address = response.data.result.formatted_address;

            // Set the location and formatted address
            setSearchLocation(`${lat},${lng}`);
            setFormattedAddress(address);
            console.log("Address: ", address);
          } else {
            console.error("Error fetching place details:", response.data.status);
          }
        } catch (error) {
          console.error("Error fetching place details:", error);
        }
      } else {
        // User cleared the selection
        console.log("Selection cleared");
        setSearchLocation('');
        setFormattedAddress('');
      }
    };

     // Log whenever searchLocation changes
     useEffect(() => {
      console.log("Search location has changed:", searchLocation);
    }, [searchLocation]); // Dependency on searchLocation means this effect runs when searchLocation changes
  
  return (
    <div className="location-search">
      <div>
        {(!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) ? (
          <div style={{ color: 'red', fontSize: '0.9rem' }}>
            Google Maps API key is missing. Set REACT_APP_GOOGLE_MAPS_API_KEY in frontend/.env and restart the dev server.
          </div>
        ) : (
          <GooglePlacesAutocomplete
          apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          selectProps={{
            value: selectedPlace, // Set value of the input field
            onChange: handleLocationSelect, // Update location when a user selects an option
            placeholder: formattedAddress || "Enter Address Or Use Current Location", // Placeholder text
            isClearable: true,
            noOptionsMessage: () => "No places found",
            loadingMessage: () => "Loading places...",
          }}
        />
        )}
      </div>
    </div>
  );
};

export default LocationSearch;


