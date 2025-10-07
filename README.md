# 5-3-1 Restaurant Finder

A decision-making app that helps users find restaurants when they can't decide, using a "5-3-1" selection process.

## Features

- **Smart Restaurant Filtering**: Find restaurants by cuisine, price level, and location
- **Open Now Filter**: Option to show only currently open restaurants
- **Price Fallback**: Automatically expands search to nearby price levels if not enough options found
- **Google Places Integration**: Real-time restaurant data and location search
- **5-3-1 Selection Process**: Users select 5 restaurants, narrow to 3, then get 1 random choice

## Tech Stack

- **Frontend**: React, Google Places Autocomplete, Axios
- **Backend**: Spring Boot, Google Places API
- **Deployment**: Docker-ready

## Getting Started

### Prerequisites

- Java 21+
- Node.js 16+
- Google Cloud API key with Places API enabled

### Backend Setup

1. Create `backend/.env` with your Google API key:
   ```
   GOOGLE_API_KEY=your_api_key_here
   ```

2. Run the backend:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

### Frontend Setup

1. Create `frontend/.env` with your Google API key:
   ```
   REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

2. Install dependencies and start:
   ```bash
   cd frontend
   npm install
   npm start
   ```

## API Endpoints

- `GET /api/restaurants/random` - Get random restaurants with filters
- `GET /api/restaurants/google-places` - Get place details by ID
- `POST /api/restaurants/select` - Select final restaurant from choices

Project adapted from CS222 Team project with Nancy Wang, Elaina Xiao, and Nat Gao. Frontend rebuilt using Claude Code. 


