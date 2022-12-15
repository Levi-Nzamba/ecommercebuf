import React from 'react'
import {motion} from 'framer-motion'

const ButtonDelete = (props) => {
  return (
    <div>
    {props.disabled === true ? 
      <motion.button 
      onClick={props.onClick}
      class="flex text-white font-bold" 
      style={{fontFamily:"LatoBlack",fontSize:"0.9em",letterSpacing:"0.1em",padding:"0.6rem 2rem",color:"#FF0000",backgroundColor:"rgba(255,0,0,0.2)",borderRadius:"2rem",margin:"0 " + props.mx,opacity:"0.5"}}
      disabled
      whileHover={{
          scale:1.2
      }}
      
  >
  {props.text}
  </motion.button>
      :

      <motion.button 
      onClick={props.onClick}
      class="flex text-white font-bold" 
      style={{fontFamily:"LatoBlack",fontSize:"0.9em",letterSpacing:"0.1em",padding:"0.6rem 2rem",color:"#FF0000",backgroundColor:"rgba(255,0,0,0.2)",borderRadius:"2rem",margin:"0 " + props.mx}}
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

export default ButtonDelete