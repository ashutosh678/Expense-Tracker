import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const initializeAuth = async () => {
			try {
				const token = localStorage.getItem("token");
				if (token) {
					// Set the user state with the token
					setUser({ token });
				}
			} catch (error) {
				console.error("Auth initialization error:", error);
				localStorage.removeItem("token");
			} finally {
				setLoading(false);
			}
		};

		initializeAuth();
	}, []);

	const login = async (email, password) => {
		try {
			const response = await authService.login(email, password);
			const { token } = response;

			if (!token) {
				throw new Error("No token received from server");
			}

			localStorage.setItem("token", token);
			setUser({ token });
			navigate("/dashboard");
		} catch (error) {
			console.error("Login error:", error);
			throw error.response?.data || error;
		}
	};

	const register = async (name, email, password) => {
		try {
			const response = await authService.register(name, email, password);
			const { token } = response;

			if (!token) {
				throw new Error("No token received from server");
			}

			localStorage.setItem("token", token);
			setUser({ token });
			navigate("/dashboard");
		} catch (error) {
			console.error("Registration error:", error);
			throw error.response?.data || error;
		}
	};

	const logout = async () => {
		try {
			await authService.logout();
		} catch (error) {
			console.error("Logout error:", error);
		} finally {
			localStorage.removeItem("token");
			setUser(null);
			navigate("/login");
		}
	};

	const value = {
		user,
		loading,
		login,
		register,
		logout,
		isAuthenticated: !!user?.token,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
