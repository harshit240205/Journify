# Journify Frontend

A modern React TypeScript frontend for the Journify Journal Management System.

## Features

- 🔐 User authentication (Login/Signup)
- 📝 Journal entry management (Create, Read, Update, Delete)
- 👤 User profile management
- 🎨 Modern and responsive UI
- 🔒 Protected routes
- 📱 Mobile-friendly design

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure API URL (optional):
Create a `.env` file in the Frontend directory:
```
REACT_APP_API_URL=http://localhost:8080/journal
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Backend Configuration

Make sure your backend is running on `http://localhost:8080` (or update the API URL in the `.env` file).

The backend should have CORS enabled to allow requests from the frontend.

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (irreversible)

## Project Structure

```
src/
  components/     # React components
  context/        # React context (Auth)
  services/       # API service layer
  types/          # TypeScript type definitions
  App.tsx         # Main app component
  index.tsx       # Entry point
```

## API Endpoints

The frontend communicates with the following backend endpoints:

- `POST /public/login` - User login
- `POST /public/signup` - User registration
- `GET /journal` - Get all journal entries
- `POST /journal` - Create journal entry
- `GET /journal/id/{id}` - Get journal entry by ID
- `PUT /journal/id/{id}` - Update journal entry
- `DELETE /journal/id/{id}` - Delete journal entry
- `GET /user` - Get user greeting
- `DELETE /user` - Delete user account

