# Fullstack Project

This is a fullstack project consisting of a **Node.js backend** and a **React frontend**. The backend interacts with a PostgreSQL database, while the frontend provides a user interface for interacting with the backend.

## Requirements

- Node.js (version 14+)
- PostgreSQL
- npm

## Setting up the Backend

1. **Navigate to the backend directory:**

```bash
   cd backend
   npm install
```

2. **.Create a .env file in the /backend folder: Create a file named .env in the backend directory with the following content:**

```bash
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=<user>
    DB_PASSWORD=<password>
    DB_INIT=postgres
    DB_NAME=USERDOT
```

3. **Run the backend server:**

```bash
    npm start
```

The backend will run at http://localhost:3000

## Setting up the Frontend

1. **Navigate to the frontend directory:**

```bash
    cd frontend
```

1. **Navigate to the frontend directory:**

```bash
    npm install
```

1. **Navigate to the frontend directory:**

```bash
    npm run dev
```

The frontend will run at http://localhost:5173
