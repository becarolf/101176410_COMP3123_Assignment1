# COMP3123 - Assignment 1

**Student:** Beatriz Ferreira  
**Student ID:** 101176410  
**Course:** COMP3123 - Full Stack Development I

## Project Overview

This assignment is about creating a RESTful API using Node.js, Express.js, and MongoDB to manage users and employees.

Users can register, log in, and manage their own employee records. The API uses JWT authentication to protect employee routes and bcrypt to securely hash user passwords.

Each employee belongs to a specific user, so users cannot access, update, or delete employees created by someone else.

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- express-validator
- Helmet
- express-rate-limit
- Winston
- Postman

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/becarolf/101176410_COMP3123_Assignment1.git
cd 101176410_COMP3123_Assignment1
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the project root using `.env.example` as a reference.

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Replace the example values with your own MongoDB connection string and JWT secret.

**Do not upload your `.env` file to GitHub.**

### 4. Run the Application

For development:

```bash
npm run dev
```

Or start the server normally:

```bash
npm start
```

The API runs at:

`http://localhost:3000`

## API Endpoints

### User Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/user/signup` | Register a new user |
| POST | `/api/v1/user/login` | Log in using a username or email and password |

After a successful login, the API returns a JWT token.

### Employee Management

All employee endpoints require a valid JWT token.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/emp/employees` | Get all employees belonging to the logged-in user |
| POST | `/api/v1/emp/employees` | Create a new employee |
| GET | `/api/v1/emp/employees/:eid` | Get an employee by ID |
| PUT | `/api/v1/emp/employees/:eid` | Update an employee |
| DELETE | `/api/v1/emp/employees?eid=xxx` | Delete an employee |

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Check if the API is running |

## Authentication and Security

The API includes several security features:

- **JWT Authentication:** Protects employee routes and verifies users.
- **Password Hashing:** Uses bcrypt to hash passwords before saving them.
- **Employee Ownership:** Users can only manage their own employees.
- **Input Validation:** Checks required fields and invalid information.
- **Helmet:** Adds HTTP security headers.
- **Rate Limiting:** Limits repeated authentication requests.
- **Error Handling:** Returns appropriate HTTP status codes and error messages.

For protected endpoints, the JWT must be included in the request header:

```text
Authorization: Bearer <your_token>
```

## Employee Information

Each employee contains the following information:

- First name
- Last name
- Email
- Position
- Salary
- Date of joining
- Department
- User ID (employee owner)

The user ID connects each employee to the user who created it.

## Application Logging

Winston is used to record API requests and application errors.

The application creates two log files:

- `logs/combined.log` — Records HTTP requests and application errors.
- `logs/error.log` — Records application errors.

Log entries include timestamps and useful information such as the HTTP method, endpoint, status code, or error type.

Log files are excluded from GitHub using `.gitignore`.

## Testing

I tested the API using Postman to make sure the endpoints work correctly.

The tests include:

- User registration and login
- Successful employee CRUD operations
- Missing and invalid user information
- Invalid and expired JWT tokens
- Employee validation
- Rate limiting
- Employee ownership using two different users
- Health check
- Helmet security headers
- Winston application logging

The Postman Collection and screenshots are included with the assignment files.

## Database

The application uses MongoDB Atlas with the database:

`comp3123_assignment1`

It contains two collections:

- `users` — Stores user accounts and hashed passwords.
- `employees` — Stores employee information and references the user who created each employee.

## Screenshots and Test Data

Screenshots of the API tests, MongoDB collections and security features are available in the `screenshots/` folder in this repository. They will also be included separately with the assignment submission for easier review.

All users, employees, and personal information shown in the screenshots are fictional and were created for testing and educational purposes only.