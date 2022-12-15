import React from 'react'
import Logo from '../Assets/Logos/logo.png'
import { AppBar,Toolbar,Box,Typography,Badge, Avatar} from '@mui/material'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import AdduserIcon from '../Assets/Icons/adduser.png'
import RemoveUserIcon from '../Assets/Icons/removeuser.png'
import RevenueIcon from '../Assets/Icons/revenue.png'
import signOutIcon from '../Assets/Icons/logout.png'
import {AccountCircle as AvatarIcon} from '@mui/icons-material'
import { getAuth, signOut } from 'firebase/auth'
import {actionCreators} from '../Store/ActionCreators/index'
import {useDispatch} from 'react-redux'
import { bindActionCreators } from 'redux'
import {Notifications as NotificationsIcon } from '@mui/icons-material'


import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
const AdminNavbar = () => {
    const location = useLocation()
    const pathname = location.pathname
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {setUserType} = bindActionCreators(actionCreators,dispatch)
    const signOutAccount = () =>{
        signOut(getAuth()).then(()=>{
            setUserType("None")
            navigate("/")
        })
    }
  return (
    <div>
        <AppBar position="fixed" sx={{display:{'xs':"none",'md':'flex'},background:"white"}}>
            <Toolbar> 
            <Link to="/Products/:search">
                <img alt="E-Buff Logo" src={Logo} width="100vw"/>
            </Link>
            <Box sx={{ flexGrow: 1,}}/>
            
            <Box sx={{display:"flex",mx:1}}><img alt="E-Buff Dashboard" src={RevenueIcon} width="25rem" style={{height:"1.5rem"}}/>
            {pathname == "/" ? 
                    
                    <Typography sx={{ml:1,color:"black",fontFamily:"Mukta",fontWeight:600,my:"auto"}}>
                        <Link to='/'>Revenue</Link>
                    </Typography> 
                : 
                    
                    <Typography sx={{ml:1,color:"black",fontFamily:"MuktaThin",fontWeight:600,my:"auto"}}>
                        <Link to='/'>Revenue</Link>
                    </Typography> 
                }
            </Box>
            <Box sx={{display:'flex',mx:1}}><img alt="E-Buff Dashboard" src={AdduserIcon} width="25rem" style={{height:"1.5rem"}}/>
                {pathname == "/Adduser" ? 
                    
                    <Typography sx={{ml:1,color:"black",fontFamily:"Mukta",fontWeight:600,my:"auto"}}>
                        <Link to='/Adduser'>Add User</Link>
                    </Typography> 
                : 
                    
                    <Typography sx={{ml:1,color:"black",fontFamily:"MuktaThin",fontWeight:600,my:"auto"}}>
                        <Link to='/Adduser'>Add User</Link>
                    </Typography> 
                }
                
            </Box>
            <Box sx={{display:"flex",mx:1}}><img alt="E-Buff Dashboard" src={RemoveUserIcon} width="25rem" style={{height:"1.5rem"}}/>
                {pathname === "/Removeuser" ? 
                    
                    <Typography sx={{ml:1,color:"black",fontFamily:"Mukta",fontWeight:600,my:"auto"}}>
                        <Link to='/Removeuser'>Remove User</Link>
                    </Typography> 
                : 
                    
                    <Typography sx={{ml:1,color:"black",fontFamily:"MuktaThin",fontWeight:600,my:"auto"}}>
                        <Link to='/Removeuser'>Remove User</Link>
                    </Typography> 
                }
            </Box>
            <Link to="/AdminNotifications">
                <NotificationsIcon style={{color:"black",margin:"0 1rem"}}/>
            </Link>
            <Box sx={{display:"flex",mx:1}} ><img onClick={signOutAccount} alt="E-Buff Dashboard" src={signOutIcon} width="25rem" style={{height:"1.5rem"}}/>
               
            </Box>
        
            </Toolbar>
        </AppBar>
        <AppBar position="fixed" sx={{display:{'xs':"flex ",'md':'none'},background:"white"}}>
            <Toolbar> 
            <Link to="/Products/:search">
                <img alt="E-Buff Logo" src={Logo} width="100vw"/>
            </Link>
            <Box sx={{ flexGrow: 1,}}/>
            
           
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
                    <Link to="/">
                        <Menu.Item>
                        {({ active }) => (
                            <p
                            className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                            )}
                            >
                                Revenue
                            </p>
                        )}
                        </Menu.Item>
                    </Link>
                    <Link to="/Adduser">
                        <Menu.Item>
                        {({ active }) => (
                            <p
                            className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                            )}
                            >
                              Add User
                            </p>
                        )}
                        </Menu.Item>
                    </Link>
                    <Link to="/Removeuser">
                        <Menu.Item>
                        {({ active }) => (
                            <p
                            className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                            )}
                            >
                                Remove User
                            </p>
                        )}
                        </Menu.Item>
                    </Link>
                    <Link to="/AdminNotifications">
                        <Menu.Item>
                        {({ active }) => (
                            <p
                            className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                            )}
                            >
                                Notifications
                            </p>
                        )}
                        </Menu.Item>
                    </Link>
                        <Menu.Item  onClick={signOutAccount}>
                        {({ active }) => (
                            <p
                           
                            className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                            )}
                            >
                                Sign Out
                            </p>
                        )}
                        </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
        
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default AdminNavbar