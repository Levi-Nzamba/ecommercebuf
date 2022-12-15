import { Box, Container, Typography,Grid, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ShopperNavbar from '../Components/ShopperNavbar'
import SampleImage from '../Assets/Sampleimage.jpg'
import {motion} from 'framer-motion'
import {ExpandMore } from '@mui/icons-material'
import Star from "../Assets/Icons/Star.png"
import StarFilled from "../Assets/Icons/Star_filled.png"
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { Link } from 'react-router-dom'
import RatingSolid from '../Components/RatingSolid'
import ButtonDelete from '../Components/ButtonDelete'
const Ratings = () => {
    const [ratings,setRatings] = useState([])
    const [rerender,setRerender] = useState(false)
    const [isLoading,setIsLoading] = useState(true)
    const deleteRating = (ratingId,productId,productRating,index) => {
        setRatings((prevState)=>
            prevState.map((rating,i)=>{
                if(index === i){
                    return {...rating,isBtnLoading:true}
                }
                else{
                    return {...rating}
                }
            })
        )
        getDoc(doc(getFirestore(),"Users",getAuth().currentUser.uid)).then((userDoc)=>{
           const oldRatings = userDoc.data().ratings
            const newRatings = oldRatings.filter((rating)=>{
                return rating !== ratingId
            })
            updateDoc(doc(getFirestore(),"Users",getAuth().currentUser.uid),{
                ratings:newRatings,
            }).then(()=>{
                getDoc(doc(getFirestore(),"Products",productId)).then((productDoc)=>{
                    let ratings = productDoc.data().ratings
                    const oldOverallRating = productDoc.data().overallRating
                    let raters = productDoc.data().raters
                    raters = raters.filter((rater)=>{
                        return rater !== getAuth().currentUser.uid
                    })
                    let newOverallRating = ""
                    if(ratings.length === 1){
                        newOverallRating = 0
                    }
                    else{
                        newOverallRating = ((ratings.length * oldOverallRating) - parseFloat(productRating)) / (ratings.length -1)
                    }
                    ratings = ratings.filter((rating)=>{
                        return rating !== ratingId
                    })
                    updateDoc(doc(getFirestore(),"Products",productId),{
                        ratings:ratings,
                        overallRating:newOverallRating,
                        raters:raters
                    }).then(()=>{
                        deleteDoc(doc(getFirestore(),"Ratings",ratingId)).then(()=>{
                            setRerender(true)
                        })
                    })
                })
            })
        })
    }
    useEffect(()=>{
        setRerender(false)
        const q = query(collection(getFirestore(),"Ratings"),where("user","==",getAuth().currentUser.uid))
        getDocs(q).then((ratings)=>{
            const ratingsTemp = []
            ratings.forEach((rating)=>{
                getDoc(doc(getFirestore(),"Products",rating.data().product)).then((doc)=>{
                    const productRating={
                        title:rating.data().title,
                        description:rating.data().description,
                        image:doc.data().image,
                        ratingId:rating.id,
                        id:doc.data().id,
                        rating:rating.data().rating,
                        isBtnLoading:false
                    }
                    ratingsTemp.push(productRating)
                })
            })
            setTimeout(()=>{
                setIsLoading(false)
                setRatings(ratingsTemp)
            },1000)
        })
    },[rerender])
    return (
        <div>
            <ShopperNavbar/>
            <Box sx={{mt:"16vh",minHeight:"100vh"}}>
            <Typography class="title">RATINGS</Typography>  
            {isLoading ?
            
            <Box sx={{ display:"flex",mt:"45vh"}}>
                <Typography sx={{fontSize:"2rem",mx:"auto",my:"auto",fontFamily:"Oswald"}}><CircularProgress size={"2rem"} sx={{mr:3}} />LOADING RATINGS...</Typography>
            </Box> 
            :
            <Box>
                {ratings.length === 0 ?
                    
                    <Box>
                        <Typography sx={{fontFamily:"Prompt",textAlign:"center",mt:"17vh",mx:"4vw"}}>You have no ratings in your history, if you review any product, whether good or bad you will get to have a record of those reviews here.</Typography>
                    </Box>
                    :
                        <Container sx={{width:{'xs':"95vw",'md':"70vw"},mx:"auto"}}>
                        {ratings.map((rating,index)=>
                            <Grid container columnSpacing={3} sx={{my:4,p:4,border:1,borderColor:"rgba(0,0,0,0.2)",borderRadius:2}}>
                                
                                <Grid xs={12} md={3}>
                                    <img src={rating.image}/>
                                </Grid>
                                <Grid xs={12} md={8} sx={{ml:6}}>
                                    <Link to={"/product/" + rating.id} >
                                        <span className='productTitle my-2'>
                                            {rating.title} 
                                        </span>
                                    </Link>
                                    <Typography className='normalText mb-6'>{rating.description}</Typography>
                                    <Box sx={{display:{'xs':"block",'md':"flex"}}}>
                                        {rating.isBtnLoading ?
                                            <Box sx={{mt:"3vh"}}>
                                                <ButtonDelete text="Loading" disabled={true}/>
                                            </Box>
                                            :
                                            <Box sx={{mt:"3vh"}}>
                                                <ButtonDelete text="Delete Rating" disabled={false} onClick={()=> deleteRating(rating.ratingId,rating.id,rating.rating,index)} />
                                            </Box>
                                            }
                                            <Box sx={{ml:"auto"}} >
                                                <Box sx={{ml:"auto", my:"auto"}}>
                                                    <RatingSolid Rating={rating.rating}/>
                                                </Box>
                                            </Box>
                                    </Box>                        
                                
                                </Grid>
                            </Grid>
                        
                        )}
                        </Container>
                }
            </Box>
            }
            </Box>
        </div>
      )
}

export default Ratings