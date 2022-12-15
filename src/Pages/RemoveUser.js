import { Box, Typography,Grid,Container } from '@mui/material'
import {motion} from 'framer-motion'
import React, { useState,Fragment } from 'react'
import AdminNavbar from '../Components/AdminNavbar'
import UserImage from '../Assets/Icons/user.png'
import { collection, deleteDoc, doc, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { Dialog, Transition } from '@headlessui/react'
import { getAuth } from 'firebase/auth'

const RemoveUser = () => {
  const [searchTerm,setSearchTerm] = useState()
  const [users,setUsers] = useState([{productsPosted:""}])
  const [uid,setUid] = useState()
  const [index,setIndex] = useState()
  const [defaultUsers,setDefaultUsers] = useState(true)
  const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false)
  const closeDeleteModal = ()=>{
    setIsDeleteModalOpen(false)
  }
  const openDeleteModal = (user,index) =>{
    setUid(user.uid)
    setIndex(index)
    setIsDeleteModalOpen(true)
  }
  const changeSearchTerm = (e) =>{
    setSearchTerm(e.target.value)
  }

  
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
  const removeUser = () =>{
    deleteDoc(doc(getFirestore(),"Users",users[index].uid)).then(()=>{
      window.open("https://console.firebase.google.com/u/1/project/ecommerce-buff/authentication/users", '_blank').focus()
    })
  }


  return (
    <div>
      <AdminNavbar/>
      <Box sx={{mt:"14vh",minHeight:"100vh"}}>
        <Typography class="title">REMOVE USER</Typography>
        
        <Box sx={{display:{'xs':'none','md':"block"}}} className="w-full max-w-sm mx-auto">
          <div class="flex items-center border-b py-2" style={{borderColor:"#1A73E8"}}>
            <input value={searchTerm} onChange={changeSearchTerm} class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Search User" aria-label="Full name"/>
            <button onClick={searchUser} class="flex-shrink-0 text-sm text-white py-2 px-3 rounded" type="button" style={{background:"#1A73E8",fontFamily:"Prompt"}}>
              Search
            </button>
          </div>
        </Box>
        <Box sx={{display:{'xs':'block','md':"none"}}} className="w-4/6 max-w-sm mx-auto">
          <div class="flex items-center border-b py-2" style={{borderColor:"#1A73E8"}}>
            <input value={searchTerm} onChange={changeSearchTerm} class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Search User" aria-label="Full name"/>
            <button onClick={searchUser} class="flex-shrink-0 text-sm text-white py-2 px-3 rounded" type="button" style={{background:"#1A73E8",fontFamily:"Prompt"}}>
              Search
            </button>
          </div>
        </Box>

        <Container sx={{width:{"xs":"95vw","md":"70vw"},mx:"auto"}}>
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
              {users.map((user,index)=>
                <Grid container sx={{display:'flex',p:4,border:1,borderColor:"rgba(0,0,0,0.4)",borderRadius:2,my:"4vh"}}>
                    <Grid item xs={12} md={3}>
                        <img src={user.profilePhoto}/>
                    </Grid>
                    <Grid item xs={12} md={8} sx={{ml:2}}>
                        <Typography sx={{fontFamily:"Prompt",fontSize:"1.2rem",fontWeight:"bold",my:3}}>{user.name}</Typography>
                        <Typography sx={{fontFamily:"PromptThin",my:"2vh",fontSize:"1.4rem"}}>{user.productsPosted.length} Products</Typography>
                        <Typography sx={{fontFamily:"PromptThin",my:"2vh"}}>{user.bio}</Typography>
                        <Box sx={{display:"flex"}}>
                            <motion.button 
                                class="flex text-white my-auto py-2 px-4 rounded" 
                                style={{height:"7vh",backgroundColor:'#FF0000',boxShadow:"-0.5vh 0.4vh #999"}}
                                whileHover={{
                                scale:1.2
                                }}
                                onClick={()=>openDeleteModal(user,index)}
                            >
                               Remove 
                            </motion.button>
                            
                        </Box>
                    </Grid>
                </Grid>
              
                )
              }
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
                  Delete Instruction
              </Dialog.Title>
              <div className="mt-2">
                  <Typography>Copy {uid} into the search bar of the user console and select delete.</Typography>
              </div>

              <div className="mt-4">
                
                  <button
                  type="button"
                  className="inline-flex float-right rounded-md border border-transparent bg-red-300 mx-2 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={removeUser}
                  >
                  Delete data and go to Console
                  </button>
                  <button
                  type="button"
                  className="inline-flex float-right rounded-md border border-transparent bg-blue-300 mx-2 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={closeDeleteModal}
                  >
                  Cancel
                  </button>
              </div>
              </Dialog.Panel>
          </Transition.Child>
          </div>
      </div>
      </Dialog>
  </Transition>
              </Box>
            }
            </Container>
      </Box>
    </div>
  )
}

export default RemoveUser