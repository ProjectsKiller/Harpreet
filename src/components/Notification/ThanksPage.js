import React from 'react'
// import '../../styles/main/thnx.css'
import '../../styles/main/thanks.css'
import Button from "react-bootstrap/Button";
import {TiTick} from 'react-icons/ti'
const ThanksPage = () => {
  return (
    <div>
        <h1 id="thnxhead" style={{textAlign:"center", marginTop:"100px"}}><b>Thank You! </b></h1>

        <TiTick style={{margin:"auto", fontSize:"10rem" , color:"#fcaf17", width:"300px",height:"150px"}}/>


 <div id="thnx" style={{ position: 'relative', height: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',marginTop:"-65px" }}>
  <h3 style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}>
    Thank you for joining our VIP list! You'll receive exclusive updates and insights shortly.
  </h3>
  <div>
    <Button variant="#rgb(232, 232, 233)" id="homebtn" href="/" style={{backgroundColor:"#rgb(232, 232, 233)"}} className='mt-10'>
       Go To Home
    </Button>
  </div>
</div>


    </div>
  )
}

export default ThanksPage