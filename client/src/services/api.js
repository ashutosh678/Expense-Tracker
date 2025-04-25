import axios from "axios";

const API_URL =
	process.env.NODE_ENV === "production" ? "/api" : "http://localhost:4000/api";

const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true, // Important for CORS
});

// Add request interceptor for auth token
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		console.error("Request interceptor error:", error);
		return Promise.reject(error);
	}
);

// Add response interceptor for error handling
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.error("Response error:", error.response.data);
			if (error.response.status === 401) {
				console.log("Authentication required. Redirecting to login...");
				localStorage.removeItem("token");
				if (!window.location.pathname.includes("/login")) {
					window.location.href = "/login";
				}
				return Promise.reject(
					new Error("Please login to access this resource")
				);
			}
			return Promise.reject(error.response.data);
		} else if (error.request) {
			// The request was made but no response was received
			console.error("Network error - no response received");
			return Promise.reject(
				new Error(
					"Unable to connect to the server. Please check your connection."
				)
			);
		} else {
			// Something happened in setting up the request that triggered an Error
			console.error("Request setup error:", error.message);
			return Promise.reject(error);
		}
	}
);

export const authService = {
	login: async (email, password) => {
		try {
			const response = await api.post("/auth/login", { email, password });
			return response.data;
		} catch (error) {
			console.error("Login service error:", error);
			throw error;
		}
	},
	register: async (name, email, password) => {
		try {
			const response = await api.post("/auth/register", {
				name,
				email,
				password,
			});
			return response.data;
		} catch (error) {
			console.error("Register service error:", error);
			throw error;
		}
	},
	logout: async () => {
		try {
			const response = await api.post("/auth/logout");
			return response.data;
		} catch (error) {
			console.error("Logout service error:", error);
			throw error;
		}
	},
};

export const expenseService = {
	getExpenses: async () => {
		try {
			const response = await api.get("/expenses");
			return response.data;
		} catch (error) {
			console.error("Get expenses error:", error);
			throw error;
		}
	},
	addExpense: async (expense) => {
		try {
			console.log("Sending expense data:", expense);
			const response = await api.post("/expenses", expense);
			console.log("Add expense response:", response.data);
			return response.data;
		} catch (error) {
			console.error("Add expense error:", error);
			throw error;
		}
	},
	updateExpense: async (id, expense) => {
		try {
			const response = await api.put(`/expenses/${id}`, expense);
			return response.data;
		} catch (error) {
			console.error("Update expense error:", error);
			throw error;
		}
	},
	deleteExpense: async (id) => {
		try {
			const response = await api.delete(`/expenses/${id}`);
			return response.data;
		} catch (error) {
			console.error("Delete expense error:", error);
			throw error;
		}
	},
};

export default api;
