package com.cs222.fivethreeone;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true) // Ignore any fields not in this class
public class Restaurant {
    private String name;
    private String distance;
    private String address;
    private String priceLevel;
    private String cuisine;

    @JsonProperty("business_status") // Map the JSON field to this variable
    private String businessStatus;

    public Restaurant(String name, String distance, String address, String priceLevel, String cuisine, String businessStatus) {
        this.name = name;
        this.distance = distance;
        this.address = address;
        this.priceLevel = priceLevel;
        this.cuisine = cuisine;
        this.businessStatus = businessStatus;
    }

    public Restaurant() {
    }

    // Getters and Setters
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getBusinessStatus() { 
        return businessStatus; 
    }

    public void setBusinessStatus(String businessStatus) { 
        this.businessStatus = businessStatus; 
    }

    public String getDistance() {
        return distance;
    }
    public void setDistance(String distance) {
        this.distance = distance;
    }

    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }

    public String getPriceLevel() {
        return priceLevel;
    }
    public void setPriceLevel(String priceLevel) {
        this.priceLevel = priceLevel;
    }

    public String getCuisine() {
        return cuisine;
    }
    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }
}