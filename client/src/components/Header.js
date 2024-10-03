import * as React from "react";
import {
  Grid,
  Typography,
  Box,
  Toolbar,
  MenuItem,
  Menu,
  AppBar as MuiAppBar,
  styled,
  Button,
} from "@mui/material";
import PearsonIcon from "../assets/images/PearsonIcon.svg";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInitialsForLogo, getDisplayName } from "../service/service";
import "../App.css";

const AppBar = styled(
  MuiAppBar,
  {}
)(({ theme }) => ({
  zIndex: theme.zIndex.drawer,
}));

const fireAlert = () => {
  Swal.fire({
    title: `Base React Template`,
    text: "You have been successfully logged out. ",
    icon: "info",
    width: "100%",
    backdrop: `rgba(255, 255, 255)`,
    allowEscapeKey: false,
    allowOutsideClick: false,
    showCancelButton: false,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "LOGIN BACK",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.reload();
    }
  });
};

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    navigate("/");
    fireAlert();
    dispatch(props.deleteCookie());
  };

  return (
    <Box>
      <AppBar sx={{ backgroundColor: "#FFFFFF", width: "100%" }}>
        <Toolbar>
          <Grid>{<img src={PearsonIcon} />}</Grid>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              color: "black",
              fontWeight: "600",
              fontSize: "20px",
              paddingLeft: "1%",
            }}
          >
            Base React Template
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              aria-controls="user-menu"
              aria-haspopup="true"
              onClick={handleOpenUserMenu}
              style={{ fontWeight: "bold", textTransform: "none" }}
            >
              <span style={{ color: "black" }}>
                {getDisplayName(props.user.name)}
              </span>
              &nbsp;&nbsp;
              <span className="align-middle user-image">
                {getInitialsForLogo(props.user.name)}
              </span>
            </Button>
            <Menu
              sx={{ mt: "50px" }}
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
              <MenuItem key="logout" onClick={handleCloseUserMenu}>
                <LogoutRoundedIcon
                  fontSize="small"
                  sx={{ marginRight: 1 }}
                ></LogoutRoundedIcon>
                <Typography textAlign="center" onClick={handleLogout}>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
