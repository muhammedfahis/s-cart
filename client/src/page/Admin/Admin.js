import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PageLoader from "../../components/PageLoader";
import NoData from "../../components/NoData";
import validator from "validator";
import Swal from "sweetalert2";
import { alertinfo } from "../../components/Alert";

import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  TablePagination,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import SupervisorAccountRoundedIcon from "@mui/icons-material/SupervisorAccountRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserManagementData,
  createUserManagementData,
  updateUserManagementData,
  deleteUserManagementData,
} from "../../redux/adminRedux/action";
import { getDisplayName } from "../../service/service";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#027fa3",
    color: theme.palette.common.white,
    fontSize: 17,
    height: 55,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 1,
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Admin(props) {
  const dispatch = useDispatch();
  const userManagementData = useSelector(
    (state) => state?.adminStore?.userManagementData
  );
  let miniLoader = useSelector((state) => state?.adminStore?.miniLoader);
  let pageLoader = useSelector((state) => state?.adminStore?.pageLoader);

  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    userRole: "view",
    action: "create",
  });

  const [isValid, setIsValid] = useState({
    userName: true,
    email: true,
  });

  const handleDialogBoxOnSave = () => {
    if (!userDetails?.userName.trim() || !userDetails?.email.trim()) {
      return;
    }
    if (!isValid?.userName || !isValid?.email) {
      return;
    }
    let payload = {
      username: userDetails?.userName.toLowerCase(),
      email: userDetails?.email.toLowerCase(),
      role: userDetails?.userRole,
      updatedBy: props?.user?.uid,
    };

    if (userDetails.action == "create") {
      if (isUsernameOrEmailExists(payload.username, payload.email)) {
        alertinfo("User already exists...!");
        return;
      }
      dispatch(createUserManagementData(payload));
    } else {
      dispatch(updateUserManagementData(payload));
    }
    handleDialogBoxOnClose();
  };

  const isUsernameOrEmailExists = (username, email) => {
    return userManagementData.some(
      (user) =>
        user?.username.toLowerCase() === username ||
        user?.email.toLowerCase() === email
    );
  };

  const handleDelete = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#027fa3",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let payload = {
          username: data?.username,
        };
        dispatch(deleteUserManagementData(payload));
      }
    });
  };

  const handleDialogBoxOnOpen = (data) => {
    setIsValid({
      ...isValid,
      userName: true,
      email: true,
    });
    if (data) {
      setUserDetails({
        ...userDetails,
        userName: data?.username,
        email: data?.email,
        userRole: data?.role,
        action: "edit",
      });
    } else {
      setUserDetails({
        ...userDetails,
        userName: "",
        email: "",
        userRole: "view",
        action: "create",
      });
    }
    setOpenDialogBox(true);
  };

  const handleDialogBoxOnClose = () => {
    setOpenDialogBox(false);
  };

  const isValidUserDetails = (type, value) => {
    if (type == "username") {
      const hasWhiteSpace = /\s/.test(value);
      const hasSpecialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/.test(value);
      if (
        hasSpecialCharacters ||
        hasWhiteSpace ||
        value.length > 8 ||
        value.length < 4
      ) {
        setIsValid({
          ...isValid,
          userName: false,
        });
      } else {
        setIsValid({
          ...isValid,
          userName: true,
        });
      }
    } else {
      setIsValid({
        ...isValid,
        email: validator.isEmail(value),
      });
    }
  };

  useEffect(() => {
    dispatch(getUserManagementData());
  }, []);

  /// Managing data based on pagination
  useEffect(() => {
    const tableData = userManagementData;
    // Pagination
    const totalPages = Math.ceil(tableData?.length);
    setTotalPages(totalPages);
    setTableData(tableData.slice(startIndex, endIndex));
  }, [startIndex, endIndex, userManagementData]);

  // Handling page change in pagination
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Handling the change of rows per page value
  const handleRowsPerPageChange = (event) => {
    const rowsPerPageValue = event?.target?.value;
    setRowsPerPage(rowsPerPageValue);
    setCurrentPage(0);
  };

  return (
    <Box>
      {pageLoader && <PageLoader />}
      {miniLoader && <PageLoader miniLoader={true} />}
      <Paper
        sx={{
          padding: 1,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 1,
            marginBottom: 0.5,
          }}
        >
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <SupervisorAccountRoundedIcon sx={{ marginRight: 1 }} />
            User Management
          </Typography>
          <Button
            sx={{ backgroundColor: "#027fa3" }}
            variant="contained"
            size="medium"
            startIcon={<PersonAddAltRoundedIcon />}
            onClick={() => {
              handleDialogBoxOnOpen();
            }}
          >
            New User
          </Button>
        </Box>

        {/* <Card sx={{ padding: 1 }}> */}
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "70vh", borderRadius: 1 }}
        >
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell>User Name</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">User Role</StyledTableCell>
                {/* <StyledTableCell align="left">Updated By</StyledTableCell> */}
                <StyledTableCell align="left">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.map(
                (row, index) =>
                  row?.username !== props?.user?.uid && (
                    <StyledTableRow
                      key={index}
                      sx={{
                        opacity: row?.username === props?.user?.uid ? 0.5 : 1,
                      }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {row?.username}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row?.email}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row?.role}
                      </StyledTableCell>
                      {/* <StyledTableCell align="left">
                      {row?.updatedBy}
                    </StyledTableCell> */}
                      <StyledTableCell align="left">
                        <Tooltip
                          arrow
                          title={
                            row?.username !== props?.user?.uid && "Edit User"
                          }
                          placement="top-start"
                        >
                          <EditRoundedIcon
                            onClick={() => {
                              row?.username !== props?.user?.uid &&
                                handleDialogBoxOnOpen(row);
                            }}
                            style={{
                              cursor:
                                row?.username !== props?.user?.uid
                                  ? "pointer"
                                  : "",
                              marginRight: "10px",
                              color: "darkseagreen",
                            }}
                          />
                        </Tooltip>
                        <Tooltip
                          arrow
                          title={
                            row?.username !== props?.user?.uid && "Delete User"
                          }
                          placement="top-start"
                        >
                          <DeleteRoundedIcon
                            onClick={() => {
                              row?.username !== props?.user?.uid &&
                                handleDelete(row);
                            }}
                            style={{
                              cursor:
                                row?.username !== props?.user?.uid
                                  ? "pointer"
                                  : "",
                              color: "gray",
                            }}
                          />
                        </Tooltip>
                      </StyledTableCell>
                    </StyledTableRow>
                  )
              )}
            </TableBody>
          </Table>
          {tableData?.length === 0 && <NoData />}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 25]}
          component="div"
          count={totalPages}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
        {/* </Card> */}

        <BootstrapDialog
          onClose={handleDialogBoxOnClose}
          aria-labelledby="customized-dialog-title"
          open={openDialogBox}
          PaperProps={{
            sx: {
              borderRadius: 4,
            },
          }}
          maxWidth="650px"
        >
          <DialogTitle
            sx={{
              m: 0,
              background: "#027fa3",
              color: "white",
              display: "flex",
              alignItems: "center",
              width: "650px",
            }}
            id="customized-dialog-title"
          >
            {userDetails?.action === "create" ? (
              <PersonAddAltRoundedIcon sx={{ marginRight: 1 }} />
            ) : (
              <BorderColorRoundedIcon sx={{ marginRight: 1 }} />
            )}

            {userDetails?.action === "create" ? "Create New User" : "Edit User"}
          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ m: 1 }}>
              <TextField
                required
                error={!isValid?.userName}
                id="outlined-basic"
                label="User Name"
                variant="outlined"
                color="success"
                disabled={userDetails?.action === "edit"}
                fullWidth
                helperText={
                  isValid?.userName
                    ? ""
                    : "Username must be between 3 to 8 and should NOT contain special characters and whitespace"
                }
                value={userDetails?.userName}
                onChange={(event) => {
                  isValidUserDetails("username", event?.target?.value);
                  setUserDetails({
                    ...userDetails,
                    userName: event?.target?.value,
                  });
                }}
                InputProps={{
                  sx: {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>
            <Box sx={{ m: 1 }}>
              <TextField
                required
                error={!isValid?.email}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                color="success"
                disabled={userDetails?.action === "edit"}
                fullWidth
                helperText={isValid?.email ? "" : "Please enter a valid email"}
                value={userDetails?.email}
                onChange={(event) => {
                  isValidUserDetails("email", event?.target?.value);
                  setUserDetails({
                    ...userDetails,
                    email: event?.target?.value,
                  });
                }}
                InputProps={{
                  sx: {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>

            <Box sx={{ m: 1 }}>
              <FormControl
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FormLabel
                  id="demo-controlled-radio-buttons-group"
                  sx={{ marginRight: 5 }}
                >
                  User Role :
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={userDetails?.userRole}
                  onChange={(event) => {
                    setUserDetails({
                      ...userDetails,
                      userRole: event?.target?.value,
                    });
                  }}
                >
                  <FormControlLabel
                    value="admin"
                    control={<Radio />}
                    label="Admin"
                  />
                  <FormControlLabel
                    value="edit"
                    control={<Radio />}
                    label="Edit"
                  />
                  <FormControlLabel
                    value="view"
                    control={<Radio />}
                    label="View"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => {
                handleDialogBoxOnSave();
              }}
              variant="contained"
              color="success"
              startIcon={<SaveRoundedIcon />}
              sx={{ background: "#027fa3", color: "white" }}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                handleDialogBoxOnClose();
              }}
              variant="outlined"
              startIcon={<CancelRoundedIcon />}
            >
              Cancel
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </Paper>
    </Box>
  );
}
