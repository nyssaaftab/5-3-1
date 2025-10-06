package com.cs222.fivethreeone;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Collections;
import java.util.HashSet;
import java.util.ArrayList;
import java.util.Set;

@Service
public class GooglePlacesService {
    @Value("${GOOGLE_API_KEY}") //inject API key
    private String apiKey;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    public GooglePlacesService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<Restaurant> getPlaces(String location, String radius) throws JsonMappingException, JsonProcessingException {
        String url = String.format(
            "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=%s&radius=%s&key=%s",
            location, radius, apiKey);
        String response = restTemplate.getForObject(url, String.class); //returns raw JSON response
        JsonNode root = objectMapper.readTree(response);
        JsonNode results = root.path("results");

        return objectMapper.convertValue(results, new TypeReference<List<Restaurant>>() {});
    }

    public RestaurantSearchResponse getRandomRestaurants(String location, String radius, Integer priceLevel, String cuisine, int numRestaurants, boolean openNow) throws JsonMappingException, JsonProcessingException {
        
        List<Restaurant> restaurants = new ArrayList<>();
        
        if (openNow) {
            restaurants = getRestaurantsWithPriceFallback(location, radius, priceLevel, cuisine, numRestaurants, true);
        } else {
            // Get both open and closed restaurants by making two calls
            List<Restaurant> openRestaurants = getRestaurantsWithPriceFallback(location, radius, priceLevel, cuisine, numRestaurants, true);
            List<Restaurant> allRestaurants = getRestaurantsWithPriceFallback(location, radius, priceLevel, cuisine, numRestaurants * 2, false);
            
            // Combine and shuffle
            List<Restaurant> combined = new ArrayList<>();
            combined.addAll(openRestaurants);
            combined.addAll(allRestaurants);
            
            // Remove duplicates
            Set<String> seen = new HashSet<>();
            List<Restaurant> unique = new ArrayList<>();
            for (Restaurant restaurant : combined) {
                if (seen.add(restaurant.getName())) {
                    unique.add(restaurant);
                }
                if (unique.size() == numRestaurants) {
                    break;
                }
            }
            
            Collections.shuffle(unique);
            restaurants = unique;
        }
        
        // Get details for all restaurants
        for (Restaurant r : restaurants) {
            getDetails(r);
        }
        
        // Check if price fallback was used
        boolean priceFallbackUsed = false;
        String fallbackMessage = "";
        
        if (priceLevel != null && restaurants.size() > 0) {
            // Check if any restaurants have different price levels than requested
            boolean hasDifferentPrice = restaurants.stream()
                .anyMatch(r -> r.getPriceLevel() != null && !r.getPriceLevel().equals(priceLevel));
            
            if (hasDifferentPrice) {
                priceFallbackUsed = true;
                fallbackMessage = "Not enough restaurants at $" + "$$$$".substring(0, priceLevel) + " level. Showing nearby price options.";
            }
        }
        
        return new RestaurantSearchResponse(restaurants, priceFallbackUsed, fallbackMessage);
    }
    
    private List<Restaurant> getRestaurantsWithPriceFallback(String location, String radius, Integer priceLevel, String cuisine, int numRestaurants, boolean openNow) throws JsonMappingException, JsonProcessingException {
        List<Restaurant> restaurants = new ArrayList<>();
        
        if (priceLevel == null) {
            // No price filter, just get restaurants normally
            return getRestaurantsWithFilter(location, radius, null, cuisine, numRestaurants, openNow);
        }
        
        // Try the requested price level first
        restaurants = getRestaurantsWithFilter(location, radius, priceLevel, cuisine, numRestaurants, openNow);
        System.out.println("Found " + restaurants.size() + " restaurants at price level " + priceLevel);
        
        if (restaurants.size() >= numRestaurants) {
            return restaurants;
        }
        
        // Not enough restaurants, try one level below
        if (priceLevel > 1) {
            int lowerPrice = priceLevel - 1;
            List<Restaurant> lowerPriceRestaurants = getRestaurantsWithFilter(location, radius, lowerPrice, cuisine, numRestaurants, openNow);
            System.out.println("Found " + lowerPriceRestaurants.size() + " restaurants at price level " + lowerPrice);
            
            // Combine with original results
            Set<String> seen = new HashSet<>();
            for (Restaurant r : restaurants) {
                seen.add(r.getName());
            }
            
            for (Restaurant r : lowerPriceRestaurants) {
                if (seen.add(r.getName()) && restaurants.size() < numRestaurants) {
                    restaurants.add(r);
                }
            }
        }
        
        // Still not enough? Try one level above
        if (restaurants.size() < numRestaurants && priceLevel < 4) {
            int higherPrice = priceLevel + 1;
            List<Restaurant> higherPriceRestaurants = getRestaurantsWithFilter(location, radius, higherPrice, cuisine, numRestaurants, openNow);
            System.out.println("Found " + higherPriceRestaurants.size() + " restaurants at price level " + higherPrice);
            
            // Combine with existing results
            Set<String> seen = new HashSet<>();
            for (Restaurant r : restaurants) {
                seen.add(r.getName());
            }
            
            for (Restaurant r : higherPriceRestaurants) {
                if (seen.add(r.getName()) && restaurants.size() < numRestaurants) {
                    restaurants.add(r);
                }
            }
        }
        
        System.out.println("Final result: " + restaurants.size() + " restaurants after price fallback");
        return restaurants;
    }
    
