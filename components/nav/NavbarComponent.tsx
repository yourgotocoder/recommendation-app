import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { indigo } from "@mui/material/colors";
import { signOut } from "next-auth/react";
import SignInForm from "../SignIn";
import AuthContext from "../../store/AuthContext";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";

type Props = {};

const settings: string[] = ["Logout"];

const NavbarComponent = (props: Props) => {
    const pages: string[] = [];
    const authCtx = useContext(AuthContext);

    const [openLoginDialog, setOpenLoginDialog] = useState(false);

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLoginModalOpen = () => {
        setOpenLoginDialog(true);
    };

    const getUserNameInitials = (): string => {
        if (authCtx.name) {
            const name = authCtx.name;
            const initials = name.split(" ");
            if (initials.length === 1) {
                return name[0] + name[1];
            } else {
                return initials[0][0] + initials[1][0];
            }
        }
        return "";
    };

    const getHomeRoute = (): string => {
        if (authCtx.role === "admin") return "/admin";
        if (authCtx.role === "student") return "/student";
        if (authCtx.role === "faculty") return "/faculty";
        return "/";
    };

    let menuDisplay;
    let profileDisplay;
    let menuDesktop;

    if (authCtx.status === "authenticated") {
        menuDisplay = (
            <Box
                sx={{
                    flexGrow: 1,
                    display: { xs: "flex", md: "none" },
                }}
            >
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: "block", md: "none" },
                    }}
                >
                    {pages.map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        );

        menuDesktop = (
            <Box
                sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "flex" },
                }}
            >
                {pages.map((page) => (
                    <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "white", display: "block" }}
                    >
                        {page}
                    </Button>
                ))}
            </Box>
        );

        profileDisplay = (
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={!!authCtx.name && authCtx.name}>
                    <Avatar sx={{ bgcolor: indigo[500] }}>
                        {getUserNameInitials()}
                    </Avatar>
                </Tooltip>

                {/* <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">
                                {setting}
                            </Typography>
                        </MenuItem>
                    ))}
                </Menu> */}
            </Box>
        );
    }

    if (authCtx.status === "unauthenticated") {
        profileDisplay = (
            <Button
                variant="contained"
                sx={{ color: "white" }}
                onClick={handleLoginModalOpen}
            >
                Login
            </Button>
        );
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link href={`${getHomeRoute()}`}>
                        <a>
                            <DashboardIcon
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    mr: 1,
                                }}
                            />
                            <DashboardIcon
                                sx={{
                                    display: { xs: "flex", md: "none" },
                                    mr: 1,
                                }}
                            />
                        </a>
                    </Link>
                    {menuDesktop}
                    {menuDisplay}
                    {profileDisplay}
                    {authCtx.status === "authenticated" && (
                        <Button
                            variant="contained"
                            sx={{ ml: 2 }}
                            onClick={() => signOut()}
                        >
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </Container>
            <Dialog
                open={openLoginDialog}
                onClose={() => setOpenLoginDialog(false)}
            >
                <DialogTitle>
                    Enter your email to get the login link.
                </DialogTitle>
                <Container maxWidth="xl" sx={{ pb: 3 }}>
                    <SignInForm />
                </Container>
            </Dialog>
        </AppBar>
    );
};

export default NavbarComponent;
