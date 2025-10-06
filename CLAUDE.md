# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **5-3-1 Restaurant Finder** - a decision-making app that helps users discover restaurants using a "5-3-1" selection process. Users filter by preferences (cuisine, price, location), get 5 restaurant options, narrow down to 3, then the app randomly selects 1 final choice.

**Tech Stack:**
- Backend: Spring Boot 3.3.4 (Java 21), Google Places API integration
- Frontend: React 19, Google Places Autocomplete
- Build: Maven (backend), npm (frontend)
- Testing: JUnit 5, JaCoCo for coverage

## Development Commands

### Backend (from `backend/` directory)
```bash
# Run the backend server (port 8081)
./mvnw spring-boot:run

# Run tests
./mvnw test

# Generate test coverage report (JaCoCo)
./mvnw test jacoco:report
# Coverage report: target/site/jacoco/index.html

# Build
./mvnw clean package
```

### Frontend (from `frontend/` directory)
```bash
# Install dependencies
npm install

# Run development server (port 3000)
npm start
# or
npm run dev

# Run tests
npm test

# Build for production
npm build
```

## Environment Setup

**Required:** Google Cloud API key with Places API and Maps JavaScript API enabled.

### Backend `.env` file
Create `backend/.env`:
```
GOOGLE_API_KEY=your_api_key_here
```

### Frontend `.env` file
Create `frontend/.env`:
```
REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
```

## Architecture

### Backend Structure (`backend/src/main/java/com/cs222/fivethreeone/`)

**Core Components:**
- `GooglePlacesController.java` - REST API endpoints at `/api/restaurants`
- `GooglePlacesService.java` - Business logic for Google Places API integration
- `Restaurant.java` - Main data model with Jackson JSON mappings
- `RestaurantSearchResponse.java` - Response wrapper with price fallback info

**Key Endpoints:**
- `GET /api/restaurants/random` - Main endpoint for filtered restaurant search with smart price fallback
- `GET /api/restaurants/google-places?placeId=...` - Get detailed place info
- `POST /api/restaurants/select` - Random selection from 3 user choices

**Configuration:**
- `AppConfig.java` - Bean configurations (RestTemplate)
- `WebConfig.java` - CORS configuration for local development
- `application.properties` - Server runs on port 8081

### Frontend Structure (`frontend/src/components/`)

**Main Components:**
- `App.js` - Router setup and navigation
- `Start.js` - Main filter/selection flow (the "5-3-1" process)
- `LocationSearch.js` - Google Places Autocomplete integration
- `CurrentLocationButton.js` - Geolocation functionality
- `FilterRestaurantCard.js` - Selectable restaurant cards (for 5→3 selection)
- `RestaurantCard.js` - Display-only restaurant cards
- `Restaurants.js` - Static list of popular UIUC restaurants
- `api.js` - Axios configuration for backend calls

### Important Backend Logic

**Price Fallback System** (`GooglePlacesService.java`):
When insufficient restaurants at requested price level, automatically searches ±1 price level to ensure enough results. The response includes `priceFallbackUsed` and `fallbackMessage` to inform users.

**Open Now Filter**: The `openNow` parameter controls whether to show only currently open restaurants. When false, combines both open and closed results.

**Restaurant Details**: The service makes separate API calls to fetch detailed info (overview, website, phone, opening hours) for each restaurant using Place Details API.

### Testing

**Backend Tests** (`backend/src/test/`):
- `GooglePlacesServiceTests.java` - Service layer tests with mocked API responses
- `GooglePlacesControllerTest.java` - Controller endpoint tests
- `RestTemplateBean.java` - Test configuration for RestTemplate

Tests use JUnit 5 and mock Google Places API responses to avoid API costs during testing.

## Package Structure

- `com.cs222.fivethreeone` - Base package for all Java code
- Main application entry: `FivethreeoneApplication.java`

## Docker Support

Dockerfiles exist for both frontend and backend in their respective directories for containerized deployment.
