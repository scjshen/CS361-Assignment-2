
# Microservice A: comment notification Microservice

## Overview
This microservice provides a RESTful API for posting comments on a microblog and notifying relevant users (post owner and previous commenters). The backend is built using Node.js and MongoDB. The microservice listens for incoming HTTP requests containing comment data, processes the data, saves it to the database, and triggers notifications.

API Documentation

Install Dependecies
```bash
npm install express body-parser mongoose
```

Endpoint: Post a Comment
POST /comments
This endpoint accepts a POST request to create a new comment on a post and notify the relevant users.
* Request:
```bash
GET http://localhost:3000/notifications
```
```python
* {
  "postId": 1,
  "commentId": 101,
  "commenterId": 3,
  "postOwnerId": 1,
  "previousCommenters": [2, 4],
  "content": "Welcome to the first post!"
}
* Response (Failure):
{
  "error": "Invalid comment data"
}
```

## Communication Contract
* Here are the details for interacting with Microservice A:
* Request Method: GET
* Endpoint: /comments
* Request Parameter: The body must contain the postId, commentId, commenterId, postOwnerId, previousCommenters (array of previous commenters' IDs), and content (the comment text).
* Response Data:
    * Success: Returns a success message with status 200.
    * Failure: If the request is missing any required data or contains invalid data, a failure message with status 400 is returned.

Request Method: GET
* URL: /notification

Request Example:
```bash
GET http://localhost:3000/notification
```
Request Parameters:
* The body must contain the postId, commentId, commenterId, postOwnerId, previousCommenters (array of previous commenters' IDs), and content (the comment text).


Response
* Success Response:
json
```python
{
  "message": "Notifications created"
}
```
* Failure Response:
If the user with the provided ID is not found:
json
```python
{
  "error": "Invalid comment data"
}
```
HTTP Status Code: 404 Not Found


#Running the Microservice
To run the Comment Notification Microservice:

Make sure MongoDB is installed and running.
In your terminal, navigate to the project directory.
Start the server:
```bash
node server.js
```
The server will start listening on http://localhost:3000.






