import React, { useEffect, useState,Fragment } from 'react'
import { Typography,Avatar,Grid,Box,Container } from '@mui/material'
import { Edit as EditIcon,Add  as AddIcon, Remove as RemoveIcon,CheckCircle as CheckIcon, Cancel as CancelIcon } from '@mui/icons-material'
import SampleImage from '../Assets/Sampleimage.jpg'
import SellerNavbar from '../Components/SellerNavabar'
import Star from "../Assets/Icons/Star.png"
import StarFilled from "../Assets/Icons/Star_filled.png"
import ProductViews from '../Assets/Icons/Product_views.png'
import ProductClicks from '../Assets/Icons/Product_clicks.png'
import WebsiteClicks from '../Assets/Icons/Website_clicks.png'
import ButtonWide from '../Components/ButtonWide'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore'
import ButtonSmall from '../Components/ButtonSmall'
import greyBackground from '../Assets/greyBackground.jpg'
import {motion} from 'framer-motion'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import Rating from '../Components/Rating'
import { Dialog, Transition } from '@headlessui/react'
import { getAuth } from 'firebase/auth'
import RatingSolid from '../Components/RatingSolid'
import ButtonDelete from '../Components/ButtonDelete'
const ProductStats = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [product,setProduct] = useState({name:"",image:"",price:"",description:"",productLink:"",keySpecifications:[{title:"",description:""}],boxContents:[{content:""}]})
  const [ratings,setRating] = useState([])
  const [editedImageViewed,setEditedImageViewed] = useState(greyBackground)
  const [editedImage,setEditedImage] = useState()
  const [editedName,setEditedName] = useState(null)
  const [editedPrice,setEditedPrice] = useState()
  const [editedDescription,setEditedDescription] = useState()
  const [editedProductLink,setEditedProductLink] = useState()
  const [editedKeySpecifications,setEditedKeySpecifications] = useState([{title:"",description:""}])
  const [editedBoxContents,setEditedBoxContents]= useState([{content:""}])

  const [imageEditableViewed,setImageEditableViewed] = useState(false)
  const [nameEditable,setNameEditable] = useState(false)
  const [priceEditable,setPriceEditable] = useState(false)
  const [descriptionEditable,setDescriptionEditable] = useState(false)
  const [productLinkEditable,setProductLinkEditable] = useState(false)
  const [boxContentEditable,setBoxContentEditable] = useState(false)
  const [keySpecificationsEditable,setKeySpecificationsEditable] = useState(false)
  const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false)

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }
  const closeDeleteModal = () =>{
    setIsDeleteModalOpen(false)
  }

  const changeEditedImage = (e) =>{
    const [f] = e.target.files
    setEditedImage(f)
    setEditedImageViewed(URL.createObjectURL(f))
  }
  const addKeySpecification = () =>{
    setEditedKeySpecifications((prevState)=>{
      return[
        ...prevState,
        {title:"",description:""}
      ]
    })
  }
  const removeKeySpecification = () =>{
    setEditedKeySpecifications((prevState)=>
      prevState.filter((obj,index)=>{
        return index < prevState.length - 1
      })
    )
  }
  const addBoxContent = () =>{
    setEditedBoxContents((prevState)=>{
      return[
        ...prevState,
        {title:"",description:""}
      ]
    })
  }
  const removeBoxContent = () =>{
    setEditedBoxContents((prevState)=>
    prevState.filter((obj,index)=>{
      return index < prevState.length - 1
    })
    )
  }

  const [rerender,setRerender] = useState(false)

  const changeName = (e) =>{
    setEditedName(e.target.value)
  }
  const changePrice = (e) =>{
    setEditedPrice(e.target.value)
  }
  const changeDescription = (e) =>{
    setEditedDescription(e.target.value)
  }
  const changeProductLink = (e) =>{
    setEditedProductLink(e.target.value)
  }
  const changeBoxContents = (e,i) =>{
    setEditedBoxContents(boxContents =>
      boxContents.map((boxContent,index) => {
        if (index === i) {
          return {...boxContent, content:e.target.value};
        }

        return boxContent;
      }),
    )
  }
  const changeKeySpecsTitle = (e,i) =>{
    setEditedKeySpecifications(keySpecs =>
      keySpecs.map((keySpec,index)=>{
        if(index === i){
          return{...keySpec,title:e.target.value}
        }
        else {
          return{...keySpec}
        }
      })
    )
  } 
  const changeKeySpecsDescrtiption = (e,i) =>{
    setEditedKeySpecifications(keySpecs =>
      keySpecs.map((keySpec,index)=>{
        if(index === i){
          return{...keySpec,description:e.target.value}
        }
        else {
          return{...keySpec}
        }
      })
    )
  }

  const toggleImageEditable = () =>{
    setImageEditableViewed(!imageEditableViewed)
  }
  const toggleNameEditable = () =>{
    setNameEditable(!nameEditable)
  }
  const togglePriceEditable = () =>{
    setPriceEditable(!priceEditable)
  }
  const toggleDescriptionEditable = () =>{
    setDescriptionEditable(!descriptionEditable)
  }
  const toggleProductLinkEditable = () =>{
    setProductLinkEditable(!productLinkEditable)
  }
  const toggleBoxContentEditable = () => {
    setBoxContentEditable(!boxContentEditable)
  }
  const toggleKeySpecificationsEditable = () => {
    setKeySpecificationsEditable(!keySpecificationsEditable)
  }

  const docRef = doc(getFirestore(),"Products",id)
  const updateImage = () => {
    const file = new File([editedImage], product.name.trim() + ".jpg",{type: "image/png"});
    const storageRef = ref(getStorage(), 'productImages/' + id);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(storageRef).then((url)=>{

        updateDoc(docRef,{
          image:url
      
        }).then(()=>{
          toggleImageEditable()
        })
      })
    })
  }
  const updateName = () =>{
    updateDoc(docRef,{
      name:editedName
    }).then(()=>{
      setNameEditable(false)
      setRerender(true)
    })
  }
  const updatePrice = () =>{
    updateDoc(docRef,{
      price:editedPrice
    }).then(()=>{
      setPriceEditable(false)
      setRerender(true)
    })
  }
  const updateDescription = () =>{
    updateDoc(docRef,{
      description:editedDescription
    }).then(()=>{
      setDescriptionEditable(false)
      setRerender(true)
    })
  }
  const updateProductLink = ()=>{
    updateDoc(docRef,{
      productLink:editedProductLink
    }).then(()=>{
      setProductLinkEditable(false)
      setRerender(true)
    })
  }
  const updateBoxContents = () =>{
    updateDoc(docRef,{
      boxContents:editedBoxContents
    }).then(()=>{
      setBoxContentEditable(false)
      setRerender(true)
    })
  }
  const updateKeySpecifications = () =>{
    updateDoc(docRef,{
      keySpecifications:editedKeySpecifications
    }).then(()=>{
      setKeySpecificationsEditable(false)
      setRerender(true)
    })

  }


  const userRef = doc(getFirestore(),"Users",getAuth().currentUser.uid)
  const deleteProduct = () =>{
    getDoc(userRef).then((doc)=>{
      const productsPosted = doc.data().productsPosted
      const newProducts = productsPosted.filter((product)=>{
        return product !== id
      })
      updateDoc(userRef,{
        productsPosted:newProducts
      }).then(
        deleteDoc(docRef).then(()=>{
          navigate("/")
        })
      )
    })
  }

  useEffect(()=>{
    getDoc(doc(getFirestore(),"Products",id)).then((doc)=>{
      setProduct(doc.data())
      setEditedName(doc.data().name)
      setEditedPrice(doc.data().price)
      setEditedDescription(doc.data().description)
      setEditedProductLink(doc.data().productLink)
      setEditedKeySpecifications(doc.data().keySpecifications)
      setEditedBoxContents(doc.data().boxContents)
      const q = query(collection(getFirestore(),"Ratings"),where("product","==",doc.data().id))
      getDocs(q).then((ratings)=>{
        const ratingsTemp = []
        ratings.forEach((rating)=>{
          ratingsTemp.push(rating.data())
        })
        setRating(ratingsTemp)
        setRerender(false)
      })

    })
  },[id,rerender])
  return (
    <div>
        <SellerNavbar/>
       <Grid container sx={{mt:"10.4vh",display:"flex",mx:"0vw",py:"5vh",background:'#E9EFFF'}}>
          <Grid item xs={2}/>
          <Grid item xs={2}>
            {!imageEditableViewed ? 
              <Box>
                <img alt="Product" src={product.image}/>
                <div style={{marginTop:"1rem"}}>
                  <ButtonSmall mx="auto 0 auto" width="12rem" text={"Change Image"} onClick={toggleImageEditable} style={{float:"right"}} color="#282828"/>
                </div>
              </Box>
              :
              <Box>
                <img alt="Product" src={editedImageViewed} />
                <div style={{display:"block",marginTop:"1rem"}}>
                    <motion.input
                    class="flex mx-auto text-white font-bold py-2 px-2 rounded" 
                    style={{backgroundColor:'#282828',boxShadow:"-0.5vh 0.4vh #999",width:"11rem"}}
                    id="image" type="file" accept="image/*" placeholder='CHOOSE IMAGE'
                    onChange={changeEditedImage}
                />
                  <div style={{display:"flex",marginTop:"1rem"}}>
                    <ButtonSmall mx="0.4rem 0 0.4rem" width="12rem" text={<CancelIcon/>} onClick={toggleImageEditable}  style={{float:"right"}} color="#282828"/>
                    <ButtonSmall mx="0.4rem 0 0.4rem" width="12rem" text={<CheckIcon/>} onClick={updateImage} style={{float:"right"}} color="#282828"/>
                  </div>
                </div>
              </Box>
            }
            </Grid>
          <Grid item xs={6} >
            <Box sx={{display:"block",ml:2}}>
              <span  style={{display:"flex"}} >
                {!nameEditable ? 
                  <Typography class="productTitle">{product.name}</Typography> 
                  :
                  <span style={{display:"flex",margin:"1rem 0"}}>
                    <input value={editedName}  onChange={changeName} class="shadow appearance-none border rounded py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Name"/>
                    <ButtonSmall mx="0 0 1rem" text={"Change Name"} style={{float:"right"}} color="#282828" onClick={updateName} />
                  </span>
                }
                
                <Avatar sx={{ml:2,background:"white",width:"1.5rem",height:"1.5rem",my:"auto",border:1,borderColor:"black"}} onClick={toggleNameEditable}><EditIcon sx={{color:"black",width:"1rem",height:"1.2rem"}}/></Avatar>
              </span>
              <span style={{display:"flex"}}>
                {!priceEditable ?
                  <Typography class="productPrice p-1">{product.price} USD </Typography>
                  :
                  
                  <span style={{display:"flex",margin:"1rem 0"}}>
                    <input onChange={changePrice} value={editedPrice} class="shadow appearance-none border rounded py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Name"></input>
                    <ButtonSmall mx="0 0 1rem" text={"Change Price"} style={{float:"right"}} color="#282828" onClick={updatePrice} />
                  </span>
                }
              <Avatar sx={{ml:2,background:"white",width:"1.5rem",height:"1.5rem",my:"auto",border:1,borderColor:"black"}} onClick={togglePriceEditable}><EditIcon sx={{color:"black",width:"1rem",height:"1.5rem"}}/></Avatar>
              </span>
              <span style={{display:"flex"}}>
              <Typography class="productTitle">Description </Typography>
              <Avatar sx={{background:"white",width:"1.5rem",height:"1.5rem",my:"auto",border:1,borderColor:"black"}} onClick={toggleDescriptionEditable}><EditIcon sx={{color:"black",width:"1rem",height:"1rem"}}/></Avatar>
              </span>
              {!descriptionEditable ?
                <Typography class="normalText p-1">{product.description}</Typography>
                :
                <span style={{display:"flex",margin:"1rem 0"}}>
                  <textarea onChange={changeDescription} value={editedDescription} class="shadow appearance-none border py-3 border-black rounded px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" style={{height:"10rem"}} id="username" type="text" placeholder="Description"></textarea>
                  <ButtonSmall mx="0 0 1rem" text={"Change Description"} style={{float:"right"}} color="#282828" onClick={updateDescription} />
                </span>
      
              }
              <span style={{display:"block",marginTop:"2vh"}}>
                <div style={{display:"flex"}}>
                  <Typography class="subtitle">Product Link: </Typography>
                  <Avatar sx={{background:"white",width:"1.2rem",height:"1.2rem",my:"auto",border:1,borderColor:"black"}} onClick={toggleProductLinkEditable}><EditIcon sx={{color:"black",width:"0.7rem",height:"0.7rem"}}/></Avatar>
                </div>
                {!productLinkEditable ?
                  <Box sx={{overflow:"auto"}}>
                    <a href={product.productLink} target="_blank" rel="noreferrer" style={{fontSize:"1vw",fontFamily:"Montserrat",color:"#1A73E8"}}>{product.productLink}</a>
                  </Box>
                  :
                  <span style={{display:"flex",margin:"1rem 0"}}>
                    <input onChange={changeProductLink} value={editedProductLink} class="shadow appearance-none border rounded py-2 px-3 w-4/6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Product Link"></input>
                    <ButtonSmall mx="0 0 1rem" text={"Change Product Link"} style={{float:"right"}} color="#282828" onClick={updateProductLink} />
                  </span>
                }
                </span>
                
                <span style={{margin:"1rem 0",float:"right"}}>
                  <RatingSolid Rating={product.overallRating}/>
                </span>
              
            </Box>
          </Grid>

          <Grid item xs={2}/>
        </Grid> 
        <Container sx={{width:"80vw",my:3,py:4,border:1,borderColor:"rgba(0,0,0,0.1)",borderRadius:2}}>
          <span style={{display:"flex",margin:"1rem 0"}}>
            <img alt="Product Views Icon" src={ProductViews} style={{width:"1.3rem",height:"1.3rem",margin:"auto 1rem"}}/>
            <Typography class="subtitle my-auto">Product views:</Typography>
            <Typography class="normalText my-auto ml-1">{product.views}</Typography>
          </span>
          <span style={{display:"flex",margin:"1rem 0"}}>
            <img alt="Product Clicks Icon" src={ProductClicks} style={{width:"1.3rem",height:"1.3rem",margin:"auto 1rem"}}/>
            <Typography class="subtitle my-auto">Product Clicks:</Typography>
            <Typography class="normalText my-auto ml-1">{product.clicks}</Typography>
          </span>
          <span style={{display:"flex",margin:"1rem 0"}}>
            <img alt="Website Clicks Icon" src={WebsiteClicks} style={{width:"1.3rem",height:"1.3rem",margin:"auto 1rem"}}/>
            <Typography class="subtitle my-auto">Website Clicks:</Typography>
            <Typography class="normalText my-auto ml-1">{product.websiteClicks}</Typography>
          </span>
        </Container>
        <Box sx={{mb:4}}>
          <Box sx={{display:"flex",float:"center"}}>
            <span className='mx-auto'>
              <ButtonDelete text="DELETE" color="#FF0000" onClick={openDeleteModal} />
            </span>
          </Box>
          <Transition appear show={isDeleteModalOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeDeleteModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                Delete Confirmation
                            </Dialog.Title>
                            <div className="mt-2">
                                <Typography>Are you sure you want to delete?</Typography>
                            </div>

                            <div className="mt-4">
                                <button
                                type="button"
                                className="inline-flex float-right rounded-md border border-transparent bg-red-300 mx-2 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={deleteProduct}
                                >
                                Yes
                                </button>
                                <button
                                type="button"
                                className="inline-flex float-right rounded-md border border-transparent bg-blue-300 mx-2 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={closeDeleteModal}
                                >
                                No
                                </button>
                            </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        </div>
                    </div>
                    </Dialog>
                </Transition>
        </Box>
        <Box sx={{textAlign:"center",my:"10vh",width:"80vw",mx:"auto",border:1,borderColor:"rgba(0,0,0,0.4)",borderRadius:2}}>
            <Typography sx={{display:"flex",fontSize:"2rem",justifyContent:"center",fontFamily:"Prompt",fontWeight:"bold",borderBottom:1,borderColor:"rgba(0,0,0,0.5)"}}>What's in the Box <Avatar sx={{ml:2,background:"white",width:"1.5rem",height:"1.5rem",my:"auto",border:1,borderColor:"black"}} onClick={toggleBoxContentEditable}><EditIcon sx={{color:"black",width:"1rem",height:"1rem"}}/></Avatar></Typography>
            <Container sx={{textAlign:"left",py:"5vh"}}>    
                
                   {!boxContentEditable ? 
                    <ul class="list-disc">
                      {
                        product.boxContents.map((boxContent)=>{
                          return(
                            <li className="ml-5 mb-6 normalText">{boxContent.content}</li>
                          )
                        })
                      }
                    </ul>
                    :
                    <Box sx={{width:"70vw",mb:5}}>
                      {
                        editedBoxContents.map((boxContent,i)=>{
                          return(
                            <span class="w-6/12 mx-1">
                              <Typography class="subtitle">Content</Typography>
                              <input value={boxContent.content}  onChange={event => changeBoxContents(event,i)}  class="shadow appearance-none border border-gray-200 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Content"></input>
                            </span>
                          )
                        })

                      }
                      <span class="flex my-4 float-right">
                        <Avatar sx={{background:"#fff",border:1,borderColor:"black",width:"1.8rem",height:"1.8rem",my:"auto",mx:"1rem"}} onClick={removeBoxContent}><RemoveIcon sx={{height:"1.3rem",width:"1.3rem",color:"#000"}}/></Avatar>
                        <Avatar sx={{background:"#fff",border:1,borderColor:"black",width:"1.8rem",height:"1.8rem",my:"auto",mx:"1rem"}} onClick={addBoxContent}><AddIcon sx={{height:"1.3rem",width:"1.3rem",color:"#000"}}/></Avatar>
                      </span>
                      <br/><br/>
                        <ButtonSmall mx="0 0 1rem" text={"Change Box Contents"}  color="#282828" onClick={updateBoxContents} />
                     
                    </Box>
                  }
            </Container>
        </Box>
        <Box sx={{textAlign:"center",my:"10vh",width:"80vw",mx:"auto",border:1,borderColor:"rgba(0,0,0,0.4)",borderRadius:2}}>
        <Typography sx={{display:"flex",fontSize:"2rem",justifyContent:"center",fontFamily:"Prompt",fontWeight:"bold",borderBottom:1,borderColor:"rgba(0,0,0,0.5)"}}>Key Specifications<Avatar sx={{ml:2,background:"white",width:"1.5rem",height:"1.5rem",my:"auto",border:1,borderColor:"black"}} onClick={toggleKeySpecificationsEditable}><EditIcon sx={{color:"black",width:"1rem",height:"1rem"}}/></Avatar></Typography>
            <Container sx={{textAlign:"left",py:"5vh"}}>    
                <ul class="list-disc">
                  {!keySpecificationsEditable ?
                   product.keySpecifications.map((spec)=>{
                      return(
                        <li class="ml-5 mb-6" style={{display:"flex"}}><p className='subtitle'>{spec.title} :</p><p className='normalText my-auto ml-1'> {spec.description}</p></li>
                      )
                      
                    })
                    :
                    <div>
                      
                        <Box sx={{width:"70vw",my:5}}>
                      {editedKeySpecifications.map((spec,i)=>{
                        return(
                          <Box sx={{display:"flex",width:"80vw",my:2}}>
                          <span class="w-5/12 mx-1">
                            <Typography class="subtitle">Title</Typography>
                            <input value={spec.title}  onChange={event => changeKeySpecsTitle(event,i)} class="shadow appearance-none border border-gray-200 normalText rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Title"></input>
                          </span>
                          <span class="w-5/12 mx-1">
                            <Typography class="subtitle">Description</Typography>
                            <input value={spec.description}  onChange={event => changeKeySpecsDescrtiption(event,i)} class="shadow appearance-none border border-gray-200 normalText rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Description"></input>
                          </span>

                        </Box>
                        )
                      
                      })
                      }
                      
                        <Avatar sx={{background:"#fff",float:"right",border:1,borderColor:"black",width:"1.8rem",height:"1.8rem",my:"auto",mx:"1rem"}} onClick={addKeySpecification}><AddIcon sx={{height:"1.3rem",width:"1.3rem",color:"#000"}}/></Avatar>
                        <Avatar sx={{background:"#fff",float:"right",border:1,borderColor:"black",width:"1.8rem",height:"1.8rem",my:"auto",mx:"1rem"}} onClick={removeKeySpecification}><RemoveIcon sx={{height:"1.3rem",width:"1.3rem",color:"#000"}}/></Avatar>
                      
                        <br/><br/>
                        <ButtonSmall mx="0 0 1rem" text={"Change Key Specifications"}  color="#282828" onClick={updateKeySpecifications} />
                      </Box>
                    </div>

                    
                  }
                </ul>
            </Container>
        </Box>
        {ratings.map((rating)=>
        <Box sx={{width:"80vw",mx:"auto",my:"6vh",px:"4rem",py:"4rem",border:1,borderColor:"rgba(0,0,0,0.4)",borderRadius:2}}>
            <Typography class="subtitle">{rating.title}</Typography>
            <Typography class="normalText my-2">{rating.description}</Typography>
            <span style={{float:"right",marginRight:"2rem"}}>
              <Rating Rating={parseInt(rating.rating)} />
            </span>
        </Box>
        )}
    </div>
  )
}

export default ProductStats