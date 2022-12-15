import { Typography,Container,Grid } from '@mui/material'
import React from 'react'
import Bronze from '../Assets/Icons/bronze.png'
import Silver from '../Assets/Icons/silver.png'
import Gold from '../Assets/Icons/gold.png'
import Platinum from '../Assets/Icons/platinum.png'

import ButtonBig from '../Components/ButtonBig'

import {Link} from 'react-router-dom'
import ButtonWide from '../Components/ButtonWide'

const Plans = () => {
    
  return (
    <div>

        <Typography class="my-2 titleBig">SELECT PLAN</Typography>
        <Grid container columnSpacing={3} >
            <Grid item xs={10.5} md={3.8} sx={{mx:"auto"}}>
                <Container className="blueBox" sx={{pb:2,my:3}}>
                    <img alt="Bronze Membership" style={{margin:"0 auto"}} width={"150vw"}  src={Bronze}/>
                    <Typography sx={{color:"#282828",textAlign:"center",fontWeight:600,fontFamily:"Prompt",fontSize:"4rem"}}>Bronze</Typography>
                    <Typography sx={{color:"#282828",textAlign:"center",fontFamily:"Prompt",fontWeight:500,fontSize:"2rem"}}>$ 40.00 USD</Typography>
                    <Typography sx={{textAlign:"center",fontFamily:"PromptThin"}}>per month</Typography>
                    <ul class="flex list-disc my-10">
                      <li class="ml-5 mb-6" style={{fontFamily:"PromptThin",fontSize:"1.1rem"}}>Paid monthly, 40$ per month.</li>
                    </ul>
                    <Link to="/Payment/bronze"><ButtonBig text={"Select membership"} color='#DC335A'/></Link>
                </Container>
            </Grid>
            <Grid item xs={10.5} md={3.8} sx={{mx:"auto"}}>
                <Container className="blueBox" >
                    <img alt="Silver Membership" style={{margin:"0 auto"}} width={"150vw"}  src={Silver}/>
                    <Typography sx={{color:"#282828",textAlign:"center",fontWeight:600,fontFamily:"Prompt",fontSize:"4rem"}}>Silver</Typography>
                    <Typography sx={{color:"#282828",textAlign:"center",fontFamily:"Prompt",fontWeight:500,fontSize:"2rem"}}>$ 30.00 USD</Typography>
                    <Typography sx={{textAlign:"center",fontFamily:"PromptThin",}}>per month</Typography>
                    <ul class="flex list-disc my-10">
                      <li class="ml-5 mb-6" style={{fontFamily:"PromptThin",fontSize:"1.1rem"}}>Paid in 3-month intervals,$90 per interval.</li>
                    </ul>
                    <Link to="/Payment/silver"><ButtonBig text={"Select membership"} color='#DC335A'/></Link>
                </Container>
            </Grid>
            <Grid item xs={10.5} md={3.8} sx={{mx:"auto"}}>
                <Container className="blueBox" >
                    <img alt="Gold Membership" style={{margin:"2vh auto"}} width={"120vw"}  src={Gold}/>
                    <Typography sx={{color:"#282828",textAlign:"center",fontWeight:600,fontFamily:"Prompt",fontSize:"4rem"}}>Gold</Typography>
                    <Typography sx={{color:"#282828",textAlign:"center",fontFamily:"Prompt",fontWeight:500,fontSize:"2rem"}}>$ 25.00 USD</Typography>
                    <Typography sx={{textAlign:"center",fontFamily:"PromptThin"}}>per month</Typography>
                    <ul class="flex list-disc my-10">
                      <li class="ml-5 mb-6" style={{fontFamily:"PromptThin",fontSize:"1.1rem"}}>Paid in 6-month intervals, 149$ per interval.</li>
                    </ul>
                    <Link to="/Payment/gold"><ButtonBig text={"Select membership"} color='#DC335A'/></Link>
                </Container>
            </Grid>
        <Grid item xs={10.5} md={12} sx={{mx:"auto"}}>
        <Container className="blueBox w-full" >
            <img alt="Platinum Membership" style={{margin:"2vh auto"}} width={"120vw"}  src={Platinum}/>
            <Typography sx={{color:"#282828",textAlign:"center",fontWeight:600,fontFamily:"Prompt",fontSize:"4rem"}}>Platinum</Typography>
            <Typography sx={{color:"#282828",textAlign:"center",fontFamily:"Prompt",fontWeight:500,fontSize:"2rem"}}>$ 17.00 USD</Typography>
            <Typography sx={{textAlign:"center",fontFamily:"PromptThin"}}>per month</Typography>
            <ul class="flex list-disc my-10">
                <li class="ml-5 mb-6" style={{fontFamily:"PromptThin",fontSize:"1.1rem"}}>Paid annualy, $199 per year.</li>
            </ul>
            <Link to="/Payment/platinum"><ButtonBig text={"Select membership"} color='#DC335A'/></Link>
        </Container>
        <Link to="/Payment/Test" ><ButtonWide text="Go to Test" color="blue" /></Link>
            </Grid>
        </Grid>


    </div>
  )
}

export default Plans