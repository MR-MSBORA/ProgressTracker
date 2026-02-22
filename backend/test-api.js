// ================= IMPORT =================
import axios from "axios";

// ================= CONFIG =================
const API_URL = "http://localhost:5000/api";

// ================= TEST FUNCTION =================
const testAPI = async () => {
  console.log("🧪 Starting API Tests...\n");

  try {
    // 1️⃣ Health Check
    console.log("1️⃣ Testing Health Check...");
    const health = await axios.get(`${API_URL}/health`);
    console.log("✅ Health Check:", health.data);
    console.log("");

    // 2️⃣ Invalid Registration (No Data)
    console.log("2️⃣ Testing Invalid Registration (no data)...");
    try {
      await axios.post(`${API_URL}/auth/register`, {});
    } catch (error) {
      console.log("✅ Validation Error:", error.response.data);
    }
    console.log("");

    // 3️⃣ Invalid Email Format
    console.log("3️⃣ Testing Invalid Email Format...");
    try {
      await axios.post(`${API_URL}/auth/register`, {
        name: "Test User",
        email: "invalid-email",
        password: "Password123!"
      });
    } catch (error) {
      console.log("✅ Validation Error:", error.response.data);
    }
    console.log("");

    // 4️⃣ Weak Password
    console.log("4️⃣ Testing Weak Password...");
    try {
      await axios.post(`${API_URL}/auth/register`, {
        name: "Test User",
        email: "test@example.com",
        password: "weak"
      });
    } catch (error) {
      console.log("✅ Validation Error:", error.response.data);
    }
    console.log("");

    // 5️⃣ Rate Limiting
    console.log("5️⃣ Testing Rate Limiting (6 rapid requests)...");
    for (let i = 0; i < 6; i++) {
      try {
        await axios.post(`${API_URL}/auth/login`, {
          email: "test@example.com",
          password: "password"
        });
      } catch (error) {
        if (error.response?.status === 429) {
          console.log(`✅ Rate limit triggered at request ${i + 1}`);
          console.log("Rate Limit Response:", error.response.data);
          break;
        }
      }
    }
    console.log("");

    // 6️⃣ XSS Prevention
    console.log("6️⃣ Testing XSS Prevention...");
    try {
      await axios.post(`${API_URL}/auth/register`, {
        name: '<script>alert("XSS")</script>',
        email: "xss@example.com",
        password: "Password123!"
      });
    } catch (error) {
      console.log("✅ XSS Sanitized:", error.response.data);
    }
    console.log("");

    console.log("✅ All tests completed!\n");

  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
};

// ================= RUN =================
testAPI();