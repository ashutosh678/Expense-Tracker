import { createTheme } from "@mui/material";

const theme = createTheme({
	palette: {
		primary: {
			main: "#2563eb", // Modern blue
			light: "#60a5fa",
			dark: "#1e40af",
			contrastText: "#ffffff",
		},
		secondary: {
			main: "#7c3aed", // Modern purple
			light: "#a78bfa",
			dark: "#5b21b6",
			contrastText: "#ffffff",
		},
		error: {
			main: "#dc2626",
			light: "#ef4444",
			dark: "#991b1b",
		},
		success: {
			main: "#059669",
			light: "#34d399",
			dark: "#065f46",
		},
		warning: {
			main: "#d97706",
			light: "#fbbf24",
			dark: "#92400e",
		},
		background: {
			default: "#f8fafc",
			paper: "#ffffff",
		},
		text: {
			primary: "#1e293b",
			secondary: "#475569",
		},
	},
	typography: {
		fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
		h1: {
			fontWeight: 600,
		},
		h2: {
			fontWeight: 600,
		},
		h3: {
			fontWeight: 600,
		},
		h4: {
			fontWeight: 500,
		},
		h5: {
			fontWeight: 500,
		},
		h6: {
			fontWeight: 500,
		},
		button: {
			textTransform: "none",
			fontWeight: 500,
		},
	},
	shape: {
		borderRadius: 8,
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
					borderRadius: 8,
					padding: "8px 16px",
					boxShadow: "none",
					"&:hover": {
						boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
					},
				},
				containedPrimary: {
					background: "linear-gradient(145deg, #2563eb, #3b82f6)",
				},
				containedSecondary: {
					background: "linear-gradient(145deg, #7c3aed, #8b5cf6)",
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 12,
					boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
					"&:hover": {
						boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
					},
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					"& .MuiOutlinedInput-root": {
						borderRadius: 8,
					},
				},
			},
		},
	},
});

export default theme;
