import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
	_id: mongoose.Types.ObjectId;
	email: string;
	password: string;
	name: string;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

interface IUserModel extends Model<IUser> {
	// Add any static methods here if needed
}

const UserSchema: Schema = new Schema(
	{
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			lowercase: true,
			trim: true,
			match: [
				/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
				"Please enter a valid email",
			],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [6, "Password must be at least 6 characters long"],
			select: false,
		},
		name: {
			type: String,
			required: [true, "Name is required"],
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(this.password as string, salt);
		this.password = hashedPassword;
		next();
	} catch (error: any) {
		next(error);
	}
});

// Method to compare password
UserSchema.methods.comparePassword = async function (
	candidatePassword: string
): Promise<boolean> {
	return bcrypt.compare(candidatePassword, this.password as string);
};

export default mongoose.model<IUser, IUserModel>("User", UserSchema);
