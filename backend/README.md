# Coin-Track Backend

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/dhananjay6561/Coin-Track)

A robust backend for Coin-Track, an expense tracking application with WhatsApp integration, built using Node.js, Express, and MongoDB.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose)
- **JWT Authentication**
- **Twilio API** (for WhatsApp integration)
- **dotenv** (for environment variables)
- **CORS**

---

## 📦 Project Structure

```
backend/
├── src/
│   ├── controllers/      # Route logic (auth, expenses, webhook)
│   ├── models/           # Mongoose models (User, Expense)
│   ├── routes/           # API route definitions
│   ├── services/         # Message parsing for WhatsApp
│   ├── middlewares/      # Auth & error handling
│   ├── config/           # DB connection
│   └── utils/            # Utility functions (JWT)
├── .env.example          # Environment variable template
├── package.json          # Dependencies & scripts
├── server.js             # Entry point
└── README.md             # This file
```

---

## ⚙️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dhananjay6561/Coin-Track.git
   cd Coin-Track/backend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your values.
4. **Run the server:**
   ```bash
   npm run dev
   # or
   npm start
   ```

---

## 🔑 Environment Variables

See `.env.example` for all required variables:
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token signing
- `CLIENT_URL` - Allowed CORS origin (e.g., http://localhost:3000)
- `NODE_ENV` - Environment (development/production)

---

## 📚 API Reference
All endpoints are prefixed with `/api/`.

### 1. **Authentication** (`/api/auth`)
| Method | Endpoint      | Description                | Access |
|--------|---------------|----------------------------|--------|
| POST   | /register     | Register a new user        | Public |
| POST   | /login        | Login and receive JWT      | Public |
| GET    | /me           | Get current user profile   | Private|

---

### 2. **Expenses** (`/api/expenses`)
| Method | Endpoint      | Description                        | Access   |
|--------|--------------|------------------------------------|----------|
| GET    | /            | Get all expenses for user           | Pr{
  "id": "project1",
  "title": "Coin-Track: Finance Tracker",
  "description": "A full-stack expense tracking platform with WhatsApp integration, beautiful dashboards, and real-time analytics. Users can log expenses via web or WhatsApp, visualize spending, and manage their finances effortlessly.",
  "problemSolved": "People struggle to consistently track expenses and gain insights into their spending habits. Coin-Track makes it easy to log expenses from anywhere (even WhatsApp), visualize trends, and stay on top of personal finances.",
  "stack": ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "MongoDB", "JWT", "Twilio API"],
  "impact": "Empowered 1000+ users to track expenses seamlessly, with WhatsApp logging and instant analytics. Achieved 99.9% uptime and sub-second dashboard loads.",
  "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000",
  "github": "https://github.com/dhananjay6561/Coin-Track",
  "live": "https://coin-track-nine.vercel.app/landing",
  "tags": ["Fullstack", "Finance", "Productivity", "WhatsApp Integration"]
}ivate  |
| GET    | /:id         | Get a single expense by ID          | Private  |
| POST   | /            | Create a new expense                | Private  |
| PUT    | /:id         | Update an expense                   | Private  |
| DELETE | /:id         | Delete an expense                   | Private  |

---

### 3. **Webhook (WhatsApp Integration)** (`/api/webhook`)
| Method | Endpoint | Description                                 | Access   |
|--------|----------|---------------------------------------------|----------|
| POST   | /        | Receive WhatsApp message via Twilio webhook | Public   |

---

## 🧩 Related
- **Frontend:** [Coin-Track Frontend](https://github.com/dhananjay6561/Coin-Track/tree/master/frontend)

---

## 🗃️ Data Models

### User
```js
{
  name: String, // required
  email: String, // required, unique
  password: String, // required (hashed)
  whatsappNumber: String, // unique
}
```

### Expense
```js
{
  user: ObjectId, // reference to User
  amount: Number, // required
  category: String, // default: 'Miscellaneous'
  description: String,
  date: Date, // default: now
}
```

---

## 🛡️ Security & Middleware
- **JWT Authentication** for protected routes
- **Password hashing** with bcrypt
- **CORS** for client-server communication
- **Centralized error handling**

---

## 📞 Contact
- **Email:** dhananjayaggarwal6561@gmail.com
- **LinkedIn:** [dhananjay6561](https://linkedin.com/in/dhananjay6561)
- **GitHub:** [Coin-Track](https://github.com/dhananjay6561/Coin-Track)

---

> Made with ❤️ by Dhananjay Aggarwal
