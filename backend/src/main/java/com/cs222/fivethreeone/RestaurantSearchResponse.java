package com.cs222.fivethreeone;

import java.util.List;

public class RestaurantSearchResponse {
    private List<Restaurant> restaurants;
    private boolean priceFallbackUsed;
    private String fallbackMessage;
    
    public RestaurantSearchResponse(List<Restaurant> restaurants, boolean priceFallbackUsed, String fallbackMessage) {
        this.restaurants = restaurants;
        this.priceFallbackUsed = priceFallbackUsed;
        this.fallbackMessage = fallbackMessage;
    }
    
    // Getters and setters
    public List<Restaurant> getRestaurants() {
        return restaurants;
    }
    
    public void setRestaurants(List<Restaurant> restaurants) {
        this.restaurants = restaurants;
    }
    
    public boolean isPriceFallbackUsed() {
        return priceFallbackUsed;
    }
    
    public void setPriceFallbackUsed(boolean priceFallbackUsed) {
        this.priceFallbackUsed = priceFallbackUsed;
    }
    
    public String getFallbackMessage() {
        return fallbackMessage;
    }
    
    public void setFallbackMessage(String fallbackMessage) {
        this.fallbackMessage = fallbackMessage;
    }
}
