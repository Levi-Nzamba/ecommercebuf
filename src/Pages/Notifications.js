import React, { useEffect, useState } from 'react'
import {Box,Typography,Grid} from '@mui/material'
import Navbar from '../Components/SellerNavabar'
import Notification from '../Assets/Icons/Notification.png'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import FullHeight from 'react-full-height'
const Notifications = () => {
  const [notification,setNotifications] = useState(null)  
  useEffect(()=>{
    getDoc(doc(getFirestore(),"Users",getAuth().currentUser.uid)).then((userDoc)=>{
      setNotifications(userDoc.data().notifications)
    })
  },[])
  
  return (
    <div>
        <Navbar/>
        <FullHeight>
        <Box sx={{mt:"10.4vh"}} >
            <Box sx={{mt:"18vh",mb:"7vh"}}>
            <Typography class="title">NOTIFICATIONS</Typography>
            </Box>
            {notification === null || notification.length === 0 ? 
            <Typography sx={{fontFamily:"Mukta",fontSize:"1.4em",mt:7,textAlign:"center"}} >No notifications.</Typography>
            :
            <Box>
            <Grid container sx={{display:"flex",py:"5vh",px:"1vh",mb:2,border:{'xs':1,'md':1},borderColor:"rgba(0,0,0,0.4)",borderRadius:2,width:{'xs':'95vw','md':"75vw"},mx:"auto"}}>
                <Grid item xs={0} md={1}/>
                <Grid item xs={0} md={2} sx={{margin:"auto 0"}}>
                  <Box component="img" sx={{display:{"xs":"none","md":"block"}}} alt="Notification" src={Notification} />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Box sx={{display:"block"}}>
                    <Typography sx={{display:"flex",fontSize:"1.5rem",fontFamily:"Prompt",mt:1}}>{notification[0].title}</Typography>
                    <Typography sx={{display:"flex",fontSize:"1rem",fontFamily:"PromptThin",margin:"2vh 0vh"}}>{notification[0].body}</Typography>
                    <span style={{display:"flex",marginTop:"2vh",float:"right"}}>
                    </span>
                    
                  </Box>
                </Grid>
              </Grid> 
            </Box>
          }
            
        </Box>
        </FullHeight>
    </div>
  )
}

export default Notifications