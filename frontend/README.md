# Full-Stack To-Do List Application

A full-stack to-do list application using TypeScript, React.js (frontend), Node.js (backend), MQTT for task creation, Redis for caching, and MongoDB for persistent storage.

## Features

- Add tasks via MQTT messaging system
- Store tasks in Redis (caching up to 50 items)
- Automatically move tasks to MongoDB for persistent storage
- Retrieve tasks via HTTP API
- Clean, responsive UI following the Figma design

## Project Structure

```
project/
├── backend/            # Node.js backend
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # MongoDB schemas
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   └── index.ts      # Entry point
│   ├── .env             # Environment variables
│   ├── package.json
│   └── tsconfig.json
├── src/                # React frontend
│   ├── components/     # UI components
│   ├── services/       # API and MQTT clients
│   ├── types/          # TypeScript interfaces
│   ├── App.tsx         # Main component
│   └── main.tsx        # Entry point
├── docker-compose.yml  # Docker configuration
└── README.md           # Documentation
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose (for containerized setup)
- An MQTT broker (default: broker.hivemq.com)
- MongoDB (local or Atlas)
- Redis

### Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/taskapp
REDIS_URL=redis://localhost:6379
MQTT_BROKER_URL=mqtt://broker.hivemq.com
```

### Running Locally

1. **Start the backend:**

```bash
cd backend
npm install
npm run dev
```

2. **Start the frontend:**

```bash
npm install
npm run dev
```

### Running with Docker

```bash
docker-compose up -d
```

## API Documentation

### HTTP Endpoints

- `GET /fetchAllTasks` - Returns all tasks from Redis or MongoDB
- `GET /health` - Health check endpoint

### MQTT Topics

- `/add` - Topic for adding new tasks (JSON format: `{ "task": "Your task here" }`)

## Technologies Used

- **Frontend:** React.js, TypeScript, Vite, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB with Mongoose
- **Cache:** Redis with ioredis
- **Messaging:** MQTT
- **Containerization:** Docker and Docker Compose