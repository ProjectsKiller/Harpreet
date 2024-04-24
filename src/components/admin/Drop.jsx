import React, { useState } from "react";

export default function Drop(){
    const [mystyle,setMyStyle] = useState({})
    function flow(e){
        let a = e.target.id;
        console.log(a);
        let element = document.getElementById(a)
        setMyStyle(
        element.style.transform = "rotate(20deg)"
        )
    }
    
    return(
        <>
        <ul style={{color :"black"}}>
            <li id="one11" onClick={flow}>Fruits</li>
            <li id="two22" onClick={flow}>cars</li>
        </ul>
        
        </>
    );
}
