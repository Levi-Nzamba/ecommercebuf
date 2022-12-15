import React, { useEffect, useState } from 'react'
import { Box, Container, Typography,Grid, CircularProgress } from '@mui/material'
import ShopperNavbar from '../Components/ShopperNavbar'
import SampleImage from '../Assets/Sampleimage.jpg'
import {motion} from 'framer-motion'
import {ExpandMore } from '@mui/icons-material'
import Star from "../Assets/Icons/Star.png"
import StarFilled from "../Assets/Icons/Star_filled.png"
import { collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import Rating from '../Components/Rating'
import { Link } from 'react-router-dom'
import Product from './Product'
import ButtonDelete from '../Components/ButtonDelete'

const Favourites = () => {
    const [favourites,setFavourites] = useState([])
    const [favouritesList,setFavouritesList] = useState([])
    const [rerender,setRerender] = useState(false)
    const [isloading,setIsLoading] = useState(true)
    


    const deleteFavourite = (id,i) =>{
        const newFavourites = favouritesList.filter((favourite)=> favourite !== id)
        setFavourites(favourites=>
            favourites.map((prevState,index)=>{
                if(index === i){
                return{...prevState,isBtnLoading:true}
                }
                else {
                
                    return{...prevState}
                }
            })
        )
        updateDoc(doc(getFirestore(),"Users",getAuth().currentUser.uid),{
            favourites:newFavourites
        }).then(()=>{
            getDoc(doc(getFirestore(),"Products",id)).then((productDoc)=>{
                let replacementFavourites = productDoc.data().favourites
                replacementFavourites = replacementFavourites.filter((favourite)=> favourite !== getAuth().currentUser.uid)
                updateDoc(doc(getFirestore(),"Products",id),{
                    favourites:replacementFavourites
                }).then(()=>{
                    setIsLoading(true)
                    setRerender(true)
                })
            })
        })
        
    }
    useEffect(()=>{
        setRerender(false)
        getDoc(doc(getFirestore(),"Users",getAuth().currentUser.uid)).then((docfavourites)=>{
            const favouritesDocs = docfavourites.data().favourites
            setFavouritesList(favouritesDocs)
            const tempFavourites = []
            for(let i = 0;i < favouritesDocs.length;i++){
                getDoc(doc(getFirestore(),"Products",favouritesDocs[i])).then((docFavourite)=>{
                    tempFavourites.push({
                        id:docFavourite.data().id,
                        image:docFavourite.data().image,
                        price:docFavourite.data().price,
                        description:docFavourite.data().description,
                        overallRating:docFavourite.data().overallRating,
                        isBtnLoading:false
                    })
                })
            }
            setTimeout(()=>{
                setIsLoading(false)
                console.log(tempFavourites)
                setFavourites(tempFavourites)
            },1000)
        })
        
    },[rerender])
    return (
        <div>
            
            <ShopperNavbar/>
            <Box sx={{mt:"16vh",minHeight:"100vh"}}>
                <Typography class="title">FAVOURITES</Typography>
                {isloading ?
                    <Box sx={{ display:"flex",mt:"15vh"}}>
                        <Typography sx={{fontSize:"2rem",mx:"auto",my:"auto",fontFamily:"Oswald"}}><CircularProgress size={"2rem"} sx={{mr:3}} />LOADING FAVOURITES...</Typography>
                    </Box>
                    :
                    <Box>
                    {favourites.length === 0 ?
                        <Box>
                            <Typography sx={{fontFamily:"Prompt",textAlign:"center",mt:"17vh",mx:"4vw"}}>You have no favourites in your history, once you get something you really like, be sure to add it here to have a record of it forever. </Typography>
                        </Box>
                        :
                        <Container sx={{width:{'xs':"95vw",'md':"70vw"},mx:"auto"}}>
                        {favourites.map((favourite,index)=>
                                <Grid container sx={{my:4,p:4,border:1,borderColor:"rgba(0,0,0,0.08)",borderRadius:2}}>
                                    <Grid item xs={12} md={4}>
                                        <img src={favourite.image} width="250rem" height="150rem" />
                                    </Grid>
                                    <Grid item xs={12} md={6} sx={{ml:2}}>
                                        <Link to={"/product/" + favourite.id} className="my-2">
                                            <span className='productTitle' style={{color:"#1A73E8"}}>
                                                {favourite.name} 
                                            </span>
                                        </Link>
                                        <Typography class='productPrice'>${favourite.price} USD</Typography>
                                        <Typography class="normalText my-2 mb-4">{favourite.description}</Typography>
                                        <Box sx={{display:{'xs':"block",'md':"flex"}}}>
                                            {favourite.isBtnLoading ?
                                                <ButtonDelete 
                                                text="Loading"
                                                disabled={true}/>
                                            :
                                            <ButtonDelete 
                                                text="Delete Favourite"
                                                onClick={()=> deleteFavourite(favourite.id,index)}/>
                                            }
                                            <Box sx={{ml:"auto", mt:"auto",mb:"2rem"}}>
                                                <Rating Rating={favourite.overallRating}/>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            )
                            }   
                        </Container>
                    }
                    </Box>
                }
            </Box>
        </div>
      )
}

export default Favourites