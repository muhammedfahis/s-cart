import * as React from "react";
import {
  Box,
  Card,
  Typography,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import PageLoader from "../../components/PageLoader";
import NoData from "../../components/NoData";

import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSummaryData } from "../../redux/summaryRedux/action";

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

function Row(props) {
  const { row } = props;
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  return (
    <React.Fragment>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setCollapseOpen(!collapseOpen)}
          >
            {collapseOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row?.business_line_name}
        </TableCell>
        <TableCell align="left">{row?.num_accounts}</TableCell>
        <TableCell align="left">{row?.num_properties}</TableCell>
        <TableCell align="left">{row?.total_pii_count}</TableCell>
      </StyledTableRow>

      <TableRow>
        <TableCell colSpan={5} sx={{ padding: 0 }}>
          <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
            <Box sx={{ padding: 0.5 }}>
              <TableContainer sx={{ borderRadius: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow sx={{ background: "gainsboro" }}>
                      <TableCell sx={{minWidth:"66px"}}></TableCell>
                      <TableCell sx={{ fontSize: "17px",minWidth:"350px"}}>
                        Account Name
                      </TableCell>
                      <TableCell sx={{ fontSize: "17px", minWidth:"300px"}}>
                      Business Line Lead
                      </TableCell>
                      <TableCell align="left" sx={{ fontSize: "17px" }}>
                        No. of Properties
                      </TableCell>
                      <TableCell align="left" sx={{ fontSize: "17px" }}>
                        Total PII Count
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.account.map((accountRow, index) => (
                      <TableRow key={index}>
                        <TableCell></TableCell>
                        <TableCell component="th" scope="row">
                          {accountRow?.account_name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {accountRow?.business_line_lead_name}
                        </TableCell>
                        <TableCell align="left">
                          {accountRow?.num_properties}
                        </TableCell>
                        <TableCell align="left">
                          {accountRow?.total_pii_count}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Summary(props) {
  const dispatch = useDispatch();
  const summaryData = useSelector((state) => state?.summaryStore?.summaryData);
  let miniLoader = useSelector((state) => state?.summaryStore?.miniLoader);
  let pageLoader = useSelector((state) => state?.summaryStore?.pageLoader);
  const [tableData, setTableData] = useState([]);
  const [scannedDate, setScannedData] = useState(null);

  useEffect(() => {
    dispatch(getSummaryData());
  }, []);

  /// Managing data based on pagination
  useEffect(() => {
    if (summaryData?.length !== 0) {
      setScannedData(summaryData[0]?.scan_date?.value);
    }
    const tableData = [];
    summaryData?.forEach((item) => {
      const existingBusinessLine = tableData?.find(
        (data) => data?.business_line_name === item?.business_line_name
      );

      if (existingBusinessLine) {
        const existingAccount = existingBusinessLine?.account?.find(
          (account) => account?.account_name === item?.account_name
        );

        if (existingAccount) {
          existingAccount.num_properties += item.num_properties;
          existingAccount.total_pii_count += item.total_pii_count;
        } else {
          existingBusinessLine?.account.push({
            account_name: item?.account_name,
            num_properties: item?.num_properties,
            total_pii_count: item?.total_pii_count,
            business_line_lead_name: item?.business_line_lead_name
          });
          existingBusinessLine.num_accounts += 1;
        }

        existingBusinessLine.num_properties += item.num_properties;
        existingBusinessLine.total_pii_count += item.total_pii_count;
      } else {
        tableData.push({
          business_line_name: item?.business_line_name,
          num_properties: item?.num_properties,
          total_pii_count: item?.total_pii_count,
          num_accounts: 1,
          account: [
            {
              account_name: item?.account_name,
              num_properties: item?.num_properties,
              total_pii_count: item?.total_pii_count,
              business_line_lead_name: item?.business_line_lead_name
            },
          ],
        });
      }
    });
    setTableData(tableData);
  }, [summaryData]);

  return (
    <Box>
      {pageLoader && <PageLoader />}
      {miniLoader && <PageLoader miniLoader={true} />}
      <Paper
        sx={{
          padding:1,
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
            <DescriptionRoundedIcon sx={{ marginRight: 1 }} />
            Summary
          </Typography>
          {scannedDate && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle2">
                Last Scanned Date :&nbsp;
                {/* <CalendarMonthRoundedIcon
                  sx={{ marginRight: 1, color: "gray" }}
                /> */}
              </Typography>
              <Typography variant="h7">
                <b>{scannedDate}</b>
              </Typography>
            </Box>
          )}
        </Box>

        <Card sx={{ padding: 0 }}>
          <TableContainer component={Paper} sx={{ borderRadius: 1 }}>
            <Table aria-label="collapsible table" stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{minWidth:"66px"}} />
                  <StyledTableCell sx={{minWidth:"350px"}}>Business Line</StyledTableCell>
                  <StyledTableCell align="left" sx={{minWidth:"300px"}}>
                    No. of Accounts
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    No. of Properties
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    Total PII Count
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData?.map((row, index) => (
                  <Row key={index} row={row} />
                ))}
              </TableBody>
            </Table>
            {tableData?.length === 0 && <NoData />}
          </TableContainer>
        </Card>
      </Paper>
    </Box>
  );
}
