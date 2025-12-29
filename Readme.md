# Authentication Service (Node.js)

A production-ready authentication system built with **Node.js, Express, MongoDB**, following clean architecture principles and industry-standard security practices.

This project demonstrates **real-world authentication flows** including user registration, login, logout, JWT-based access control, refresh token , secure cookie handling, and comprehensive testing.

---

## 🚀 Features

* User Registration
* User Login
* Secure Logout
* JWT Access Token generation
* Refresh Token generation 
* Hashed refresh token storage (DB-level security)
* HTTP-only cookie handling
* Centralized error handling
* Structured logging middleware
* Clean separation of layers (Controller / Service / Repository)
* Full test coverage (Unit + Integration)

---

## 🧱 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT (Access & Refresh Tokens)
* **Security:** bcrypt, HTTP-only cookies
* **Testing:** Jest, Supertest
* **Environment:** dotenv

---

## 📁 Project Structure

```
app.js
server.js
config/
├── db.js

src/
├── middleware/
│   ├── authmiddleware.js
│   ├── logger.js
│   ├── errorHandler.js
│   └── middlewaretest/
│       └── authmiddleware.test.js
│
├── routes/
│   ├── authRoutes.js
│   └── userRoutes.js
│
├── utils/
│   ├── bcrypt.js
│   └── jwt.js
│
├── model/
│   ├── auth/
│   │   ├── user.schema.js
│   │   ├── auth.repositories.js
│   │   ├── auth.controllers.js
│   │   ├── auth.services.js
│   │   └── authtest/
│   │       ├── authcontrollers.test.js
│   │       ├── authservice.test.js
│   │       └── authintegration.test.js
│   │
│   └── userprofile/
│       ├── profile.controllers.js
│       ├── profile.services.js
│       ├── profile.repositories.js
│       └── test/
│           ├── unittest/
│           │   ├── profile.controllers.test.js
│           │   └── profile.services.test.js
│           └── integrationtest/
│               └── profile.integration.test.js
```




## 🔐 Authentication Flow

### 1️⃣ Register

- Validates user input
- Hashes password using bcrypt
- Stores user in database

### 2️⃣ Login

- Validates credentials
- Compares hashed password
- Generates **Access Token** (short-lived)
- Generates **Refresh Token** (long-lived)
- Hashes refresh token before saving to DB
- Sends refresh token via HTTP-only cookie

### 3️⃣ Logout

- Reads refresh token from cookies
- Decodes and validates refresh token
- Verifies token against hashed DB value
- Removes refresh token from database
- Clears refresh token cookie

### 4️⃣ Get User Profile 

- Extracts **Access Token** from request headers
- Verifies and decodes JWT access token
- Attaches decoded payload 
- Controller reads decode payload
- Service validates business rules
- Repository fetches user profile by ID
- Returns authenticated user profile

---

## 🧪 Testing Strategy

### Unit Tests

- Service layer logic (auth services)
- Controller behavior (request → response)
- All external dependencies mocked

### Integration Tests

- Real API requests using Supertest
- Real database connection (test DB)
- Covers:
  - Register flow
  - Login flow
  - Logout flow
  - Cookie handling

---

## 🧪 Run Tests

```bash
npm test
````

---

## ⚙️ Environment Variables

Create a `.env` file:

```
PORT=5000
DB_LINK=your_db_url
DB_Test_Link=your_test_db_url
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_secret
```

---

## ✅ API Endpoints

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| POST   | /auth/register | Register user |
| POST   | /auth/login    | Login user    |
| POST   | /auth/logout   | Logout user   |
| GET    | /user/profile  | authenticate user profile |

---

## 🧠 Design Decisions

* Refresh tokens are **never stored in plain text**
* Controllers are kept thin (no business logic)
* Services handle all decision-making
* Repository layer handles only DB operations
* Token validation is always server-side

---

## 📌 Future Improvements

* Token rotation on refresh endpoint
* Role-based authorization
* Rate limiting on auth routes
* Refresh token expiry cleanup job

---

## 👨‍💻 Author

**Shivansh Patel**

Backend Developer

---

## 📄 License

This project is for learning and demonstration purposes.
