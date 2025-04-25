import React from "react";
import {
	Box,
	Card,
	CardContent,
	Grid,
	Typography,
	useTheme,
	IconButton,
	Tooltip,
	LinearProgress,
} from "@mui/material";
import {
	MoreVert,
	TrendingUp,
	TrendingDown,
	AccountBalance,
	Receipt,
} from "@mui/icons-material";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip as ChartTooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
} from "recharts";
import { useExpense } from "../context/ExpenseContext";

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

	const monthlyData = Object.entries(monthlyExpenses).map(
		([month, amount]) => ({
			month,
			amount,
		})
	);

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
		<Card sx={{ height: "100%" }}>
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
				Dashboard
			</Typography>

			<Grid container spacing={3}>
				{/* Stats Cards */}
				<Grid item xs={12} sm={6} md={3}>
					<StatCard
						title="Total Expenses"
						value={totalExpenses}
						icon={<AccountBalance />}
						color={theme.palette.primary.main}
						trend="up"
						percentage={12}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<StatCard
						title="Monthly Average"
						value={totalExpenses / (monthlyData.length || 1)}
						icon={<Receipt />}
						color={theme.palette.secondary.main}
						trend="down"
						percentage={5}
					/>
				</Grid>

				{/* Charts */}
				<Grid item xs={12} md={8}>
					<Card sx={{ height: "100%" }}>
						<CardContent>
							<Typography variant="h6" sx={{ mb: 2 }}>
								Expense Trends
							</Typography>
							<Box sx={{ height: 300 }}>
								<ResponsiveContainer width="100%" height="100%">
									<AreaChart data={monthlyData}>
										<defs>
											<linearGradient
												id="colorAmount"
												x1="0"
												y1="0"
												x2="0"
												y2="1"
											>
												<stop
													offset="5%"
													stopColor={theme.palette.primary.main}
													stopOpacity={0.8}
												/>
												<stop
													offset="95%"
													stopColor={theme.palette.primary.main}
													stopOpacity={0}
												/>
											</linearGradient>
										</defs>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="month" />
										<YAxis />
										<ChartTooltip />
										<Area
											type="monotone"
											dataKey="amount"
											stroke={theme.palette.primary.main}
											fillOpacity={1}
											fill="url(#colorAmount)"
										/>
									</AreaChart>
								</ResponsiveContainer>
							</Box>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={12} md={4}>
					<Card sx={{ height: "100%" }}>
						<CardContent>
							<Typography variant="h6" sx={{ mb: 2 }}>
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
				</Grid>
			</Grid>
		</Box>
	);
};

export default Dashboard;
