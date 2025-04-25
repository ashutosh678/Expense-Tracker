import mongoose, { Document, Schema } from "mongoose";

export interface IBlacklistedToken extends Document {
	token: string;
	expiresAt: Date;
}

const BlacklistedTokenSchema: Schema = new Schema(
	{
		token: {
			type: String,
			required: true,
			unique: true,
		},
		expiresAt: {
			type: Date,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

// Create TTL index to automatically remove expired tokens
BlacklistedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<IBlacklistedToken>(
	"BlacklistedToken",
	BlacklistedTokenSchema
);
