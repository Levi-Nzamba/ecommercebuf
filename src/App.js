import './App.css';
import {BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom'
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Reset from './Pages/Reset'
import ResetFinal from './Pages/ResetFinal';
import Plans from './Pages/Plans'
import SetupProfile from './Pages/SetupProfile';
import Dashboard from './Pages/Dashboard';
import ProductStats from './Pages/ProductStats';
import Notifications from './Pages/Notifications'
import Settings from './Pages/Settings';
import Products from './Pages/Products';
import Product from './Pages/Product';
import Ratings from './Pages/Ratings'
import Favourites from './Pages/Favourites';
import AddUser from './Pages/AddUser';
import RemoveUser from './Pages/RemoveUser';
import Revenue from './Pages/Revenue';
import AddProduct from './Pages/AddProduct';
import Landing from './Pages/Landing';
import ErrorPage from './Pages/ErrorPage';
import ShopperInfo from './Pages/ShopperInfo'
import SellerInfo from './Pages/SellerInfo'
import ContactUs from './Pages/ContactUs'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import RefundPolicy from './Pages/RefundPolicy'
import TermsAndConditions from './Pages/TermsandConditions'

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import {actionCreators} from './Store/ActionCreators/index'
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import AdminNotifications from './Pages/AdminNotifications';
import Logo from './Assets/Logos/logo.png'

import './App.css';

function App() {
    const dispatch = useDispatch()
    const user = useSelector((state)=>state.user)
    const {logUser,setUserType} = bindActionCreators(actionCreators,dispatch)

    const [isLoaded,setIsLoaded] = useState(false)
    const userType = useSelector((state)=>state.userType)

    onAuthStateChanged(getAuth(), user => {
      if (user) {
        logUser(getAuth().currentUser)
        getDoc(doc(getFirestore(),"Users",user.uid)).then((doc)=>{
          if(doc.data().type === "Seller"){
            if(doc.data().name === ""){
              setUserType("SellerNull")
            }
            else{
              setUserType("Seller")
            }
          }
          else if(doc.data().type === "Shopper"){
            setUserType("Shopper")
          }
          
          else if(doc.data().type === "Admin"){
            setUserType("Admin")
          }
          setIsLoaded(true)
        })
      }
      else{
        setIsLoaded(true)
      }
    });
    
   return (
    <div className="App">
      <Router>
        {isLoaded ?
        <div>
            {userType === "None" &&
              <Routes>
                <Route path='/Signup' element={<Signup/>}/>
                <Route
                    path="/"
                    element={ <Navigate to="/Products/Top" /> }
                />
                <Route path='/Landing' element={<Landing/>}/>
                <Route path="/ShopperInfo" element={<ShopperInfo/>} />
                <Route path="/SellerInfo" element={<SellerInfo/>} />
                <Route path='/Login' element={<Login/>}/>
                <Route path="/Products/:search" element={<Products/>} />
                <Route path="/Product/:id" element={<Product/>} />
                <Route path='/Reset' element={<Reset/>}/>
                <Route path="*" element={<ErrorPage/>}/>
            
          <Route path="/TermsAndConditions" element={<TermsAndConditions/>}/>
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>} />              
              </Routes>
            }
          {userType === "Seller" &&
          <Routes> 
            <Route path='/Plans' element={<Plans/>}/>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/Addproduct" element={<AddProduct/>} />
            <Route path="/ProductStats/:id" element={<ProductStats/>}/>
            <Route path="/Notifications" element={<Notifications/>}/>
            <Route path="/Settings" element={<Settings/>} />
                <Route path="*" element={<ErrorPage/>}/>
                <Route path="/Products/:search" element={<Products/>} />
                <Route path="/Product/:id" element={<Product/>} />
                      
          <Route path="/TermsAndConditions" element={<TermsAndConditions/>}/>
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>} />
          </Routes>
          }
          {userType === "SellerNull" &&
          <Routes> 
          <Route path='/' element={<SetupProfile/>}/>
            <Route path='/Login' element={<Login/>}/>
                <Route path='/Signup' element={<Signup/>}/>
            <Route path='/Profile' element={<SetupProfile/>}/>
                <Route path="*" element={<ErrorPage/>}/>
            
          <Route path="/TermsAndConditions" element={<TermsAndConditions/>}/>
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>} />          
          </Routes>
          }
          {userType === "Shopper" &&
            <Routes>
               <Route
                    path="/"
                    element={ <Navigate to="/Products/Top" /> }
                />
              <Route path="/Products/:search" element={<Products/>} />
              <Route path="/Product/:id" element={<Product/>} />
              <Route path="/Ratings" element={<Ratings/>} />
              <Route path="/Favourites" element={<Favourites/>} />
              <Route path="/Settings" element={<Settings/>} />
                <Route path="*" element={<ErrorPage/>}/>
            
          <Route path="/TermsAndConditions" element={<TermsAndConditions/>}/>
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>} />            
            </Routes>
          }


          {userType === "Admin" &&
          <Routes>
            <Route path="/Adduser" element={<AddUser/>} />
            <Route path="/Removeuser" element={<RemoveUser/>} />
            <Route path="/" element={<Revenue/>} />
            <Route path="/AdminNotifications" element={<AdminNotifications/>} />
            
          <Route path="/TermsAndConditions" element={<TermsAndConditions/>}/>
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>} />         
                <Route path="/Products/:search" element={<Products/>} />
                <Route path="/Product/:id" element={<Product/>} />   
            </Routes>
          }
        </div>
        :
        <div style={{minHeight:"100vh",display:"flex"}}>
          <span style={{margin:"auto",display:"block"}}>
          <img src={Logo} alt="Logo" style={{width:"60vh",height:"20vh"}}/>
          </span>
        </div>
        }
        
        <ContactUs/>
      </Router>
    </div>
  );
}

export default App;
