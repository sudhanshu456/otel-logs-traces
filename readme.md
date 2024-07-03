# OpenTelemetry Logs correlation demo

This document outlines the available API endpoints for the User Service and Shopping Cart Service. It includes detailed descriptions of each endpoint, example payloads, and how to invoke them using cURL.

## User Service

The User Service manages user information and processes orders by interacting with the Shopping Cart Service.

### Endpoints

#### Retrieve User Information

- **GET** `/user/:id`
- **Description:** Fetches information for a specific user by ID.
- **cURL Example:**
  ```bash
  curl -X GET http://localhost:3000/user/u123
  ```

#### Place an Order

- **POST** `/user/:id/order`
- **Description:** Places an order for a user with the specified product IDs.
- **Payload:**
  ```json
  {
    "productIds": ["p123", "p456"]
  }
  ```
- **cURL Example:**
  ```bash
  curl -X POST http://localhost:3000/user/u123/order \
       -H "Content-Type: application/json" \
       -d '{"productIds": ["p123", "p456"]}'
  ```

## Shopping Cart Service

The Shopping Cart Service handles operations related to the shopping cart and ordering processes.

### Endpoints

#### View Cart

- **GET** `/cart/:userId`
- **Description:** Retrieves the shopping cart for the specified user.
- **cURL Example:**
  ```bash
  curl -X GET http://localhost:3001/cart/u123
  ```

#### Add Item to Cart

- **POST** `/cart/:userId/items`
- **Description:** Adds a new item to the user's shopping cart.
- **Payload:**
  ```json
  {
    "productId": "p123",
    "quantity": 2
  }
  ```
- **cURL Example:**
  ```bash
  curl -X POST http://localhost:3001/cart/u123/items \
       -H "Content-Type: application/json" \
       -d '{"productId": "p123", "quantity": 2}'
  ```

#### Place an Order

- **POST** `/cart/order`
- **Description:** Places an order for the user with the specified array of product IDs.
- **Payload:**
  ```json
  {
    "userId": "u123",
    "productIds": ["p123", "p456"]
  }
  ```
- **Response:** Indicates success or failure of the order placement.
- **cURL Example:**
  ```bash
  curl -X POST http://localhost:3001/cart/order \
       -H "Content-Type: application/json" \
       -d '{"userId": "u123", "productIds": ["p123", "p456"]}'
  ```
