import { Box,Container,Grid,Typography } from '@mui/material'
import React, { useState } from 'react'
import AdminNavbar from '../Components/AdminNavbar'
import {motion} from 'framer-motion'
import RevenueImage from '../Assets/Icons/revenue.png'
import UserImage from '../Assets/Icons/user.png'
import { collection, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore'

const Revenue = () => {
  const [totalRevenue,setTotalRevenue] = useState(0)
  const [searchTerm,setSearchTerm] = useState("")
  const [users,setUsers] = useState([{productsPosted:""}])
  const [defaultUsers,setDefaultUsers] = useState(true)
  const changeSearchTerm = (e) =>{
    setSearchTerm(e.target.value)
  }

  const q = query(collection(getFirestore(),"Users" ) ,where("type","==","Seller"))
  getDocs(q).then((querySnapshot)=>{
    let totalRevenueTemp = 0
    querySnapshot.forEach((userDoc)=>{
      let userRevenue = userDoc.data().revenue
      if (isNaN(userRevenue)){
        userRevenue = 0
      }
      totalRevenueTemp = totalRevenueTemp + userRevenue 
    })
    setTotalRevenue(totalRevenueTemp)
  })

  const searchUser = () =>{
    const q = query(collection(getFirestore(),"Users" ) ,where("type","==","Seller"))
    getDocs(q).then(querySnapshot=>{
      let usersTemp = []
      querySnapshot.forEach(userDoc=>{
        const nameSearch = userDoc.data().name.toLowerCase()
        setDefaultUsers(false)
        if(nameSearch.includes(searchTerm.toLowerCase())){
          usersTemp.push(userDoc.data())
        }

      })
      setUsers(usersTemp)

    })
  }

  return (
    <div>
      <AdminNavbar/>
      <Box sx={{mt:"14vh",minHeight:"100vh"}}>
      <Container sx={{width:{"xs":"100vw","md":"70vw"},mx:"auto"}}>
          <Grid container>
              <Box sx={{display:'flex',p:4,border:1,borderColor:"rgba(0,0,0,0.4)",borderRadius:2,my:"4vh"}}>
              <Grid xs={3}>
                  <img src={RevenueImage} style={{margin:"auto 0"}}/>
              </Grid>
              <Grid xs={8} sx={{ml:2,textAlign:"center",my:"auto",width:"70vw"}}>
                  <Typography sx={{fontFamily:"Prompt",fontSize:"1.2rem",fontWeight:"bold"}}>Total Revenue</Typography>
                  <Typography sx={{fontFamily:"PromptThin",my:"2vh",fontSize:"1.4rem"}}>${totalRevenue} USD</Typography>
              </Grid>
              </Box>
          </Grid>
        </Container>
      <Typography class="title">REVENUE</Typography>
      <Box sx={{display:{'xs':'block','md':'none'}}} className="w-4/6 max-w-sm mx-auto">
          <div class="flex items-center border-b py-2" style={{borderColor:"#1A73E8"}}>
            <input value={searchTerm} onChange={changeSearchTerm} class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Search User" aria-label="Full name"/>
            <button onClick={searchUser} class="flex-shrink-0 text-sm text-white py-2 px-3 rounded" type="button" style={{background:"#1A73E8",fontFamily:"Prompt"}}>
              Search
            </button>
          </div>
        </Box>
      <Box sx={{display:{'xs':'none','md':'block'}}} className="w-full max-w-sm mx-auto">
          <div class="flex items-center border-b py-2" style={{borderColor:"#1A73E8"}}>
            <input value={searchTerm} onChange={changeSearchTerm}  class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Search User" aria-label="Full name"/>
            <button onClick={searchUser} class="flex-shrink-0 text-sm text-white py-2 px-3 rounded" type="button" style={{background:"#1A73E8",fontFamily:"Prompt"}}>
              Search
            </button>
          </div>
        </Box>
      
      <Container sx={{width:{"xs":"95vw","md":"70vw"},mx:"auto"}}>
          <Grid container >
            {defaultUsers || users.length === 0 ? 
              <Box>
                {defaultUsers &&
                <Typography sx={{fontFamily:"Mukta",fontSize:"1.4em",mt:7}} >No users searched</Typography>
                }
                {users.length === 0 &&
                <Typography sx={{fontFamily:"Mukta",fontSize:"1.4em",mt:7}} >No users found</Typography>
                }
              </Box>
            :
            <Box>
            {users.map(user=>
              <Box sx={{display:'flex',p:4,border:1,borderColor:"rgba(0,0,0,0.4)",borderRadius:2,my:"4vh"}}>
              <Grid xs={3}>
                  <img src={user.profilePhoto}/>
              </Grid>
              <Grid xs={8} sx={{ml:2}}>
                  <Typography sx={{fontFamily:"Prompt",fontSize:"1.2rem",fontWeight:"bold"}}>{user.name}</Typography>
                  <Typography sx={{fontFamily:"PromptThin",my:"2vh",fontSize:"1.4rem"}}>{user.productsPosted.length} Products</Typography>
                  <Typography sx={{fontFamily:"PromptThin",my:"2vh"}}>$ {user.revenue} USD</Typography>
              </Grid>
              </Box>
              )
            }
            </Box>
            }
          </Grid>
        </Container>
      </Box>
    </div>
  )
}

export default Revenue