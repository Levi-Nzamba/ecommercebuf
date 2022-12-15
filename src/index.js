import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Provider } from 'react-redux';
import store from './Store/Store'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJC-OLzzvdL4byw5M06bof2cSvPEaUAaQ",
  authDomain: "ecommerce-buff.firebaseapp.com",
  projectId: "ecommerce-buff",
  storageBucket: "ecommerce-buff.appspot.com",
  messagingSenderId: "811352124510",
  appId: "1:811352124510:web:c6644120a76638fe3398cf",
  measurementId: "G-Z9Z5BCMTMW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>
);


