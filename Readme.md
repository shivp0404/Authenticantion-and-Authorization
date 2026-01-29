# Authentication & Authorization Service

A secure and scalable authentication service built with **Node.js**, **Express**, and **MongoDB**, implementing JWT-based authentication, role-based access control, and production-grade security practices.

---

## Overview

This project demonstrates a complete authentication and authorization system with clean architecture, comprehensive security measures, and real-world implementation patterns. Built with separation of concerns using Controller-Service-Repository pattern, it includes proper error handling, logging, and extensive test coverage.

---

## Core Features

### Authentication System
- **User Registration** - Secure account creation with input validation
- **User Login** - Credential verification with JWT token generation
- **Logout** - Token invalidation and session cleanup
- **Token Refresh** - Seamless session extension with refresh tokens
- **Get User Profile** - Retrieve authenticated user information
- **Get All Users** - Fetch user list (with authorization checks)

### Password Management
- **Update Password** - Authenticated password change
- **Forgot Password** - Request password reset token
- **Reset Password** - Token-based password reset with expiry

### Security & Middleware
- **Authentication Middleware** - JWT token verification
- **Authorization Middleware** - Role-based access control
- **Logger Middleware** - HTTP request/response logging
- **Centralized Error Handling** - Consistent error responses

---

## Tech Stack

**Backend:** Node.js, Express.js  
**Database:** MongoDB with Mongoose ODM  
**Authentication:** JWT (jsonwebtoken)  
**Security:** bcrypt for password hashing  
**Testing:** Jest, Supertest  
**Environment:** dotenv  

---

## Installation

```bash
# Clone repository
git clone https://github.com/shivp0404/Authenticantion-and-Authorization.git


# Install dependencies
npm install

# Create .env file with required variables
PORT=3000
DB_Link = ""
DB_Test_Link =""
AccessTokenSecret=""
RefreshTokenSecret=""
JWT_SECRET=""
RESET_PASSWORD_SECRET=""


# Start server
npm run dev

# Run tests
npm run test
```

---

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| POST | `/auth/logout` | Logout user | Yes |
| POST | `/auth/refresh` | Refresh access token | Yes (Cookie) |

### Password Management Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/forgotPassword` | Request password reset | No |
| POST | `/auth/reset-Password/:token` | Reset password with token | No |
| PUT | `/auth/updatePassword` | Update password | Yes |

### User Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/user/profile` | Get logged-in user profile | Yes |
| GET | `/user/alluser` | Get all users | Yes (Admin) |

---

## Architecture

### Layered Architecture Pattern

```
Routes (API Layer)
    ↓
Controllers (Request Handling)
    ↓
Services (Business Logic)
    ↓
Repositories (Data Access)
    ↓
Database (MongoDB)
```

**Benefits:**
- Clear separation of concerns
- Easy to test and maintain
- Scalable and modular
- Each layer has single responsibility

---

## Security Implementation

### Password Security
- Passwords hashed with **bcrypt** (10 salt rounds)
- Never stored in plain text
- Password validation before hashing

### Token Management
- **Access Tokens**: Short-lived (50m minutes), used for API requests
- **Refresh Tokens**: Long-lived (1hr), stored as HTTP-only cookies
- Refresh tokens hashed before database storage
- Token invalidation on logout

### Middleware Protection
- JWT verification on protected routes
- Role-based access control for admin routes
- Request validation and sanitization

### Additional Security
- HTTP-only cookies prevent XSS attacks
- Secure cookie configuration for production
- Environment variables for sensitive data
- Centralized error handling (no info leakage)

---

## Middleware Implementation

### 1. Authentication Middleware
Verifies JWT access token from request headers and attaches user info to request object.

### 2. Authorization Middleware
Checks user roles/permissions for protected resources.

### 3. Logger Middleware
Logs all HTTP requests with timestamp, method, URL, and response time.

### 4. Error Handler Middleware
Catches all errors, formats consistent responses, and prevents stack trace exposure.

---

## Project Structure

```
├── app.js                      # Express app setup
├── server.js                   # Server entry point
├── config/
│   └── db.js                   # Database connection
└── src/
    ├── middleware/
    │   ├── authmiddleware.js
    │   ├── logger.js
    │   ├── Authorization.js
    │   └── errorHandler.js
    ├── routes/
    │   ├── authRoutes.js
    │   └── userRoutes.js
    ├── utils/
    │   ├── bcrypt.js
    │   └── jwt.js
    └── model/
        ├── auth/
        │   ├── user.schema.js
        │   ├── user.repositories.js
        │   ├── auth.services.js
        │   ├── auth.controllers.js
        │   └── authtest/
        └── userprofile/
            ├── profile.controllers.js
            ├── profile.services.js
            └── profile.repositories.js
```

---

## Testing

Comprehensive test coverage including:

- **Unit Tests**: Service and controller logic testing
- **Integration Tests**: Complete API flow testing with real database
- **Middleware Tests**: Authentication and error handling verification

```bash
# Run all tests
npm run test

```

---

## Key Learnings & Implementation

✅ **Clean Architecture** - Proper separation of concerns across layers  
✅ **Security Best Practices** - Bcrypt hashing, JWT tokens, HTTP-only cookies  
✅ **Error Handling** - Centralized error management with custom error classes  
✅ **Middleware Pattern** - Reusable authentication, authorization, and logging  
✅ **Testing** - Unit and integration tests for reliability  
✅ **Repository Pattern** - Database abstraction for maintainability  

---

## Environment Variables

```env
PORT=3000
DB_Link = ""
DB_Test_Link =""
AccessTokenSecret=""
RefreshTokenSecret="
JWT_SECRET=""
RESET_PASSWORD_SECRET="your_reset_secret_ke"

```

---

## Author

**Shivansh Patel**  
Backend Developer

---

## License

This project is licensed under the MIT License.
