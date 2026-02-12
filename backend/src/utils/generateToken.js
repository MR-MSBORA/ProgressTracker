import  jwt  from "jsonwebtoken";

//JWT (JSON Web Token) is like a digital ID card that proves "this user is logged in.

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1IiwiaWF0IjoxNjc4OTAwMDAwfQ.signature
//      [Header]                        [Payload]                    [Signature]

// JWT works like a digital ID card
// It proves that a user is authenticated (logged in)
//
// Token structure:
// Header   → algorithm & type
// Payload  → user data (id)
// Signature→ verifies token authenticity

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id, // Payload: uniquely identifies the user
    },
    process.env.JWT_SECRET, // Secret key used to sign the token
    {
      expiresIn: "30d", // Token validity (auto-expire for security)
    }
  );
};

export default generateToken;

