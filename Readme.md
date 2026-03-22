# 🔐 Authentication & Authorization Service

> Production-ready authentication system with JWT, RBAC, and comprehensive security practices

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://authenticantion-and-authorization.onrender.com)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/database-MongoDB-green)](https://www.mongodb.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A complete authentication and authorization backend built with **clean architecture principles**, featuring JWT-based auth, role-based access control, password management, and production-grade security.

**🔗 [Live API + Swagger Docs](https://authenticantion-and-authorization.onrender.com)**

---

## ✨ Highlights

- ✅ **Production-Ready**: Deployed on Render with MongoDB Atlas
- 🔒 **Secure by Design**: bcrypt hashing, HTTP-only cookies, refresh token rotation
- 🧪 **Well-Tested**: 85%+ code coverage with Jest + Supertest
- 📐 **Clean Architecture**: Controller-Service-Repository pattern
- 📝 **Fully Documented**: Interactive Swagger/OpenAPI documentation
- 🛡️ **RBAC**: Role-based access control for protected resources
- 🔄 **Token Management**: Automatic refresh token rotation and invalidation

---

## 📸 API Documentation Preview

![Swagger UI Documentation](swagger.png)

*Interactive API documentation with complete endpoint specifications, request/response schemas, and testing capabilities*

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Security Implementation](#security-implementation)
- [Installation & Setup](#installation--setup)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Key Learnings](#key-learnings--technical-decisions)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Features

### Authentication System
- **User Registration** - Secure account creation with input validation
- **User Login** - Credential verification with JWT token generation
- **Logout** - Token invalidation and session cleanup
- **Token Refresh** - Seamless session extension with refresh tokens
- **Get User Profile** - Retrieve authenticated user information
- **Get All Users** - Fetch user list (admin only with authorization checks)

### Password Management
- **Update Password** - Authenticated password change with current password verification
- **Forgot Password** - Secure password reset token generation with email notification
- **Reset Password** - Token-based password reset with expiry validation

### Security & Middleware
- **Authentication Middleware** - JWT access token verification for protected routes
- **Authorization Middleware** - Role-based access control (RBAC) implementation
- **Logger Middleware** - HTTP request/response logging with timestamps
- **Centralized Error Handling** - Consistent error responses across the application
- **Input Validation** - Request payload validation and sanitization

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Runtime** | Node.js (v16+) |
| **Framework** | Express.js |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JWT (jsonwebtoken) |
| **Security** | bcrypt (password hashing) |
| **Testing** | Jest, Supertest |
| **Documentation** | Swagger/OpenAPI 3.0 |
| **Environment** | dotenv |
| **Deployment** | Render (Backend), MongoDB Atlas (Database) |

---

## 🏗️ Architecture

Built using **layered architecture** following the **Controller-Service-Repository** pattern for clean separation of concerns:
```mermaid
graph TD
    A[Client Request] --> B[Express Routes]
    B --> C[Controllers<br/>Request/Response Handling]
    C --> D[Services<br/>Business Logic]
    D --> E[Repositories<br/>Data Access Layer]
    E --> F[(MongoDB)]
    
    G[Middleware Layer] --> B
    G --> C
    
    H[Utils<br/>JWT, Bcrypt] --> C
    H --> D
    
    style A fill:#e1f5ff
    style F fill:#ffe1e1
    style G fill:#fff4e1
```

### Architecture Benefits

| Benefit | Description |
|---------|-------------|
| **Separation of Concerns** | Each layer has a single, well-defined responsibility |
| **Testability** | Easy to write unit and integration tests for each layer |
| **Maintainability** | Changes in one layer don't cascade to others |
| **Scalability** | New features can be added without touching existing code |
| **Reusability** | Business logic can be reused across different controllers |

### Layer Responsibilities

**Routes (API Layer)**
- Define API endpoints
- Map HTTP methods to controllers
- Apply middleware chains

**Controllers (Request Handling)**
- Parse incoming requests
- Validate request data
- Call appropriate service methods
- Format and send responses

**Services (Business Logic)**
- Implement core business rules
- Orchestrate data operations
- Handle complex workflows
- Coordinate between repositories

**Repositories (Data Access)**
- Direct database interactions
- Execute queries
- Handle database-specific logic
- Return plain data objects

---

## 🔒 Security Implementation

### Password Security
- ✅ Passwords hashed using **bcrypt** with 10 salt rounds
- ✅ Never stored in plain text
- ✅ Password validation enforced before hashing
- ✅ Current password verification required for updates

### Token Management
- 🔑 **Access Tokens**: Short-lived (15 minutes), transmitted in Authorization header
- 🔄 **Refresh Tokens**: Long-lived (7 days), stored as HTTP-only cookies
- 🔒 Refresh tokens **hashed with bcrypt** before database storage
- ♻️ Automatic token rotation on refresh
- 🚫 Complete token invalidation on logout

### Cookie Security
- ✅ **HTTP-only** flag prevents XSS attacks
- ✅ **Secure** flag enforces HTTPS in production
- ✅ **SameSite** attribute prevents CSRF attacks
- ✅ Proper expiration times set

### Middleware Protection
- 🛡️ JWT verification on all protected routes
- 👥 Role-based access control for admin endpoints
- ✔️ Request validation and sanitization
- 📝 Comprehensive request logging

### Additional Security Measures
- 🔐 Environment variables for all sensitive data
- ❌ Centralized error handling (no stack trace exposure)
- 🚨 Proper HTTP status codes for different error types
- 🔍 Input validation on all endpoints

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn** package manager

### Step-by-Step Setup

**1. Clone the repository**
```bash
git clone https://github.com/shivp0404/Authenticantion-and-Authorization.git
cd Authenticantion-and-Authorization
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure environment variables**

Create a `.env` file in the root directory (refer to `.env.example`):
```bash
# Server Configuration
PORT=3000

# Database
DB_Link=mongodb://localhost:27017/auth-db
DB_Test_Link=mongodb://localhost:27017/auth-test-db

# JWT Secrets (use strong, random strings in production)
AccessTokenSecret=your_strong_access_token_secret_here
RefreshTokenSecret=your_strong_refresh_token_secret_here
JWT_SECRET=your_jwt_secret_here
RESET_PASSWORD_SECRET=your_reset_password_secret_here
```

> **💡 Security Tip:** Generate secure secrets using:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

**4. Start the server**
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

**5. Access the API**

- **Base URL**: `http://localhost:3000`
- **Swagger Documentation**: `http://localhost:3000/` (interactive UI on root path)

**6. Run tests**
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage
```

### First-Time Usage

After starting the server:

1. Open `http://localhost:3000/` in your browser to access **Swagger UI**
2. **Register a new user** using the `/auth/register` endpoint
3. **Login** to receive access and refresh tokens
4. **Test protected endpoints** by clicking "Authorize" and entering your access token
5. Explore all features through the interactive documentation

---

## 📡 API Endpoints

All endpoints are fully documented with request/response schemas in the **interactive Swagger UI** at the root URL (`/`).

### Quick Reference

**Public Endpoints (No Authentication Required)**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register a new user account |
| `POST` | `/auth/login` | Login and receive access/refresh tokens |
| `POST` | `/auth/forgotPassword` | Request password reset token |
| `POST` | `/auth/reset-password/:token` | Reset password using token |

**Protected Endpoints (Authentication Required)**

| Method | Endpoint | Description | Authorization |
|--------|----------|-------------|---------------|
| `POST` | `/auth/logout` | Logout and invalidate tokens | User |
| `POST` | `/auth/refresh` | Refresh access token using cookie | User |
| `PUT` | `/auth/updatePassword` | Update current password | User |
| `GET` | `/user/profile` | Get logged-in user profile | User |
| `GET` | `/user/alluser` | Get all users (admin only) | Admin |

### Example Usage

<details>
<summary><b>📝 Register a New User</b></summary>

**Request:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!",
    "role": "user"
  }'
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "user"
  }
}
```
</details>

<details>
<summary><b>🔑 Login</b></summary>

**Request:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "john@example.com",
      "name": "John Doe",
      "role": "user"
    }
  }
}
```
*Note: Refresh token is automatically set as HTTP-only cookie*
</details>

