import React from 'react'

import FullHeight from 'react-full-height'
import { Box,CircularProgress,Typography } from '@mui/material'
const LoadingScreen = () => {
  return (
    
    <FullHeight>
      <Box sx={{display:"flex",m:"auto",py:"100vh"}}>
        <CircularProgress size={"14rem"} />
        <Typography sx={{textAlign:"center",fontFamily:"Prompt",fontSize:"2rem",mt:3}}>Loading</Typography>
      </Box>
    </FullHeight>
  )
}

export default LoadingScreen