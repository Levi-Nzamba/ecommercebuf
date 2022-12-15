import { Box, AppBar, Toolbar ,Typography, Grid, CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'
import ShopperNavbar from '../Components/ShopperNavbar'
import Filter from '../Assets/Icons/filter.png'
import Sort from '../Assets/Icons/sort.png'
import SampleImage from '../Assets/Sampleimage.jpg'
import Button from '../Components/Button'
import  {Link, useNavigate, useParams} from 'react-router-dom'
import Heart from '../Assets/Icons/heart.png'
import HeartFilled from '../Assets/Icons/heartfilled.png'
import Star from "../Assets/Icons/Star.png"
import StarFilled from "../Assets/Icons/Star_filled.png"
import Rating from '../Components/Rating'
import { Dialog, Transition,Menu } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { collection, doc, endAt, getDoc, getDocs, getFirestore, limit, orderBy, query, startAfter, startAt, updateDoc, where } from 'firebase/firestore'

import RatingSmall from '../Components/RatingSolid'
import { getAuth } from 'firebase/auth'

import FullHeight from 'react-full-height'
import { useSelector } from 'react-redux'

const currentDate = new Date().getTime()
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Products = () => {
    
    const userType = useSelector((state)=>state.userType)
    const navigate = useNavigate()
    const {search} = useParams()
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isSortOpen, setIsSortOpen] = useState(false)
    const [products,setProducts] = useState([{image:"",id:"",name:"",price:"",overallRating:""}])
    const [priceMin,setPriceMin] = useState(0)
    const [priceMax,setPriceMax] = useState(1000000000000)
    const [ratingMin,setRatingMin] = useState(0)
    const [ratingMax,setRatingMax] = useState(5)
    const [nextSearch,setNextSearch] = useState(null)
    const [results,setResults] = useState()

    const [isPageLoading,setIsPageLoading] = useState(true)
    const [isFavLoading,setIsFavLoading] = useState(false)

    const requestSearch = () =>{
        if(nextSearch === "" || nextSearch === null){
            navigate("/Products/" + "Top")
        }
        else{
            navigate("/Products/" + nextSearch)
        }
    }
    
    const  changeNextSearch = (e) =>{
        setNextSearch(e.target.value)
    }

    const sort =(q) =>{
        getDocs(q).then((docs)=>{
            const productsTemp = []
            docs.forEach((doc) => {

            if(doc.data().nameSearch.includes(search.toLowerCase()) && doc.data().expiry > currentDate ){
               const productTemp = {
                image:doc.data().image,
                name:doc.data().name,
                id:doc.data().id,
                price:doc.data().price,
                overallRating:doc.data().overallRating,
                favourite: doc.data().favourites.includes(getAuth().currentUser.uid),
                favLoading:false,
                clickLoading:false
               }
               productsTemp.push(productTemp)
            }
            })
            setProducts(productsTemp)
                    setResults(productsTemp.length)


        })
    }
    const sortTop= (q) =>{
        getDocs(q).then((docs)=>{
            const productsTemp = []
            docs.forEach((doc) => {
                if(doc.data().expiry > currentDate){

                    const productTemp = {
                    image:doc.data().image,
                    name:doc.data().name,
                    id:doc.data().id,
                    price:doc.data().price,
                    overallRating:doc.data().overallRating,
                    favourite: doc.data().favourites.includes(getAuth().currentUser.uid),
                    favLoading:false,
                    clickLoading:false
                    }
                    productsTemp.push(productTemp)
                }
            })
            setProducts(productsTemp)
                    setResults(productsTemp.length)

       
        })
        
    }

    const sortLowtoHighPrice = () =>{
        if(search.toLowerCase() === "top"){
            const q = query(collection(getFirestore(), "Products"),orderBy("price","asc"));
           
            sortTop(q)
        }
        else{
            const  q = query(collection(getFirestore(), "Products"), orderBy("price","asc"))
            sort(q)
        }
    }
    const sortHightoLowPrice = () =>{
        if(search.toLowerCase() === "top"){
            const q = query(collection(getFirestore(), "Products"),orderBy("price","desc"));
            sortTop(q)
        }
        else{
            const q = query(collection(getFirestore(), "Products"), orderBy("price","desc"))
            sort(q)
        }
    }
    const sortLowtoHighRating = () =>{
        if(search.toLowerCase() === "top"){
            const q = query(collection(getFirestore(), "Products"),orderBy("overallRating","asc"));
            sortTop(q)
        }
        else{
            const q = query(collection(getFirestore(), "Products"), orderBy("overallRating","asc"))
            sort(q)
        }
    }
    const sortHightoLowRating = () =>{
        if(search.toLowerCase() === "top"){
            const q = query(collection(getFirestore(), "Products"),orderBy("overallRating","desc"));
            sortTop(q)
        }
        else{
            const q = query(collection(getFirestore(), "Products"),orderBy("overallRating","desc"))
            sort(q)    
        }
    }

    const changePriceMin = (e) =>{
        setPriceMin(e.target.value)
    }
    const changePriceMax = (e) =>{
        setPriceMax(e.target.value)
    }
    const changeRatingMin = (e) =>{
        setRatingMin(e.target.value)
    }
    const changeRatingMax = (e) =>{
        setRatingMax(e.target.value)
    }

    const filter = () =>{
        if(priceMin === 0 || priceMin === null || priceMax === null || ratingMin === 0 || ratingMin === 0 || ratingMax === null  ){
            let q = query(collection(getFirestore(), "Products"), where("expiry", ">", currentDate),where("price",">=",parseInt(priceMin)),where("price","<=",parseInt(priceMax),where("rating",">=",parseInt(ratingMin)),where("rating","<=",parseInt(ratingMax))), limit(30));
            if(priceMin === ""){
                q = query(collection(getFirestore(), "Products"), where("expiry", ">", currentDate),where("price",">=",parseInt(0)),where("price","<=",parseInt(priceMax),where("rating",">=",parseInt(ratingMin)),where("rating","<=",parseInt(ratingMax))),orderBy("expiry"), limit(30));
            }
            if(ratingMin === ""){
                q = query(collection(getFirestore(), "Products"), where("expiry", ">", currentDate),where("price",">=",parseInt(priceMin)),where("price","<=",parseInt(priceMax),where("rating",">=",parseInt(0)),where("rating","<=",parseInt(ratingMax))),orderBy("expiry"), limit(30));
            }
            if(priceMax === ""){
                q = query(collection(getFirestore(), "Products"), where("expiry", ">", currentDate),where("price",">=",parseInt(priceMin)),where("price","<=",parseInt(10000000000),where("rating",">=",parseInt(ratingMin)),where("rating","<=",parseInt(ratingMax))),orderBy("expiry"), limit(30));
            }
            if(ratingMax === ""){
                q = query(collection(getFirestore(), "Products"), where("expiry", ">", currentDate),where("price",">=",parseInt(priceMin)),where("price","<=",parseInt(priceMax),where("rating",">=",parseInt(ratingMin)),where("rating","<=",parseInt(5))),orderBy("expiry"), limit(30));
            }
            if(search.toLowerCase() === "top"){
                getDocs(q).then((docs)=>{
                    const productsTemp = []
                    docs.forEach((doc) => {
                if(doc.data().nameSearch.includes(search.toLowerCase())){
                    const productTemp = {
                        image:doc.data().image,
                        name:doc.data().name,
                        id:doc.data().id,
                        price:doc.data().price,
                        overallRating:doc.data().overallRating,
                        favourite: doc.data().favourites.includes(getAuth().currentUser.uid),
                        favLoading:false,
                        clickLoading:false
                    }
                    productsTemp.push(productTemp)
                }
                    })
                    setProducts(productsTemp)
                    setResults(productsTemp.length)
        
                }).then(()=>{
                    closeModal()
                })
            }
            else{
                getDocs(q).then((docs)=>{
                    const productsTemp = []
                    docs.forEach((doc) => {
                    const productTemp = {
                        image:doc.data().image,
                        name:doc.data().name,
                        id:doc.data().id,
                        price:doc.data().price,
                        overallRating:doc.data().overallRating,
                        favourite: doc.data().favourites.includes(getAuth().currentUser.uid),
                        favLoading:false,
                        clickLoading:false
                    }
                    productsTemp.push(productTemp)
                    })
                    setProducts(productsTemp)
                    setResults(productsTemp.length)
        
                }).then(()=>{
                    closeModal()
                })

            }
        }
    }
    const openFilter = () => {
        setIsFilterOpen(true)
    }
    const closeModal = () => {
        setIsFilterOpen(false)
    }
    const openSort= () =>{
        setIsSortOpen(true)
    }  
    const unFavourite = (id,i)=>{
        if(userType !== "None"){
            const auth = getAuth().currentUser.uid
            const docRef = doc(getFirestore(),"Products",id)
            const userRef = doc(getFirestore(),"Users",auth)
            setProducts(products=>
                products.map((prevState,index)=>{
                if(index === i){
                return{...prevState,favLoading:true}
                }
                else {
                return{...prevState}
                }
                })
            )
            getDoc(docRef).then((doc)=>{
                let newFavourites = doc.data().favourites
                newFavourites = newFavourites.filter((fav)=>{
                    return fav !== auth
                })
                updateDoc(docRef,{
                    favourites:newFavourites
                }).then(()=>{
                    
                    getDoc(userRef).then((doc)=>{
                        let newFavourites = doc.data().favourites
                        newFavourites = newFavourites.filter((fav)=>{
                            return fav !== id
                        })
                        updateDoc(userRef,{
                            favourites:newFavourites
                        }).then(()=>{
                            setProducts(products=>
                                products.map((prevState,index)=>{
                                if(index === i){
                                return{...prevState,favourite:false,favLoading:false}
                                }
                                else {
                                return{...prevState}
                                }
                                })
                            )
                        })
                    })
                })
                
            })
        }
        else{
            alert("You have to log in first")
        }
    }
    const favourite = (id,i) =>{
        if(userType !== "None"){
            const auth = getAuth().currentUser.uid
            const docRef = doc(getFirestore(),"Products",id)
            const userRef = doc(getFirestore(),"Users",auth)
            setProducts(products=>
                products.map((prevState,index)=>{
                if(index === i){
                return{...prevState,favLoading:true}
                }
                else {
                return{...prevState}
                }
                })
            )
            getDoc(docRef).then((doc)=>{
                const newFavourites = doc.data().favourites
                newFavourites.push(auth)
                updateDoc(docRef,{
                    favourites:newFavourites
                }).then(()=>{
                
                    getDoc(userRef).then((doc)=>{
                        let newFavourites = doc.data().favourites
                        newFavourites.push(id)
                        updateDoc(userRef,{
                            favourites:newFavourites
                        }).then(()=>{
                            setProducts(products=>
                                products.map((prevState,index)=>{
                                if(index === i){
                                return{...prevState,favourite:true,favLoading:false}
                                }
                                else {
                                return{...prevState}
                                }
                                })
                            )
                        })
                    })
                })

            })
        }
        else{
            alert("You have to log in first")
        }
    }

    const openProduct = (id,i) =>{
        setProducts(products=>
            products.map((prevState,index)=>{
            if(index === i){
              return{...prevState,clickLoading:true}
            }
            else {
              return{...prevState}
            }
            })
        )
        const docRef = doc(getFirestore(),"Products",id)
        getDoc(docRef).then((docProduct)=>{
            let newClicks = docProduct.data().clicks + 1
            const userRef= doc(getFirestore(),"Users",docProduct.data().user)
            updateDoc(docRef,{
                clicks:newClicks
            }).then(()=>{
                getDoc(userRef).then((docUser)=>{
                    let newTotalClicks = docUser.data().totalClicks + 1
                    updateDoc(userRef,{
                        totalClicks:newTotalClicks
                    }).then(()=>{
                        navigate("/Product/" + id)
                    })
                })
            })
        })
    }

    useEffect(()=>{
        let q = ""
        if(search.toLowerCase() === "top"){
            q = query(collection(getFirestore(), "Products"));
            getDocs(q).then((docs)=>{
                const productsTemp = []
                docs.forEach((doc) => {
                   const productTemp = {
                    image:doc.data().image,
                    name:doc.data().name,
                    id:doc.data().id,
                    price:doc.data().price,
                    overallRating:doc.data().overallRating,
                    favourite:userType === "None" ? false : doc.data().favourites.includes(getAuth().currentUser.uid),
                    favLoading:false,
                    clickLoading:false
                   }
                   productsTemp.push(productTemp)
                })
                setProducts(productsTemp)
                setResults(productsTemp.length)
                setIsPageLoading(false)
    
            })
        }
        else{

            const q = query(collection(getFirestore(), "Products"),orderBy("nameSearch"))

            getDocs(q).then((docs)=>{
                const productsTemp = []
                docs.forEach((doc) => {
                    if(doc.data().nameSearch.includes(search.toLowerCase()) && doc.data().expiry > currentDate ){
                        const productTemp = {
                            image:doc.data().image,
                            name:doc.data().name,
                            id:doc.data().id,
                            price:doc.data().price,
                            overallRating:doc.data().overallRating,
                            favourite: userType === "None" ? false : doc.data().favourites.includes(getAuth().currentUser.uid),
                            favLoading:false,
                            clickLoading:false
                        }
                        productsTemp.push(productTemp)
                    }
                })
                   console.log(productsTemp)
                   console.log("Woomba")
                    setProducts(productsTemp)
                    setResults(productsTemp.length)
                    setIsPageLoading(false)

            })
        }

    },[search])
    return (
        <div >
            <ShopperNavbar inputOnChange={changeNextSearch} inputOnKeyDown={changeNextSearch} buttonOnClick={requestSearch}/>
            
            <div>
            </div>
            {isPageLoading ? 
            <Box sx={{ display:"flex",minHeight:"89vh"}}>
                <Typography sx={{fontSize:"2rem",mx:"auto",my:"auto",fontFamily:"Oswald"}}><CircularProgress size={"2rem"} sx={{mr:3}} />LOADING STORE...</Typography>
            </Box>
            :
            <Box>
             <AppBar position="static" sx={{mt:"14vh",background:"white"}} elevation={0}>
                
            <Box component="form" sx={{display:{xs:'flex',"md":"none"},zIndex:-4}} className="w-5/6 max-w-sm mx-auto mb-10">
                <div class="flex items-center border-b py-2" style={{borderColor:"#1A73E8"}}>
                    <input onChange={changeNextSearch} onKeyDown={changeNextSearch}  class="normalText appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Search User" aria-label="Full name"/>
                    <button onClick={requestSearch} class="normalText flex-shrink-0 text-sm text-white py-2 px-3 rounded" type="button" style={{background:"#1A73E8",fontFamily:"Prompt"}}>
                    Search Product
                    </button>
                </div>
            </Box>
                <Toolbar>
                <Box sx={{ flexGrow: 1,}}/> 
                
                <Box sx={{display:"flex",my:"1vw",mx:1,border:1,borderColor:"rgba(0,0,0,0.15)",backgroundColor:"rgba(0,0,0,0.02)",borderRadius:2,py:1,px:2}} onClick={openFilter} >
                   
                        <img src={Filter} width="25rem" height="2rem" />
                        <Typography className="my-auto ml-1 subtitle text-black" style={{color:"#1A73E8"}}>Filter</Typography>
                   

                    <Transition appear show={isFilterOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                    Filter Functions
                                </Dialog.Title>
                                <div className="mt-2">
                                    <Box sx={{my:3}}>
                                        <label class="block text-md font-bold mb-2" for="username" style={{fontFamily:'Prompt',color:'#282828'}}>
                                        Price
                                        </label>
                                        <input onChange={changePriceMin} class="shadow appearance-none border rounded py-2 px-3 w-5/12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" placeholder="$ Min"></input>
                                        <input onChange={changePriceMax} class="shadow appearance-none border rounded py-2 float-right px-3 w-5/12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" placeholder="$ Max"></input>
                                    </Box>
                                    <Box sx={{my:3}}>
                                        <label class="block text-md font-bold mb-2" for="username" style={{fontFamily:'Prompt',color:'#282828'}}>
                                        Rating
                                        </label>
                                        <input onChange={changeRatingMin} class="shadow appearance-none border rounded py-2 px-3 w-5/12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" placeholder="Min"></input>
                                        <input onChange={changeRatingMax} class="shadow appearance-none border rounded py-2 float-right px-3 w-5/12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" placeholder="Max" max="5"></input>
                                    </Box>
                                </div>
    
                                <div className="mt-4">
                                    <button
                                    type="button"
                                    className="inline-flex float-right rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    onClick={filter}
                                    >
                                    Filter
                                    </button>
                                </div>
                                </Dialog.Panel>
                            </Transition.Child>
                            </div>
                        </div>
                        </Dialog>
                    </Transition>
                    
                </Box>
                
                <Box sx={{display:"flex",border:1,borderColor:"rgba(0,0,0,0.15)",backgroundColor:"rgba(0,0,0,0.02)",borderRadius:2,py:1,px:2}} onclick={() => setIsSortOpen(true)}>
                  
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex justify-center w-full border-gray-300 shadow-sm text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                            <img src={Sort} width="22rem" height="22rem" />
                            <Typography className="my-auto ml-2 subtitle text-black" style={{color:"#1A73E8"}}>Sort</Typography>
                            </Menu.Button>
                        </div>
    
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" >
                            <div className="py-1">
                                
                                    <Menu.Item onClick={sortLowtoHighPrice} >
                                    {({ active }) => (
                                        <p
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                        >
                                            Price: Low to High
                                        </p>
                                    )}
                                    </Menu.Item>
                                    <Menu.Item onClick={sortHightoLowPrice} >
                                    {({ active }) => (
                                        <p
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                        >
                                        Price: High to Low
                                        </p>
                                    )}
                                    </Menu.Item>
                                    <Menu.Item onClick={sortLowtoHighRating} >
                                    {({ active }) => (
                                        <p
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                        >
                                        Rating: Low to High
                                        </p>
                                    )}
                                    </Menu.Item>
                                <Menu.Item onClick={sortHightoLowRating} >
                                    {({ active }) => (
                                    <button
                                        type="submit"
                                        className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block w-full text-left px-4 py-2 text-sm'
                                        )}
                                    >
                                    Rating: High to Low
                                    </button>
                                    )}
                                </Menu.Item>
                            </div>
                            </Menu.Items>
                        </Transition>
                        </Menu>
                </Box>
               
            
                </Toolbar>
            </AppBar>
            <Typography sx={{fontFamily:"Prompt",color:"rgba(0,0,0,1)",mt:"6vh",ml:"3vw"}} >{results} {results > 1 ? "results" : "result"} found.</Typography>
            {!results > 0 ?
            <FullHeight>
                <Box >
                    <Typography sx={{fontFamily:"Prompt",mt:"6vh",ml:"3vw"}}>No results found try checking your search or using different key words.</Typography>
                </Box>
            </FullHeight>
            :
            <Grid container columnSpacing={3} rowSpacing={6} sx={{my:"2vh"}}>
                {products.map((product,index)=>
                <Grid item xs={6} md={4} sx={{my:{"xs":"2rem","md":"0rem"}}}>
                    
                    <Box component="div" sx={{textAlign:"left",height:"100%",width:"80%",mx:"auto",pb:"5vh",}}>
                        
                    <Rating Rating={product.overallRating}/>
                        <div
                            className='my-3'
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <img alt="Product" src={product.image} width="250rem" height="150rem" />
                        </div>
                        <Box sx={{py:2,px:2}}>
                            <Typography className='subtitle' style={{fontFamily:"LatoBlack"}}>{product.name.toUpperCase()}</Typography>
                            <Typography className='normalText' style={{fontSize:"0.9em"}}>${product.price} USD</Typography>
                        
                            <Box sx={{display:"flex",justifyContent:"right",mr:"2rem"}}>
                                {product.favLoading ? 
                                <Box>
                                    <CircularProgress size={"2rem"}/>
                                </Box>
                                :
                                <Box>
                                {product.favourite ?
                                    <img src={HeartFilled} onClick={()=>unFavourite(product.id,index)} width="24rem" height="24rem"/> 
                                    :
                                    <img src={Heart} onClick={()=>favourite(product.id,index)} width="24rem" height="24rem"/> 
                                }
                                </Box>
                                
                                }
                                
                               
                            </Box>
                        </Box>
                        <Box style={{display:"block"}}>
                                <Button  text="View More"onClick={()=>openProduct(product.id,index)} disabled={product.clickLoading} />
                        </Box>
                    </Box>
                </Grid>
                )
                }
    
            </Grid>
            }
            </Box>
            }
        </div>
      )
}

export default Products