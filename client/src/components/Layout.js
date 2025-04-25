import React, { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
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
	useTheme,
	useMediaQuery,
	Button,
} from "@mui/material";
import {
	Menu as MenuIcon,
	Dashboard as DashboardIcon,
	Add as AddIcon,
	List as ListIcon,
	Logout as LogoutIcon,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const drawerWidth = 240;

const Layout = () => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const navigate = useNavigate();
	const location = useLocation();
	const { logout } = useAuth();

	const menuItems = [
		{ text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
		{ text: "Add Expense", icon: <AddIcon />, path: "/add-expense" },
		{ text: "Expenses", icon: <ListIcon />, path: "/expenses" },
	];

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleLogout = async () => {
		await logout();
	};

	const drawer = (
		<div>
			<Toolbar />
			<List>
				{menuItems.map((item) => (
					<ListItem
						key={item.text}
						disablePadding
						selected={location.pathname === item.path}
					>
						<Button
							fullWidth
							startIcon={item.icon}
							onClick={() => navigate(item.path)}
							sx={{
								justifyContent: "flex-start",
								padding: "12px 16px",
								color:
									location.pathname === item.path
										? "primary.main"
										: "text.primary",
								"&:hover": {
									backgroundColor: "action.hover",
								},
							}}
						>
							{item.text}
						</Button>
					</ListItem>
				))}
				<ListItem disablePadding>
					<Button
						fullWidth
						startIcon={<LogoutIcon />}
						onClick={handleLogout}
						sx={{
							justifyContent: "flex-start",
							padding: "12px 16px",
							color: "text.primary",
							"&:hover": {
								backgroundColor: "action.hover",
							},
						}}
					>
						Logout
					</Button>
				</ListItem>
			</List>
		</div>
	);

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: drawerWidth },
					bgcolor: "primary.main",
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Expense Tracker
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
			>
				<Drawer
					variant={isMobile ? "temporary" : "permanent"}
					open={isMobile ? mobileOpen : true}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
							borderRight: "1px solid rgba(0, 0, 0, 0.12)",
						},
					}}
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
