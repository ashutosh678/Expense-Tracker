import React from "react";
import { Box, Grid, Paper, Typography, CircularProgress } from "@mui/material";
import {
	PieChart,
	Pie,
	Cell,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { useExpense } from "../context/ExpenseContext";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const Dashboard = () => {
	const { loading, error, getExpensesByCategory, getMonthlyExpenses } =
		useExpense();

	const categoryData = Object.entries(getExpensesByCategory()).map(
		([name, value]) => ({ name, value })
	);

	const monthlyData = Object.entries(getMonthlyExpenses()).map(
		([name, value]) => ({ name, value })
	);

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
				Expense Dashboard
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<Paper sx={{ p: 2, height: 400 }}>
						<Typography variant="h6" gutterBottom>
							Expenses by Category
						</Typography>
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									data={categoryData}
									cx="50%"
									cy="50%"
									labelLine={false}
									outerRadius={80}
									fill="#8884d8"
									dataKey="value"
									label={({ name, percent }) =>
										`${name} ${(percent * 100).toFixed(0)}%`
									}
								>
									{categoryData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Tooltip />
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper sx={{ p: 2, height: 400 }}>
						<Typography variant="h6" gutterBottom>
							Monthly Expenses
						</Typography>
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={monthlyData}
								margin={{
									top: 5,
									right: 30,
									left: 20,
									bottom: 5,
								}}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar dataKey="value" fill="#8884d8" />
							</BarChart>
						</ResponsiveContainer>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Dashboard;
