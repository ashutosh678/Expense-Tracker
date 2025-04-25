# Expense Tracker Backend

A TypeScript-based backend for the Expense Tracker application using Express.js and MongoDB.

## Features

- RESTful API endpoints for expense management
- MongoDB database integration
- TypeScript for type safety
- Security middleware (helmet, cors)
- Request logging (morgan)

## API Endpoints

- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create a new expense
- `PUT /api/expenses/:id` - Update an expense
- `DELETE /api/expenses/:id` - Delete an expense

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/expense-tracker
   NODE_ENV=development
   ```
4. Start MongoDB server

## Running the Application

Development mode:

```bash
npm run dev
```

Build and run in production:

```bash
npm run build
npm start
```

## API Documentation

### Create Expense

```http
POST /api/expenses
Content-Type: application/json

{
  "amount": 100,
  "category": "Food",
  "description": "Lunch",
  "date": "2024-04-25"
}
```

### Get All Expenses

```http
GET /api/expenses
```

### Update Expense

```http
PUT /api/expenses/:id
Content-Type: application/json

{
  "amount": 150,
  "category": "Food",
  "description": "Dinner",
  "date": "2024-04-25"
}
```

### Delete Expense

```http
DELETE /api/expenses/:id
```
