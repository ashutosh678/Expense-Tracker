import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/database";
import expenseRoutes from "./routes/expenseRoutes";
import authRoutes from "./routes/authRoutes";
import { protect } from "./middleware/auth";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Additional CORS headers middleware
app.use(
	cors({
		origin: process.env.CLIENT_URL || "http://localhost:3000",
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

// Basic security middleware
app.use(
	helmet({
		crossOriginResourcePolicy: false,
		crossOriginOpenerPolicy: false,
	})
);

// Logging middleware
app.use(morgan("dev"));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", protect, expenseRoutes);

// Basic route
app.get("/", (req, res) => {
	res.send("Expense Tracker API is running");
});

// Error handling middleware
app.use(
	(
		err: Error,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		console.error("Error:", err.message);
		console.error("Stack:", err.stack);
		res.status(500).json({
			message: "Something went wrong!",
			error: process.env.NODE_ENV === "development" ? err.message : undefined,
		});
	}
);

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
