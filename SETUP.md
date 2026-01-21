# Local Setup Instructions

## Prerequisites
- Node.js (v20 or higher)
- PostgreSQL (if using database persistence)

## Installation
1. Clone the repository
2. Run `npm install` to install dependencies
3. Set up environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string (if using DB)
   - `SESSION_SECRET`: A random string for session security

## Running the Application
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser to `http://localhost:5000`

## Automatic Image Saving
When you generate images in the application, they are automatically sent to the server and saved in the `public/images` folder. You can find all your generated screenshots there in JPEG format.

## Folder Structure
- `client/`: Frontend React application
- `server/`: Backend Express server
- `shared/`: Shared types and schemas
- `public/images/`: Folder where generated screenshots are saved
