import React from 'react'
import {motion} from 'framer-motion'
const ButtonWide = (props) => {
  return (
    <div>
    {props.disabled ? 
      
          <motion.button 
          class="flex mx-auto text-white font-bold py-3 px-12 rounded" 
          style={{backgroundColor:props.color,boxShadow:"-0.5vh 0.4vh #999",opacity:"0.4"}}
          disabled
      >
          {props.text}
      </motion.button>

      :
    <motion.button 
        onClick={props.onClick}
        class="flex mx-auto text-white font-bold py-3 px-12 rounded" 
        style={{backgroundColor:props.color,boxShadow:"-0.5vh 0.4vh #999"}}
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