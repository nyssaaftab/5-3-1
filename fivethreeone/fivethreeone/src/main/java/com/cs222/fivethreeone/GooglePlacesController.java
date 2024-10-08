package com.cs222.fivethreeone;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GooglePlacesController {
    private final GooglePlacesService placesService;

    public GooglePlacesController(GooglePlacesService placesService) {
        this.placesService = placesService;
    }

    @GetMapping("/api/places")
    public String getPlaces(@RequestParam String location, @RequestParam String radius) {
        return placesService.getPlaces(location, radius);
    }
}
