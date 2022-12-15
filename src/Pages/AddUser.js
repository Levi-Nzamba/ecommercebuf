import { Avatar, Box, Container, Typography,Alert } from '@mui/material'
import React, { useState } from 'react'
import AdminNavbar from '../Components/AdminNavbar'
import ButtonWide from '../Components/ButtonWide'
import {VisibilityOff as HideIcon} from '@mui/icons-material'
import {Visibility as ViewIcon} from '@mui/icons-material'
import { motion } from 'framer-motion'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import LoadingScreen from '../Components/LoadingScreen'

const AddUser = () => {
  const [passwordVisibility, setPasswordVisibility] = React.useState(true);
  
    const toogleVisibility = () => {
      setPasswordVisibility(!passwordVisibility)
    }
    
  const [isError,setIsError] = useState()
  const [errorMsg,setErrorMsg] = useState()

  const navigate = useNavigate()

  const [image,setImage] = useState()
  const [profilePhoto,setProfilePhoto] = useState()
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [name,setName] = useState("")
  const [bio,setBio] = useState("")
  const [website,setWebsite] = useState("")
  const [time,setTime] = useState()

  const currentTime = new Date().getTime()
  const [isLoading,setIsLoading] = useState()

  const changeEmail=(e)=>{
    setEmail(e.target.value)
  }
  const changePassword=(e)=>{
    setPassword(e.target.value)
  }
  const changeName = (e) =>{
    setName(e.target.value)
  }
  const changeBio = (e) => {
    setBio(e.target.value)
  }
  const changeWebsite = (e) =>{
    setWebsite(e.target.value)
  }
  const changeTime = (e) =>{
    setTime(e.target.value)
  }

    
  const changeImage = (e) =>{
    const [f] = e.target.files
    setProfilePhoto(f)
    setImage(URL.createObjectURL(f))

  }

    const addSpecialUser = () =>{
      setIsLoading(true)
 if(profilePhoto === "" || name === "" || bio === "" || website === ""){
      setIsError(true)
      setIsLoading(false)
      setErrorMsg("Please fill out all the information to finish creating your profile.")
    }
    else if(name.length < 10){
      setIsError(true)
      setIsLoading(false)
      setErrorMsg("Please enter a name that is 10+ characters long.")
    }
    else if(password.length < 8){
      setIsError(true)
      setIsLoading(false)
      setErrorMsg("Password has to be at least 8 characters.")
    }
    else{
      createUserWithEmailAndPassword(getAuth(),email,password).then(user=>{
      const expiryDate = new Date().getTime() + (2628002879.99999999 * parseFloat(time))  
      const uid = user.user.uid
      const file = new File([profilePhoto], 'profilephoto.jpg',{type: "image/png"});
      const storageRef = ref(getStorage(), 'profileImages/' + uid);
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(storageRef).then((url)=>{
          
          const userRef = doc(getFirestore(), 'Users', uid)
          setDoc(userRef,{
            type:"Seller",
            uid:uid,
            subscription: null,
            productsPosted:[],
            notifications:[],
            totalViews:0,
            totalClicks:0,
            totalWebsiteClicks:0,
            subscription:"special",
            lastIssued:currentTime,
            expiryDate:expiryDate,
            name: name, 
            profilePhoto:url,
            bio:bio,
            website:website,
          }).then(()=>{
            navigate("/")
          })
        })
      });
      }).catch(error=>{
        setIsError(true)
        setIsLoading(false)
        setErrorMsg(error.message)
      })
    }

    }
  return (
    <div>
      <AdminNavbar/>
      {isLoading ?
      <LoadingScreen/>
        :
      <Box sx={{mt:"14vh"}}>
        <Typography class="title">ADD USER</Typography>
        <Container sx={{p:"3rem",my:"4vh",width:{'xs':'95vw','md':'80vw'},mx:"auto",border:1,borderColor:"rgba(0,0,0,0.4)"}}>
          <Avatar sx={{width:"7rem",height:"7rem",mx:"auto"}} src={image}/>
          <Box sx={{my:3}}>
             <motion.input
                class="flex mx-auto text-white font-bold py-3 px-2 rounded" 
                style={{backgroundColor:'#282828',boxShadow:"-0.5vh 0.4vh #999"}}
                id="image" type="file" accept="image/*" placeholder='CHOOSE IMAGE'
                onChange={changeImage}
            />
          </Box>
          <Box sx={{my:4,mx:{'xs':"0vw",'md':'6vw'}}}>
            <label class="block text-md font-bold mb-2" for="username" style={{fontFamily:'Prompt',color:'#282828'}}>
              Email
            </label>
            <input value={email} onChange={changeEmail} class="shadow appearance-none border border-black rounded py-5 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email"></input>
          </Box>
          <Box sx={{my:4,mx:{'xs':"0vw",'md':'6vw'}}}>
            <label class="block text-md font-bold mb-2" for="username" style={{fontFamily:'Prompt',color:'#282828'}}>
              Password
            </label>
            <input value={password} onChange={changePassword} class="shadow appearance-none border border-black rounded py-5 px-3 w-4/6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type={passwordVisibility ? "text" : "password"} placeholder="Password"></input><span class="p-3" onClick={toogleVisibility}>{ passwordVisibility ? <HideIcon/> : <ViewIcon/> }</span>
          </Box>
          <Box sx={{my:4,mx:{'xs':"0vw",'md':'6vw'}}}>
            <label class="block text-md font-bold mb-2" for="username" style={{fontFamily:'Prompt',color:'#282828'}}>
              Name
            </label>
            <input value={name} onChange={changeName} class="shadow appearance-none border border-black rounded py-5 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Name"></input>
          </Box>
          <Box sx={{my:4,mx:{'xs':"0vw",'md':'6vw'}}}>
            <label class="block text-md font-bold mb-2" for="username" style={{fontFamily:'Prompt',color:'#282828'}}>
              Bio
            </label>
            <textarea value={bio} onChange={changeBio} class="shadow appearance-none border border-black rounded py-10 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Bio"></textarea>
          </Box>
          <Box sx={{my:4,mx:{'xs':"0vw",'md':'6vw'},display:{"xs":"none","md":"flex"}}}>
            <label class="block text-md my-auto mx-2 font-bold mb-2" for="username" style={{fontFamily:'Prompt',color:'#282828'}}>
              Website
            </label>
            <input value={website} onChange={changeWebsite} class="shadow appearance-none border border-black rounded py-4 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Website"></input>
          </Box>
          <Box sx={{my:4,mx:{'xs':"0vw",'md':'6vw'},display:{"xs":"block","md":"none"}}}>
            <label class="block text-md font-bold mb-2" for="username" style={{fontFamily:'Prompt',color:'#282828'}}>
              Website
            </label>
            <input value={website} onChange={changeWebsite} class="shadow appearance-none border border-black rounded py-4 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Website"></input>
          </Box>
          <Box sx={{my:4,mx:{'xs':"0vw",'md':'6vw'},display:{"xs":"none","md":"flex"}}}>
            <label class="block text-md my-auto mx-2 font-bold mb-2" for="username" style={{fontFamily:'Prompt',color:'#282828'}}>
              Time(in Months)
            </label>
            <input value={time} onChange={changeTime} class="shadow appearance-none border border-black rounded py-4 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" placeholder="Time"></input>
          </Box>
          <Box sx={{my:4,mx:{'xs':"0vw",'md':'6vw'},display:{"xs":"block","md":"none"}}}>
            <label class="block text-md font-bold mb-2" for="username" style={{fontFamily:'Prompt',color:'#282828'}}>
              Time(in Months)
            </label>
            <input value={time} onChange={changeTime} class="shadow appearance-none border border-black rounded py-4 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" placeholder="Time"></input>
          </Box>
          
          {isError && 
            <Alert severity="error" sx={{my:2,width:"40vw",mx:"auto",border:1,borderColor:"rgba(155,0,0,0.6)"}}>{errorMsg}</Alert>
          }
          <ButtonWide onClick={addSpecialUser} text="FINISH" color="#282828"/>
        </Container>
      </Box>
    }
    </div>
  )
}

export default AddUser