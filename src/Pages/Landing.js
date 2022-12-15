import React from 'react'
import FullHeight from 'react-full-height'
import Background1 from '../Assets/Background/Landing_Background1.jpg'
import Background2 from '../Assets/Background/Landing_Background2.jpg'
import Logo from '../Assets/Logos/logo.png'
import shopperIcon from '../Assets/Icons/shopper.png'
import sellerIcon from '../Assets/Icons/seller.png'
import { Box, Container, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
const Landing = () => {
  return (
    <FullHeight style={{backgroundImage:`url()`,backgroundSize:'100% 100%'}}>  
        
            <FullHeight >
                {/* <Container sx={{color:"white",py:"10vh",width:"90vw",mx:"auto"}}>
                    <img src={Logo} width="160" style={{margin:"0 auto"}}/>
                    <Box sx={{mx:{'xs':"1rem",'md':"5rem"}}}>
                    <Typography variant="h3" style={{fontFamily:"Mukta"}}>Welcome to E-Commerce Buff</Typography>
                    <Typography style={{fontFamily:"PromptThin",fontSize:"1.5em"}}>We will handle all your E-commerce needs.</Typography>
                    <Typography style={{fontFamily:"PromptThin",fontSize:"1.25em",textAlign:"center",marginTop:"2rem"}}>Well suited for handling:</Typography>
                    </Box>
                    <Box sx={{color:"black",textAlign:"center",justifyContent:"center",display:"flex"}}>
                        <Box sx={{borderRadius:"2rem",width:{'xs':"100vw",'md':"20vw"},py:"1rem",mx:"1rem",my:"1.5rem",backgroundColor:"rgba(255,255,255,0.5)",border:"1px solid black"}}>
                            <img src={shopperIcon} width="120" style={{margin:"0  auto"}}/>   
                            <Typography sx={{fontFamily:"Oswald",fontSize:"1.5em",mt:"1rem"}}>Shoppers</Typography>
                        </Box>
                        <Box sx={{borderRadius:"2rem",width:{'xs':"100vw",'md':"20vw"},py:"1rem",my:"1.5rem",backgroundColor:"rgba(255,255,255,0.5)",border:"1px solid black"}}>
                            <img src={sellerIcon} width="120" style={{margin:"0  auto"}}/>   
                            <Typography sx={{fontFamily:"Oswald",fontSize:"1.5em",mt:"1rem"}}>Sellers</Typography>
                        </Box>
                    </Box> */}
                    <Box sx={{position:"absolute"}}>
                        <Box sx={{margin:{"xs":"7vh 38vw","md":"7vh 44vw"}}}>
                            <img src={Logo} style={{width:"20em"}} />
                        </Box>
                    </Box>
                    <Grid container sx={{height:"100vh"}}>
                        <Grid item xs={12} md={6} sx={{height:"100vh",my:"auto",backgroundImage:`url(${Background1})`,backgroundSize:"100% 100%"}}>
                            <Box sx={{my:"30vh"}}>
                                <Typography class="title" sx={{fontSize:"3.5em",fontWeight:"bolder",my:"auto",textAlign:"center"}}>SHOPPERS</Typography>
                                <Box>
                                    <center>
                                        <Link to="/ShopperInfo"><button class="button">GET SHOPPING</button></Link>
                                        <br></br>
                                        <Link to="/Products/Top"><button class="button">VISIT SHOP</button></Link>
                                    </center>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{height:"100vh",my:"auto",backgroundImage:`url(${Background2})`,backgroundSize:"100% 100%"}}>
                            <Box sx={{my:"30vh"}}>
                                <Typography class="title" sx={{fontSize:"3.5em",fontWeight:"bolder",my:"auto",textAlign:"center"}}>SELLERS</Typography>
                                <Box>
                                    <center>
                                        <Link to="/SellerInfo"><button class="button">GO TO DASHBOARD</button></Link>
                                        <br></br>
                                        <Link to="/Products/Top"><button class="button">VISIT SHOP</button></Link>

                                    </center>
                                </Box>
                            </Box>
                            
                        </Grid>
                    
                    </Grid>


                {/* </Container> */}
            </FullHeight>  

    </FullHeight>
  )
}

export default Landing