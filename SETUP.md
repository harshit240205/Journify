# Journify Frontend Setup Guide

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on `http://localhost:8080`

## Installation Steps

1. **Navigate to the Frontend directory:**
   ```bash
   cd Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment (optional):**
   Create a `.env` file in the Frontend directory if you need to change the API URL:
   ```
   REACT_APP_API_URL=http://localhost:8080/journal
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`

## Backend Configuration

### CORS Setup
The backend has been configured to allow requests from:
- `http://localhost:3000` (default React dev server)
- `http://localhost:3001` (alternate port)

If you need to use a different port, update the CORS configuration in:
`Backend/src/main/java/net/engineeringdigest/journalApp/config/SpringSecurity.java`

### Backend Endpoints
The backend should be running with context path `/journal`, so all endpoints are prefixed:
- Base URL: `http://localhost:8080/journal`
- Login: `POST /public/login`
- Signup: `POST /public/signup`
- Journal entries: `GET /journal`
- Create entry: `POST /journal`
- Update entry: `PUT /journal/id/{id}`
- Delete entry: `DELETE /journal/id/{id}`
- User greeting: `GET /user`

## Features

### Authentication
- **Login**: Users can log in with username and password
- **Signup**: New users can create an account
- **JWT Token**: Authentication uses JWT tokens stored in localStorage
- **Protected Routes**: Journal and profile pages require authentication

### Journal Management
- **View Entries**: See all journal entries in a grid layout
- **Create Entry**: Add new journal entries with title and content
- **Edit Entry**: Update existing journal entries
- **Delete Entry**: Remove journal entries with confirmation
- **Sentiment Badges**: Display sentiment analysis results (if enabled)

### User Profile
- **View Greeting**: See personalized greeting with weather information
- **Delete Account**: Remove user account (with confirmation)
- **Logout**: Sign out from the application

## Troubleshooting

### CORS Errors
If you see CORS errors in the browser console:
1. Verify the backend is running
2. Check that the frontend URL is in the allowed origins list
3. Restart the backend server after CORS configuration changes

### Authentication Issues
If you can't log in:
1. Verify the backend is running on the correct port
2. Check the API URL in `.env` file
3. Verify the backend endpoints are accessible
4. Check browser console for error messages

### API Connection Issues
If API calls are failing:
1. Verify the backend server is running
2. Check the API base URL in the `.env` file
3. Verify the backend context path is `/journal`
4. Check browser network tab for request/response details

## Development

### Project Structure
```
Frontend/
  src/
    components/     # React components
      Login.tsx
      Signup.tsx
      JournalList.tsx
      JournalEditor.tsx
      Profile.tsx
      ProtectedRoute.tsx
    context/        # React context
      AuthContext.tsx
    services/       # API service
      api.ts
    types/          # TypeScript types
      index.ts
    App.tsx         # Main app component
    index.tsx       # Entry point
```

### Building for Production
```bash
npm run build
```

This creates an optimized production build in the `build` directory.

## Notes

- The application uses React Router for navigation
- JWT tokens are stored in localStorage
- The app automatically redirects to login if authentication fails
- All API calls include the JWT token in the Authorization header
- The UI is responsive and works on mobile devices

