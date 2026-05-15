# Real-Time Polling Application 📊

A full-stack, real-time polling application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.io. 

This project features a completely custom-built authentication system (JWT via cookies), real-time live-updating dashboards, and the ability to generate shareable voting links with customizable access controls.

## ✨ Features

- **Custom Authentication**: Built-from-scratch stateless authentication using JWTs stored in HTTP-only cookies (no third-party black-box OAuth).
- **Real-Time Dashboard**: See new polls appear instantly without refreshing the page, powered by Socket.io.
- **Live Voting Results**: Watch vote counts tick up in real-time as users cast their ballots.
- **Access Control**: Poll creators can toggle whether a poll is open to the public (guests) or restricted to logged-in users only.
- **Shareable Links**: Generates unique URL slugs for easy sharing.
- **Double-Vote Prevention**: Backend logic explicitly prevents authenticated users from voting twice on the same poll.

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- React Router DOM
- Socket.io-client

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- Socket.io (WebSockets)
- JSON Web Tokens (JWT) & Cookie-Parser
- bcrypt (for password hashing)

---

## 📂 Project Structure

```text
polling-app/
├── server/                  # Node.js + Express API
│   ├── db/               # Database connection
│   ├── controllers/          # Route logic (Auth & Polls)
│   ├── middlewares/          # Custom JWT verification
│   ├── models/               # Mongoose Schemas (User, Poll)
│   ├── routes/               # API endpoints
│   |── app.js             # Entry point & Socket.io setup
│   |-- index.js 
└── frontend/                 # React Application
    ├── src/
    │   ├── components/       # Reusable UI elements
    │   ├── pages/            # Dashboard, CreatePoll, VotingPage, Auth
    │   └── App.jsx           # Routing logic
    └── vite.config.js        # Proxy configuration
```

## Installation and Setup 

```
 git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd polling-app
```

## Backend Setup

```
cd server
npm install
```

## Frontend Setup

```
cd client
npm install
```

