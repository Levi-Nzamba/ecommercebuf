import React from 'react'
import {motion} from 'framer-motion'
const Button = (props) => {
  return (
    <div>
    {props.disabled ? 
      
    <motion.button 
        class="flex text-white font-bold" 
        style={{fontFamily:"LatoBlack",fontSize:"0.9em",letterSpacing:"0.1em",padding:"0.6rem 4rem",color:"#1A73E8",backgroundColor:"rgba(0,0,0,0.2)",borderRadius:"2rem",margin:"0 " + props.mx,opacity:"0.5"}}
        disabled
      >
        Loading...
    </motion.button>
    :
    <motion.button 
        onClick={props.onClick}
        class="flex text-white font-bold" 
        style={{fontFamily:"LatoBlack",fontSize:"0.9em",letterSpacing:"0.1em",padding:"0.6rem 4rem",color:"#1A73E8",backgroundColor:"rgba(0,0,0,0.09)",borderRadius:"2rem",margin:"0 " + props.mx}}
        whileHover={{
            scale:1.2
        }}
        
    >
        {props.text}
    </motion.button>
    
    }
  </div>
  )
}
Button.defaultProps = {
  mx:"auto", 
  disabled:false
}

export default Button