# 💰 FinanceTracker

A full-stack personal finance tracking web application that helps users track income, expenses, and gain insights through analytics.

Built with **React + Vite + Tailwind CSS** on the frontend and **Node.js + Express + MongoDB** on the backend, with secure JWT authentication.

---

## 🚀 Features

* 🔐 User authentication (Signup / Login with JWT)
* 💵 Add income & expense transactions
* 📊 Dashboard with totals (balance, income, expenses)
* 🕘 Transaction history with filters
* 📈 Analytics (monthly overview & category breakdown)
* 📱 Fully responsive (mobile, tablet, desktop)
* 🎨 Modern UI with Tailwind CSS & Framer Motion
* 🔒 Secure backend with protected routes

---

## 🧱 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Framer Motion
* Chart.js
* React Router

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt

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

## ⚙️ Environment Variables

### Backend (`server/.env`)

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Frontend (`apps/web/.env`)

```
VITE_API_URL=http://localhost:5000
```

> ⚠️ `.env` files are intentionally NOT committed to GitHub.

---

## 🛠️ Local Development Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/finance-tracker.git
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

## 🌍 Deployment (Planned / In Progress)

* Frontend: **Vercel / Netlify**
* Backend: **Render / Railway**
* Database: **MongoDB Atlas**

---

## 🧠 Learning Outcomes

This project demonstrates:

* Full-stack application architecture
* Authentication & authorization
* Secure handling of secrets
* Responsive UI design
* REST API design
* Production-ready Git & deployment practices

---

## 📌 Future Improvements

* Email verification
* Password reset
* Export transactions (CSV/PDF)
* Dark mode
* Recurring transactions
* Budget limits

---

## 👤 Author

**Mishal K**
Computer Science Engineering Student
Aspiring Full-Stack & Backend Developer

---

## ⭐️ Support

If you find this project helpful, consider starring the repository ⭐
