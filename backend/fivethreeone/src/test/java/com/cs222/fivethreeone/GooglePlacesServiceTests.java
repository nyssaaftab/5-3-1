package com.cs222.fivethreeone;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.client.RestTemplate;

import java.util.List;


public class GooglePlacesServiceTests {
    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private GooglePlacesService googlePlacesService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    @Test
    void testGetPlacesWithValidResponse() throws Exception {
        String location = "40.712776,-74.005974";
        String radius = "1500";
        String jsonResponse = "{ \"results\": [{ \"name\": \"Restaurant 1\" }, { \"name\": \"Restaurant 2\" }] }";

        when(restTemplate.getForObject(anyString(), eq(String.class))).thenReturn(jsonResponse);

        List<Restaurant> restaurants = googlePlacesService.getPlaces(location, radius);

        assertEquals(2, restaurants.size());
        assertEquals("Restaurant 1", restaurants.get(0).getName());
    }

    @Test
    void testGetPlacesWithEmptyResults() throws Exception {
        String location = "40.712776,-74.005974";
        String radius = "1500";
        String jsonResponse = "{ \"results\": [] }";

        when(restTemplate.getForObject(anyString(), eq(String.class))).thenReturn(jsonResponse);

        List<Restaurant> restaurants = googlePlacesService.getPlaces(location, radius);

        assertTrue(restaurants.isEmpty());
    }

    @Test
    void testGetRandomRestaurantsWithValidResponse() throws Exception {
        String location = "40.712776,-74.005974";
        String radius = "1500";
        int numRestaurants = 5;
        String jsonResponse = "{ \"results\": ["
                + "{ \"name\": \"Restaurant 1\" },"
                + "{ \"name\": \"Restaurant 2\" },"
                + "{ \"name\": \"Restaurant 3\" },"
                + "{ \"name\": \"Restaurant 4\" },"
                + "{ \"name\": \"Restaurant 5\" },"
                + "{ \"name\": \"Restaurant 6\" }"
                + "] }";

        when(restTemplate.getForObject(anyString(), eq(String.class))).thenReturn(jsonResponse);

        List<Restaurant> restaurants = googlePlacesService.getRandomRestaurants(location, radius, null, null, numRestaurants);

        assertEquals(numRestaurants, restaurants.size()); // Ensure it returns 5 restaurants
    }




    
}
