import React from "react";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Card,
  Typography,
  TextField,
} from "@mui/material";
import TableDynamic from "./Table";
import IconButton from "@mui/material/IconButton";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";

const Dialogue = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DetailedLookupDialog = ({
  open,
  handleDialogBoxOnClose,
  selectedRow,
  DetailedLookUpData,
}) => {
  return (
    <Box>
      <Dialogue
        onClose={() => handleDialogBoxOnClose("Detailed_Lookup")}
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
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
          id="customized-dialog-title"
        >
          <ArticleRoundedIcon sx={{ marginRight: 1 }} />
          {selectedRow?.container_location
            ? selectedRow?.container_location.toUpperCase()
            : ""}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => handleDialogBoxOnClose("Detailed_Lookup")}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CancelRoundedIcon sx={{ color: "white" }} />
        </IconButton>
        <DialogContent dividers>
          <Box>
            <Card
              sx={{
                minHeight: 100,
                minWidth: 600,
                marginBottom: 1,
                padding: 1.5,
                borderRadius: 2,
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
              >
                <Typography sx={{ display: "inline-block", width: "180px" }}>
                  Account Id
                </Typography>
                :
                <Typography sx={{ marginLeft: 1 }}>
                  {DetailedLookUpData[0]?.account_id}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
              >
                <Typography sx={{ display: "inline-block", width: "180px" }}>
                  Account Name
                </Typography>
                :
                <Typography sx={{ marginLeft: 1 }}>
                  {DetailedLookUpData[0]?.account_name}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
              >
                <Typography sx={{ display: "inline-block", width: "180px" }}>
                  Property Id
                </Typography>
                :
                <Typography sx={{ marginLeft: 1 }}>
                  {DetailedLookUpData[0]?.property_id}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
              >
                <Typography sx={{ display: "inline-block", width: "180px" }}>
                  Property Name
                </Typography>
                :
                <Typography sx={{ marginLeft: 1 }}>
                  {DetailedLookUpData[0]?.property_name}
                </Typography>
              </Box>

              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
              >
                <Typography sx={{ display: "inline-block", width: "180px" }}>
                  View Id
                </Typography>
                :
                <Typography sx={{ marginLeft: 1 }}>
                  {DetailedLookUpData[0]?.view_id}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
              >
                <Typography sx={{ display: "inline-block", width: "180px" }}>
                Remediation Action
                </Typography>
                :
                <Typography sx={{ marginLeft: 1 }}>
                  {String(selectedRow?.false_positive_flag).charAt(0).toUpperCase() +
                    String(selectedRow?.false_positive_flag).slice(1)}
                </Typography>
              </Box>
              {selectedRow?.false_positive_reason_text && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: 1,
                  }}
                >
                  <TextField
                    sx={{}}
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Comments"
                    multiline
                    maxRows={4}
                    defaultValue={selectedRow?.false_positive_reason_text}
                    InputProps={{
                      readOnly: true,
                      sx: {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Box>
              )}
            </Card>

            <TableDynamic
              tableData={DetailedLookUpData}
              desiredHeaders={["info_type_name", "container_location", "count"]}
            />
          </Box>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialogue>
    </Box>
  );
};

export default DetailedLookupDialog;
