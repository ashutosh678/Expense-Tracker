import React, { createContext, useState, useContext, useEffect } from "react";
import { expenseService } from "../services/api";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
	const [expenses, setExpenses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchExpenses();
	}, []);

	const fetchExpenses = async () => {
		try {
			setLoading(true);
			setError(null);
			const data = await expenseService.getExpenses();
			setExpenses(data);
		} catch (err) {
			console.error("Error fetching expenses:", err);
			setError(err.message || "Failed to fetch expenses");
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const addExpense = async (expense) => {
		try {
			setError(null);
			console.log("Adding expense in context:", expense); // Debug log
			const newExpense = await expenseService.addExpense(expense);
			console.log("Response from server:", newExpense); // Debug log
			setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
			return newExpense;
		} catch (err) {
			console.error("Error adding expense in context:", err);
			const errorMessage = err.message || "Failed to add expense";
			setError(errorMessage);
			throw new Error(errorMessage);
		}
	};

	const updateExpense = async (id, expense) => {
		try {
			setError(null);
			const updatedExpense = await expenseService.updateExpense(id, expense);
			setExpenses((prevExpenses) =>
				prevExpenses.map((exp) => (exp._id === id ? updatedExpense : exp))
			);
			return updatedExpense;
		} catch (err) {
			console.error("Error updating expense:", err);
			const errorMessage = err.message || "Failed to update expense";
			setError(errorMessage);
			throw new Error(errorMessage);
		}
	};

	const deleteExpense = async (id) => {
		try {
			setError(null);
			await expenseService.deleteExpense(id);
			setExpenses((prevExpenses) =>
				prevExpenses.filter((exp) => exp._id !== id)
			);
		} catch (err) {
			console.error("Error deleting expense:", err);
			const errorMessage = err.message || "Failed to delete expense";
			setError(errorMessage);
			throw new Error(errorMessage);
		}
	};

	const getExpenseById = (id) => {
		return expenses.find((expense) => expense._id === id);
	};

	const getExpensesByCategory = () => {
		const categoryMap = {};
		expenses.forEach((expense) => {
			if (!categoryMap[expense.category]) {
				categoryMap[expense.category] = 0;
			}
			categoryMap[expense.category] += expense.amount;
		});
		return categoryMap;
	};

	const getMonthlyExpenses = () => {
		const monthlyMap = {};
		expenses.forEach((expense) => {
			const month = new Date(expense.date).toLocaleString("default", {
				month: "long",
				year: "numeric",
			});
			if (!monthlyMap[month]) {
				monthlyMap[month] = 0;
			}
			monthlyMap[month] += expense.amount;
		});
		return monthlyMap;
	};

	const value = {
		expenses,
		loading,
		error,
		addExpense,
		updateExpense,
		deleteExpense,
		getExpenseById,
		getExpensesByCategory,
		getMonthlyExpenses,
		fetchExpenses,
	};

	return (
		<ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
	);
};

export const useExpense = () => {
	const context = useContext(ExpenseContext);
	if (context === undefined) {
		throw new Error("useExpense must be used within an ExpenseProvider");
	}
	return context;
};
