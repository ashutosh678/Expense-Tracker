import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import theme from "./theme/theme";
import { AuthProvider } from "./context/AuthContext";
import { ExpenseProvider } from "./context/ExpenseContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import AddExpense from "./pages/AddExpense";
import EditExpense from "./pages/EditExpense";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
	return (
		<Router>
			<ThemeProvider theme={theme}>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<CssBaseline />
					<AuthProvider>
						<ExpenseProvider>
							<Routes>
								<Route path="/login" element={<Login />} />
								<Route path="/register" element={<Register />} />
								<Route element={<ProtectedRoute />}>
									<Route element={<Layout />}>
										<Route
											path="/"
											element={<Navigate to="/dashboard" replace />}
										/>
										<Route path="/dashboard" element={<Dashboard />} />
										<Route path="/expenses" element={<Expenses />} />
										<Route path="/add-expense" element={<AddExpense />} />
										<Route path="/edit-expense/:id" element={<EditExpense />} />
									</Route>
								</Route>
							</Routes>
						</ExpenseProvider>
					</AuthProvider>
				</LocalizationProvider>
			</ThemeProvider>
		</Router>
	);
};

export default App;
