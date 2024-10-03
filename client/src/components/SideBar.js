import React, { useState } from "react";
import {
  Box,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  styled,
  Tooltip,
  Divider,
  Typography,
} from "@mui/material";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import SummarizeIcon from "@mui/icons-material/Summarize";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

import { useNavigate, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

const drawerWidth = 245;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  zIndex: 0,
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const CollapseButtonContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(0.5),
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
}));

const DividerContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(6),
  width: "100%",
}));

const AdminContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(6),
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
}));

const Sidebar = (props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggleSidebar = () => {
    setOpen(!open);
  };

  const isAdmin = props.user?.role === "admin";
  const sideMenuOptions = [
    {
      title: "Summary",
      icon: <SummarizeIcon />,
      route: "/",
      navigation: true,
    },
  ];

  const handleIconClick = (item) => {
    if (item?.navigation && item?.route) {
      navigate(item.route);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open} id="sidebar">
        <DrawerHeader />
        <List sx={{ padding: 0 }}>
          {sideMenuOptions.map((item, index) => (
            <div key={index}>
              <Tooltip title={!open ? item.title : ""} placement="right">
                <ListItem
                  disablePadding
                  className={item.title === "Summary" ? "Summary" : ""}
                  sx={{
                    display: "block",
                    bgcolor:
                      location.pathname === item.route ? "#b4d8f9" : "#ffffff",
                    "&:hover": {
                      bgcolor: "#e8f4ff",
                      "& .MuiListItemIcon-root": {
                        color: "#000000",
                      },
                    },
                  }}
                  onClick={() => handleIconClick(item)}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 60,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 2 : "auto",
                        justifyContent: "center",
                        color:
                          location.pathname === item.route ? "#000000" : "gray",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>

                    <ListItemText
                      sx={{
                        opacity: open ? 1 : 0,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "15px",
                          color: "#000000",
                        }}
                      >
                        {item?.title}
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            </div>
          ))}
        </List>

        {isAdmin && (
          <AdminContainer sx={{ padding: 0 }}>
            <Tooltip title={!open ? "Admin" : ""} placement="right">
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  bgcolor:
                    location.pathname === "/admin" ? "#b4d8f9" : "#ffffff",

                  "&:hover": {
                    bgcolor: "#e8f4ff",
                    "& .MuiListItemIcon-root": {
                      color: "#000000",
                    },
                  },
                }}
                onClick={() => navigate("/admin")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 60,
                    justifyContent: open ? "initial" : "center",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color:
                        location.pathname === "/admin" ? "#000000" : "gray",
                    }}
                  >
                    <SettingsRoundedIcon fontSize="medium" />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      opacity: open ? 1 : 0,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "sans-serif",
                        fontSize: "15px",
                        color: "#000000",
                      }}
                    >
                      Admin
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </Tooltip>
          </AdminContainer>
        )}

        <DividerContainer>
          <Divider />
        </DividerContainer>

        <CollapseButtonContainer>
          <Tooltip title={open ? "Collapse" : "Expand"} placement="right">
            <IconButton onClick={handleToggleSidebar}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Tooltip>
        </CollapseButtonContainer>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
