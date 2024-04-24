import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { useNavigate } from "react-router";
import Form from "react-bootstrap/Form";
import "../../styles/main/popup.css";
import { ToastContainer } from "react-toastify";
import { Dropdown } from "react-bootstrap";
import Swal from 'sweetalert2';
import Countries from '../../components/CountryInfo'
import { createNotification } from "./Notification";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

function Popup() {
  const naviagte = useNavigate();
  const [show, setShow] = useState(false);
  const [Name, setName] = useState('');
  const [email, setemail] = useState('');
const [phoneNumber, setPhoneNumber] = useState("");
	const [selectedCountry, setSelectedCountry] = useState(Countries[1]);
  const [SelectedOptionval, setSelectedOptionval] = useState('');
  const [SelectedValue, setSelectedValue] = useState('');
	 const dialCode = selectedCountry.phone[0];
	 const handleCountrySelect = (item) => {
    setSelectedCountry(item);
  };


  const options = [
    { label: "Buy", value: "Buy" },
    { label: "Rent", value: "Rent" },
    { label: "Sell", value: "Sell" },
    { label: "List your property", value: "List your property" },
    { label: "Property management", value: "Property management" },
    { label: "Holiday homes", value: "Holiday homes" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  const handleClose = () => setShow(false);


  
  const customStyles = {
    control: (provided) => ({
      ...provided,
      textAlign: "left",
      borderRadius: '0px',
  
    
    }),
    menu: (provided) => ({
      ...provided,
      textAlign: "left", // Align the menu to the left

      overflowY: 'auto',
      height:"100px"
    
    }),
  };
  const handleChange = (selectedOption) => {
    setSelectedValue(selectedOption);
    setSelectedOptionval(selectedOption.value);
  };

 function SubsctibeButton(e) {
	  e.preventDefault();
    if (Name && email && phoneNumber && SelectedOptionval) {
      let data={"Name":Name, "email":email, "Phone":phoneNumber,"SelectedOptionval":SelectedOptionval,"dialcode":dialCode};
      axios.post('/popupsubscribe', data).then((res) => {
		
        if(res.status===200){
			
         naviagte('/thanks')
        }
  
      })

      
    }
    else {

      createNotification("warning", "Please fill out all the fields!");
    }
  }
  return (
    <>
      <ToastContainer />
      <Modal show={show} onHide={handleClose} id="modelmain" style={{borderRadius : "0px"}}>
        <Modal.Header closeButton>
          <Modal.Title id="popheading">
            Unlock Exclusive Dubai Property Insights!
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <p style={{ margin: "0" }} id="subheading">
            Join our VIP list for early access to the best property listings,
            market trends, and special offers.
          </p>

<div className="container">
                    <div className="row" style={{ justifyContent: "center" }}>
                      <div style={{width:"100%"}} className="col-12 col-sm-12 col-md-6	col-lg-7 col-xl-7">

                        <form action="#" style={{ color: '#212529', }}>

                          <div className="form-group">
                            <input onChange={(e) => setName(e.target.value)} type="text" style={{ borderRadius: "0px !important" }} className="form-control" id="name" placeholder="Full Name*" required />
                          </div>

                          <div className="form-group">
                            <input onChange={(e) => setemail(e.target.value)} type="email" style={{ borderRadius: "0px !important" }} className="form-control contcolor" id="mail" placeholder="Email*" required />
                          </div>

                          <div className="form-group" style={{ position: "relative", height: "50px" }}>

                            <Dropdown style={{ position: "absolute", paddingRight: "7px", borderRight: "1px solid #ddd", height: "50px" }}>

                            <Dropdown.Toggle className="codedrop" variant="transparent" id="dropdown-basic" style={{ width: "auto", minWidth: "150px", border: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
  <div style={{ display: "flex", alignItems: "center" }}>
    <img src={selectedCountry.image} alt="" style={{ height: "30px", marginRight: "10px" }} />
    <p className="ml-2" style={{ margin: "0" }}>{dialCode}</p>
  </div>
  <span className="caret"></span>
</Dropdown.Toggle>





                              <Dropdown.Menu style={{ height: "200px", overflow: "auto" }}>

                                {Countries.map((item) => {
                                  return (

                                    <Dropdown.Item onClick={() => handleCountrySelect(item)}>
                                      <div id="image-code">
                                        <img src={item.image} alt={item.name} style={{ width: "30px", height: "30px" }} />
                                        <p className="ml-5 mt-1">{item.name}{item.phone && item.phone.length > 0 ? item.phone[0] : "N/A"}
                                        </p>
                                      </div>
                                    </Dropdown.Item>

                                  );
                                })}
                              </Dropdown.Menu>

                            </Dropdown>

                            <input onChange={(e) => setPhoneNumber(e.target.value)} type="phone" className="form-control contcolor" placeholder="Phone No.*" required style={{ left: "160px", paddingLeft: "160px", paddingTop: "5px" }} />
                          </div>

                          <Select style={{height:"50px"}} options={options} placeholder="What can we help you with? " isSearchable={true} value={SelectedValue} onChange={handleChange} styles={customStyles} id="op"/>
                          
                         

                      
                      
                        </form>
                      </div>

                    </div>
                  </div>

          <div id="two-para" className="mt-3">

            <ul style={{ listStyleType: "disc", marginLeft: "0" }}>
              <li style={{ listStyleType: 'none' }}><p id='summs'>We respect your privacy. Your information is safe with us and will never be shared with third parties.</p></li>
              <li style={{ listStyleType: 'none' }}><p id='summs'>Be the first to know about new properties on the market.</p></li>
            </ul>

          </div>


          <Button variant="#a7a9ac" className="" style={{ background: '#e8e8e9', border: 'none', color: '#4d4d4f',borderRadius:"0px" }} onClick={handleClose} id="">
            Skip For Now
          </Button>
          <Button variant="success" className="" style={{ background: '#f99d1c', border: 'none', color: '#4d4d4f' ,borderRadius:"0px"}} onClick={SubsctibeButton} id="">
            Subscribe Now
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Popup;
