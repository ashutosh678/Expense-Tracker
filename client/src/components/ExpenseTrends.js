import React from "react";
import {
	Box,
	Card,
	CardContent,
	Typography,
	useTheme,
	ButtonGroup,
	Button,
} from "@mui/material";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { useExpense } from "../context/ExpenseContext";

const ExpenseTrends = () => {
	const theme = useTheme();
	const { expenses } = useExpense();
	const [timeRange, setTimeRange] = React.useState("monthly"); // monthly, weekly, yearly

	// Process data based on time range
	const processData = () => {
		const data = {};

		expenses.forEach((expense) => {
			const date = new Date(expense.date);
			let key;

			switch (timeRange) {
				case "weekly":
					// Get week number
					const weekNumber = Math.ceil(date.getDate() / 7);
					key = `Week ${weekNumber}`;
					break;
				case "yearly":
					key = date.getFullYear().toString();
					break;
				default: // monthly
					key = date.toLocaleString("default", { month: "short" });
			}

			data[key] = (data[key] || 0) + expense.amount;
		});

		return Object.entries(data).map(([label, amount]) => ({
			label,
			amount,
		}));
	};

	const chartData = processData();

	return (
		<Card
			sx={{
				height: "100%",
				"&:hover": {
					boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
				},
				transition: "box-shadow 0.3s ease-in-out",
			}}
		>
			<CardContent>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						mb: 3,
					}}
				>
					<Typography variant="h6" sx={{ fontWeight: 600 }}>
						Expense Trends
					</Typography>
					<ButtonGroup size="small" aria-label="time range button group">
						<Button
							onClick={() => setTimeRange("weekly")}
							variant={timeRange === "weekly" ? "contained" : "outlined"}
						>
							Weekly
						</Button>
						<Button
							onClick={() => setTimeRange("monthly")}
							variant={timeRange === "monthly" ? "contained" : "outlined"}
						>
							Monthly
						</Button>
						<Button
							onClick={() => setTimeRange("yearly")}
							variant={timeRange === "yearly" ? "contained" : "outlined"}
						>
							Yearly
						</Button>
					</ButtonGroup>
				</Box>
				<Box sx={{ height: 400, width: "100%" }}>
					<ResponsiveContainer>
						<AreaChart
							data={chartData}
							margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
						>
							<defs>
								<linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
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
							<CartesianGrid
								strokeDasharray="3 3"
								stroke={theme.palette.divider}
							/>
							<XAxis
								dataKey="label"
								stroke={theme.palette.text.secondary}
								tick={{ fill: theme.palette.text.secondary }}
							/>
							<YAxis
								stroke={theme.palette.text.secondary}
								tick={{ fill: theme.palette.text.secondary }}
								tickFormatter={(value) => `$${value}`}
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: theme.palette.background.paper,
									border: `1px solid ${theme.palette.divider}`,
									borderRadius: 8,
								}}
								formatter={(value) => [`$${value}`, "Amount"]}
							/>
							<Area
								type="monotone"
								dataKey="amount"
								stroke={theme.palette.primary.main}
								fillOpacity={1}
								fill="url(#colorAmount)"
								strokeWidth={2}
							/>
						</AreaChart>
					</ResponsiveContainer>
				</Box>
			</CardContent>
		</Card>
	);
};

export default ExpenseTrends;
