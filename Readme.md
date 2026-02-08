# 🚀 ProgressTrack

**ProgressTrack** is a productivity and self-growth platform for students, freelancers, and self-learners. It helps users **build consistent habits, track progress, and understand productivity patterns** without relying on external accountability.

---

## 1️⃣ Project Vision & Overview

### What We Solve
- 🎯 Lack of consistency: Users start but lose momentum  
- 📊 Invisible progress: Hard to track improvement  
- ⏱ No pattern recognition: Don't know peak productivity times  
- 💡 Accountability gap: Need self-driven motivation  

### Our Solution
- ✅ **Streaks** – Visual heatmaps for consistency  
- 📈 **Analytics & Charts** – Weekly and monthly insights  
- 📅 **Timelines** – Track goals, skills, and reflections  
- 💡 **Smart Insights** – Suggestions based on user activity  
- 🏆 **Gamified Scores** – Daily productivity points (0-100)  

**Core Value:**  
> "See your progress, understand your patterns, build unbreakable consistency."

---

## 2️⃣ Tech Stack

**Frontend:**  
- ⚛ React 18  
- 🟨 JavaScript  
- 🎨 Tailwind CSS  
- 🧭 React Router  
- 📊 Recharts (Charts)  
- 🔗 Lucide React (Icons)  

**Backend:**  
- 🟢 Node.js  
- 🚂 Express.js  
- 🍃 MongoDB + Mongoose  
- 🔒 JWT Authentication  

**Tools:**  
- ⚡ Vite  
- 🐙 Git & GitHub  
- 📬 Postman  
- ✅ ESLint & Prettier  
- ☁ MongoDB Atlas  

---

## 3️⃣ Features & User Flow

### Key Features
- 🔐 **Authentication:** Sign up, login, email verification  
- 📝 **Tasks:** Create, update, mark complete  
- 📊 **Dashboard:** View daily tasks, streaks, productivity scores  
- 📅 **Weekly Reflection:** Review progress and set goals  
- 📧 **Email Notifications:** Verification, password reset  

### User Flow
```
LANDING PAGE → SIGN UP / LOGIN → DASHBOARD → TASKS & REFLECTIONS
```

**Flow Steps:**
1. **Landing Page:** Hero section, features, "Get Started" button  
2. **Sign Up / Login:** JWT-based authentication  
3. **Dashboard:** Personalized tasks, streaks, charts, reflections  

---

## 4️⃣ System Architecture
```
CLIENT SIDE
┌─────────────────────────────────────────┐
│ React App (Components, Pages, Context, Utils) │
└─────────────────────────────────────────┘
          ↓ Axios Requests with JWT
SERVER SIDE
┌─────────────────────────────────────────┐
│ Express Server (Routes, Controllers, Middleware, Models) │
└─────────────────────────────────────────┘
          ↓ Mongoose ODM
DATABASE (MongoDB Atlas)
┌─────────────────────────────────────────┐
│ Users, Tasks, Goals, Skills, Reflections │
└─────────────────────────────────────────┘
```

**Example: Creating a Task**
1. User clicks "Add Task"  
2. Axios POST `/api/tasks` with JWT  
3. Express verifies token  
4. Controller validates and saves task  
5. Mongoose creates task in DB  
6. React updates UI with the new task  

---

## 5️⃣ API Endpoints (Backend)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Register new user & send verification email |
| `/api/auth/login` | POST | Login user & get JWT token |
| `/api/auth/verify-email/:token` | GET | Verify email using token |
| `/api/auth/resend-verification` | POST | Resend email verification |
| `/api/auth/forgot-password` | POST | Send password reset email |
| `/api/auth/reset-password/:token` | PUT | Reset password using token |
| `/api/auth/me` | GET | Get logged-in user info |
| `/api/tasks` | POST | Create a new task (JWT required) |

> 🔑 All protected routes require `Authorization: Bearer <JWT>` in headers.

---

## 6️⃣ Folder Structure (Backend Example)
```
backend/
│
├─ controllers/    # Business logic
├─ models/         # Mongoose schemas
├─ routes/         # Express routes
├─ middleware/     # Auth, validation
├─ utils/          # Helper functions (email, tokens)
└─ server.js       # Entry point
```

**Frontend** follows a **clean component-based architecture** with pages, components, context, and utils.

---

## 7️⃣ Development Timeline (30 Days)
**3 hours/day → 90 hours total**

- **Week 1:** Setup backend, database, environment  
- **Week 2:** Auth system, email verification, password reset  
- **Week 3:** Frontend core: dashboard, tasks, reflections  
- **Week 4:** Integrations, analytics, charts, polish, deploy  

---

## 8️⃣ Next Steps
- Connect frontend with backend APIs  
- Deploy frontend (Vercel/Netlify) and backend (Heroku/Railway)  
- Add more analytics, reminders, and goal templates based on user feedback  

---

## 👤 Author
**Manish Singh** – manishbora2003@gmail.com
---

## 📄 License
MIT License  

---

Made with ❤️ for learners, hustlers, and self-growth enthusiasts.