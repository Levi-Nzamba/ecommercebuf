import { Container,Typography,Avatar,Box, Alert } from '@mui/material'
import React, { useState } from 'react'
import ButtonWide from '../Components/ButtonWide'
import SupermarketBackground from '../Assets/Background/Supermarket_Background.png'
import {motion} from 'framer-motion'
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";
import { getAuth, signOut } from 'firebase/auth'
import { doc,getFirestore, setDoc, updateDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import {actionCreators} from '../Store/ActionCreators/index'

import LoadingScreen from '../Components/LoadingScreen'
const SetupProfile = () => {
  const db = getFirestore()
  const storage = getStorage();
  const auth = getAuth()
  const [image,setImage] = useState()
  const [profilePhoto,setProfilePhoto] = useState("")
  const [name,setName] = useState("")
  const [bio,setBio] = useState("")
  const [website,setWebsite] = useState("")

  const [isLoading,setIsLoading] = useState()
  const [isError,setIsError] = useState()
  const [errorMsg,setErrorMsg] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  
  const {logUser,setUserType} = bindActionCreators(actionCreators,dispatch)


  const changeImage = (e) =>{
    const [f] = e.target.files
    setProfilePhoto(f)
    setImage(URL.createObjectURL(f))

  }
  const changeName = (e) => {
    setName(e.target.value.trim())
  }
  const changeBio = (e) =>{
    setBio(e.target.value)
  }
  const changeWebsite = (e) =>{
    setWebsite(e.target.value)
  }

  const setupProfile =()=>{
    setIsLoading(true)
    if(profilePhoto === "" || name === "" || bio === "" || website === ""){
      setIsError(true)
      setErrorMsg("Please fill out all the information to finish creating your profile.")
      setIsLoading(false)
    }
    // else if(name.length < 10){
    //   setIsError(true)
    //   setErrorMsg("Please enter a name that is 10+ characters long.")
    //   setIsLoading(false)
    // }
    else{
      const uid = auth.currentUser.uid
      const file = new File([profilePhoto], 'profilephoto.jpg',{type: "image/png"});
      const storageRef = ref(storage, 'profileImages/' + uid);
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(storageRef).then((url)=>{
          
          const userRef = doc(db, 'Users', uid)
          updateDoc(userRef,{
            name: name, 
            profilePhoto:url,
            bio:bio,
            website:website,
          }).then(()=>{
            setUserType("PaymentNull")
            navigate("/")
          })
        })
      });
    }


  }
  
  return (
    <div>
      {isLoading ?
      <LoadingScreen/>
        :
    <div style={{background:`url(${SupermarketBackground})`,backgroundSize:"100% 100%",backgroundAttachment:"fixed"}}>
        <Container sx={{width:{"xs":"80vw","md":"50vw"},my:4,py:6,borderRadius:2,border:1,borderColor:"rgba(0,0,0,0.4)"}} class="my-4 py-6 rounded-lg mx-auto border border-black" style={{background:"#E9EFFF"}}>
          <Typography class="title">SETUP PROFILE</Typography>
          <Avatar sx={{width:"7rem",height:"7rem",mx:"auto"}} src={image}/>
          <Box sx={{my:4}}>
            <motion.input
                class="flex mx-auto text-white font-bold py-3 px-2 rounded" 
                style={{backgroundColor:'#282828',boxShadow:"-0.5vh 0.4vh #999"}}
                id="image" type="file" accept="image/*" placeholder='CHOOSE IMAGE'
                onChange={changeImage}
            />
          </Box>
          <Box sx={{my:4,mx:"6vw"}}>
            <label class="block text-md font-bold mb-2" for="username" style={{fontFamily:'Prompt',color:'#282828'}}>
              Name
            </label>
            <input onChange={changeName} value={name}  class="shadow appearance-none border border-black rounded py-5 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Name"></input>
            {/* <Typography sx={{fontFamily:"Prompt",opacity:"0.5"}}>Must Be more than 10 Characters long.</Typography> */}
          </Box>
          <Box sx={{my:4,mx:"6vw"}}>
            <label class="block text-md font-bold mb-2" for="username" style={{fontFamily:'Prompt',color:'#282828'}}>
              Bio
            </label>
            <textarea onChange={changeBio} value={bio} class="shadow appearance-none border border-black rounded py-10 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Bio"></textarea>
          </Box>
          <Box sx={{my:4,mx:"6vw",display:{"xs":"none","md":"flex"}}}>
            <label class="block text-md my-auto mx-2 font-bold mb-2" for="username" style={{fontFamily:'Prompt',color:'#282828'}}>
              Website
            </label>
            <input onChange={changeWebsite} value={website} class="shadow appearance-none border border-black rounded py-4 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Website"></input>
          </Box>
          <Box sx={{my:4,mx:"6vw",display:{"xs":"block","md":"none"}}}>
            <label class="block text-md font-bold mb-2" for="username" style={{fontFamily:'Prompt',color:'#282828'}}>
              Website
            </label>
            <input onChange={changeWebsite} value={website} class="shadow appearance-none border border-black rounded py-4 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Website"></input>
          </Box>
          {isError && 
            <Alert severity="error" sx={{my:2,width:"80vw",mx:"auto",border:1,borderColor:"rgba(155,0,0,0.6)"}}>{errorMsg}</Alert>
          }
          <ButtonWide onClick={setupProfile} text="FINISH" color="#282828"/>
        </Container>
    </div>
      }
    </div>
  )
}

export default SetupProfile