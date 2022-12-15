import { Box, Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Assets/Logos/logo_light.png'

const ContactUs = () => {
  return (
    <div>
      <Box sx={{
        backgroundColor:"#1B1B1B",
        py:1,
        bottom: 0,
        width: "100%",
      }}
      >
        <Grid sx={{mt:1}} container>

          <Grid item sm={12} md={4}>
            <Box sx={{mx:2}}> 
              <h3 className='normalTextWhite text-xl py-1' >Contact Us</h3>
              <h5 className='normalTextWhite' >Phone Number: +20232345322 </h5>
              <h5 className='normalTextWhite' >Email: pincaditt@gmail.com</h5>
            </Box>
          </Grid>
          <Grid item sm={0} md={2} />
          <Grid item sm={12} md={4} >
            
          <Link to="/TermsAndConditions">
            <h5 className='normalTextWhite underline ml-4'>Terms and Conditions</h5></Link>
              <h5 className='normalTextWhite underline ml-4'><Link to="/PrivacyPolicy" >Privacy Policy</Link></h5>
          
          </Grid>
          <Grid item sm={12} md={2}>
            <img alt="E-Buff Logo" src={Logo} width="160"/>
          </Grid>

        </Grid>
      </Box>
    </div>
  )
}

export default ContactUs