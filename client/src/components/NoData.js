import { Alert, Box } from '@mui/material'
import React from 'react'

const NoData = () => {
  return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20px",
      marginBottom:"20px"
    }}
  >
    <Alert
      severity="info"
      sx={{
        padding: "25px",
        width: "600px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
        backgroundColor: "aliceblue",
      }}
    >
      <strong>No Records Found...!</strong>
    </Alert>
  </Box>
  )
}

export default NoData