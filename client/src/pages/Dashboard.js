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
	Legend,
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

						{/* Additional Stats */}
						<Box sx={{ mt: 2 }}>
							{/* Highest Expense */}
							<Box sx={{ mb: 2 }}>
								<Typography variant="body2" color="text.secondary" gutterBottom>
									Highest Expense
								</Typography>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
									}}
								>
									<Typography variant="body2">
										{expenses.length > 0
											? expenses.reduce((max, exp) =>
													exp.amount > max.amount ? exp : max
											  ).category
											: "N/A"}
									</Typography>
									<Typography variant="body2" sx={{ fontWeight: 600 }}>
										$
										{expenses.length > 0
											? expenses
													.reduce((max, exp) =>
														exp.amount > max.amount ? exp : max
													)
													.amount.toFixed(2)
											: "0.00"}
									</Typography>
								</Box>
							</Box>

							{/* Recent Activity */}
							<Box>
								<Typography variant="body2" color="text.secondary" gutterBottom>
									Recent Activity
								</Typography>
								{expenses.slice(0, 2).map((expense, index) => (
									<Box
										key={index}
										sx={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											mb: 1,
										}}
									>
										<Typography variant="body2" noWrap sx={{ maxWidth: "60%" }}>
											{expense.category}
										</Typography>
										<Typography
											variant="body2"
											sx={{ color: "text.secondary" }}
										>
											${expense.amount.toFixed(2)}
										</Typography>
									</Box>
								))}
							</Box>
						</Box>

						<Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
							<TrendingUp sx={{ color: theme.palette.success.main, mr: 1 }} />
							<Typography variant="body2" color="success.main">
								12% increase from last month
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

						{/* Monthly Breakdown */}
						<Box sx={{ mt: 2 }}>
							{/* Month-over-Month Comparison */}
							<Box sx={{ mb: 2 }}>
								<Typography variant="body2" color="text.secondary" gutterBottom>
									Month-over-Month
								</Typography>
								{Object.entries(monthlyExpenses)
									.slice(-2)
									.map(([month, amount], index) => (
										<Box
											key={month}
											sx={{
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
												mb: 1,
											}}
										>
											<Typography variant="body2">{month}</Typography>
											<Typography
												variant="body2"
												sx={{ color: "text.secondary" }}
											>
												${amount.toFixed(2)}
											</Typography>
										</Box>
									))}
							</Box>

							{/* Statistics */}
							<Box>
								<Typography variant="body2" color="text.secondary" gutterBottom>
									Statistics
								</Typography>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										mb: 1,
									}}
								>
									<Typography variant="body2">Highest Month</Typography>
									<Typography variant="body2" sx={{ fontWeight: 500 }}>
										${Math.max(...Object.values(monthlyExpenses)).toFixed(2)}
									</Typography>
								</Box>
								<Box sx={{ display: "flex", justifyContent: "space-between" }}>
									<Typography variant="body2">Lowest Month</Typography>
									<Typography variant="body2" sx={{ fontWeight: 500 }}>
										${Math.min(...Object.values(monthlyExpenses)).toFixed(2)}
									</Typography>
								</Box>
							</Box>
						</Box>

						<Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
							<TrendingDown sx={{ color: theme.palette.error.main, mr: 1 }} />
							<Typography variant="body2" color="error.main">
								5% decrease from previous average
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
						<Box
							sx={{ display: "flex", flexDirection: "column", height: "100%" }}
						>
							<Box sx={{ height: 300, mb: 2 }}>
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
										<Legend
											verticalAlign="bottom"
											height={36}
											formatter={(value) => value}
										/>
										<ChartTooltip />
									</PieChart>
								</ResponsiveContainer>
							</Box>

							{/* Category Breakdown */}
							<Box sx={{ mt: "auto" }}>
								<Typography
									variant="subtitle2"
									sx={{ mb: 1, color: "text.secondary" }}
								>
									Category Breakdown
								</Typography>
								{pieData.map((entry, index) => (
									<Box
										key={entry.name}
										sx={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											mb: 1,
										}}
									>
										<Box sx={{ display: "flex", alignItems: "center" }}>
											<Box
												sx={{
													width: 8,
													height: 8,
													borderRadius: "50%",
													bgcolor: COLORS[index % COLORS.length],
													mr: 1,
												}}
											/>
											<Typography variant="body2">{entry.name}</Typography>
										</Box>
										<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
											<Typography
												variant="body2"
												sx={{ color: "text.secondary" }}
											>
												${entry.value.toFixed(2)}
											</Typography>
											<Typography
												variant="body2"
												sx={{
													color: "text.secondary",
													bgcolor: "action.hover",
													px: 1,
													borderRadius: 1,
												}}
											>
												{((entry.value / totalExpenses) * 100).toFixed(1)}%
											</Typography>
										</Box>
									</Box>
								))}

								{/* Total */}
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										mt: 1,
										pt: 1,
										borderTop: 1,
										borderColor: "divider",
									}}
								>
									<Typography variant="subtitle2">Total</Typography>
									<Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
										${totalExpenses.toFixed(2)}
									</Typography>
								</Box>
							</Box>
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
