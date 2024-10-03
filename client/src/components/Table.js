import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import {
  TableHead,
  Table,
  Box,
  IconButton,
  TableCell,
  TableBody,
  Paper,
  TableRow,
  TablePagination,
  TableFooter,
  TableContainer,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function TableDynamic({ tableData, desiredHeaders }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [table, setTable] = useState({
    rows: [],
    headers: [],
  });
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - table.rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (tableData.length) {
      setTable({
        rows:
          desiredHeaders && desiredHeaders.length > 0
            ? tableData.map((item) => {
                const dataObject = {};
                desiredHeaders.forEach((key) => {
                  if (item.hasOwnProperty(key)) {
                    dataObject[key] = item[key];
                  }
                });
                return dataObject;
              })
            : tableData,
        headers:
          desiredHeaders && desiredHeaders.length > 0
            ? desiredHeaders.filter((key) => tableData[0].hasOwnProperty(key))
            : Object.keys(tableData[0]),
      });
    }
  }, [tableData]);

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{ minWidth: 600, maxHeight: "260px" }}
      >
        <Table aria-label="custom pagination table" size="small" stickyHeader>
          <TableHead sx={{ height: "50px" }}>
            <TableRow>
              {table.headers.map((key) => (
                <TableCell
                  key={key}
                  sx={{
                    fontWeight: 600,
                    fontSize: "15px",
                    backgroundColor: "#c4c4c4",
                  }}
                >
                  {key
                    .split("_")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? table.rows.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : table.rows
            ).map((objRow, rowindex) => (
              <TableRow key={rowindex}>
                {Object.keys(objRow).map((data, index) => (
                  <TableCell component="th" scope="row" key={index}>
                    {objRow[data]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "flex-end", background:"#E6e6e6" }}>
        <TablePagination
          rowsPerPageOptions={[3, 5, 10, { label: "All", value: -1 }]}
          count={table.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Box>
    </Box>
  );
}
