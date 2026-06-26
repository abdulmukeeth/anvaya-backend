# Anvaya — Backend

> REST API for the Anvaya Sales CRM — built with Node.js, Express, and MongoDB.

---

## 📌 Project Overview

This is the **backend** for Anvaya, a Sales CRM application. It provides a RESTful API that the React frontend consumes to manage:

- **Leads** — create, read, update, delete, and filter
- **Sales Agents** — create, read, delete
- **Comments** — add and fetch activity notes per lead
- **Reports** — aggregated pipeline and performance data

All data is stored in **MongoDB** via **Mongoose** ODM.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Node.js](https://nodejs.org) | JavaScript runtime — runs the server |
| [Express.js](https://expressjs.com) | Web framework — handles routing and middleware |
| [MongoDB](https://www.mongodb.com) | NoSQL database — stores leads, agents, comments |
| [Mongoose](https://mongoosejs.com) | ODM — defines schemas and queries MongoDB |
| [CORS](https://www.npmjs.com/package/cors) | Allows the frontend (different domain) to call the API |
| [dotenv](https://www.npmjs.com/package/dotenv) | Loads environment variables from `.env` file |
| [Vercel](https://vercel.com) | Serverless deployment |

---

## 📁 Folder Structure

```
anvaya-backend/
├── controllers/
│   ├── agentController.js      # CRUD logic for sales agents
│   ├── commentController.js    # Add and fetch comments
│   ├── leadController.js       # CRUD + filter logic for leads
│   └── reportController.js     # Aggregation queries for reports
├── models/
│   ├── comment.js              # Comment schema
│   ├── lead.js                 # Lead schema
│   └── salesAgent.js           # SalesAgent schema
├── routes/
│   ├── agentRoutes.js          # /agents endpoints
│   ├── leadRoutes.js           # /leads endpoints
│   └── reportRoutes.js         # /report endpoints
├── db/
│   └── db.connect.js           # MongoDB connection setup
├── server.js                   # Entry point
├── vercel.json                 # Vercel serverless config
├── .env                        # Secret config (not committed)
├── .gitignore
└── package.json
```

---

## 📡 API Reference

### Agents

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/agents` | Get all sales agents |
| `POST` | `/agents` | Create a new agent |
| `DELETE` | `/agents/:id` | Delete an agent |

### Leads

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/leads` | Get all leads — supports `?status=`, `?salesAgent=`, `?source=` filters |
| `POST` | `/leads` | Create a new lead |
| `GET` | `/leads/:id` | Get a single lead by ID |
| `PUT` | `/leads/:id` | Update a lead |
| `DELETE` | `/leads/:id` | Delete a lead |

### Comments

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/leads/:id/comments` | Get all comments for a lead |
| `POST` | `/leads/:id/comments` | Add a comment to a lead |

### Reports

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/report/pipeline` | Active lead count grouped by status |
| `GET` | `/report/last-week` | Leads closed in the past 7 days |
| `GET` | `/report/closed-by-agent` | Closed lead count per agent |
| `GET` | `/report/status-distribution` | All leads grouped by status |

---

## ⚙️ Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org) v18 or above
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier works perfectly)

### Steps

**1. Clone the repository**

```bash
git clone https://github.com/abdulmukeeth/anvaya-backend.git
cd anvaya-backend
```

**2. Install dependencies**

```bash
npm install
```

**3. Create your `.env` file**

Create a file named `.env` in the root of the project:

```env
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/anvaya
PORT=3000
```

> ⚠️ Never commit your `.env` file. It's already in `.gitignore`.

**4. Start the development server**

```bash
node server.js
```

The API will be running at `http://localhost:3000`

Test it by visiting `http://localhost:3000` — you should see:

```
Anvaya App Backend is Running
```

---

## 🌱 Data Models

### Lead

```js
{
  name:        String,         // required
  source:      String,         // "Website" | "Referral" | "Cold Call" | ...
  salesAgent:  ObjectId,       // ref → SalesAgent
  status:      String,         // "New" | "Contacted" | "Qualified" | "Proposal Sent" | "Closed"
  priority:    String,         // "High" | "Medium" | "Low"
  timeToClose: Number,         // days — must be >= 1
  tags:        [String],       // e.g. ["High Value", "Follow-up"]
  createdAt:   Date,
  updatedAt:   Date,
  closedAt:    Date,           // auto-set when status → "Closed"
}
```

### SalesAgent

```js
{
  name:      String,   // required
  email:     String,   // required, unique
  createdAt: Date,
}
```

### Comment

```js
{
  lead:        ObjectId,   // ref → Lead
  author:      ObjectId,   // ref → SalesAgent
  commentText: String,     // required
  createdAt:   Date,
}
```

---

## 🚀 Deployment (Vercel)

**1. Add `vercel.json` to the backend root:**

```json
{
  "version": 2,
  "builds": [{ "src": "server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "server.js" }]
}
```

**2. Push to GitHub**

**3. Go to [vercel.com](https://vercel.com) → New Project → Import repo**

**4. Add Environment Variables in Vercel dashboard:**

```
MONGO_URI = mongodb+srv://...your connection string...
```

**5. Deploy** — your API goes live at `https://anvaya-backend-five.vercel.app/`

---

## 🔗 Related

- [Anvaya Frontend Repository](https://github.com/abdulmukeeth/anvaya-frontend)
- [Live Demo](https://anvaya-seven.vercel.app/)

---

## 👤 Author

Built by **Abdul Mukeeth**
