
Microservice A: transaction notification API

Overview
This microservice provides a RESTful API for retrieving a user's account balance and transaction history based on their unique username. The backend is built using Node.js and MongoDB. The microservice listens for incoming HTTP requests, fetches the user's balance and transactions from the database, and responds with the appropriate data.

API Documentation
Endpoint: Get User Balance and Transactions


Example API Request and Response
* Request:

GET http://localhost:3000/users/chengjie/balance

* Response (Success):
{
  "success": true,
  "balance": 1350
}
* Response (Failure):
{
  "success": false,
  "message": "User not found."
}


Communication Contract
Here are the details for interacting with Microservice A:
* Request Method: GET
* Endpoint: /users/:username/balance
* Request Parameter: username – The unique user identifier (string).
* Response Data:
    * Success: Returns the username, balance, and transactions associated with the user.
    * Failure: If the user is not found, returns a failure message with a 404 status code.

Request Method: GET
* URL: /users/:username/transactions

Request Example:
GET http://localhost:3000/users/chengjie/transactions

Request Parameters:
* username – The unique username of the user (e.g., chengjie).


Response
* Success Response:
json
{
    "username": "chengjie",
    "transactions": [
        {
            "date": "Fri Nov 01 2024 08:00:00 GMT+0800 (China Standard Time)",
            "description": "Grocery",
            "amount": -50,
            "_id": "673b0d7c111848ebf9a51655"
        },
        {
            "date": "Sun Nov 03 2024 08:00:00 GMT+0800 (China Standard Time)",
            "description": "Salary",
            "amount": 1500,
            "_id": "673b0d7c111848ebf9a51656"
        },
        {
            "date": "Tue Nov 05 2024 08:00:00 GMT+0800 (China Standard Time)",
            "description": "Utilities",
            "amount": -100,
            "_id": "673b0d7c111848ebf9a51657"
        }
    ]
}

* Failure Response:
If the user with the provided ID is not found:
json
{
    "message": "User not found"
}
HTTP Status Code: 404 Not Found

UML Sequence Diagram
Here is the UML sequence diagram that illustrates how the request and response cycle works between the client, the microservice, and the database.

Client Application ---> [Microservice A] ---> [Database]
     |                       |                    |
   GET /users/:username/balance |                    |
     |                       V                    |
     |            Query database for balance       |
     |                       |                    |
     |                       |<-------------------|
     |                       |   Balance Data     |
     |                       |   and Transactions |
     |<----------------------|                    |
     |         Response      |                    |
     |    (Balance + Trans)  |                    |
