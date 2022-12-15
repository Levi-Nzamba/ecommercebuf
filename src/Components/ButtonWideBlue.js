import React from 'react'
import {motion} from 'framer-motion'
const ButtonWide = (props) => {
  return (
    <div>
    {props.disabled ? 
      
          <motion.button 
          class="flex mx-auto text-white font-bold py-2 px-6 rounded" 
          style={{backgroundColor:"#1A73E8",fontFamily:"Prompt",letterSpacing:"0.2em",opacity:"0.4"}}
          disabled
      >
          {props.text}
      </motion.button>

      :
    <motion.button 
        onClick={props.onClick}
        class="flex mx-auto text-white font-bold py-2 px-6 rounded" 
        style={{backgroundColor:"#1A73E8",fontFamily:"Prompt",letterSpacing:"0.2em"}}
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

export default ButtonWide