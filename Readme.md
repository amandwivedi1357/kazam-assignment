# Kazam Task Management Application

## Project Overview
Kazam is a comprehensive task management application designed to help users efficiently organize and track their tasks.

## Live Links
- **Frontend**: [https://kazam-phi.vercel.app/](https://kazam-phi.vercel.app/)
- **Backend**: [https://kazam-assignment-rl20.onrender.com](https://kazam-assignment-rl20.onrender.com)

## Tech Stack
### Frontend
- React
- TypeScript
- Tailwind CSS
- MQTT for real-time communication

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Features
- Create, Read, Update, and Delete (CRUD) tasks
- Real-time task synchronization
- Responsive design
- Intuitive user interface

## Project Structure
```
kazam1/
│
├── frontend/                # React frontend application
│   ├── public/              # Public assets
│   └── src/
│       ├── components/      # React components
│       ├── services/        # API and MQTT services
│       └── types/           # TypeScript type definitions
│
└── backend/                 # Node.js backend application
    ├── src/
    │   ├── controllers/     # Route handlers
    │   ├── models/          # Mongoose data models
    │   ├── routes/          # API route definitions
    │   └── services/        # Business logic services
```

## Local Development

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- MongoDB

### Frontend Setup
1. Navigate to the frontend directory
2. Install dependencies: `npm install`
3. Start development server: `npm start`

### Backend Setup
1. Navigate to the backend directory
2. Install dependencies: `npm install`
3. Set up environment variables
4. Start server: `npm run dev`

## Deployment
- Frontend deployed on Vercel
- Backend deployed on Render

