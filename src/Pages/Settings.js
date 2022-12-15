import { Container,Typography,Box } from '@mui/material'
import { getAuth, signInWithEmailAndPassword, updatePassword  } from 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import SellerNavbar from '../Components/SellerNavabar'
import ShopperNavbar from '../Components/ShopperNavbar'
import { Link, useNavigate } from 'react-router-dom'
import ButtonWide from '../Components/ButtonWideBlue'
import FullHeight from 'react-full-height'
const Settings = () => {
  const navigate = useNavigate()
  const [user,setUser] = useState()
  const [oldPassword,setOldPassword] = useState()
  const [newPassword,setNewPassword] = useState()
  const [isError,setIsError] = useState()
  const changeOldPassword = (e) =>{
    setOldPassword(e.target.value)
  }
  const changeNewPassword = (e) =>{
    setNewPassword(e.target.value)
  }
  const changePassword = () =>{
    signInWithEmailAndPassword(getAuth(),getAuth().currentUser.email,oldPassword).then(()=>{
      updatePassword(getAuth().currentUser,newPassword).then(()=>{
        if(user === "Shopper"){
          navigate("/Products/Top")
        }
        else if(user === "Seller"){
          navigate("/Dashboard")
        }
      })
    }).catch((error)=>{
    })
  }
  useEffect(()=>{
    const userRef = doc(getFirestore(),"Users",getAuth().currentUser.uid)
    getDoc(userRef).then((doc)=>{
      setUser(doc.data().type)
    })
  },[])

  return (
    <div>
        {user === "Shopper" ?
        <ShopperNavbar/>
        :
        <SellerNavbar/>
        }
        <FullHeight>
          <Box sx={{mt:"12.4vh"}}>
              <Box sx={{mt:"20vh"}}>
                  <Typography class="title">SETTINGS</Typography>
              </Box>
              <Container sx={{mt:"4vh",py:"3vh",width:"85vw",mb:"5rem",border:1,borderColor:"rgba(0,0,0,0.4)"}}>
                  
                  <Box sx={{my:3,width:"80%",mx:"auto"}}>
                  <Typography class="subtitle mb-8">Password</Typography>
                      <label class="block text-md font-bold mb-2" for="username" style={{fontFamily:'Prompt',color:'#282828'}}>
                        Old Password
                      </label>
                      <input onChange={changeOldPassword} value={oldPassword} class="shadow appearance-none border rounded py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Old Password"></input>
                  </Box>
                  <Box sx={{my:3,width:"80%",mx:"auto"}}>
                      <label class="block text-md font-bold mb-2" for="username" style={{fontFamily:'Prompt',color:'#282828'}}>
                        New Password
                      </label>
                      <input onChange={changeNewPassword} value={newPassword} class="shadow appearance-none border rounded py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="New Password"></input>
                  </Box>
                  <Typography sx={{fontFamily:"Prompt",textAlign:"center",my:2,color:"#1A73E8"}}><Link to="/Reset">Forgot Password?</Link></Typography>
                  <ButtonWide text="SUBMIT" onClick={changePassword} color="#282828"/>
              </Container>
          </Box>
        </FullHeight>
    </div>
  )

}

export default Settings