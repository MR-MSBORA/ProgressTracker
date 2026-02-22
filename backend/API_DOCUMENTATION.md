# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Rate Limits
- General API: 100 requests per 15 minutes
- Authentication: 5 requests per 15 minutes
- Registration: 3 requests per hour
- Email: 3 requests per hour

## Headers
All requests should include:
```
Content-Type: application/json
```

Authenticated requests should include:
```
Authorization: Bearer <token>
```

## Endpoints

### Health Check
**GET** `/health`

Response:
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 12345.67
}
```

### Register User
**POST** `/auth/register`

Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

Validation Rules:
- Name: 2-50 characters, letters only
- Email: Valid email format
- Password: Min 8 characters, must include uppercase, lowercase, number, and special character

Response:
```json
{
  "success": true,
  "message": "Registration successful!",
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Login
**POST** `/auth/login`

Body:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "isEmailVerified": true
    }
  }
}
```

### Verify Email
**GET** `/auth/verify-email/:token`

Response:
```json
{
  "success": true,
  "message": "Email verified successfully!"
}
```

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email",
      "value": "invalid-email"
    }
  ]
}
```

## Security Features
- Helmet.js for security headers
- CORS protection
- Rate limiting
- Input validation and sanitization
- XSS protection
- SQL injection prevention
- Parameter pollution prevention