package com.cs222.fivethreeone;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

public class Restaurant {
    private String name;
    private String distance;
    private String address;

    public Restaurant(String name, String distance, String address) {
        this.anme = name;
        this.distance = distance;
        this.address = address;
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

}
