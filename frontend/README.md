# Coin-Track Frontend

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/dhananjay6561/Coin-Track)

A modern, beautiful, and responsive React frontend for Coin-Track, an expense tracking application with WhatsApp integration.

---

## 🚀 Tech Stack

- **React 19**
- **Vite** (blazing fast dev/build tool)
- **Tailwind CSS** (utility-first styling)
- **React Router v7** (routing)
- **Axios** (API requests)
- **Recharts** (data visualization)
- **Lucide React** (icon library)

---

## 📦 Project Structure

```
frontend/
├── public/                # Static assets
├── src/
│   ├── assets/           # Images, icons, etc.
│   ├── components/       # Reusable UI components
│   ├── contexts/         # React context (Auth, etc.)
│   ├── pages/            # Main app pages (Dashboard, Login, Register, etc.)
│   ├── App.jsx           # Main app component (routing)
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies & scripts
├── tailwind.config.js    # Tailwind CSS config
├── vite.config.js        # Vite config
└── README.md             # This file
```

---

## ⚙️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dhananjay6561/Coin-Track.git
   cd Coin-Track/frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the app locally:**
   ```bash
   npm run dev
   ```
4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🌟 Main Features

- **User Authentication** (register, login, JWT-based session)
- **Expense Dashboard** with stats, charts, and quick actions
- **Add/Edit/Delete Expenses** with category, description, and date
- **Expense History** with search, filter, sort, and pagination
- **Profile Management** (view/update user info)
- **WhatsApp Integration** (log expenses via WhatsApp, see onboarding in Dashboard)
- **Responsive Design** (works beautifully on all devices)
- **Modern UI/UX** (animated backgrounds, cards, and transitions)

---

## 🗺️ App Pages

- **Landing:** Welcome, features, and call-to-action
- **Register:** Create a new account (name, email, password, WhatsApp)
- **Login:** Sign in (with demo account option)
- **Dashboard:** Overview, stats, charts, WhatsApp onboarding
- **Expenses:** Full expense history, search/filter/sort
- **Add/Edit Expense:** Forms for managing expenses
- **Profile:** View and update user info

---

## 🧩 Key Components

- **Navbar:** Top navigation bar
- **ExpenseCard:** Displays individual expense
- **StatsBox:** Shows key stats (total, weekly, top category, WhatsApp status)
- **ExpenseChart:** Visualizes expenses by category
- **WhatsappIntegration:** Onboarding for WhatsApp logging
- **Toast:** Notification popups
- **Loader:** Loading spinner
- **ProtectedRoute:** Guards private routes

---

## 🧩 Related
- **Backend:** [Coin-Track Backend](https://github.com/dhananjay6561/Coin-Track/tree/master/backend)

---

## 🔗 Backend API

This frontend connects to the [Coin-Track backend](https://github.com/dhananjay6561/Coin-Track) for all data and authentication. See backend README for full API specs.

---

## 📞 Contact
- **Email:** dhananjayaggarwal6561@gmail.com
- **LinkedIn:** [dhananjay6561](https://linkedin.com/in/dhananjay6561)
- **GitHub:** [Coin-Track](https://github.com/dhananjay6561/Coin-Track)

---

> Made with ❤️ by Dhananjay Aggarwal
