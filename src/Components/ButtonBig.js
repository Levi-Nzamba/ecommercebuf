import React from 'react'
import {motion} from 'framer-motion'
const ButtonBig = (props) => {
  return (
    <motion.button 
        onClick={props.onClick}
        class="flex mx-auto text-white font-bold py-4 px-6 rounded" 
        style={{backgroundColor:props.color,boxShadow:"-0.5vh 0.4vh #999",fonntSize:"2vh"}}
        whileHover={{
            scale:1.2
        }}
    >
        {props.text}
    </motion.button>
  )
}

export default ButtonBig