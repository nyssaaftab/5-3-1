# Team-5-3-1

# Introduction

What is the 5-3-1 restaurant picker? 

Our website 5-3-1 helps users find and choose restaurants. Given a location, search radius, and restaurant-specific parameters, 5-3-1 randomly generates 5 restaurants. Users are prompted to select 3 restaurants. 5-3-1 then randomly picks 1 restaurant

For more details, view the full project proposal [here](https://docs.google.com/document/d/1jMbYF-eEGSsqXW_8F-txWdptcNTEeNfXWTZL4NA-CbA/edit?usp=sharing).

# Technical Architecture 

## Backend 
![Technical Architecture Drawing](https://github.com/CS222-UIUC/Team-5-3-1/blob/new-branch/back.png)

## Frontend
![Technical Architecture Drawing](https://github.com/CS222-UIUC/Team-5-3-1/blob/new-branch/front.png)

# Developers

Nyssa Aftab - Backend: setting up API key and cloud console, set up docker environment, developing and testing API

Nat Gao - 

Nancy Wang - Worked on setting up backend environment, basic backend functionality and testing, syncing frontend and backend, and location functionality

Elaina Xiao - Worked on frontend pages, restaurant cards, filtering with backend, and syncing frontend and backend

# Environment Setup
## Backend

Set up API as environment variable

Navigate to your source directory run the following command

cd backend

cd fivethreeone

./mvnw clean 

in backend directory run:

docker build -t backend-springboot .

docker run -d -p 8081:8080 backend-springboot

when done run: 

docker stop 3e56942ba023

## Frontend

To start frontend navigate to your source directory and run

cd frontend

npm install if not installed already

npm start
