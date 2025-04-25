import React from "react";
import {
	Box,
	Card,
	CardContent,
	Grid,
	Typography,
	useTheme,
	IconButton,
	Divider,
} from "@mui/material";
import {
	MoreVert,
	TrendingUp,
	TrendingDown,
	AccountBalance,
	Receipt,
} from "@mui/icons-material";
import {
	PieChart,
	Pie,
	Cell,
	Tooltip as ChartTooltip,
	ResponsiveContainer,
} from "recharts";
import { useExpense } from "../context/ExpenseContext";
import ExpenseTrends from "../components/ExpenseTrends";

const Dashboard = () => {
	const theme = useTheme();
	const { expenses } = useExpense();

	// Calculate total expenses
	const totalExpenses = expenses.reduce(
		(sum, expense) => sum + expense.amount,
		0
	);

	// Calculate monthly expenses
	const monthlyExpenses = expenses.reduce((acc, expense) => {
		const date = new Date(expense.date);
		const month = date.toLocaleString("default", { month: "short" });
		acc[month] = (acc[month] || 0) + expense.amount;
		return acc;
	}, {});

	// Calculate category distribution
	const categoryExpenses = expenses.reduce((acc, expense) => {
		acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
		return acc;
	}, {});

	const pieData = Object.entries(categoryExpenses).map(([name, value]) => ({
		name,
		value,
	}));

	const COLORS = [
		theme.palette.primary.main,
		theme.palette.secondary.main,
		theme.palette.error.main,
		theme.palette.warning.main,
		theme.palette.success.main,
	];

	const StatCard = ({ title, value, icon, color, trend, percentage }) => (
		<Card
			sx={{
				height: "100%",
				"&:hover": {
					boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
				},
				transition: "box-shadow 0.3s ease-in-out",
				borderRadius: 2,
			}}
		>
			<CardContent>
				<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
					<Box
						sx={{
							p: 1,
							borderRadius: 2,
							bgcolor: color + "15",
							color: color,
							mr: 2,
						}}
					>
						{icon}
					</Box>
					<Box sx={{ flexGrow: 1 }}>
						<Typography variant="body2" color="text.secondary">
							{title}
						</Typography>
						<Typography variant="h5" component="div" sx={{ fontWeight: "600" }}>
							${value.toLocaleString()}
						</Typography>
					</Box>
					<IconButton size="small">
						<MoreVert />
					</IconButton>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					{trend === "up" ? (
						<TrendingUp sx={{ color: theme.palette.success.main, mr: 1 }} />
					) : (
						<TrendingDown sx={{ color: theme.palette.error.main, mr: 1 }} />
					)}
					<Typography
						variant="body2"
						color={trend === "up" ? "success.main" : "error.main"}
					>
						{percentage}%
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);

	return (
		<Box>
			<Typography variant="h4" sx={{ mb: 4, fontWeight: "600" }}>
				Dashboard Overview
			</Typography>

			<Box
				sx={{
					display: "flex",
					alignItems: "stretch",
					mb: 3,
					minHeight: "450px",
					gap: 3,
				}}
			>
				{/* First Card - Total Expenses */}
				<Card
					sx={{
						flex: 1,
						minWidth: 0, // This prevents flex items from overflowing
						"&:hover": {
							boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
						},
						transition: "box-shadow 0.3s ease-in-out",
						borderRadius: 2,
					}}
				>
					<CardContent>
						<Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
							<Box
								sx={{
									p: 1.5,
									borderRadius: 2,
									bgcolor: theme.palette.primary.main + "15",
									color: theme.palette.primary.main,
									mr: 2,
								}}
							>
								<AccountBalance fontSize="large" />
							</Box>
							<Box sx={{ flexGrow: 1 }}>
								<Typography variant="body2" color="text.secondary">
									Total Expenses
								</Typography>
								<Typography
									variant="h4"
									component="div"
									sx={{ fontWeight: "600" }}
								>
									${totalExpenses.toLocaleString()}
								</Typography>
							</Box>
							<IconButton size="small">
								<MoreVert />
							</IconButton>
						</Box>
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<TrendingUp sx={{ color: theme.palette.success.main, mr: 1 }} />
							<Typography variant="body2" color="success.main">
								12%
							</Typography>
						</Box>
					</CardContent>
				</Card>

				{/* Second Card - Monthly Average */}
				<Card
					sx={{
						flex: 1,
						minWidth: 0,
						"&:hover": {
							boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
						},
						transition: "box-shadow 0.3s ease-in-out",
						borderRadius: 2,
					}}
				>
					<CardContent>
						<Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
							<Box
								sx={{
									p: 1.5,
									borderRadius: 2,
									bgcolor: theme.palette.secondary.main + "15",
									color: theme.palette.secondary.main,
									mr: 2,
								}}
							>
								<Receipt fontSize="large" />
							</Box>
							<Box sx={{ flexGrow: 1 }}>
								<Typography variant="body2" color="text.secondary">
									Monthly Average
								</Typography>
								<Typography
									variant="h4"
									component="div"
									sx={{ fontWeight: "600" }}
								>
									$
									{(
										totalExpenses / (Object.keys(monthlyExpenses).length || 1)
									).toLocaleString()}
								</Typography>
							</Box>
							<IconButton size="small">
								<MoreVert />
							</IconButton>
						</Box>
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<TrendingDown sx={{ color: theme.palette.error.main, mr: 1 }} />
							<Typography variant="body2" color="error.main">
								5%
							</Typography>
						</Box>
					</CardContent>
				</Card>

				{/* Third Card - Category Distribution */}
				<Card
					sx={{
						flex: 1,
						minWidth: 0,
						"&:hover": {
							boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
						},
						transition: "box-shadow 0.3s ease-in-out",
						borderRadius: 2,
					}}
				>
					<CardContent>
						<Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
							Category Distribution
						</Typography>
						<Box sx={{ height: 300 }}>
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={pieData}
										cx="50%"
										cy="50%"
										innerRadius={60}
										outerRadius={80}
										paddingAngle={5}
										dataKey="value"
									>
										{pieData.map((entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={COLORS[index % COLORS.length]}
											/>
										))}
									</Pie>
									<ChartTooltip />
								</PieChart>
							</ResponsiveContainer>
						</Box>
					</CardContent>
				</Card>
			</Box>

			<Divider sx={{ my: 4 }} />

			{/* Expense Trends Section */}
			<Box>
				<Typography variant="h4" sx={{ mb: 4, fontWeight: "600" }}>
					Expense Analysis
				</Typography>
				<ExpenseTrends />
			</Box>
		</Box>
	);
};

export default Dashboard;
