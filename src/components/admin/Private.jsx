import React, {useContext, useState} from "react";
import { Navigate, Outlet } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SearchContext from "../../Context/Context1";
import { get } from "jquery";
import axios from "axios";



const Private = () => {
  const getdatafromContext =useContext(SearchContext);
  const [gettxt,settxt]=useState('');
  const auth = localStorage.getItem("user");
  const [show, setShow] = useState(false);
  const callPropertiesApi = async () => {
    const response = await fetch("/api/data");
    if (response) {
      alert("Data Updated");
    }
  };
  const handleClose = () => setShow(false);
   
  function OpenChat(){
    setShow(true)
  }

  const handleLogout = () => {


    localStorage.removeItem("admin");
    localStorage.removeItem("user");
    window.location.href = "/";
    return <Navigate to="/" />;
  };

  function Gotochat(){
    let data={senderid:"member1",text:gettxt};
    axios.post("http://localhost:4000/savechat",data).then((res)=>{
      if(res.status===200){
        alert("Chat is sent")
      }
    })
  }

  // console.log(getdatafromContext.chatlead,"okay getting context");

  if (auth === "76342391251#@%#^%*(^%&^$$%#@$%448941/*-++y$#%$^^&^*$@") {
    return (
      <>
         <Modal show={show} onHide={handleClose} id="modelmain" style={{borderRadius : "0px"}}>
        <Modal.Header closeButton>
          <Modal.Title id="popheading">
            RaineHorne
          </Modal.Title>
        </Modal.Header>

    

        <Modal.Footer style={{display:"block"}}>
        <div style={{marginBottom:"30px"}}>
          <div style={{backgroundColor:"#e8e8e9",textAlign:"right",padding:"10px"}}>Okay start Chat</div>
          <div className="mt-3" style={{backgroundColor:"#F99E1c",textAlign:"left",padding:"10px"}}>Okay start Chat</div>
          <div className="form-group mt-3">
                            <input type="text" onChange={(e)=>settxt(e.target.value)} style={{ borderRadius: "0px !important" }} className="form-control" id="name" placeholder="type message.." required />
                          </div>
                          <Button onClick={Gotochat}>Go</Button>
        </div>
          <Button variant="#a7a9ac" className="" style={{ background: '#e8e8e9', border: 'none', color: '#4d4d4f',borderRadius:"0px" }} onClick={handleClose} id="">
            Skip For Now
          </Button>
         
        </Modal.Footer>
      </Modal>
      <div style={{float:"right", marginRight:"100px", height:"50px", display:"flex",gap:10}}>

          <button
            // style={{ marginRight: "80.5%", marginBottom: "10px" }}
            onClick={handleLogout}
            className="btn btn-danger"
          >
            Logout
          </button>
          <button
            // style={{ marginLeft: "88.5%", marginBottom: "-44px" }}
            onClick={callPropertiesApi}
            className="btn btn-success"
          >
            Update Properties
          </button>
          <button
            // style={{ marginLeft: "88.5%", marginBottom: "-44px" }}
            onClick={OpenChat}
            className="btn btn-success"
          >
            Chat
          </button>
      </div>
      
        <Outlet />
      </>
    );
  } else {
    // Perform logout when the user is not authenticated
    handleLogout();
    return <Navigate to="/" />;
  }
};

export default Private;
