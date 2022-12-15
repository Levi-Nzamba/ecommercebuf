import React from 'react'
import {Container, Grid, Typography,Box,FormControl,Select,MenuItem,Alert} from '@mui/material'
import {Link} from 'react-router-dom'
import Background from '../Assets/Background/Signup_Background.png'
import {motion} from 'framer-motion'
import {VisibilityOff as HideIcon} from '@mui/icons-material'
import {Visibility as ViewIcon} from '@mui/icons-material'
import ButtonWideBlue from '../Components/ButtonWideBlue'
import { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

import { doc, setDoc,getFirestore } from "firebase/firestore"; 
import LoadingScreen from '../Components/LoadingScreen'


import FullHeight from 'react-full-height'

const Login = () => {
  const db = getFirestore()
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
  const [isError,setIsError] = useState(false)
  const [errorMsg,setErrorMsg] = useState('')
  const [email,setEmail] = useState()
  const [accountType, setAccountType] = useState(null);
  const [password,setPassword] = useState()
  const [confirmPassword,setConfirmPassword] = useState()

  const changeEmail = (e) =>{
    setEmail(e.target.value)
  }
  const changeAccountType = (e) => {
    setAccountType(e.target.value);
  }
  const changePassword = (e) =>{
    setPassword(e.target.value)   
  }
  
  const changeConfirmPassword = (e) =>{
    setConfirmPassword(e.target.value)
  }

  const auth = getAuth()
  const signUp = () => {
    setLoading(true)
    if(password != confirmPassword ){
      setLoading(false)
      setIsError(true)
      setErrorMsg("The passwords you entered do not match.")
      
    }
    else if(accountType === null ){
      setLoading(false)
      setIsError(true)
      setErrorMsg("Please select an account type.")
      
    }
    else if(password.length < 8){
      setLoading(false)
      setIsError(true)
      setErrorMsg("Password must be greater than 8 characters.")
    }
    else{
      setErrorMsg("The passwords entered do not match.")
      createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
        setLoading(false)
        const userRef = doc(db, 'Users', userCredential.user.uid)
        
        if(accountType === 20){
        
          setDoc(userRef,{
              type:"Seller",
              uid:userCredential.user.uid,
              name: "", 
              profilePhoto:"",
              subscription: null,
              productsPosted:[],
              notifications:[],
              bio:"",
              website:'',
              totalViews:0,
              totalClicks:0,
              totalWebsiteClicks:0


            }
          ).then(()=>{
            signInWithEmailAndPassword(auth,email,password).then(()=>{
              navigate("/")
            })
          })
        }
        else{
          setDoc(userRef,{
              type:"Shopper",
              uid:userCredential.user.uid,
              favourites:[],
              ratings:[],
            }
          ).then(()=>{
            navigate("/Products/Top")
          })
        }
      })
      .catch((error)=>{
        setLoading(false)
        setIsError(true)
        
        if(!email.includes('@') || !email.includes('.') || email === "" || password === "" || confirmPassword === "" ){
          setErrorMsg("Invalid signup information.")
        }
        else if(error.message === "Firebase: Error (auth/email-already-in-use)."){
          setErrorMsg("Try another email, the email you entered is already in use.")
        }
        else{
          setErrorMsg("Error Unknown: Contact support to report error +254718221564")
        }
        
      })
    }

  }
  
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const toogleVisibility = () => {
    setPasswordVisibility(!passwordVisibility)
  }
  return (
    <div>
      {loading ?
      <LoadingScreen/>
    :
    <Box
      sx={{background:{'xs':'none','md':`url(${Background})`},backgroundSize:{'md':'100% 100%'},backgroundAttachment:{'md':'fixed'},minHeight:"100vh"}}
    
    >
        <Grid container>
            <Grid item md={4}>
                <Container className="blueBox" sx={{ml:3}}>
                    
                  <Typography class="title">SIGN UP</Typography>
                    <Box sx={{my:3}}>
                      <label class="subtitle block text-md font-bold mb-2" for="username" style={{fontFamily:'Montserrat',color:'#282828'}}>
                        Email Address
                      </label>
                      <input onChange={changeEmail} value={email} class="normalText shadow appearance-none border rounded py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email Address"></input>
                    </Box>
                    <Box sx={{my:3}}>
                      <label class="subtitle block text-md font-bold mb-2" for="username" style={{fontFamily:'Montserrat',color:'#282828'}}>
                        Select Account Type
                      </label>    
                      <FormControl sx={{ minWidth: "25vw",borderColor:"rgba(0,0,0,0.3)" }}>  
                          <Select
                            value={accountType}
                            displayEmpty
                            onChange={changeAccountType}
                          >
                          <MenuItem value={10}>Shopper</MenuItem>
                          <MenuItem value={20}>Seller</MenuItem>
                        </Select>
                      </FormControl> 
                    </Box>
                    <Box sx={{my:3}}>
                      <label class="subtitle block text-md font-bold mb-2" for="username" style={{fontFamily:'Montserrat',color:'#282828'}}>
                        Password
                      </label>
                      <input onChange={changePassword} value={password} class="normalText shadow appearance-none border rounded w-4/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type={passwordVisibility ? "text" : "password"} placeholder="Password"></input><span class="p-3" onClick={toogleVisibility}>{ passwordVisibility ? <HideIcon/> : <ViewIcon/> }</span>
                    </Box>
                    <Box sx={{my:3}}>
                      <label class="subtitle block text-md font-bold mb-2" for="username" style={{fontFamily:'Montserrat',color:'#282828'}}>
                        Confirm Password
                      </label>
                      <input onChange={changeConfirmPassword} value={confirmPassword} class="normalText shadow appearance-none border rounded w-4/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type={passwordVisibility ? "text" : "password"} placeholder="Confirm Password"></input><span class="p-3" onClick={toogleVisibility}>{ passwordVisibility ? <HideIcon/> : <ViewIcon/> }</span>
                    </Box>
                    <ul class="flex list-disc">
                      <li className="normalText ml-5 mb-6">Must be at least 8 characters</li>
                    </ul>
                    {isError && 
                      <Alert severity="error" sx={{my:2,border:1,borderColor:"rgba(155,0,0,0.6)"}}>{errorMsg}</Alert>
                    }
                    <ButtonWideBlue text="SIGN UP" onClick={signUp}/>
                    <Box sx={{textAlign:'center',mt:3}}>
                      <Typography class="normalText">Already have an account?</Typography>
                      <Typography class='normalTextLined'><Link to="/login">Log In</Link></Typography>
                      <Typography class='normalTextLined mt-4'><Link to="/reset">Forgot Password?</Link></Typography>
                    </Box>
                </Container>

            </Grid>
        </Grid>

    </Box>
}
    </div>
  )
}

export default Login