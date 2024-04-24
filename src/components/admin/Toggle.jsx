import React from "react";
import { useState } from "react";

export default function Toggle(){

        const [clk,setClk] =useState("clicked")
        const [btnsty,setBtnsty]=useState({"width":"30px", "height":"2px", "backgroundColor" : "red", "margin":"5px 0px"})
        const [btnsty1,setBtnsty1]=useState({"width":"30px", "height":"2px", "backgroundColor" : "red", "margin":"5px 0px"})
        const [btnsty2,setBtnsty2]=useState({"width":"30px", "height":"2px", "backgroundColor" : "red", "margin":"5px 0px"})
    function convertBtn(){
        if(clk== "clicked"){
        setBtnsty({"width":"30px", "height":"2px", "backgroundColor" : "red", "margin":"5px 0px","transform": "rotate(-0.15turn)","transitionDuration": "2s","translate": "0px 8px"})
        setBtnsty1({"display":"none"})
        setBtnsty2({"width":"30px", "height":"2px", "backgroundColor" : "red", "margin":"5px 0px","transform": "rotate(30deg)","transitionDuration": "2s","translate": "0px -1px"})
        setClk("unclick")
        }else if(clk=="unclick"){
            setBtnsty({"width":"30px", "height":"2px", "backgroundColor" : "red", "margin":"5px 0px","transform": "rotate(0)","transitionDuration": "1s"})
            setBtnsty1({"width":"30px", "height":"2px", "backgroundColor" : "red", "margin":"5px 0px"})
            setBtnsty2({"width":"30px", "height":"2px", "backgroundColor" : "red", "margin":"5px 0px","transform": "rotate(0)","transitionDuration": "1s"})
            setClk("clicked")
        }
    }


    return(
        <>
        
        <div style={{"marginTop":"400px", "marginLeft": "300px"}}>
            <div className="btn btn-primary" onClick={convertBtn} style={{width:"50px", height:"50px",padding:"10px 3px 5px 9px"}}>
                <div style={{display:"none"}}>{clk}</div>
                <div id="one" style={btnsty}></div>
                <div id="two" style={btnsty1}></div>
                <div id="three" style={btnsty2}></div>
            </div>
        </div>
        </>
    );
}


