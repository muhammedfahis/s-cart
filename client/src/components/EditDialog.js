import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  Card,
  Typography,
} from "@mui/material";
import { TextareaAutosize } from "./TextArea";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

const Dialogue = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const EditDialog = ({
  handleEditBoxOnSave,
  selectedRow,
  open,
  handleDialogBoxOnClose,
  setErrorText,
  errorText,
}) => {
  const [editArea, setEditArea] = useState({
    textArea: "",
    toggle: selectedRow?.false_positive_flag,
  });

  const editTextArea = (event) => {
    if (event.target.name === "toggle")
      setEditArea({
        ...editArea,
        [event.target.name]: !editArea.toggle,
      });
    else {
      setEditArea({
        ...editArea,
        [event.target.name]: event.target.value,
      });
      setErrorText(false);
    }
  };

  return (
    <Dialogue
      onClose={() => handleDialogBoxOnClose("Edit")}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth={"lg"}
      PaperProps={{
        sx: {
          borderRadius: 4,
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          background: "#027fa3",
          color: "white",
          width: "600px",
          display: "flex",
          alignItems: "center",
        }}
        id="customized-dialog-title"
      >
        <BorderColorRoundedIcon sx={{ marginRight: 1 }} />
        EDIT
      </DialogTitle>
      <DialogContent dividers>
        <Card sx={{ padding: 1.5, borderRadius: 2 }}>

          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
            <Typography sx={{ display: "inline-block", width: "180px" }}>
              Account Name
            </Typography>
            :
            <Typography sx={{ marginLeft: 1 }}>
              {selectedRow?.account_name}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
            <Typography sx={{ display: "inline-block", width: "180px" }}>
              Property Name
            </Typography>
            :
            <Typography sx={{ marginLeft: 1 }}>
              {selectedRow?.property_name}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
            <Typography sx={{ display: "inline-block", width: "180px" }}>
              Container Location
            </Typography>
            :
            <Typography sx={{ marginLeft: 1 }}>
              {selectedRow?.container_location}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
            <Typography sx={{ display: "inline-block", width: "180px" }}>
            Remediation Action <span style={{ color: "red" }}>*</span>
            </Typography>
            :
              <Switch
                name="toggle"
                checked={editArea.toggle}
                onChange={(e) => editTextArea(e)}
                inputProps={{ "aria-label": "controlled" }}
              />
          </Box>

          <Box sx={{ marginBottom: 1 }}>
            <TextareaAutosize
              value={editArea.textArea}
              name="textArea"
              onChange={(e) => editTextArea(e)}
              aria-label="minimum height"
              minRows={3}
              placeholder="Description *"
              sx={{
                borderColor: errorText && "red",
                "&:hover": {
                  borderColor: errorText && "red",
                },
                "&:focus": {
                  borderColor: errorText && "red",
                  boxShadow: errorText && "0 0 0 0px red",
                },
              }}
            />
            <br />
            {errorText ? (
              <Box sx={{ color: "red", marginLeft: 1 }}>
                <small> Please Enter the Description</small>
              </Box>
            ) : (
              ""
            )}
          </Box>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ background: "#027fa3", color: "white" }}
          autoFocus
          onClick={() => {
            handleEditBoxOnSave(selectedRow, editArea);
          }}
          variant="contained"
          color="success"
          startIcon={<SaveRoundedIcon />}
        >
          Save
        </Button>
        <Button
          onClick={() => handleDialogBoxOnClose("Edit")}
          variant="outlined"
          startIcon={<CancelRoundedIcon />}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialogue>
  );
};

export default EditDialog;
