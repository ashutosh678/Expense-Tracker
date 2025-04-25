import mongoose, { Document, Schema } from "mongoose";

export interface IExpense extends Document {
	amount: number;
	category: string;
	description: string;
	date: Date;
	userId: mongoose.Types.ObjectId;
}

const ExpenseSchema: Schema = new Schema(
	{
		amount: {
			type: Number,
			required: [true, "Amount is required"],
			min: [0, "Amount cannot be negative"],
		},
		category: {
			type: String,
			required: [true, "Category is required"],
			trim: true,
		},
		description: {
			type: String,
			required: [true, "Description is required"],
			trim: true,
		},
		date: {
			type: Date,
			required: [true, "Date is required"],
			default: Date.now,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "User ID is required"],
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<IExpense>("Expense", ExpenseSchema);
