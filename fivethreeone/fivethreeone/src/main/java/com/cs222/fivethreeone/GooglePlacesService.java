package com.cs222.fivethreeone;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GooglePlacesService {
    @Value("${google.places.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public GooglePlacesService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getPlaces(String location, String radius) {
        String url = String.format(
            "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=%s&radius=%s&key=%s",
            location, radius, apiKey);
        return restTemplate.getForObject(url, String.class);
    }

}
