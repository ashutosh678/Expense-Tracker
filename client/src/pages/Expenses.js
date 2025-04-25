import React from "react";
import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	IconButton,
	CircularProgress,
	Chip,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useExpense } from "../context/ExpenseContext";
import { format } from "date-fns";

const Expenses = () => {
	const { expenses, loading, error, deleteExpense } = useExpense();
	const navigate = useNavigate();

	const handleEdit = (id) => {
		navigate(`/edit-expense/${id}`);
	};

	const handleDelete = async (id) => {
		if (window.confirm("Are you sure you want to delete this expense?")) {
			try {
				await deleteExpense(id);
			} catch (err) {
				console.error("Error deleting expense:", err);
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

	if (error) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="80vh"
			>
				<Typography color="error">{error}</Typography>
			</Box>
		);
	}

	return (
		<Box sx={{ flexGrow: 1, p: 3 }}>
			<Typography variant="h4" gutterBottom>
				Expenses
			</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Category</TableCell>
							<TableCell align="right">Amount</TableCell>
							<TableCell align="right">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{expenses.map((expense) => (
							<TableRow key={expense._id}>
								<TableCell>
									{format(new Date(expense.date), "MMM dd, yyyy")}
								</TableCell>
								<TableCell>{expense.description}</TableCell>
								<TableCell>
									<Chip
										label={expense.category}
										color="primary"
										variant="outlined"
										size="small"
									/>
								</TableCell>
								<TableCell align="right">
									${expense.amount.toFixed(2)}
								</TableCell>
								<TableCell align="right">
									<IconButton
										onClick={() => handleEdit(expense._id)}
										color="primary"
									>
										<EditIcon />
									</IconButton>
									<IconButton
										onClick={() => handleDelete(expense._id)}
										color="error"
									>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default Expenses;
