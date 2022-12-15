import React from 'react'
import FullHeight from 'react-full-height'
import Background from '../Assets/Background/LandingPage_Background.png'
import Logo from '../Assets/Logos/logo.png'
import shopperIcon from '../Assets/Icons/shopper.png'
import sellerIcon from '../Assets/Icons/seller.png'
import { Box, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
const ErrorPage = () => {
  return (
    <FullHeight style={{backgroundImage:`url(${Background})`,backgroundSize:'100% 100%'}}>  
        
    <FullHeight style={{height:"100%",backgroundColor:"rgba(0,0,0,0.7)"}}>
        <Container sx={{color:"white",py:"10vh",width:"60vw",mx:"auto"}}>
            <img src={Logo} width="160" style={{margin:"0 auto"}}/>
            <Typography sx={{fontFamily:"Mukta",fontSize:"2em",my:4}}>This page doesn't exist, click here to go back to the website</Typography>
            <Link to="/"><button class="button">Go Back</button></Link>

        </Container>
    </FullHeight>  

</FullHeight>
  )
}

export default ErrorPage