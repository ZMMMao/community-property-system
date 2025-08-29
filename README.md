# 🏘️ Community Property Management System (MVP)

This project is a **full-stack web application** designed to help residents and trustees manage community property issues, announcements, and scheduling.

---

## 🚀 Features

### 1. Dashboard & Announcements

- Trustees can post announcements (events, alerts, newsletters).
- Residents can view all announcements.

### 2. Discussion Board

- Residents can post messages about issues or general topics.
- Trustees can reply or moderate discussions.

### 3. Calendar & Scheduling

- Residents can reserve community rooms.
- Trustees can post maintenance schedules and community events.

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose ODM)
- **Auth**: JWT-based login with role-based access (resident vs trustee)

---

## 📦 Quick Start

### 1. Clone repo & install

```bash
git clone <your-repo-url>
cd community-property-system
npm install
```

### 2. Setup backend

```bash
cd server
cp .env.example .env   # configure MONGO_URI & JWT_SECRET
npm install
```

### 3. Seed the database (run once)

```bash
npm run seed
```

This will create default test accounts (trustee + resident).  
Run again only if you want to **reset or reseed** the database.

### 4. Start backend server (make sure directory at ../server)

```bash
npm run dev   # runs at http://localhost:4000
```

### 5. Start frontend

```bash
cd ../client
npm install
npm run dev   # runs at http://localhost:5173
```

---

## 👥 Seed Users

Preloaded accounts for testing (in MongoDB):

### Trustee -- preset trustee account for testing web

- **Email**: `trustee@example.com`
- **Password**: `trustee123`
- **Role**: `trustee`

---

## 🔑 Roles & Permissions

- **Resident**:

  - View announcements
  - Post discussions
  - Reserve rooms

- **Trustee**:
  - Post announcements
  - Manage events and scheduling
  - Assign tasks from issue reports

---

## 📌 Notes

- The project is an **MVP (minimum viable product)**.
- Focuses on 3 core modules: **Dashboard, Discussion, Calendar/Issue Reporting**.
- Future versions can add **Payments, Document Center, Real-time chat**.

---

## 📂 Project Structure

```
community-property-system/
├── client/     # React frontend
├── server/     # Express backend
│   ├── models/ # Mongoose schemas
│   ├── routes/ # API routes
│   ├── controllers/
├── README.md
```
