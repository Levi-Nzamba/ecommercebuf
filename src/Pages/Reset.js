import { Container,Typography,Box,Alert } from '@mui/material'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import FullHeight from 'react-full-height'
import Background from '../Assets/Background/Forgot_Password_Background.png'
import ButtonWideBlue from '../Components/ButtonWideBlue'
const Reset = () => {
    const [email,setEmail] = useState()
    const [isError,setIsError] = useState(false)
    const [isDone,setIsDone] = useState(false)
    const errorMsg = "Please enter a valid email."
    const doneMsg = "Email Sent"
    const changeEmail = (e) =>{
        setEmail(e.target.value)
    }
    const resetPassword = () =>{
        sendPasswordResetEmail(getAuth(),email).then(()=>{
            setIsDone(true)
        }).catch((error)=>{
            setIsError(true)
        })
    }
    return (
        <div>
            <FullHeight style={{background:`url(${Background})`,backgroundSize:"100% 100%"}}>
    
                <Container 
                    sx={{background:"white",border:1,borderColor:"rgba(0,0,0,0.3)",borderRadius:2,p:5,my:'20vh'}}
                
                >
                <Typography class="title">FORGOT PASSWORD</Typography>
                <Box sx={{my:3,mx:{'md':"10vh"}}}>
                    <label class="subtitle block font-bold mb-2" for="username" >
                        Email Address
                    </label>
                    <input onChange={changeEmail} value={email} class="normalText shadow appearance-none border-2 border-black rounded py-6 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email Address"></input>
                </Box>
                
                
                {isError && 
                    <Alert severity="error" sx={{width:"80vw",mx:"auto",my:2,border:1,borderColor:"rgba(155,0,0,0.6)"}}>{errorMsg}</Alert>
                }
                
                {isDone && 
                    <Alert severity="success" sx={{width:"80vw",mx:"auto",my:2,border:1,borderColor:"rgba(2,128,0,0.6)"}}>{doneMsg}</Alert>
                }
    
                <ButtonWideBlue onClick={resetPassword} text="SUBMIT" />
    
                </Container>
    
    
            </FullHeight>
        </div>
      )
}

export default Reset