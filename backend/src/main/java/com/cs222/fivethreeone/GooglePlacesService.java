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

    public RestaurantSearchResponse getRandomRestaurants(String location, String radius, Integer minPrice, Integer maxPrice, String cuisine, int numRestaurants, boolean openNow) throws JsonMappingException, JsonProcessingException {

        List<Restaurant> restaurants = new ArrayList<>();

        // Simply get restaurants with or without the open now filter
        restaurants = getRestaurantsWithFilter(location, radius, minPrice, maxPrice, cuisine, numRestaurants, openNow);

        // Get details for all restaurants
        for (Restaurant r : restaurants) {
            getDetails(r);
        }

        return new RestaurantSearchResponse(restaurants, false, "");
    }

    private List<Restaurant> getRestaurantsWithFilter(String location, String radius, Integer minPrice, Integer maxPrice, String cuisine, int numRestaurants, boolean openNow) throws JsonMappingException, JsonProcessingException {
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

        if (minPrice != null && maxPrice != null) {
            url.append("&minprice=").append(minPrice);
            url.append("&maxprice=").append(maxPrice);
            System.out.println("Price range: " + minPrice + " to " + maxPrice);
        }

        if (cuisine != null && !cuisine.isEmpty()) {
            url.append("&keyword=").append(cuisine);
        }

        url.append("&key=").append(apiKey);

        // Log URL without exposing API key
        String logUrl = url.toString().replaceAll("key=[^&]*", "key=***REDACTED***");
        System.out.println("Google Places API URL: " + logUrl);
        String response = restTemplate.getForObject(url.toString(), String.class);
        // Don't log full response as it may contain sensitive data
        System.out.println("Google Places API call completed successfully");
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
        "https://maps.googleapis.com/maps/api/place/details/json?fields=editorial_summary,website,formatted_phone_number,opening_hours,photos&place_id=%s&key=%s",
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
        // Get existing opening hours or create new one
        Restaurant.OpeningHours openingHours = restaurant.getOpeningHours();
        if (openingHours == null) {
            openingHours = new Restaurant.OpeningHours();
        }

        // Only update open_now if it's present in the details response
        if (openingHoursNode.has("open_now")) {
            openingHours.setOpenNow(openingHoursNode.path("open_now").asBoolean());
        }

        if (openingHoursNode.has("weekday_text")) {
            JsonNode weekdayTextNode = openingHoursNode.path("weekday_text");
            String[] weekdayText = new String[weekdayTextNode.size()];
            for (int i = 0; i < weekdayTextNode.size(); i++) {
                weekdayText[i] = weekdayTextNode.get(i).asText();
            }
            openingHours.setWeekdayText(weekdayText);
        }
        restaurant.setOpeningHours(openingHours);
    }
    if (detailsResult.has("photos")) {
        JsonNode photosNode = detailsResult.path("photos");
        if (photosNode.isArray() && photosNode.size() > 0) {
            String photoReference = photosNode.get(0).path("photo_reference").asText();
            String photoUrl = String.format(
                "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=%s&key=%s",
                photoReference, apiKey);
            restaurant.setPhotoUrl(photoUrl);
        }
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
