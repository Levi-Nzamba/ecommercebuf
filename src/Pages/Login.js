import React, { useState } from 'react'
import {Container, Grid, Typography,Box,Alert} from '@mui/material'
import {Link, useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import {VisibilityOff as HideIcon} from '@mui/icons-material'
import {Visibility as ViewIcon} from '@mui/icons-material'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import LoadingScreen from '../Components/LoadingScreen'
import ButtonWideBlue from '../Components/ButtonWideBlue'
import Background from '../Assets/Background/Login_Background.png'
import styles from '../App.css';

import FullHeight from 'react-full-height'

const Login = () => {
    const navigate = useNavigate()
    const [email,setEmail]= useState()
    const [password,setPassword] = useState()
    const [isLoading,setIsLoading] = useState(false)
    const [isError,setIsError] = useState(false) 
    const [errorMsg,setErrorMsg] = useState("")

    const auth = getAuth()
    const db = getFirestore()

    const changeEmail = (e) => {
      setEmail(e.target.value)
    }
    const changePassword = (e) => {
      setPassword(e.target.value)
    }

    const [passwordVisibility, setPasswordVisibility] = React.useState(true);
    const toogleVisibility = () => {
      setPasswordVisibility(!passwordVisibility)
    }
    
    const login = () =>{
      setIsLoading(true)
      signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
        const userRef = doc(db, "Users",userCredential.user.uid)
        getDoc(userRef).then((doc)=>{
          if(doc.data().type ==="Shopper"){
            navigate("/Products/Top")
          }
          else if(doc.data().type ==="Seller"){
            navigate("/")
          }
          else if(doc.data().type ==="Admin"){
            navigate("/")
          }
        })
      }).catch((error)=>{
        setIsLoading(false)
        if(error.message ==="Firebase: Error (auth/internal-error)." || error.message === "Firebase: Error (auth/wrong-password)." ){
          setErrorMsg("Please enter a valid password for " + email + ".")
          setIsError(true)
        }
        else if(error.message ==="Firebase: Error (auth/missing-email)." ){
          setErrorMsg("Please enter an email, the email field cannot be left empty.")
          setIsError(true)
        }
        else if(error.message === "Firebase: Error (auth/user-not-found)."){
          setErrorMsg("No account is registered with the email address " + email + ".")
          setIsError(true)
        }
        else{
          setErrorMsg("Please enter valid details.")
          setIsError(true)
        }
      })
    }
    
    
    return (
      <div>
        {isLoading ? 
        <LoadingScreen/>
        :
        <FullHeight>
      <Box
        sx={{background:{'xs':'none','md':`url(${Background})`},backgroundSize:{'md':'100% 100%'},backgroundAttachment:{'md':'fixed'},height:"100vh"}}
      >
  
        <Grid container>
            <Grid item md={4}>
               
  
                <Container className="blueBox" sx={{ml:4}}>
                    <Typography class="title">LOG IN</Typography>
                    <Box sx={{my:3}}>
                      <label className="subtitle block mb-2">
                        Email Address
                      </label>
                      <input onChange={changeEmail} value={email} class="normalText shadow appearance-none border rounded py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email Address"></input>
                    </Box>
                    <Box sx={{my:3}}>
                      <label className="subtitle block mb-2">
                        Password
                      </label>
                      <input onChange={changePassword} value={password} class="normalText shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type={passwordVisibility ? "text" : "password"} placeholder="Password"></input><span class="p-3" onClick={toogleVisibility}>{ passwordVisibility ? <HideIcon/> : <ViewIcon/> }</span>
                    </Box>
                        
              {isError && 
                <Alert severity="error" sx={{mx:"auto",my:2,border:1,borderColor:"rgba(155,0,0,0.6)"}}>{errorMsg}</Alert>
              }
                    <ButtonWideBlue text="LOGIN" onClick={login} />
                    <Box sx={{textAlign:'center',mt:3}}>
                      <Typography class='normalText mb-2'>Don't have an account?</Typography>
                      <Typography class='normalTextLined'><Link to="/signup">Sign Up</Link></Typography>
                      <Typography class='normalTextLined mt-4'><Link to="/reset">Forgot Password?</Link></Typography>
                    </Box>
                </Container>
  
            </Grid>
        </Grid>
  
    </Box>
    </FullHeight>
    }
    </div>
    )
}

export default Login