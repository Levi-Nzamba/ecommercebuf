import React, { useEffect, useState } from 'react'
import {Box,Grid,Typography,Container, CircularProgress,Alert} from '@mui/material'
import Star from "../Assets/Icons/Star.png"
import StarFilled from "../Assets/Icons/Star_filled.png"
import SampleImage from '../Assets/Sampleimage.jpg'
import ShopperNavbar from '../Components/ShopperNavbar'
import ButtonWide from '../Components/ButtonWide'
import { useParams } from 'react-router-dom'
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore'
import Rating from '../Components/Rating'
import { getAuth } from 'firebase/auth'

import RatingSolid from '../Components/RatingSolid'
import ButtonSmall from '../Components/ButtonSmall'
import ButtonWideBlue from '../Components/ButtonWideBlue'
import { useSelector } from 'react-redux'
const Product = () => {
  const {id} = useParams()
  const [product,setProduct] = useState({image:"",name:"",price:"",overallRating:"",description:"",boxContents:[{content:""}],keySpecifications:[{title:"",description:""}],productLink:"Product Link",productLinkFull:""})

  const userType = useSelector((state)=>state.userType)
  const [title,setTitle] = useState()
  const [description,setDescription] = useState("")
  const [rating,setRating] = useState()
  const [ratings,setRatings] = useState([{title:"",description:"",rating:""}])
  const [isError,setIsError] = useState(false)
  const [isReviewLoading,setIsReviewLoading] = useState(false)
  const [rerender,setRerender] = useState(false)
  const [errorMsg,setErrorMsg] = useState("Please enter a valid rating.") 

  const changeTitle = (e) =>{
    setTitle(e.target.value)
  }
  const changeDescription = (e) =>{
    setDescription(e.target.value)
  }
  const changeRating = (e) =>{
    setRating(e.target.value)
  }

  const initiateView = () =>{
    

    setTimeout(()=>{  
      const docRef = doc(getFirestore(),"Products",id)
      getDoc(docRef).then((productDoc)=>{
        const newViews = productDoc.data().views + 1
        updateDoc(docRef,{
          views:newViews
        }).then(()=>{
          getDoc(doc(getFirestore(),"Users",productDoc.data().user)).then((userDoc)=>{
            const views = userDoc.data().totalViews + 1
            updateDoc(doc(getFirestore(),"Users",productDoc.data().user),{
              totalViews:views
            })
          })
        })
      })
    },5000)
  }
  const initiateWebsiteClicks = () =>{
    setTimeout(()=>{  
      const docRef = doc(getFirestore(),"Products",id)
      getDoc(docRef).then((productDoc)=>{
        const newClicks = productDoc.data().websiteClicks + 1
        updateDoc(docRef,{
          websiteClicks:newClicks
        }).then(()=>{
          getDoc(doc(getFirestore(),"Users",productDoc.data().user)).then((userDoc)=>{
            const websiteClicks = userDoc.data().totalWebsiteClicks + 1
            updateDoc(doc(getFirestore(),"Users",productDoc.data().user),{
              totalWebsiteClicks:websiteClicks
            })
          })
        })
      })
    },5000)
  }
  const postReview = () => {
    
    if(rating < 1 || rating > 5){
      setIsError(true)
      setErrorMsg("Please enter a rating in the range 0-5")
      setIsError(true)
    }
    else if(description.length <= 15){
      setIsError(true)
      setErrorMsg("The description must be 15 or more characters.")
    }
    else{
      setIsReviewLoading(true)
      const review = {
        title:title,
        description:description,
        rating:rating,
        product:id,
        user:getAuth().currentUser.uid
      }
      addDoc(collection(getFirestore(),"Ratings"),review).then((ratingDoc)=>{
        const ratingId = ratingDoc.id
        getDoc(doc(getFirestore(),"Users",getAuth().currentUser.uid)).then((userDoc)=>{
          let newUserRatings = userDoc.data().ratings
          newUserRatings.push(ratingId)
          updateDoc(doc(getFirestore(),"Users",getAuth().currentUser.uid),{
            ratings:newUserRatings,
            raters:getAuth().currentUser.uid
          }).then(()=>{
            getDoc(doc(getFirestore(),"Products",id)).then((productDoc)=>{
              let currentOverallRating;
              if(isNaN(productDoc.data().overallRating)){
                currentOverallRating = 0
              }
              else{
                currentOverallRating = productDoc.data().overallRating
              }
              
              let numberOfRatings = productDoc.data().ratings.length

              const newRating = ((currentOverallRating * numberOfRatings) + parseFloat(review.rating)) / (numberOfRatings + 1)
              const newProductRatings = productDoc.data().ratings
              newProductRatings.push(ratingId)
              const raters = productDoc.data().raters
              raters.push(getAuth().currentUser.uid)

              updateDoc(doc(getFirestore(),"Products",id),{
                overallRating: newRating,
                ratings:newProductRatings,
                raters:raters
              }).then(()=>{
                setRerender(true)
                setIsReviewLoading(false)
              })
            })
          })
        }) 
      })
    }
    

  }

  useEffect(()=>{
    const docRef = doc(getFirestore(),"Products",id)
    setRerender(false)
    getDoc(docRef).then((doc)=>{
      const productTemp = {
        image:doc.data().image,
        name:doc.data().name,
        price:doc.data().price,
        overallRating:doc.data().overallRating,
        description:doc.data().description,
        boxContents:doc.data().boxContents,
        keySpecifications:doc.data().keySpecifications,
        productLink:doc.data().productLink.substring(0,60),
        productLinkFull:doc.data().productLink,
        isReviewed: userType === "None" ? true : doc.data().raters.includes(getAuth().currentUser.uid)
      }
      const q = query(collection(getFirestore(),"Ratings"),where("product" ,"==",id))
      getDocs(q).then((ratings)=>{
        const ratingsTemp = []
        ratings.forEach((rating)=>{
          ratingsTemp.push(rating.data()) 
        })
        setRatings(ratingsTemp)
      })
      setProduct(productTemp)
    })

  },[id,rerender])
  useEffect(()=>{
      initiateView()
  },[])
  return (
    <div>
        <ShopperNavbar/>
        {isReviewLoading ?
          <Box sx={{ display:"flex",mt:"45vh"}}>
            <Typography sx={{fontSize:"2rem",mx:"auto",my:"auto",fontFamily:"Oswald"}}><CircularProgress size={"2rem"} sx={{mr:3}} />LOADING PRODUCT...</Typography>
          </Box>
        :
        <Box>
       <Box sx={{height:"auto",mt:"18vh",mx:"1rem",overflow:"auto"}}>
        <Grid container>
            <Grid item sm={12} md={3.5}>
                <img width="300rem" height="200rem" alt="Product" src={product.image}/>
            </Grid>
            <Grid item sm={12} md={8.5}>
          <Container>
            <Box sx={{display:"block",ml:2}}>
              <Typography class="productTitle">{product.name.toUpperCase()}</Typography>
              <Typography class="productPrice my-1">${product.price} USD</Typography>
              <Typography class="normalText my-2">{product.description}</Typography>
           
              <Box sx={{display:"flex",my:{"xs":"1rem"}}}>
                <span style={{display:"flex",margin:"auto 0"}}>
                    <RatingSolid Rating={product.overallRating}/>
                </span>
                <div style={{display:"flex",marginLeft:"auto",marginRight:"7vw"}}>
                    <a href={product.productLinkFull} onClick={initiateWebsiteClicks} target="_blank" rel="noreferrer">   
                        <ButtonSmall text="Visit Product"/>
                    </a>
                </div>
              </Box>
            </Box>
          </Container>
            </Grid>
        </Grid>
        </Box>
        <Grid container>
            <Grid item xs={12} md={6}>
        <Box sx={{textAlign:"center",my:"10vh",py:"2rem",mx:"4rem",border:1,borderColor:"rgba(0,0,0,0.2)",borderRadius:2}}>
            <Typography class='heading py-2'>WHAT'S IN THE BOX</Typography>
            <Container sx={{textAlign:"left",py:"5vh"}}>    
                <ul class="list-disc">
                   {product.boxContents.map((boxContent)=>
                    <li class="ml-5 mb-6 normalText" >{boxContent.content}</li>
                   
                   )}
                </ul>
            </Container>
        </Box>

            </Grid>
            <Grid item xs={12} md={6}>
        <Box sx={{textAlign:"center",my:"10vh",py:"2rem",mx:"4rem",border:1,borderColor:"rgba(0,0,0,0.2)",borderRadius:2}}>
            <Typography class='heading py-2'>KEY SPECIFICATIONS</Typography>
            <Container sx={{textAlign:"left",py:"5vh"}}>    
                <ul class="list-disc">
                  {product.keySpecifications.map((spec)=>
                    <li class="ml-5 mb-6 subtitle" style={{display:"flex"}}><p >{spec.title}: </p><p className='ml-1 normalText'>{spec.description}</p></li>
                  )}
                </ul>
            </Container>
        </Box>
            </Grid>
        </Grid>
        {ratings.length > 0 ?
          <div>
                            <Typography class="heading text-center">RATINGS</Typography>
        {!product.isReviewed &&
        <Grid container columnSpacing={3}>
            <Grid item xs={12} md={6}>
                <Box>
                <Container sx={{mx:"2rem",my:"2vh",px:"4rem",py:"2rem",border:1,borderColor:"rgba(0,0,0,0.1)",borderRadius:2}}>
                    <Box sx={{mx:'1rem',my:"4vh"}}>
                        <Typography sx={{fontFamily:"Prompt",fontSize:"1.5rem",my:"4vh",textAlign:"center"}}>Add Review</Typography>
                        <label class="subtitle mb-2">
                            Title
                        </label>
                        <input onChange={changeTitle} class="normalText shadow appearance-none border border-gray-300 rounded py-5 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Title"></input>
                    </Box>
                    <Box sx={{mx:'1rem',my:"4vh"}}>
                        <label class="subtitle mb-2">
                            Body
                        </label>
                        <input onChange={changeDescription} class="normalText shadow appearance-none border border-gray-300 rounded py-5 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Body"></input>
                    </Box>
                    <Box sx={{mx:'1rem',my:"4vh"}}>
                        <label class="subtitle mb-2">
                        Rating
                        </label>
                        <input onChange={changeRating} class="normalText shadow appearance-none border border-gray-300 rounded py-5 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" placeholder="Rating"></input>
                    </Box>
                    
                {isError && 
                    <Alert severity="error" sx={{width:"40vw",mx:"auto",my:2,border:1,borderColor:"rgba(155,0,0,0.6)"}}>{errorMsg}</Alert>
                }
                <ButtonWideBlue text="SUBMIT" onClick={postReview} color='#282828'/>
                </Container>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
            {ratings.map((rating)=>
                <Box sx={{width:"40vw",mx:"auto",mt:"1rem",px:"4rem",py:"2rem",overflow:"auto",border:1,borderColor:"rgba(0,0,0,0.2)",borderRadius:2}}>
                    <Typography class="subtitle">{rating.title}</Typography>
                    <Typography class="normalText my-2">{rating.description}</Typography>
                    <span style={{display:"flex",float:"right"}}>
                        <RatingSolid Rating={rating.rating}/>
                    </span>
                </Box>
            )
            }
            </Grid>
        </Grid>
        }
        {product.isReviewed &&
            <Grid container columnSpacing={3}>
                
                    {ratings.map((rating)=>
                    <Grid item sx={12} md={6}>
                        <Box sx={{width:{"width":"auto","md":"40vw"},mx:"auto",my:"6vh",px:"4rem",py:"2rem",overflow:"auto",border:1,borderColor:"rgba(0,0,0,0.2)",borderRadius:2}}>
                            <Typography class="subtitle">{rating.title}</Typography>
                            <Typography class="normalText my-2">{rating.description}</Typography>
                            <span style={{display:"flex",float:"right"}}>
                                <RatingSolid Rating={rating.rating}/>
                            </span>
                        </Box>
                    </Grid>
                    )
                    }
            </Grid>
        }
          </div>
        :
          <p class="text-center my-10 text-3xl font-bold">No Ratings</p>

        }


        </Box>
        }
    
    </div>
  )
}

export default Product