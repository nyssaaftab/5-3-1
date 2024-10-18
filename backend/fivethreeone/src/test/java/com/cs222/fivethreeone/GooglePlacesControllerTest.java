package com.cs222.fivethreeone;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.util.Collections;


@WebMvcTest(GooglePlacesController.class)
public class GooglePlacesControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GooglePlacesService googlePlacesService;  // Mock the service layer
    
    @Test
    public void testGetNearbyRestaurantsBadRequest() throws Exception {
    mockMvc.perform(get("/api/places"))
            .andExpect(status().isBadRequest());
    }

    @Test
    public void testGetNearbyRestaurantsNoResults() throws Exception {
        when(googlePlacesService.getPlaces(anyString(), anyString())).thenReturn(Collections.emptyList());
    
        mockMvc.perform(get("/api/places")
            .param("location", "40.730610,-73.935242")
            .param("radius", "1500"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isEmpty());
    }

    
}
