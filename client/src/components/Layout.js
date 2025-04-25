import React, { useState } from "react";
import {
	AppBar,
	Box,
	CssBaseline,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
	Avatar,
	Divider,
	useTheme,
} from "@mui/material";
import {
	Menu as MenuIcon,
	Dashboard,
	Receipt,
	Add,
	Logout,
} from "@mui/icons-material";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const drawerWidth = 240;

const Layout = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const location = useLocation();
	const { logout, user } = useAuth();
	const [mobileOpen, setMobileOpen] = useState(false);

	const menuItems = [
		{ text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
		{ text: "Expenses", icon: <Receipt />, path: "/expenses" },
		{ text: "Add Expense", icon: <Add />, path: "/add-expense" },
	];

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleLogout = async () => {
		await logout();
		navigate("/login");
	};

	const drawer = (
		<Box sx={{ height: "100%" }}>
			<Box
				sx={{
					p: 2,
					background: `linear-gradient(145deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
					color: "white",
				}}
			>
				<Typography variant="h6" sx={{ fontWeight: 600 }}>
					Expense Tracker
				</Typography>
			</Box>
			<Divider />
			<List>
				{menuItems.map((item) => (
					<ListItem
						key={item.text}
						onClick={() => navigate(item.path)}
						sx={{
							mb: 1,
							borderRadius: 1,
							mx: 1,
							backgroundColor:
								location.pathname === item.path
									? "rgba(37, 99, 235, 0.08)"
									: "transparent",
							"&:hover": {
								backgroundColor: "rgba(37, 99, 235, 0.12)",
							},
						}}
					>
						<ListItemIcon
							sx={{
								color:
									location.pathname === item.path
										? theme.palette.primary.main
										: theme.palette.text.secondary,
								minWidth: 40,
							}}
						>
							{item.icon}
						</ListItemIcon>
						<ListItemText
							primary={item.text}
							sx={{
								"& .MuiListItemText-primary": {
									fontWeight: location.pathname === item.path ? 600 : 400,
									color:
										location.pathname === item.path
											? theme.palette.primary.main
											: theme.palette.text.primary,
								},
							}}
						/>
					</ListItem>
				))}
				<ListItem
					onClick={handleLogout}
					sx={{
						mb: 1,
						borderRadius: 1,
						mx: 1,
						"&:hover": {
							backgroundColor: "rgba(239, 68, 68, 0.08)",
						},
					}}
				>
					<ListItemIcon sx={{ color: theme.palette.error.main, minWidth: 40 }}>
						<Logout />
					</ListItemIcon>
					<ListItemText
						primary="Logout"
						sx={{
							"& .MuiListItemText-primary": {
								color: theme.palette.error.main,
							},
						}}
					/>
				</ListItem>
			</List>
		</Box>
	);

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
					bgcolor: "background.paper",
					color: "text.primary",
					boxShadow: "none",
					borderBottom: 1,
					borderColor: "divider",
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Box sx={{ flexGrow: 1 }} />
					<Avatar
						sx={{
							bgcolor: theme.palette.primary.main,
							width: 35,
							height: 35,
						}}
					>
						{user?.name?.[0]?.toUpperCase()}
					</Avatar>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
			>
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{ keepMounted: true }}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
							borderRight: 1,
							borderColor: "divider",
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					minHeight: "100vh",
					bgcolor: "background.default",
				}}
			>
				<Toolbar />
				<Outlet />
			</Box>
		</Box>
	);
};

export default Layout;
