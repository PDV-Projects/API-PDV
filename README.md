# API-PDV

[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/PDV-Projects/API-PDV)

This repository contains the backend API for a Point of Sale (PDV) system, built with the NestJS framework. It provides core functionalities for user authentication, product management, and sales processing.

## Features

-   **User Authentication**: Secure user sign-in using JWT (JSON Web Tokens). Includes access and refresh token generation and validation.
-   **User Management**: Services for finding and managing user data.
-   **API Documentation**: Integrated Swagger UI for easy endpoint exploration and testing.
-   **Modular Architecture**: Organized into distinct modules for authentication, users, cart, and cash register functionalities.

## Technologies

-   **Backend**: [NestJS](https://nestjs.com/)
-   **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Authentication**: [JWT (JSON Web Tokens)](https://jwt.io/)
-   **API Specification**: [Swagger (OpenAPI)](https://swagger.io/)

## Getting Started

### Prerequisites

-   Node.js (v20 or higher recommended)
-   pnpm (or your preferred package manager)
-   A running MongoDB instance

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/pdv-projects/api-pdv.git
    cd api-pdv
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables.

    ```env
    # Application Port
    PORT=3000

    # MongoDB Connection
    DATABASE_URL=localhost:27017
    DATABASE_NAME=pdv_api

    # JWT Secrets
    JWT_SECRET=your_super_secret_key
    JWT_EXPIRES_IN=1d
    REFRESH_TOKEN_SECRET=your_super_secret_refresh_key
    ```

## Running the Application

-   **Development Mode (with auto-reload):**
    ```bash
    pnpm run dev
    ```

-   **Production Mode:**
    ```bash
    # Build the project first
    pnpm run build

    # Start the application
    pnpm run start:prod
    ```

## Running Tests

-   **Unit Tests:**
    ```bash
    pnpm run test
    ```

-   **End-to-End (E2E) Tests:**
    ```bash
    pnpm run test:e2e
    ```

-   **Test Coverage:**
    ```bash
    pnpm run test:cov
    ```

## API Documentation

Once the application is running, you can access the Swagger UI for interactive API documentation at:

[http://localhost:3000/api](http://localhost:3000/api)

## API Endpoints

### Authentication (`/auth`)

-   `POST /auth/login`: Authenticates a user and returns an access token and an optional refresh token.
    -   **Body:**
        ```json
        {
          "username": "user@example.com",
          "password": "yourpassword",
          "refresh": true
        }
        ```
-   `POST /auth/refresh`: Generates a new set of tokens using a valid refresh token.
    -   **Body:**
        ```json
        {
          "refreshToken": "your_refresh_token"
        }
        ```
-   `GET /auth/profile`: (Protected) Returns the profile of the currently authenticated user.
-   `GET /auth/validateToken`: (Protected) A simple endpoint to validate if the provided access token is valid. Returns `200 OK` on success.

## Project Structure

The project follows a modular structure, keeping code organized and scalable.

```
src/
├── common/             # Shared components like Guards, Pipes, Middleware
├── database/           # Mongoose schemas
├── modules/            # Core application features (auth, users, cart, etc.)
│   ├── auth/
│   ├── cart/
│   ├── cash-register/
│   └── users/
└── utils/              # Utility functions and constants