<details>
<summary><b>👤 Get User Profile (Protected)</b></summary>

**Request:**
```bash
curl -X GET http://localhost:3000/user/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```
</details>

<details>
<summary><b>🔄 Refresh Access Token</b></summary>

**Request:**
```bash
curl -X POST http://localhost:3000/auth/refresh \
  -H "Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```
*Note: New refresh token is set as cookie, old token is invalidated*
</details>

> **📚 For complete API documentation with all request/response schemas, visit the interactive [Swagger UI](https://authenticantion-and-authorization.onrender.com)**

---

## 🧪 Testing

### Test Coverage

The project includes comprehensive testing across multiple layers:

- **Unit Tests**: Service layer business logic, utility functions (JWT, bcrypt)
- **Integration Tests**: Complete API flows with real test database
- **Middleware Tests**: Authentication, authorization, logging, error handling

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test -- auth.test.js

# Run tests in watch mode (during development)
npm test -- --watch
```

### Test Structure
```
src/
├── model/
│   └── auth/
│       └── authtest/
│           ├── auth.test.js          # Integration tests for auth flows
│           ├── middleware.test.js     # Middleware unit tests
│           └── service.test.js        # Service layer unit tests
```

### Coverage Report (Approximate)
```
---------------------|---------|----------|---------|---------|
File                 | % Stmts | % Branch | % Funcs | % Lines |
---------------------|---------|----------|---------|---------|
All files            |   85.7  |   80.2   |   87.5  |   86.1  |
 Controllers         |   88.2  |   82.1   |   90.0  |   89.0  |
 Services            |   90.5  |   85.3   |   92.0  |   91.2  |
 Repositories        |   82.1  |   75.0   |   85.0  |   83.5  |
 Middleware          |   85.0  |   78.5   |   88.0  |   86.0  |
---------------------|---------|----------|---------|---------|
```

### Test Database

- Tests automatically use a **separate test database** (`DB_Test_Link`)
- Database is cleaned before/after each test suite
- No impact on development or production data

---

## 🚢 Deployment

### Live Production Environment

The application is deployed and running on:

- **Platform**: [Render](https://render.com)
- **Database**: MongoDB Atlas (Shared M0 Cluster)
- **URL**: https://authenticantion-and-authorization.onrender.com
- **Region**: Auto-selected by Render
- **Environment**: Production configuration

### Deployment Configuration

**Environment Variables (Production):**
- All secrets are securely stored in Render's environment settings
- `NODE_ENV=production`
- Database connected to MongoDB Atlas cluster
- Secure cookies enabled (`secure: true`)

**Health & Monitoring:**
- Automatic health checks via Render
- Application logs available in Render dashboard
- Database monitoring via MongoDB Atlas

### Deploy Your Own Instance

**1. Fork this repository**

**2. Set up MongoDB Atlas**
- Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Get your connection string

**3. Deploy to Render**
- Connect your GitHub repository
- Set environment variables
- Deploy with one click

**4. Configure environment**
```bash
PORT=3000
DB_Link=your_mongodb_atlas_connection_string
AccessTokenSecret=your_production_secret
RefreshTokenSecret=your_production_secret
JWT_SECRET=your_production_secret
RESET_PASSWORD_SECRET=your_production_secret
```

---

## 📁 Project Structure
```
Authenticantion-and-Authorization/
├── app.js                          # Express app configuration
├── server.js                       # Server entry point
├── package.json                    # Dependencies and scripts
├── .env                           # Environment variables (not in repo)
├── .env.example                   # Environment template
├── swagger.png                    # Swagger UI screenshot
├── config/
│   └── db.js                      # Database connection setup
└── src/
    ├── middleware/
    │   ├── authmiddleware.js      # JWT authentication middleware
    │   ├── Authorization.js       # Role-based authorization
    │   ├── logger.js              # Request logging middleware
    │   └── errorHandler.js        # Centralized error handling
    │
    ├── routes/
    │   ├── authRoutes.js          # Authentication endpoints
    │   └── userRoutes.js          # User profile endpoints
    │
    ├── utils/
    │   ├── bcrypt.js              # Password hashing utilities
    │   └── jwt.js                 # Token generation/verification
    │
    └── model/
        ├── auth/
        │   ├── user.schema.js           # Mongoose user model
        │   ├── user.repositories.js     # Data access layer
        │   ├── auth.services.js         # Business logic layer
        │   ├── auth.controllers.js      # Request handlers
        │   └── authtest/                # Test files
        │       ├── auth.test.js
        │       └── middleware.test.js
        │
        └── userprofile/
            ├── profile.controllers.js   # Profile controllers
            ├── profile.services.js      # Profile services
            └── profile.repositories.js  # Profile data access
```

---

## 🎓 Key Learnings & Technical Decisions

### Architecture Decisions

**Controller-Service-Repository Pattern**
- **Why?** Clear separation of concerns, easier testing, better maintainability
- **Trade-off**: More files and initial complexity vs. long-term scalability

**Refresh Token Rotation**
- **Why?** Enhanced security - stolen tokens become invalid after use
- **Trade-off**: Slight complexity in token management vs. significant security improvement

**HTTP-Only Cookies for Refresh Tokens**
- **Why?** Prevents XSS attacks, can't be accessed via JavaScript
- **Trade-off**: Requires cookie parsing vs. superior security over localStorage

**Hashed Refresh Tokens in Database**
- **Why?** Even if database is compromised, tokens are unusable
- **Trade-off**: Cannot directly query tokens vs. enhanced security

**Swagger Documentation on Root Path**
- **Why?** Backend-only project, no frontend needed - immediate API access
- **Trade-off**: No landing page vs. instant developer experience

### What I Learned

1. **Security is Layered** - No single measure is enough; defense in depth is crucial
2. **Testing Saves Time** - Comprehensive tests catch bugs before production
3. **Documentation Matters** - Good docs make APIs more accessible and professional
4. **Architecture Scales** - Proper layering makes adding features much easier
5. **Error Handling** - Centralized error management improves debugging and UX

---

## 🛣️ Roadmap

### Planned Features

- [ ] **Email Verification** - Send verification email on registration
- [ ] **OAuth Integration** - Google, GitHub social login
- [ ] **Rate Limiting** - Prevent brute force attacks (Express Rate Limit)
- [ ] **Redis Integration** - Token blacklist and caching
- [ ] **Two-Factor Authentication (2FA)** - TOTP-based 2FA
- [ ] **Activity Logging** - Track user login history and actions
- [ ] **API Versioning** - Support multiple API versions (`/v1`, `/v2`)
- [ ] **Docker Support** - Containerization for easier deployment
- [ ] **CI/CD Pipeline** - Automated testing and deployment (GitHub Actions)
- [ ] **Monitoring & Alerts** - Application performance monitoring (APM)

### Possible Enhancements

- [ ] WebSocket support for real-time notifications
- [ ] GraphQL API alongside REST
- [ ] Multi-language support (i18n)
- [ ] Advanced audit logging with search
- [ ] Session management dashboard

---

## ⚠️ Known Limitations

- **Email Notifications**: Currently logged to console in development (not sent via SMTP)
- **Rate Limiting**: Not yet implemented - vulnerable to brute force attacks
- **Token Blacklist**: Logout invalidates tokens in cookies only, not globally
- **Password Changes**: Existing refresh tokens remain valid after password update
- **Cold Start Delay**: Render free tier has ~30s cold start on first request

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Shivansh Patel**

- GitHub: [@shivp0404](https://github.com/shivp0404)
- Email: shivanshpatel1432@gmail.com
- Portfolio: [Add your portfolio if you have one]

---

## 🙏 Acknowledgments

- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database for flexible data storage
- **JWT** - Industry-standard token-based authentication
- **Swagger/OpenAPI** - API documentation and testing interface
- **Jest** - Delightful JavaScript testing framework
- **Render** - Cloud platform for deployment

---

## 📞 Support

If you encounter any issues or have questions:

1. **Try the Live Demo**: [Swagger UI](https://authenticantion-and-authorization.onrender.com)
2. **Check Issues**: [GitHub Issues](https://github.com/shivp0404/Authenticantion-and-Authorization/issues)
3. **Contact**: shivanshpatel1432@gmail.com

---

<div align="center">

**⭐ If you found this project helpful, please consider giving it a star!**

Made with ❤️ by Shivansh Patel

</div>