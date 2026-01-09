# 🛒 Shree Yadunandan - Food Cart E-commerce Platform

Full-stack e-commerce application built with **React 19 + TypeScript + Node.js + Express + MongoDB**

---

## 👥 Team Contributions

### 👤 Member 1

| Feature | Tech Stack & Implementation |
|---------|----------------------------|
| **Product Catalog** | Built with React functional components, TypeScript interfaces for type-safe props, Axios interceptors for API calls, MongoDB aggregation pipelines for filtered queries |
| **Homepage** | Implemented React hooks (useState, useEffect, useCallback), CSS keyframe animations, Intersection Observer API for lazy loading, Express REST endpoints for dynamic content |
| **Authentication** | JWT token-based auth with 24h expiry, bcrypt password hashing (salt rounds: 10), protected route middleware, localStorage token persistence, HTTP-only considerations |
| **New Products Page** | React Router DOM v6 navigation, async/await data fetching, Mongoose schema validation with TypeScript enums, indexed MongoDB queries for O(log n) performance |
| **Database Seeding** | TypeScript seed scripts, Mongoose bulk insertMany operations, dotenv environment configuration, MongoDB connection pooling |

---

### 👤 Member 2

| Feature | Tech Stack & Implementation |
|---------|----------------------------|
| **Reseller Marketplace** | React conditional rendering, TypeScript union types for product variants, Express CRUD endpoints, Mongoose middleware hooks for timestamps |
| **Accessories Module** | CSS Grid + Flexbox hybrid layouts, React useEffect cleanup patterns, MongoDB text indexing for search, Express query param parsing |
| **Testimonials** | CSS transform-based carousel, React refs for DOM manipulation, Mongoose schema with rating validators, approval workflow with boolean flags |
| **Certificates** | React modal with portal rendering, TypeScript discriminated unions for cert types, Mongoose enum validation, static file serving middleware |
| **Contact System** | HTML5 form validation + regex patterns, WhatsApp URI scheme deep linking, Express body-parser middleware, CORS configuration for cross-origin requests |
| **Navigation** | React Router NavLink with activeClassName, responsive hamburger with CSS transitions, Express 404 fallback routing |
| **Styling System** | CSS custom properties (variables), glassmorphism with backdrop-filter, @keyframes animations, mobile-first media queries, BEM naming convention |

---

## 🛠️ Tech Stack

```
Frontend: React 19, TypeScript, Vite, React Router DOM, Axios, CSS3
Backend:  Node.js, Express.js, TypeScript, JWT, bcryptjs, Mongoose
Database: MongoDB, Mongoose ODM, Aggregation Framework
DevOps:   ts-node-dev hot reload, dotenv, CORS middleware
```

---

## 🚀 Quick Start

```bash
# Install & Run
cd backend && npm install && npm run seed && npm run dev
cd frontend && npm install && npm run dev

# Ports: Frontend (5173) | Backend (8080) | MongoDB (27017)
```

---

## 📁 Architecture

```
frontend/src/
├── components/   # ProductCard, Navbar, Footer (React + TS)
├── pages/        # Home, Reseller, New, Accessories, Contact, Certificates
└── index.css     # Design system with CSS variables

backend/src/
├── models/       # Mongoose schemas with TS interfaces
├── routes/       # Express routers with async handlers
├── middleware/   # JWT auth, error handling
└── index.ts      # Express app bootstrap with CORS
```

---

**Built with 💻 by Member 1 & Member 2**
