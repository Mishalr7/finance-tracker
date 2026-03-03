# 💰 FinanceTracker

> A full-stack personal finance tracking web application that helps users manage income, expenses, and financial insights in one place.

🔗 **Live Demo:**
[https://finance-tracker-iota-blush.vercel.app/](https://finance-tracker-iota-blush.vercel.app/)

---

## 🚀 Features

* 🔐 Secure authentication (Signup / Login with JWT)
* 💵 Add income & expense transactions
* 📊 Dashboard with balance, income & expense totals
* 🕘 Transaction history
* 📈 Analytics (monthly overview & category breakdown)
* 📱 Fully responsive design (mobile, tablet, desktop)
* 🎨 Modern UI with Tailwind CSS & Framer Motion
* 🔒 Protected backend routes

---

## 🧱 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Framer Motion
* Chart.js
* React Router
* Fetch API

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcrypt

### Deployment

* Frontend → Vercel
* Backend → Render
* Database → MongoDB Atlas

---

## 📂 Project Structure

```
finance-tracker/
├── apps/
│   └── web/              # Frontend (React + Vite)
│       ├── src/
│       ├── index.html
│       └── package.json
│
├── server/               # Backend (Express + MongoDB)
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── package.json
└── README.md
```

---

## 🌍 Production Architecture

```
User (Browser)
     ↓
Vercel (Frontend)
     ↓
Render (Backend API)
     ↓
MongoDB Atlas (Database)
```

---

## ⚙️ Environment Variables

### Backend (`server/.env`)

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secure_string
PORT=5000
CLIENT_URL=https://finance-tracker-iota-blush.vercel.app
```

### Frontend (`apps/web/.env`)

```
VITE_API_URL=https://finance-tracker-api-xyr9.onrender.com
```

> ⚠️ `.env` files are intentionally NOT committed to GitHub for security reasons.

---

## 🛠️ Local Development Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Mishalr7/finance-tracker.git
cd finance-tracker
```

### 2️⃣ Install backend dependencies

```bash
cd server
npm install
```

### 3️⃣ Install frontend dependencies

```bash
cd ../apps/web
npm install
```

### 4️⃣ Start backend

```bash
cd server
node server.js
```

### 5️⃣ Start frontend

```bash
cd ../apps/web
npm run dev
```

Frontend runs on: `http://localhost:3000`
Backend runs on: `http://localhost:5000`

---

## 🧠 What This Project Demonstrates

* Full-stack application architecture
* JWT-based authentication & protected routes
* Secure environment variable handling
* REST API design
* MongoDB schema modeling with Mongoose
* CORS configuration for production
* Deployment workflow (Vercel + Render + Atlas)
* Real-world debugging & deployment practices

---

## 🔮 Future Improvements

* Email verification
* Password reset functionality
* Export transactions (CSV / PDF)
* Dark mode
* Recurring transactions
* Budget limits & alerts
* Performance optimization for charts

---

## 👤 Author

**Mishal K**
Computer Science Engineering Student
Aspiring Backend & Full-Stack Developer

---

## ⭐ Support

If you find this project helpful, consider giving it a star ⭐
It helps and motivates further development.
