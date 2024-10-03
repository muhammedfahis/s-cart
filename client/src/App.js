import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import Admin from "./page/Admin/Admin";
import Summary from "./page/Summary/Summary";
import Unauthorized from "./page/Unauthorized/Unauthorized";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getCookieDetails,
  deleteCookieDetails,
} from "./redux/cookieRedux/action";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../src/config/environment";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.cookieStore.cookies;
  });

  useEffect(() => {
    dispatch(getCookieDetails());
  }, []);

  return (
    <BrowserRouter basename={process.env.REACT_APP_DOMAIN_URL}>
      {user && (
        <Box>
          {user?.role && app.auth.allowedRoles.includes(user?.role) ? (
            <Box className="root-component">
              <Header user={user} deleteCookie={deleteCookieDetails} />
              <Box sx={{ display: "flex" }}>
                <Sidebar user={user} />
                <Box
                  component="main"
                  sx={{ flexGrow: 1, padding: 1 }}
                  className="Padding-Top-75px"
                >
                  <Routes>
                    <Route path="/" element={<Summary user={user} />} />
                    {user.role === "admin" && (
                      <Route path="/admin" element={<Admin user={user} />} />
                    )}
                    <Route path="*" element={<Navigate to={'/'} />} />
                  </Routes>
                </Box>
              </Box>
            </Box>
          ) : (
            <Unauthorized />
          )}
        </Box>
      )}
      <ToastContainer autoClose={2000} />
    </BrowserRouter>
  );
};

export default App;
