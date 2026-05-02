# SCOS Backend API 

## Project Overview

SCOS Backend is a Node.js + Express + PostgreSQL based backend system designed for a School / Institute Context Operating System.

This project manages:

* Users
* Authentication (Login + JWT)
* Tenants
* Institutes
* Roles
* User Institute Role Mapping
* Context Based Access Flow

The backend follows a clean MVC architecture:

* Models → Database queries
* Controllers → Business logic
* Routes → API endpoints
* Middleware → Authentication + Error handling
* Utils → Token generation

---

# Tech Stack

## Backend

* Node.js
* Express.js
* PostgreSQL
* JWT Authentication
* bcrypt Password Hashing
* dotenv
* CORS

---

# Project Structure

```bash
SCOS_Backend-main/
│
├── src/
│   ├── config/
│   │   └── db.js                  # PostgreSQL connection setup
│   │
│   ├── controllers/
│   │   ├── auth.controller.js      # Login, institute-role fetch, context select
│   │   ├── user.controller.js      # User creation
│   │   ├── tenant.controller.js    # Tenant APIs
│   │   ├── institute.controller.js # Institute APIs
│   │   ├── role.controller.js      # Role APIs
│   │   └── mapping.controller.js   # User-Institute-Role mapping APIs
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js      # JWT verification
│   │   └── error.middleware.js     # Global error handler
│   │
│   ├── models/
│   │   ├── auth.model.js
│   │   ├── user.model.js
│   │   ├── tenant.model.js
│   │   ├── institute.model.js
│   │   ├── role.model.js
│   │   └── mapping.model.js
│   │
│   ├── public/images/              # Static logos/images
│   │
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── user.route.js
│   │   ├── tenant.route.js
│   │   ├── institute.route.js
│   │   ├── role.route.js
│   │   └── mapping.route.js
│   │
│   ├── route_manager/
│   │   └── index.js                # Central route manager
│   │
│   ├── utils/
│   │   └── generateToken.js        # JWT token generation
│   │
│   ├── app.js                      # Express app config
│   └── server.js                   # Server startup
│
├── package.json
└── README.md
```

---

# Installation Guide

## Step 1: Clone Repository

```bash
git clone <repository-url>
cd SCOS_Backend-main
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Create .env File
---

# Run Project

## Development Mode

```bash
npm run dev
```

## Production Mode

```bash
npm start
```

Server runs on:

```bash
http://localhost:3000
```

---

# Database Connection Logic

## db.js Features:

* Uses PostgreSQL Pool
* Auto detects local vs production
* Render deployment SSL support
* Environment based configuration

## Production Check:

```js
const isProduction = process.env.DATABASE_URL.includes("dpg-");
```

---

# Authentication Flow (Important)

## Phase 1: Login

### Endpoint:

```bash
POST /api/auth/login
```

## Purpose:

* Validates email
* Validates password
* Returns Pre-Context Token

---

## Phase 2: Get User Institutes + Roles

### Endpoint:

```bash
GET /api/auth/my-institutes-roles
```

### Header:

```bash
Authorization: Bearer PRE_CONTEXT_TOKEN
```

## Purpose:

Returns:

* Tenant
* Institute
* Role
* Institute Logo
* Role Icon

---

## Phase 3: Select Context

### Endpoint:

```bash
POST /api/auth/select-context
```
## Purpose:

Creates final token for selected:

* Tenant
* Institute
* Role

---

# JWT Token Types

## Pre Context Token:

Used after login only.

Contains:

* user_id
* email
* token_type = pre_context

## Access Token:

Used after institute + role selection.

Contains:

* user_id
* tenant_id
* institute_id
* role_id
* token_type = access

---

# Core API Modules

# 1. Users API

## Create User

```bash
POST /api/users
```

### Features:

* Password hashing using bcrypt
* Stores user data securely

---

# 2. Tenant API

## Create Tenant

```bash
POST /api/tenants
```

## Get Tenants

```bash
GET /api/tenants
```

---

# 3. Institute API

## Create Institute

```bash
POST /api/institutes
```

## Get Institutes

```bash
GET /api/institutes
```

---

# 4. Role API

## Create Role

```bash
POST /api/roles
```

## Get Roles

```bash
GET /api/roles
```

## Delete Role

```bash
DELETE /api/roles/:id
```

---

# 5. User Institute Role Mapping API

## Create Mapping

```bash
POST /api/user-institute-roles
```

## Get User Mapping

```bash
GET /api/user-institute-roles/:user_id
```

---

# Route Manager

All routes are centrally controlled from:

```bash
src/route_manager/index.js
```

Base Route:

```bash
/api
```

Examples:

```bash
/api/users
/api/roles
/api/tenants
/api/institutes
/api/auth
```

---

# Middleware

## auth.middleware.js

### Purpose:

* Verifies JWT token
* Protects private routes

### Error Cases:

* Token missing
* Invalid token

---

## error.middleware.js

### Purpose:

* Centralized error handling
* Returns standard JSON response

---

# Security Features

## bcrypt:

* Password hashing
* Salt rounds: 10

## JWT:

* 8 hour expiry
* Token based auth

---

# Testing with Postman

## Recommended Order:

1. Create Tenant
2. Create Institute
3. Create Role
4. Create User
5. Create Mapping
6. Login
7. Fetch Institutes/Roles
8. Select Context

---

# Deployment

## Render Ready:

Because:

* PostgreSQL cloud support
* SSL support
* Environment config

---

# Author Notes

This backend is ideal for:

* School ERP
* Multi-tenant systems
* Institute management
* Role based dashboards
* Context based login systems

---

# Final Summary

SCOS Backend provides a strong foundation for:

## Main Strengths:

* Clean MVC
* PostgreSQL integration
* JWT authentication
* Multi-role support
* Tenant + Institute architecture
* Context aware login

## Best Use Case:

A scalable school or organization management system where one user can operate in multiple institutes with multiple roles.
