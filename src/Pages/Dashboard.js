import React, { useEffect, useState } from 'react'
import SellerNavbar from '../Components/SellerNavabar'
import { Typography,Avatar,Box, Grid, Container } from '@mui/material'
import {Edit as EditIcon,AddCircle as AddIcon} from '@mui/icons-material'
import ProductVertical from '../Components/ProductVertical'
import { getDoc, getFirestore,doc, updateDoc, where,query,collection, getDocs } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import {motion} from 'framer-motion'
import Button from '../Components/Button'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
const Dashboard = () => {
  const db = getFirestore()
  const user = useSelector((state)=> state.user)
  const auth = getAuth()
  const uid = user.uid
  const userRef = doc(db, "Users", uid)
  const productRef = collection(db,"Products")

  const [name,setName] = useState()
  const [profilePhoto,setProfilePhoto] = useState()
  const [bio,setBio] = useState()
  const [website,setWebsite] = useState()
  const [productViews,setProductViews] = useState()
  const [productClicks,setProductClicks] = useState()
  const [websiteClicks,setWebsiteClicks] = useState()
  const [products,setProducts] = useState([])
  const [isBioEditable,setIsBioEditable] = useState(false)
  const [isWebsiteEditable,setIsWebsiteEditable] = useState(false)

  const [editedBio,setEditedBio] = useState()
  const [editedWebsite,setEditedWebsite] = useState()
  const [rerender,setRerender] = useState(false)
  const changeEditedBio = (e) => {
    setEditedBio(e.target.value)
  }
  const changeEditedWebsite = (e) => {
    setEditedWebsite(e.target.value)
  }
  const toggleBioEditable = () => {
    setIsBioEditable(!isBioEditable)
  }
  const toggleWebsiteEditable = () => {
    setIsWebsiteEditable(!isWebsiteEditable)
  }

  const changeBio = ()=>{
    updateDoc(userRef,{
      bio:editedBio
    })
    toggleBioEditable()
    setRerender(true)
  }
  const changeWebsite = () =>{
    updateDoc(userRef,{
      website:editedWebsite
    })
    toggleWebsiteEditable()
    setRerender(true)
  }


  useEffect(()=>{
   setTimeout(()=>{
   },1000)
    getDoc( doc(getFirestore(), "Users", uid)).then((document)=>{
      setName(document.data().name)
      setProfilePhoto(document.data().profilePhoto)
      setBio(document.data().bio)
      setWebsite(document.data().website)
      setProductViews(document.data().totalViews)
      setProductClicks(document.data().totalClicks)
      setWebsiteClicks(document.data().totalWebsiteClicks)

      setEditedBio(document.data().bio)
      setEditedWebsite(document.data().website)

      const q = query(collection(db, "Products"),where("user", "==", uid));
      setProducts([])
      getDocs(q).then((querySnapshot)=>{
        const productsTemp = []
        querySnapshot.forEach((doc) => {
          productsTemp.push(doc.data())
        })
        
        setProducts(productsTemp)
        setRerender(false)
        
      })
     
     
      
    })
   

  },[db,rerender])
  return (
    <div>
        <SellerNavbar/>
        <Grid container sx={{mt:{'xs':"8.4vh",'md':"10.4vh"},display:"flex",mx:"0vw",py:"5vh",background:'#E9EFFF'}}>
          <Grid item xs={0} md={2}/>
          <Grid item xs={12} sx={{display:"flex"}} md={2}>
            <Avatar alt="E-Buff User" style={{width:"10rem",height:"10rem",margin:"0 auto"}} src={profilePhoto}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{display:"block",ml:2}}>
              <Typography sx={{display:"flex",fontSize:"2em",fontFamily:"LatoBlack"}}>Name</Typography>
              <Typography class='subtitle' >{name}</Typography>
              <Typography sx={{display:"flex",fontSize:"2em",fontFamily:"LatoBlack"}}>Bio<Avatar sx={{background:"#fff",border:1,borderColor:"black",width:"1.8rem",height:"1.8rem",my:"auto",mx:"1rem"}} onClick={toggleBioEditable}><EditIcon sx={{height:"1.3rem",width:"1.3rem",color:"#000"}}/></Avatar></Typography>
              {!isBioEditable ? 
                <span>
                  <Typography class='normalText my-1' sx={{display:"flex",fontSize:"1rem",fontFamily:"PromptThin",margin:"2vh 0vh"}}>{bio}</Typography>
                </span>
                :
                <span className="my-1">
                  <textarea className='normalText' onChange={changeEditedBio} value={editedBio} class="shadow appearance-none border py-3 border-black rounded px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" style={{height:"10rem"}} id="username" type="text" placeholder="Bio"></textarea>
                  <Button mx="0 0 auto" text={"Change Bio"} style={{float:"right"}} color="#282828"  onClick={changeBio}/>
                </span>
              }
              
              <Typography class="subtitle flex">Website: <Avatar sx={{background:"#fff",border:1,borderColor:"black",width:"1.2rem",height:"1.2rem",my:"auto",mx:"1rem"}} onClick={toggleWebsiteEditable} ><EditIcon sx={{width:"0.7rem",height:"0.7rem",color:"#000"}}/></Avatar></Typography>
              {!isWebsiteEditable ? 
              <span style={{display:"flex",marginTop:"2vh"}}>
                <Typography class='normalText'>{website}</Typography>
                
              </span>
              :
              <div>
                <input className='normalText' onChange={changeEditedWebsite} value={editedWebsite} class="shadow appearance-none border border-black rounded py-4 px-3 my-4 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Website"></input>
                  <Button  mx="0 0 auto" text={"Change Website"} color="#282828"  onClick={changeWebsite}/>
                  
              </div>
              }
            </Box>
          </Grid>
          <Grid item xs={0} md={2}/>
        </Grid>
        <Grid container sx={{mx:"auto"}}>
            <Grid item xs={12} md={3.5}  sx={{my:"2vh",mx:{'xs':"8vw",'md':'2vw'},padding:'6vw 3vw',background:'#1A73E8', textAlign:'center', color:'white', borderRadius:'1rem'}}>
              <Typography component="h6" sx={{fontFamily:"Oswald",fontSize:"7rem",fontWeight:"bolder"}}>{productViews}</Typography>
              <Typography component="p" sx={{fontFamily:"Prompt",fontSize:"2rem"}}>Product Views</Typography>
              
            </Grid>
            <Grid item xs={12} md={3.5} sx={{my:"2vh",mx:{'xs':"8vw",'md':'2vw'},padding:'6vw 3vw',background:'#1A73E8', textAlign:'center', color:'white', borderRadius:'1rem'}}>
              <Typography component="h6" sx={{fontFamily:"Oswald",fontSize:"7rem",fontWeight:"bolder"}}>{productClicks}</Typography>
              <Typography component="p" sx={{fontFamily:"Prompt",fontSize:"2rem"}}>Product Clicks</Typography>
              
            </Grid>
            <Grid item xs={12} md={3.5} sx={{my:"2vh",mx:{'xs':"8vw",'md':'2vw'},padding:'6vw 3vw',background:'#1A73E8', textAlign:'center', color:'white', borderRadius:'1rem'}}>
              <Typography component="h6" sx={{fontFamily:"Oswald",fontSize:"7rem",fontWeight:"bolder"}}>{websiteClicks}</Typography>
              <Typography component="p" sx={{fontFamily:"Prompt",fontSize:"2rem"}}>Website Clicks</Typography>
              
            </Grid>
        </Grid>
        <Container className="border border-gray-200" sx={{my:4}}>
          <Box className="text-center mx-10" >
            <Typography class="title">Products Posted({products.length})</Typography>
          </Box>
          <Box className='p-6'>
            <Grid container columnSpacing={3} rowSpacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                 <motion.div
                  whileHover={{
                    scale:1.1
                  }}
                  transition={{
                    duration:0.4
                  }}
                 >
                  <Link to="/Addproduct">
                    <Box sx={{py:12,px:8,borderRadius:1.5,background:"rgba(0,0,0,0.4)",textAlign:"center"}}>
                        <AddIcon sx={{fontSize:100,color:"white"}}/>
                    </Box>
                    </Link>
                  </motion.div>
                </Grid>
                {products.map((product)=>{
                    return(
                    <Grid item xs={12} sm={6} md={3}>
                      <ProductVertical id={product.id} name={product.name} price={product.price} image={product.image}/>
                    </Grid>
                    )
                })

                }
            </Grid> 
          </Box>

        </Container>

    </div>
  )
}

export default Dashboard