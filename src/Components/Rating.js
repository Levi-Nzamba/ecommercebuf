import React from 'react'
import {Box,Typography} from '@mui/material'
import StarFilled from '../Assets/Icons/Star_filled.png'
import Star from '../Assets/Icons/Star.png'

const Rating = (props) => {
  return (
    <div>
        <Box sx={{position:"absolute",display:"flex",ml:2}}>
       
            <span style={{display:"flex"}}>
                {props.Rating > 0 && props.Rating <= 1.5 &&
                <span style={{display:"flex"}}>
                    <img alt="Product" src={StarFilled} width="25rem" height="25rem" />
                    <Typography sx={{fontFamily:"LatoBlack",fontSize:"0.8em",my:"auto",ml:0.2}}>1/5</Typography>
                </span>
                }
                {props.Rating > 1.5 && props.Rating <= 2.5 &&
                <span style={{display:"flex"}}>
                    <img alt="Product" src={StarFilled} width="25rem" height="25rem" />
                    <Typography sx={{fontFamily:"LatoBlack",fontSize:"0.8em",my:"auto",ml:0.2}}>2/5</Typography>
                </span>
                }
                {props.Rating > 2.5 && props.Rating <= 3.5 &&
                <span style={{display:"flex"}}>
                    <img alt="Product" src={StarFilled} width="25rem" height="25rem" />
                    <Typography sx={{fontFamily:"LatoBlack",fontSize:"0.8em",my:"auto",ml:0.2}}>3/5</Typography>
                </span>
                }
                {(props.Rating > 3.5 && props.Rating <= 4.5) &&
                    <span style={{display:"flex"}}>
                        <img alt="Product" src={StarFilled} width="25rem" height="25rem" />
                        <Typography sx={{fontFamily:"LatoBlack",fontSize:"0.8em",my:"auto",ml:0.2}}>4/5</Typography>
                    </span>
                }
                {props.Rating > 4.5 && props.Rating <= 5 &&
                    
                <span style={{display:"flex"}}>
                <img alt="Product" src={StarFilled} width="25rem" height="25rem" />
                <Typography sx={{fontFamily:"LatoBlack",fontSize:"0.8em",my:"auto",ml:0.2}}>5/5</Typography>
            </span>
                }
                {props.Rating <= 0 &&
                
                <span style={{display:"flex"}}>
                    <img alt="Product" src={Star} width="25rem" height="25rem" />
                    <Typography sx={{fontFamily:"LatoBlack",fontSize:"0.8em",my:"auto",ml:0.2}}>None</Typography>
                </span>

                }

            </span>
        </Box>

    </div>
  )
}

export default Rating