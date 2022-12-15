import React, { useState } from 'react'
import { Container,Typography,Avatar,Box,Alert } from '@mui/material'
import ButtonWide from '../Components/ButtonWide'
import {motion} from 'framer-motion'
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material'
import SupermarketBackground from '../Assets/Background/Supermarket_Background.png'
import { addDoc, collection, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
const AddProduct = () => {
    const db = getFirestore()
    const auth = getAuth()
    const uid = auth.currentUser.uid
    const userRef = doc(db, "Users" , uid)
    const productRef = collection(db,"Products")
    const storage = getStorage();

    const [isLoading,setIsLoading] = useState(false)
    const [isError,setIsError] = useState(false)
    const [errorMsg,setErrorMsg] = useState("")
    const navigate = useNavigate()

    const [image,setImage] = useState(null)
    const [productImage,setProductImage] = useState(null)
    const [name,setName] = useState(null)
    const [price,setPrice] = useState(null)
    const [description,setDescription] = useState(null)
    const [keySpecs,setKeySpecs] = useState([{title:"",description:""}])
    const [boxContents,setBoxContents] = useState([{content:""}])
    const [productLink,setProductLink] = useState(null)
   
    const changeImage = (e) =>{
        const [f] = e.target.files
        setProductImage(f)
        setImage(URL.createObjectURL(f))
    }
    const changeName = (e) =>{
        setName(e.target.value)
    }
    const changePrice = (e) =>{
        setPrice(e.target.value)
    }
    const changeDescription = (e) =>{
        setDescription(e.target.value)
    }
    const changeProductLink = (e) =>{
        setProductLink(e.target.value)
    }
    const changeBoxContent = (e,i) =>{
      setBoxContents(boxContents =>
          boxContents.map((boxContent,index) => {
            if (index === i) {
              return {...boxContent, content:e.target.value};
            }
    
            return boxContent;
          }),
        )
    }
    const changeKeySpecsTitle = (e,i) =>{
      setKeySpecs(keySpecs =>
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
      setKeySpecs(keySpecs =>
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
    const addKeySpec = () => {
      setKeySpecs((previousState)=>{
        return[
          ...previousState,
          {title:"",description:""}
        ]
      })
    }
    const addContent = () =>{
      setBoxContents((prevState)=>{
        return[
          ...prevState,
          {content:""}
        ]

      })
    }
    const removeKeySpec = () => {
      setKeySpecs((prevState)=>
        prevState.filter((obj,index) => {
          return index < prevState.length - 1
        })
      )
    }
    const removeContent = () =>{
      setBoxContents((prevState)=>
        prevState.filter((obj,index) => {
          return index < prevState.length - 1
        })
        
      )
        
    }
      

    const addProduct = () => {
        setIsLoading(true)
        if(image === null || name === null || price === null || description === null || keySpecs === [{title:"",description:""}]|| boxContents === [{content:""}] || productLink === null ){
            setIsLoading(false)
            setIsError(true)
            setErrorMsg("Please fill out all the fields to publish a product.")
        }
        else{
        setIsError(false)
        const file = new File([productImage], name.trim() + ".jpg",{type: "image/png"});
                getDoc(doc(getFirestore(),"Users",getAuth().currentUser.uid)).then((userDoc)=>{
                  let products = {}
                  products = {
                      name:name,
                      nameSearch:name.toLowerCase(),
                      price:parseFloat(price),
                      description:description,
                      favourites:[],
                      keySpecifications:keySpecs,
                      boxContents:boxContents,
                      productLink:productLink,
                      ratings:[],
                      raters:[],
                      views:0,
                      clicks:0,
                      websiteClicks:0,
                      overallRating:0,
                      user:uid
                  }
                  console.log(products)
                  addDoc(productRef,products).then((document)=>{
                      getDoc(userRef).then((userData)=>{
                          
                          const storageRef = ref(storage, 'productImages/' + document.id);
                          uploadBytes(storageRef, file).then((snapshot) => {
                              getDownloadURL(storageRef).then((url)=>{
                                  const docRef = doc(db,"Products",document.id)
                                  updateDoc(docRef,{
                                      image:url,
                                      id:document.id
                                  }).then(()=>{
                                      const productsPosted = userData.data().productsPosted
                                      productsPosted.push(document.id)
                                      updateDoc(userRef,{
                                          productsPosted:productsPosted
                                      }).then(()=>{
                                          navigate("/")
                                      })
                                  })
                              })
                          })
                      })
                  })
                })

                
    }
      
        
    }
  return (
    <div>
        
    <div style={{background:`url(${SupermarketBackground})`,backgroundSize:"100% 100%",backgroundAttachment:"fixed"}}>
        <Container sx={{width:"50%",my:4,py:6,borderRadius:2,border:1,borderColor:"rgba(0,0,0,0.4)"}} class="my-4 py-6 rounded-lg mx-auto border border-black" style={{background:"#E9EFFF"}}>
          <Typography class="title">ADD PRODUCT</Typography>
          <img style={{display:"flex",width:"10rem",margin:"0 auto"}} src={image}/>
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
            <input onChange={changeName} value={name} class="shadow appearance-none border border-black rounded py-5 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Name"></input>
          </Box>
          <Box sx={{my:4,mx:"6vw"}}>
            <label class="block text-md font-bold mb-2" for="username" style={{fontFamily:'Prompt',color:'#282828'}}>
              Price
            </label>
            <input onChange={changePrice} value={price} class="shadow appearance-none border border-black rounded py-5 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" placeholder="Price"></input>
          </Box>
          <Box sx={{my:4,mx:"6vw"}}>
            <label class="block text-md font-bold mb-2" for="username" style={{fontFamily:'Prompt',color:'#282828'}}>
              Descriptions
            </label>
            <textarea onChange={changeDescription} value={description}  class="shadow appearance-none border border-black rounded py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" style={{height:"10rem"}} id="username" type="text" placeholder="Descriptions"></textarea>
          </Box>
          <Box sx={{my:4,mx:"6vw",width:"81vw"}}>
            <label class="block text-md font-bold mb-2" for="username" style={{fontFamily:'Prompt',color:'#282828'}}>
              Key Specifications
            </label>
            { keySpecs.map((keySpec,i)=>{
              return(
              <Box sx={{display:"flex",width:"80vw",my:2}}>
                <span class="w-6/12 mx-1">
                  <Typography sx={{fontFamily:"PromptThin",opacity:"0.5"}}>Title</Typography>
                  <input onChange={event => changeKeySpecsTitle(event,i)}  class="shadow appearance-none border border-black rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Title"></input>
                </span>
                <span class="w-6/12 mx-1">
                  <Typography sx={{fontFamily:"PromptThin",opacity:"0.5"}}>Description</Typography>
                  <input onChange={event => changeKeySpecsDescrtiption(event,i)}  class="shadow appearance-none border border-black rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Description"></input>
                </span>
              </Box>
              )
            })
           
            }
              <Avatar sx={{background:"#fff",float:"right",border:1,borderColor:"black",width:"1.8rem",height:"1.8rem",my:"auto",mx:"1rem"}} onClick={addKeySpec}><AddIcon sx={{height:"1.3rem",width:"1.3rem",color:"#000"}}/></Avatar>
              <Avatar sx={{background:"#fff",float:"right",border:1,borderColor:"black",width:"1.8rem",height:"1.8rem",my:"auto",mx:"1rem"}} onClick={removeKeySpec}><RemoveIcon sx={{height:"1.3rem",width:"1.3rem",color:"#000"}}/></Avatar>
          </Box>
          <Box sx={{my:4,mx:"6vw",width:"81vw"}}>
            <label class="block text-md font-bold mb-2" for="username" style={{fontFamily:'Prompt',color:'#282828'}}>
              What's in the Box
            </label>
            { boxContents.map((boxContent,i)=>{
              return(
              <Box sx={{display:"flex",width:"80vw",my:2}}>
                <span class="w-6/12 mx-1">
                  <Typography sx={{fontFamily:"PromptThin",opacity:"0.5"}}>Content</Typography>
                  <input onChange={event => changeBoxContent(event,i)}  class="shadow appearance-none border border-black rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Content"></input>
                </span>
              </Box>
              )
            })
           
            }

             <Avatar sx={{background:"#fff",float:"right",border:1,borderColor:"black",width:"1.8rem",height:"1.8rem",my:"auto",mx:"1rem"}} onClick={addContent}><AddIcon sx={{height:"1.3rem",width:"1.3rem",color:"#000"}}/></Avatar>
              <Avatar sx={{background:"#fff",float:"right",border:1,borderColor:"black",width:"1.8rem",height:"1.8rem",my:"auto",mx:"1rem"}} onClick={removeContent}><RemoveIcon sx={{height:"1.3rem",width:"1.3rem",color:"#000"}}/></Avatar>
          </Box>
          
          <Box sx={{my:4,mx:"6vw",width:"80vw",display:{"xs":"none","md":"block"}}}>
            <label class="block text-md my-auto mx-2 font-bold mb-2" for="username" style={{fontFamily:'Prompt',color:'#282828'}}>
              Link
            </label>
            <input onChange={changeProductLink} value={productLink} class="shadow appearance-none border border-black rounded py-4 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Link"></input>
          </Box>
          <Box sx={{my:4,mx:"6vw",display:{"xs":"block","md":"none"}}}>
            <label class="block text-md font-bold mb-2" for="username" style={{fontFamily:'Prompt',color:'#282828'}}>
              Link
            </label>
            <input onChange={changeProductLink} value={productLink}  class="shadow appearance-none border border-black rounded py-4 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Link"></input>
          </Box>
          {isError && 
            <Alert severity="error" sx={{my:2,width:"50vw",mx:"auto",border:1,borderColor:"rgba(155,0,0,0.6)"}}>{errorMsg}</Alert>
          }
          {isLoading ?
            <ButtonWide disabled={true} text="Loading..." color="#282828"/>
            :
            <ButtonWide onClick={addProduct} text="FINISH" color="#282828"/>
          }
        </Container>
    </div>
    </div>
  )
}

export default AddProduct