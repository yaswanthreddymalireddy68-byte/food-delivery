# 🍔 FoodHub PRO – Full-Stack MERN Food Ordering & Restaurant Management Platform

> **MERN Stack Web Development Training Program – Final Project Submission**

---

## 👥 Team & Submission Information

| Parameter | Details |
|---|---|
| **Team Name** | **Team AFK** |
| **Project Title** | **FoodHub PRO – Interactive Food Ordering & Kitchen Order Management System** |
| **Course / Program**| MERN Stack Web Development Training Program |
| **Lead / Member 1** | **[MATTA VENKATA DEEEPAK]** — Reg No: `241FA04E27` (Lead Developer, GitHub: `vu241fa04e27-afk`) |
| **Member 2** | **[CH.ABHINAY KUMAR]** — Reg No: `241FA04898` (Frontend & UI/UX Developer) |
| **Member 3** | **[SK.MD.SUHEL]** — Reg No: `241FA04E27` (Backend & Database Developer) |
| **GitHub Repository**| `https://github.com/vu241fa04e27-afk/food-ordering-mern` |
| **Live Frontend URL**| **`https://food-ordering-mern-vki3.vercel.app`** |
| **Live Backend API** | **`https://food-ordering-mern-hwx4.vercel.app/api`** |

---

## 📖 1. Project Overview & Description
**FoodHub PRO** is a production-grade, highly responsive, and creatively animated full-stack food ordering and restaurant management platform developed using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. 

The application offers two unified experiences:
1. **Customer Facing Portal**: Discover artisanal dishes across 8+ categories, interactive search, dynamic cart management, seamless checkout with Cash on Delivery (COD), order history, and real-time step-by-step kitchen status tracking.
2. **Admin Command Center**: Real-time sales analytics (Revenue, Orders, Food items, Customers), a live order dispatcher to advance kitchen milestones (*Pending → Confirmed → Cooking → Out for Delivery → Delivered*), category creation and management, and instant dish creation into the live database.

---

## 🎯 2. Project Objectives
- Build an authentic, secure, and resilient **end-to-end full-stack web platform**.
- Implement full **CRUD operations** (Create, Read, Update, Delete) across Food Menus, Categories, Orders, and User Profiles.
- Deliver an appetizing, modern UI/UX using **Appetite-Inducing Neo-Glassmorphism**, smooth micro-animations, and celebratory feedback (`canvas-confetti`).
- Enforce strict server-side validation: **JWT-based authentication**, **bcrypt** password encryption, and backend order calculation.
- Deploy the decoupled system cleanly to cloud providers (**GitHub** and **Vercel** serverless functions).

---

## 🛠️ 3. Technologies & Tools Used

### **Frontend**
- **React.js (v18)** — Modern component-based view layer with hooks.
- **Vite (v5)** — Ultra-fast frontend development build tooling.
- **React Router DOM (v6)** — Single Page Application (SPA) declarative client-side routing.
- **Axios** — HTTP client configured with automated JWT interceptors.
- **Lucide React** — Minimalist vector icons.
- **Canvas-Confetti** — Celebration particle physics for orders and micro-interactions.
- **Vanilla CSS3** — Custom design tokens, glassmorphism blur, responsive grid layouts, and CSS keyframe animations (`anim-float`, `pulsePill`).

### **Backend**
- **Node.js** — Asynchronous event-driven runtime environment.
- **Express.js** — Fast, unopinionated REST API framework.
- **Mongoose (v8)** — Object Data Modeling (ODM) library for MongoDB.
- **JSON Web Tokens (JWT)** — Stateless user session management and protected routing.
- **bcryptjs** — Salted one-way password hashing.
- **CORS & Dotenv** — Cross-Origin resource sharing and environment management.

### **Database & Cloud Deployment**
- **MongoDB Atlas** — Managed cloud NoSQL database cluster.
- **GitHub** — Git version control and team collaboration.
- **Vercel** — Production frontend hosting and serverless backend API execution.

---

## ✨ 4. Key Features & Functionality

### 🛒 Customer Features
- **Authentication**: JWT register and login with automatic password hashing.
- **Food Exploration**: Search meals by name with real-time query filtering.
- **Category Filter Tabs**: 1-click filtering across Pizza, Burgers, Biryani, Indian, Chinese, Sandwiches, Desserts, and Beverages.
- **Food Details**: Detailed views with quantity selectors, ingredients, and instant add-to-cart.
- **Shopping Cart**: LocalStorage-persisted cart state with item counter badges, quantity adjustments, and auto-calculated delivery charges.
- **Express Checkout**: Form auto-fills user address and phone with 100% Cash on Delivery (COD) support.
- **Live Order Tracking**: Visual milestone tracker (*Confirmed → Prep Started → Sizzling in Kitchen → Rider on the Way → Delivered*).
- **Profile Management**: Update delivery address, contact details, and credentials.
- **About & Contact**: Story showcase with restaurant gallery, contact channels, and interactive inquiry form.

### 🛡️ Admin Features
- **Role-Based Access Control (RBAC)**: Protected routes checking `req.user.role === 'admin'`.
- **4 Live KPI Metric Cards**: Total Revenue (₹), Total Orders, Total Registered Customers, and Total Food Items.
- **Category Creation & Management**: Create new categories (e.g., Seafood, Pasta) and delete outdated ones.
- **Food Menu CRUD**: Upload new dishes (name, price, category, photo URL, description) directly to MongoDB.
- **Live Orders Dispatcher**: Advance customer order status in real time.

---

## 📁 5. Project Architecture & Directory Structure

```
food-ordering-website/
├── frontend/                     # React + Vite Frontend
├── backend/                      # Node.js + Express Backend
├── PRESENTATION.md               # 10-Slide Project Presentation outline
├── .gitignore
├── .env.example
└── README.md
```

---

## 🔑 6. Demo Credentials

| Role | Email | Password | Access |
|---|---|---|---|
| **Admin** | `admin@example.com` | `admin123` | Full Admin Dashboard (`/admin`), Category Manager, Food CRUD, Order Dispatcher |
| **Customer** | *(Create new via `/register`)* | *(Your choice)* | Browse, Add to Cart, Checkout, Live Order Tracking, Profile |
