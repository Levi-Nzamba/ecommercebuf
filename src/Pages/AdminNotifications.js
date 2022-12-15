import { Box, Container, Grid, Typography } from '@mui/material'
import { collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore'
import {motion} from 'framer-motion'
import React, { useEffect, useState } from 'react'
import SampleImage from '../Assets/Sampleimage.jpg'
import AdminNavbar from '../Components/AdminNavbar'
const AdminNotifications = () => {
    const [users,setUsers] = useState([{}])
    const [rerender,setRerender] = useState(false) 
    const [isLoading,setIsLoading] = useState(false)

    const sendNotification = (user) =>{
        setIsLoading(true)
        updateDoc(doc(getFirestore(),"Users",user.uid),{
            notifications:[{
                title:"1 week left on the subscription",
                body:"Your subscription is less than one week from ending, to ensure your products remain visible be sure to renew your products when the sebscription ends.",
            }]
        }).then(()=>{
            setRerender(true)
            setIsLoading(false)
        })
    }

    useEffect(()=>{
        setRerender(false)
        const q = query(collection(getFirestore(),"Users"),where("type",'==',"Seller"))
        getDocs(q).then((querSnapshot)=>{
            const usersTemp= []
            querSnapshot.forEach((userDoc)=>{
                let lastIssued = userDoc.data().lastIssued
                let expiryDate = userDoc.data().expiryDate
                if(!isNaN(lastIssued) || !isNaN(expiryDate)){
                    
                    const timeRemaining = expiryDate - lastIssued
                    if( timeRemaining <= 604800000 ){
                        getDoc(doc(getFirestore(),"Users",userDoc.data().uid)).then((sellerDoc)=>{
                            if(sellerDoc.data().notifications.length === 0){
                                usersTemp.push(userDoc.data())
                            }
                        })
                        
                    }   
    
                } 
            })
            setTimeout(()=>{
                setUsers(usersTemp)
            },[1000])
            
        })
    },[rerender])

  return (
    <div>
        <AdminNavbar/>
    <Container sx={{width:{"xs":"95vw","md":"70vw"},mx:"auto",mt:"18vh",minHeight:"100vh"}}>
        {users.length === 0 || users[0].name === undefined ?
        
        <Typography sx={{fontFamily:"Mukta",fontSize:"1.4em",mt:7}} >No pending notifications awaiting approval</Typography>
            
        :
            <Box>
                {users.map(user=>
              <Box>
                <Grid container sx={{display:'flex',p:4,border:1,borderColor:"rgba(0,0,0,0.4)",borderRadius:2,my:"4vh"}}>
                    <Grid item xs={12} md={3}>
                        <img src={user.profilePhoto}/>
                    </Grid>
                    <Grid item xs={12} md={8} sx={{ml:2}}>
                        <Typography sx={{fontFamily:"Prompt",fontSize:"1.2rem",fontWeight:"bold",my:3}}>{user.name}</Typography>
                        <Typography sx={{fontFamily:"PromptThin",my:"2vh"}}>This user has 1 week left on their subscription, do you want to issue the notification.</Typography>
                        <Box sx={{display:"flex"}}>
                            {isLoading ? 
                            <motion.button 
                                class="flex text-black font-bold my-auto py-2 px-4 rounded" 
                                style={{height:"7vh",backgroundColor:'#B5FFB2',boxShadow:"-0.5vh 0.4vh #999"}}
                                whileHover={{
                                scale:1.2
                                }}
                                disabled={true}
                            >
                               Processing...
                            </motion.button>
                            :
                            <motion.button 
                                class="flex text-black font-bold my-auto py-2 px-4 rounded" 
                                style={{height:"7vh",backgroundColor:'#3CFF33',boxShadow:"-0.5vh 0.4vh #999"}}
                                whileHover={{
                                scale:1.2
                                }}
                                onClick={()=>sendNotification(user)}
                            >
                               Send Notification 
                            </motion.button>
                            
                            }
                            
                        </Box>
                    </Grid>
                </Grid>
              
              </Box>
              )
              }
              </Box>
        }
            </Container>
    </div>
  )
}

export default AdminNotifications