    private List<Restaurant> getRestaurantsWithFilter(String location, String radius, Integer priceLevel, String cuisine, int numRestaurants, boolean openNow) throws JsonMappingException, JsonProcessingException {
        StringBuilder url = new StringBuilder(
            String.format("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=%s&radius=%s&type=restaurant", 
            location, radius)
        );

        if (openNow) {
            url.append("&opennow=true");
            System.out.println("Filtering for open restaurants only");
        } else {
            System.out.println("Getting all restaurants (no opennow filter)");
        }

        if (priceLevel != null) {
            url.append("&minprice=").append(priceLevel);
            url.append("&maxprice=").append(priceLevel);
        }

        if (cuisine != null && !cuisine.isEmpty()) {
            url.append("&keyword=").append(cuisine);
        }

        url.append("&key=").append(apiKey);

        System.out.println("Google Places API URL: " + url.toString());
        String response = restTemplate.getForObject(url.toString(), String.class);
        System.out.println("Google Places API Response: " + response);
        JsonNode root = objectMapper.readTree(response);
        JsonNode results = root.path("results");

        List<Restaurant> restaurants = objectMapper.convertValue(results, new TypeReference<List<Restaurant>>() {});
        Collections.shuffle(restaurants);

        if (restaurants.isEmpty()) {
            return Collections.emptyList();
        }

        Set<String> seen = new HashSet<>();
        List<Restaurant> unique = new ArrayList<>();
        for (Restaurant restaurant : restaurants) {
            if (seen.add(restaurant.getName())) {
                unique.add(restaurant);
            }
            if (unique.size() == numRestaurants) {
                break;
            }
        }

        return unique;
    }

    private void getDetails(Restaurant restaurant) throws JsonProcessingException {
    String detailsUrl = String.format(
        "https://maps.googleapis.com/maps/api/place/details/json?fields=editorial_summary,website,formatted_phone_number,opening_hours&place_id=%s&key=%s", 
        restaurant.getID(), apiKey);

    String detailsResponse = restTemplate.getForObject(detailsUrl, String.class);
    JsonNode detailsRoot = objectMapper.readTree(detailsResponse);
    JsonNode detailsResult = detailsRoot.path("result");

    if (detailsResult.has("editorial_summary")) {
        restaurant.setOverview(detailsResult.path("editorial_summary").path("overview").asText());
    }
    if (detailsResult.has("website")) {
        restaurant.setWebsite(detailsResult.path("website").asText());
    }
    if (detailsResult.has("formatted_phone_number")) {
        restaurant.setPhone(detailsResult.path("formatted_phone_number").asText());
    }
    if (detailsResult.has("opening_hours")) {
        JsonNode openingHoursNode = detailsResult.path("opening_hours");
        Restaurant.OpeningHours openingHours = new Restaurant.OpeningHours();
        if (openingHoursNode.has("open_now")) {
            openingHours.setOpenNow(openingHoursNode.path("open_now").asBoolean());
        }
        restaurant.setOpeningHours(openingHours);
    }
    }    

    //For Location search
    public String getPlaceDetails(String placeId) {
        String url = String.format(
            "https://maps.googleapis.com/maps/api/place/details/json?place_id=%s&key=%s", 
            placeId, apiKey);
            
            System.out.println("Place ID:" + placeId);
    
        return restTemplate.getForObject(url, String.class);
    }

}
