import React from 'react'
import { Box,Typography } from '@mui/material'
import Button from './Button'
import SampleImage from '../Assets/Sampleimage.jpg'
import {Link} from 'react-router-dom'
const ProductVertical = (props) => {
  return (
    <div>
        <Box component="div" sx={{textAlign:"center",height:"100%",pb:"5vh",borderRadius:1,border:1,borderColor:"rgba(0,0,0,0.5)"}}>
            <img alt="Product" src={props.image} style={{padding:3,width:"8rem",margin:"0 auto"}} />
            <Box sx={{py:2}}>
                <Typography sx={{fontSize:"1rem",fontWeight:"bold",fontFamily:"Prompt"}}>{props.name}</Typography>
                <Typography sx={{fontFamily:"Prompt"}}>${props.price} USD</Typography>
            </Box>
            <Box style={{marginTop:"5%"}}>
                <Link to={"/ProductStats/" + props.id}><Button mx="auto" text="See Stats" color="#DC335A"/></Link>
            </Box>
        </Box>
    </div>
  )
}

export default ProductVertical