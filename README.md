# Expense Tracker

A modern, full-stack expense tracking application built with React and Node.js. Track your expenses with an intuitive interface, visualize spending patterns, and manage your financial data effectively.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Dashboard Overview**:
  - Total expenses and monthly averages
  - Category-wise expense distribution
  - Expense trends visualization
  - Recent activity tracking
- **Expense Management**:
  - Add, edit, and delete expenses
  - Categorize expenses
  - Add notes and dates to expenses
- **Data Visualization**:
  - Interactive pie charts for category distribution
  - Trend analysis with area charts
  - Monthly/Weekly/Yearly comparisons
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technology Stack

### Frontend

- **React**: ^18.2.0
- **Material-UI (MUI)**: ^5.x for modern UI components
- **Recharts**: For data visualization
- **Axios**: For API requests
- **React Router**: For navigation
- **Context API**: For state management

### Backend

- **Node.js**: ^16.x
- **Express**: ^4.x
- **TypeScript**: For type-safe development
- **MongoDB**: For database
- **JWT**: For authentication
- **bcrypt**: For password hashing

## 📁 Project Structure

```
expense-tracker/
├── client/                 # Frontend React application
│   ├── public/
│   └── src/
│       ├── components/     # Reusable components
│       ├── context/       # Context providers
│       ├── pages/         # Page components
│       ├── theme/         # MUI theme configuration
│       └── utils/         # Utility functions
└── server/                # Backend Node.js application
    ├── src/
    │   ├── controllers/   # Route controllers
    │   ├── models/        # Database models
    │   ├── routes/        # API routes
    │   └── middleware/    # Custom middleware
    └── config/            # Configuration files
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Environment Variables

1. Create `.env` file in the server directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

2. Create `.env` file in the client directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

2. Install server dependencies:

```bash
cd server
npm install
```

3. Install client dependencies:

```bash
cd ../client
npm install
```

### Running the Application

1. Start the server:

```bash
cd server
npm run dev
```

2. Start the client:

```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`

## 📝 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Expenses

- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Categories

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category

## 🔒 Authentication

The application uses JWT (JSON Web Tokens) for authentication. The token is stored in localStorage and included in the Authorization header for API requests.

## 📊 Data Models

### User

```typescript
{
	email: string;
	password: string;
	name: string;
	createdAt: Date;
}
```

### Expense

```typescript
{
	user: ObjectId;
	amount: number;
	category: string;
	date: Date;
	notes: string;
	createdAt: Date;
}
```

## 🎨 Theme Customization

The application uses Material-UI's theming system. Theme configuration can be found in `client/src/theme/theme.js`.

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop (1024px and above)
- Tablet (768px to 1023px)
- Mobile (below 768px)

## 🔐 Security Features

- Password hashing using bcrypt
- JWT for secure authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration
- Rate limiting

## 🚀 Deployment

### Frontend Deployment (e.g., to Netlify)

1. Build the client:

```bash
cd client
npm run build
```

2. Deploy the `build` folder

### Backend Deployment (e.g., to Heroku)

1. Create a Procfile in the server directory:

```
web: npm start
```

2. Deploy using Heroku CLI or GitHub integration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Material-UI for the amazing component library
- Recharts for the visualization components
- The MongoDB team for the excellent database
- The open-source community for inspiration and tools
