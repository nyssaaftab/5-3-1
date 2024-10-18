package com.cs222.fivethreeone;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import java.util.List;


@RestController
public class GooglePlacesController {
    private final GooglePlacesService googlePlacesService;

    public GooglePlacesController(GooglePlacesService googlePlacesService) {
        this.googlePlacesService = googlePlacesService;
    }

    @GetMapping("/api/places")
    public List<Restaurant> getPlaces(@RequestParam String location, @RequestParam String radius) throws JsonMappingException, JsonProcessingException {
        return googlePlacesService.getPlaces(location, radius);
    }

    @GetMapping("/api/random-places")
    public List<Restaurant> getRandomPlaces(@RequestParam String location, @RequestParam String radius, @RequestParam int numRestaurants) throws JsonMappingException, JsonProcessingException {
        return googlePlacesService.getRandomPlaces(location, radius, numRestaurants);
    }
}
