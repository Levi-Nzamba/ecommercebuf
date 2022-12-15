import React from 'react'
import { Container,Typography,Box } from '@mui/material'
import FullHeight from 'react-full-height'
import Background from '../Assets/Background/Forgot_Password_Background.png'
import ButtonWide from '../Components/ButtonWide'
import {VisibilityOff as HideIcon} from '@mui/icons-material'
import {Visibility as ViewIcon} from '@mui/icons-material'
const ResetFinal = () => {
    const [passwordVisibility, setPasswordVisibility] = React.useState(true);
  
    const toogleVisibility = () => {
      setPasswordVisibility(!passwordVisibility)
    }
  return (
    <div>
        <FullHeight style={{background:`url(${Background})`,backgroundSize:"100% 100%"}}>

            <Container 
                sx={{background:"white",border:1,borderColor:"rgba(0,0,0,0.4)",borderRadius:2,p:5,my:'20vh'}}
            
            >
            <Typography sx={{textAlign:"center",fontSize:'2rem',fontFamily:"Prompt",fontWeight:600}}>FINISH UP</Typography>
            <Box sx={{mt:"5vh",textAlign:"center"}}>
              <label class="block text-md font-bold mb-2" for="username" style={{fontFamily:'Prompt',color:'#282828'}}>
                        New Password
              </label>
              <input class="shadow appearance-none border rounded w-9/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type={passwordVisibility ? "text" : "password"} placeholder="New Password"></input><span class="p-3" onClick={toogleVisibility}>{ passwordVisibility ? <HideIcon/> : <ViewIcon/> }</span>
            </Box>
            
            <Box sx={{mt:"10vh"}}>
              <ButtonWide text="SUBMIT" color="#282828"/>
            </Box>
            </Container>


        </FullHeight>
    </div>
  )
}

export default ResetFinal