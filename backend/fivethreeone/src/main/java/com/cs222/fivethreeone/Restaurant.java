package com.cs222.fivethreeone;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;


@JsonIgnoreProperties(ignoreUnknown = true) // Ignore any fields not in this class
public class Restaurant {
    private String name;

    private String distance;

    @JsonProperty("vicinity") // Map JSON field "vicinity" to "address"
    private String address;

    @JsonProperty("price_level") 
    private Integer priceLevel;

    private String cuisine;

    private Double rating; 

    @JsonProperty("user_ratings_total")
    private Integer numRatings;

    @JsonProperty("opening_hours") 
    private OpeningHours openingHours;

    @JsonProperty("icon") 
    private String iconUrl;

    public static class OpeningHours {
        @JsonProperty("open_now")
        private Boolean openNow;

        public Boolean getOpenNow() {
            return openNow;
        }

        public void setOpenNow(Boolean openNow) {
            this.openNow = openNow;
        }
    }


    public Restaurant(String name, String distance, String address, Integer priceLevel, String cuisine) { //String businessStatus) {
        this.name = name;
        this.distance = distance;
        this.address = address;
        this.priceLevel = priceLevel;
        this.cuisine = cuisine;
        
    }

    public Restaurant(String name, String distance, String address) { //String businessStatus) {
        this.name = name;
        this.distance = distance;
        this.address = address;
        this.priceLevel = null;
        this.cuisine = null;
        //this.businessStatus = businessStatus;
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

    public Integer getPriceLevel() {
        return priceLevel;
    }
    public void setPriceLevel(Integer priceLevel) {
        this.priceLevel = priceLevel;
    }

    public String getCuisine() {
        return cuisine;
    }
    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Integer numRatings() {
        return numRatings;
    }

    public void numRatings(Integer numRatings) {
        this.numRatings = numRatings;
    }

    public String getIconUrl() {
        return iconUrl;
    }

    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }

    public OpeningHours getOpeningHours() {
        return openingHours;
    }

    public void setOpeningHours(OpeningHours openingHours) {
        this.openingHours = openingHours;
    }

    // Assuming you need to access openNow:
    public Boolean isOpenNow() {
        return this.openingHours != null ? openingHours.getOpenNow() : null;
    }
}