import React, { useState } from "react";
import {
	Box,
	Paper,
	Typography,
	TextField,
	Button,
	MenuItem,
	Grid,
	Alert,
	CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
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

const AddExpense = () => {
	const [formData, setFormData] = useState({
		amount: "",
		category: "",
		description: "",
		date: new Date(),
	});
	const [errors, setErrors] = useState({});
	const [submitError, setSubmitError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { addExpense } = useExpense();
	const navigate = useNavigate();

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
		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
		// Clear submit error when user makes changes
		if (submitError) {
			setSubmitError("");
		}
	};

	const handleDateChange = (newDate) => {
		setFormData((prev) => ({
			...prev,
			date: newDate,
		}));
		if (errors.date) {
			setErrors((prev) => ({
				...prev,
				date: "",
			}));
		}
		if (submitError) {
			setSubmitError("");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateForm()) {
			try {
				setIsSubmitting(true);
				setSubmitError("");
				console.log("Submitting expense:", formData); // Debug log
				await addExpense({
					...formData,
					amount: parseFloat(formData.amount),
				});
				navigate("/expenses");
			} catch (err) {
				console.error("Error details:", err);
				setSubmitError(
					err.message || "Failed to add expense. Please try again."
				);
			} finally {
				setIsSubmitting(false);
			}
		}
	};

	return (
		<Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
			<Paper sx={{ p: 4 }}>
				<Typography variant="h5" gutterBottom>
					Add New Expense
				</Typography>
				{submitError && (
					<Alert severity="error" sx={{ mb: 2 }}>
						{submitError}
					</Alert>
				)}
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
								disabled={isSubmitting}
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
								disabled={isSubmitting}
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
								disabled={isSubmitting}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<DatePicker
								label="Date"
								value={formData.date}
								onChange={handleDateChange}
								disabled={isSubmitting}
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
								fullWidth
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<>
										<CircularProgress size={24} sx={{ mr: 1 }} />
										Adding Expense...
									</>
								) : (
									"Add Expense"
								)}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Box>
	);
};

export default AddExpense;
