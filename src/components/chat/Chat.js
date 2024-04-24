import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'
const Chat = () => {
    const [memberid,setmemberid]=useState('');
    function CreateChat(){
        axios.get("http://localhost:4000/createchat").then((res)=>{
            if(res.status===200){

                setmemberid(res.data);
                alert("Chat is Creating")
            }
        })
    }

    function getchat(){
        axios.post(`http://localhost:4000/getchat/${memberid}`).then((res)=>{
            console.log(res.data);
        })

    }

    useEffect(()=>{

    })
  return (
    <div>
        <Button onClick={CreateChat}>Create Chat</Button>
        <div style={{background:"#000", height:"300px",width:"600px",margin:"auto",marginBottom:"30px"}}>

        </div>
    </div>
  )
}

export default Chat