import { Request, Response } from "express";
import Expense, { IExpense } from "../models/Expense";

// Get all expenses for the logged-in user
export const getExpenses = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const expenses = await Expense.find({ userId: req.user._id }).sort({
			date: -1,
		});
		res.status(200).json(expenses);
	} catch (error) {
		res.status(500).json({ message: "Error fetching expenses", error });
	}
};

// Add new expense for the logged-in user
export const addExpense = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { amount, category, description, date } = req.body;
		const expense = new Expense({
			amount,
			category,
			description,
			date: date || new Date(),
			userId: req.user._id,
		});
		const savedExpense = await expense.save();
		res.status(201).json(savedExpense);
	} catch (error) {
		res.status(400).json({ message: "Error creating expense", error });
	}
};

// Update expense (only if it belongs to the logged-in user)
export const updateExpense = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { id } = req.params;
		const { amount, category, description, date } = req.body;

		const expense = await Expense.findOne({ _id: id, userId: req.user._id });
		if (!expense) {
			res.status(404).json({ message: "Expense not found or not authorized" });
			return;
		}

		const updatedExpense = await Expense.findByIdAndUpdate(
			id,
			{ amount, category, description, date },
			{ new: true, runValidators: true }
		);
		res.status(200).json(updatedExpense);
	} catch (error) {
		res.status(400).json({ message: "Error updating expense", error });
	}
};

// Delete expense (only if it belongs to the logged-in user)
export const deleteExpense = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { id } = req.params;

		const expense = await Expense.findOne({ _id: id, userId: req.user._id });
		if (!expense) {
			res.status(404).json({ message: "Expense not found or not authorized" });
			return;
		}

		await Expense.findByIdAndDelete(id);
		res.status(200).json({ message: "Expense deleted successfully" });
	} catch (error) {
		res.status(400).json({ message: "Error deleting expense", error });
	}
};
