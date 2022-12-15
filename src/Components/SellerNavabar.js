import React from 'react'
import Logo from '../Assets/Logos/logo.png'
import { AppBar,Toolbar,Box,Typography,MenuItem,IconButton,Badge } from '@mui/material'
import Increase from '../Assets/Icons/increase.png'
import {Notifications as NotificationsIcon , AccountCircle as AvatarIcon } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { getAuth, signOut } from 'firebase/auth'

import {actionCreators} from '../Store/ActionCreators/index'
import {useDispatch} from 'react-redux'
import { bindActionCreators } from 'redux'
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
const SellerNavbar = () => {
  const dispatch = useDispatch()
  const {setUserType} = bindActionCreators(actionCreators,dispatch)
  const navigate = useNavigate()
  const signout = () =>{
    signOut(getAuth()).then(()=>{
      setUserType("None")
      navigate("/")
    })
  }
  return (
    <div>
      <Box sx={{display:{'xs':"none","md":"block"}}}>
        <AppBar position="fixed" sx={{background:"white"}}>
            <Toolbar>
            <Link to="/Products/:search">
              <img alt="E-Buff Logo" src={Logo} width="160"/>
            </Link>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box sx={{display:"flex",mx:1}}><Link to="/"><img alt="E-Buff Dashboard" src={Increase} width="25rem" style={{height:"1.5rem"}}/></Link><Typography class="normalText text-black"><Link to='/'>Dashboard</Link></Typography></Box>
    
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
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Link to="/Settings">
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
                      <Menu.Item  onClick={signout}>
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
        
            </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{display:{'xs':"block","md":"none"}}}>
        <AppBar position="fixed" sx={{background:"white"}}>
            <Toolbar>
            <Link to="/Products/:search">
              <img alt="E-Buff Logo" src={Logo} width="160"/>
            </Link>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box sx={{display:"flex",mx:1}}><img alt="E-Buff Dashboard" src={Increase} width="25rem" style={{height:"1.5rem"}}/><Typography sx={{ml:1,color:"black",fontFamily:"Mukta",fontWeight:600,my:"auto"}}><Link to='/Dashboard'>Dashboard</Link></Typography></Box>
           
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
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Link to="/Settings">
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
                      <Menu.Item  onClick={signout}>
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
        
            </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default SellerNavbar