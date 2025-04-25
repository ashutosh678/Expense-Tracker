import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import BlacklistedToken from "../models/BlacklistedToken";
import jwt from "jsonwebtoken";

const generateToken = (id: string): string => {
	return jwt.sign({ id }, process.env.JWT_SECRET || "your-secret-key", {
		expiresIn: "30d",
	});
};

export const register = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password, name } = req.body;

		// Check if user already exists
		const userExists = await User.findOne({ email });
		if (userExists) {
			res.status(400).json({ message: "User already exists" });
			return;
		}

		// Create user
		const user: IUser = await User.create({
			name,
			email,
			password,
		});

		if (user) {
			res.status(201).json({
				_id: user._id.toString(),
				name: user.name,
				email: user.email,
				token: generateToken(user._id.toString()),
			});
		}
	} catch (error) {
		res.status(400).json({ message: "Invalid user data", error });
	}
};

export const login = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password } = req.body;

		// Check for user email
		const user: IUser | null = await User.findOne({ email }).select(
			"+password"
		);
		if (!user) {
			res.status(401).json({ message: "Invalid credentials" });
			return;
		}

		// Check if password matches
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			res.status(401).json({ message: "Invalid credentials" });
			return;
		}

		res.json({
			_id: user._id.toString(),
			name: user.name,
			email: user.email,
			token: generateToken(user._id.toString()),
		});
	} catch (error) {
		res.status(400).json({ message: "Invalid credentials", error });
	}
};

export const logout = async (req: Request, res: Response): Promise<void> => {
	try {
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			res.status(400).json({ message: "No token provided" });
			return;
		}

		// Decode token to get expiration time
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET || "your-secret-key"
		) as jwt.JwtPayload;

		// Add token to blacklist
		await BlacklistedToken.create({
			token,
			expiresAt: new Date(decoded.exp! * 1000), // Convert Unix timestamp to Date
		});

		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		res.status(400).json({ message: "Error during logout", error });
	}
};
