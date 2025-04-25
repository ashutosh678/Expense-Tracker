import React, { useState, useEffect } from "react";
import {
	Box,
	Paper,
	Typography,
	TextField,
	Button,
	MenuItem,
	Grid,
	CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate, useParams } from "react-router-dom";
import { useExpense } from "../context/ExpenseContext";

const categories = [
	"Food",
	"Transportation",
	"Housing",
	"Utilities",
	"Entertainment",
	"Shopping",
	"Healthcare",
	"Education",
	"Other",
];

const EditExpense = () => {
	const { id } = useParams();
	const [formData, setFormData] = useState({
		amount: "",
		category: "",
		description: "",
		date: new Date(),
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(true);
	const { getExpenseById, updateExpense } = useExpense();
	const navigate = useNavigate();

	useEffect(() => {
		const expense = getExpenseById(id);
		if (expense) {
			setFormData({
				amount: expense.amount.toString(),
				category: expense.category,
				description: expense.description,
				date: new Date(expense.date),
			});
		}
		setLoading(false);
	}, [id, getExpenseById]);

	const validateForm = () => {
		const newErrors = {};
		if (!formData.amount || formData.amount <= 0) {
			newErrors.amount = "Amount must be greater than 0";
		}
		if (!formData.category) {
			newErrors.category = "Category is required";
		}
		if (!formData.description) {
			newErrors.description = "Description is required";
		}
		if (!formData.date) {
			newErrors.date = "Date is required";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleDateChange = (date) => {
		setFormData((prev) => ({
			...prev,
			date,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateForm()) {
			try {
				await updateExpense(id, {
					...formData,
					amount: parseFloat(formData.amount),
				});
				navigate("/expenses");
			} catch (err) {
				console.error("Error updating expense:", err);
			}
		}
	};

	if (loading) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="80vh"
			>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box sx={{ flexGrow: 1, p: 3 }}>
			<Typography variant="h4" gutterBottom>
				Edit Expense
			</Typography>
			<Paper sx={{ p: 3 }}>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								label="Amount"
								name="amount"
								type="number"
								value={formData.amount}
								onChange={handleChange}
								error={!!errors.amount}
								helperText={errors.amount}
								InputProps={{
									startAdornment: "$",
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								select
								label="Category"
								name="category"
								value={formData.category}
								onChange={handleChange}
								error={!!errors.category}
								helperText={errors.category}
							>
								{categories.map((category) => (
									<MenuItem key={category} value={category}>
										{category}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Description"
								name="description"
								value={formData.description}
								onChange={handleChange}
								error={!!errors.description}
								helperText={errors.description}
								multiline
								rows={3}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<DatePicker
								label="Date"
								value={formData.date}
								onChange={handleDateChange}
								renderInput={(params) => (
									<TextField
										{...params}
										fullWidth
										error={!!errors.date}
										helperText={errors.date}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								size="large"
							>
								Update Expense
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Box>
	);
};

export default EditExpense;
