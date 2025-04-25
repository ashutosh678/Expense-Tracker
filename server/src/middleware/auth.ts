import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import BlacklistedToken from "../models/BlacklistedToken";

interface JwtPayload {
	id: string;
}

declare global {
	namespace Express {
		interface Request {
			user?: any;
		}
	}
}

export const protect = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		let token;

		if (req.headers.authorization?.startsWith("Bearer")) {
			token = req.headers.authorization.split(" ")[1];
		}

		if (!token) {
			res.status(401).json({ message: "Not authorized to access this route" });
			return;
		}

		// Check if token is blacklisted
		const isBlacklisted = await BlacklistedToken.findOne({ token });
		if (isBlacklisted) {
			res
				.status(401)
				.json({ message: "Token has been invalidated. Please login again." });
			return;
		}

		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET || "your-secret-key"
		) as JwtPayload;

		const user = await User.findById(decoded.id).select("-password");

		if (!user) {
			res.status(401).json({ message: "User not found" });
			return;
		}

		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({ message: "Not authorized to access this route" });
	}
};
