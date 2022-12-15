import { Box, Container, Grid } from '@mui/material'
import React from 'react'

import Button from '../Components/ButtonWideBlue'

import ShopperBackground from '../Assets/Background/ShopperInfo.jpg'
import { Link } from 'react-router-dom'
import FullHeight from 'react-full-height'
const ShopperInfo = () => {
  return (
    <FullHeight>
        <Grid container>
            <Grid item xs={12} md={8}>
                <Container sx={{mt:"2rem"}}>
                    <h3 class="text-5xl latoFont">How To Shop</h3>
                    <p class="text-sm titliumFontSpaced">with Commerra</p>
                    <Box sx={{mt:"2rem",width:{"md":"50vw"}}}>
                        <p className='normalText'>Commerra helps you buy and compare products from many sellers as we don't sell products but only showing the products that the sellers add if you like the product you can click on the visit product and see it at the seller's website where you can buy it so let's get started by signing up.</p>
                        <Box sx={{float:"right",display:"flex",mt:"2rem"}}>
                            <span className='mx-2'>
                                <Link to="/Login">
                                <Button text="Log In"  />
                                </Link>
                            </span>
                            <span className="mx-2">
                                <Link to="/Signup">
                                    <Button text="Sign Up"  />
                                </Link>
                            </span>
                        </Box>
                    </Box>
                    
                </Container>
            </Grid>
            <Grid item sx={{display:{"xs":"none","md":"block"},my:"25vh"}} md={3.5} >
                <img src={ShopperBackground} alt="Shopper Vector"  />
            </Grid>
        </Grid>
    </FullHeight>

  )
}

export default ShopperInfo