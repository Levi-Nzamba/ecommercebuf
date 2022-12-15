import React, { useState } from 'react'
import Logo from '../Assets/Logos/logo.png'
import { AppBar,Toolbar,Box,Typography,MenuItem,IconButton,Badge } from '@mui/material'
import {Notifications as NotificationsIcon , AccountCircle as AvatarIcon,Search as SearchIcon } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import CartIcon from '../Assets/Icons/cart.png'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { getAuth, signOut } from 'firebase/auth'
import {actionCreators} from '../Store/ActionCreators/index'
import {useDispatch, useSelector} from 'react-redux'
import { bindActionCreators } from 'redux'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
const ShopperNavbar = (props) => {
  const navigate = useNavigate()
  const [nextSearch,setNextSearch] = useState(null)
  const dispatch = useDispatch()
  const {setUserType} = bindActionCreators(actionCreators,dispatch)

  const userType = useSelector((state)=>state.userType)
  console.log(userType);

  const signout = () =>{
    signOut(getAuth()).then(()=>{
      setUserType("None")
      navigate("/")
    })
  }
  const requestSearch = (e) =>{
    e.preventDefault()
    if(nextSearch === "" || nextSearch === null){
        navigate("/Products/" + "Top")
    }
    else{
        navigate("/Products/" + nextSearch)
    }
}

const changeNextSearch = (e) =>{
    setNextSearch(e.target.value)
}

return (
  <div>
      
    <Box sx={{display:{'xs':"none","md":"block"}}}>
      <AppBar position="fixed" elevation={0} class="py-1 border-b border-slate-200 bg-white ">
          <Toolbar>
          <Link to="/Products/Top" >
            <img alt="Commerra Logo" src={Logo} width="160" />
          </Link>
          <Box sx={{ flexGrow: 1,}}> 
            <form class="w-full max-w-sm mx-auto">
              <div class="normalText text-sm flex items-center border py-2 px-3" style={{borderColor:"rgba(0,0,0,0.3)",borderRadius:"0.5rem"}}>
                <input onChange={changeNextSearch}  class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Search Product" aria-label="Full name"/>
                <button onClick={requestSearch} class="flex-shrink-0 text-sm text-white py-2 px-3 rounded" type="button" >
                  <SearchIcon sx={{color:"#1A73E8"}} />
                </button>
              </div>
            </form>
          </Box>
          {userType === "None" ?
            <Link to="/Landing">Login</Link>
          :
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full border-gray-300 shadow-sm px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                  
                    <Badge color="error">
                        <AvatarIcon style={{color:"black"}}/>
                    </Badge>
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-100 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items class="origin-top-right absolute bg-white right-0 mt-2 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" >
                  <div className="py-1">
                      
                    <Link to="/favourites">
                        <Menu.Item>
                        {({ active }) => (
                            <p
                            className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                            )}
                            >
                                Favourites
                            </p>
                        )}
                        </Menu.Item>
                    </Link>
                    <Link to="/ratings">
                        <Menu.Item>
                        {({ active }) => (
                            <p
                            className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                            )}
                            >
                                Ratings
                            </p>
                        )}
                        </Menu.Item>
                    </Link>
                    <Link to="/settings">
                        <Menu.Item>
                        {({ active }) => (
                            <p
                            className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                            )}
                            >
                                Settings
                            </p>
                        )}
                        </Menu.Item>
                    </Link>
                      <Menu.Item onClick={signout}>
                        {({ active }) => (
                          <button
                            type="submit"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block w-full text-left px-4 py-2 text-sm'
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          }
      
          </Toolbar>
      </AppBar>
    </Box>
    <Box sx={{display:{'xs':"block","md":"none"}}}>
      <AppBar position="fixed" sx={{background:"white"}}>
          <Toolbar>
          <Link to="/Products/Top" >
            <img alt="Commerra Logo" src={Logo} width="160"/>
          </Link>
        
          <Box sx={{ flexGrow: 1,}}/>
         
          
          {userType === "None" ?
            <div className='text-black'>
              <Link to="/Landing">Login</Link>
            </div>
          :
            <div>
              <Box>
                <Link to="/Products/Top">
                  <img alt="E-Buff Shop" src={CartIcon} width="25rem" height="25rem" style={{height:"1.5rem"}}/>
                </Link>
              </Box>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full border-gray-300 shadow-sm px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    
                      <Badge color="error">
                          <AvatarIcon style={{color:"black"}}/>
                      </Badge>
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
                      <Link to="/Settings">
                        
                      <Link to="/Favourites">
                          <Menu.Item>
                          {({ active }) => (
                              <p
                              className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                              )}
                              >
                                  Favourites
                              </p>
                          )}
                          </Menu.Item>
                      </Link>
                      <Link to="/Ratings">
                          <Menu.Item>
                          {({ active }) => (
                              <p
                              className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                              )}
                              >
                                  Ratings
                              </p>
                          )}
                          </Menu.Item>
                      </Link>
                          <Menu.Item>
                          {({ active }) => (
                              <p
                              className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                              )}
                              >
                                  Settings
                              </p>
                          )}
                          </Menu.Item>
                      </Link>
                        <Menu.Item onClick={signout}>
                          {({ active }) => (
                            <button
                              type="submit"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block w-full text-left px-4 py-2 text-sm'
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          }
      
          </Toolbar>
      </AppBar>
    </Box>

  </div>
)
}

export default ShopperNavbar