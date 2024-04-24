import React, { useState, useEffect } from "react";
import '../../styles/internal/right.css'
import Form from 'react-bootstrap/Form';
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import {TbPhoneCall} from 'react-icons/tb';
import { MdOutlineMailOutline } from "react-icons/md"

import axios from "axios";

const RightSideComponent = () => {
  const [deposit, setDeposit] = useState(20);
    const [period, setperiod] = useState(25);
    const [interestRate, setinterestRate] = useState(4.8);
    const [actualDeposit, setActualDeposit] = useState();
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [number, setNumber] = useState();
    const [property,setProperty]=useState('');
	
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setActualDeposit(1)
        // Remove commas from the input and parse it to an integer
        const parsedValue = parseInt(inputValue.replace(/,/g, ""), 10);
        if (!isNaN(parsedValue)) {
            setNumber(parsedValue);
        }
    };


    const [agent, setagent] = useState('')
    const [agentdata, setagentdata] = useState([])
    const [morcal, setmorcal] = useState(false)
	
	  function getPoppertyid() {
		   const type = localStorage.getItem("type-property")
        if (type === 'Sale') {
            setmorcal(true)
        } else {
            setmorcal(false)
        }
    }
	
	function formatPhoneNumber(phoneNumber) {
  // Remove all non-digit characters from the phone number
  const digits = phoneNumber.replace(/\D/g, '');

  // Assuming the format is +XXX XX XXX XXXX
  // Adjust the slicing according to the format you need
  if(digits.length === 12) { // Check if the length matches our formatting criteria
    return `+${digits.slice(0,3)} ${digits.slice(3,5)} ${digits.slice(5,8)} ${digits.slice(8,12)}`;
  }

  // Return the original string if it doesn't match the expected length for formatting
  return phoneNumber;
}

    useEffect(() => {
        const id = localStorage.getItem('propertyid')
        axios
            .get(`/singleproperty1/${id}`)
            .then((res) => {
                console.log(res.data,"res");
              //  const ag = res.data[0].Listing_Agent
			     const ag = res.data[0].Listing_Agent_Email
				 const type = res.data[0].Ad_Type
                 const property=res.data[0].Property_Name;
                 console.log(property,"propertyName");
                 setProperty(property)
				localStorage.setItem("type-property" , type)
                getPoppertyid()
                setagent(ag)
               
            })
            .catch((error) => {
                console.error("Error fetching data from the server:", error);
            });
    }, []);
		
		

    useEffect(() => {
		if(agent){
			const data = {"name" : agent}
            axios.post(`/meetmyteam` , data).then((res) => {
				console.log(res.data,"team")
                setagentdata(res.data);
            })
		} else {
			console.log("no getting data")
		}			
    }, [agent])



    function formatNumberWithCommas(number) {
        const formattedNumber = Number(number).toFixed(2);
    
        return formattedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }

    useEffect(() => {
		const price = localStorage.getItem("price")
        const con = parseInt(price)
        setNumber(con)
		getPoppertyid()
    })
	 
	function redirectTomail(mail) {
    window.location.href = `mailto:${mail}`;
}
function redirectToPhoneNumber() {
    window.location.href = 'tel:+97143663200';
}
 useEffect(() => {
        if (deposit) {
            const percentageAmount = (deposit / 100) * number;
            setActualDeposit(percentageAmount.toLocaleString());
        }
        if (deposit && period && interestRate && number) {
            const downPaymentAmount = (deposit / 100) * number;
            const loanAmount = number - downPaymentAmount;
            const monthlyInterestRate = interestRate / 100 / 12;
            const numberOfPayments = period * 12;
            const monthlyPaymentInUSD =
                (loanAmount * monthlyInterestRate) /
                (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
            setMonthlyPayment(monthlyPaymentInUSD);
        }
    }, [deposit, interestRate, period, number]);
	
	    const handleWhatsAppClick = (mobile) => {
            const cleanMobile = mobile.replace(/\s/g, '');
    
            const message = `Hello, I have a question ${property}`;
      
        const whatsappURL = `https://api.whatsapp.com/send?phone=${cleanMobile}&text=${encodeURIComponent(message)}`;
    
        // Open WhatsApp in a new tab with the pre-filled message
        window.open(whatsappURL);
      };
    return (
        <div id="main-right-div" style={{ paddingRight: '0px', }}>

       <div style={{width:"100%", backgroundColor:"#f7f7f7", padding:"10px",border:"1px solid rgba(218, 219, 220, 0.75"}}>
{agentdata.map((item,index)=>{
          
            return(
                <>
                
        <div style={{display:"flex"}}>
        <div style={{width:"20%",marginRight:"5px"}}>
        {item.photo == null ? <>
                                    <img style={{ width:"80px", marginLeft:"15px"}} src='https://st4.depositphotos.com/3557671/23892/v/450/depositphotos_238923408-stock-                                                      illustration-vector-illustration-of-avatar-and.jpg' alt=""/>
                                </>
                            :
                            <>
                            <img src={`/uploads/${item.photo}`} alt="" style={{}} />
                            </>    
                            }
        </div>
        <div style={{width:"60%"}}>
          <p style={{fontSize:"20px", fontWeight:"bold",marginBottom:"0px"}}>{item.name}</p>
          <p style={{margin:"0px"}}>{item.designation}</p>
        </div>
        </div>
        <hr/>
        <div style={{display:"flex" ,width:"100%"}}>
        
    
          <button onClick={()=>handleWhatsAppClick(item.mobile)}   style={{display:"flex",border:"1px solid black",width:"35%", margin:"5px",alignItems:"center",justifyContent:"center",padding:"5px",fontSize:"14px"}}>
            <img style={{marginRight:"5px"}} width="20%" alt="whats app" src="/images/Whtspicon.png" />
            <span>WhatsApp</span>
          </button>
    
        
        
    
          <button onClick={redirectToPhoneNumber}  style={{display:"flex",border:"1px solid black",width:"35%", margin:"5px",alignItems:"center",justifyContent:"center",padding:"5px",fontSize:"14px"}}>
            <img style={{marginRight:"5px"}} width="20%" alt="Call US" src="/images/callicon.png" />
            <span>Call Us</span>
          </button>
    
        
        
    
          <button onClick={()=>redirectTomail(item.email)}  style={{display:"flex",border:"1px solid black",width:"30%", margin:"5px",alignItems:"center",justifyContent:"center",padding:"5px",fontSize:"14px"}}>
            <img style={{marginRight:"5px"}} width="20%" alt="Email" src="/images/Email.png" />
            <span>Email</span>
          </button>
    
        
        
        
        
        </div>
                </>
        );
})}

    </div>

            {/* *******************Mort Cal***************** */}
             {morcal === true && <>
                <div id="mortagecal" className="mt-3 p-2 d-flex flex-column align-items-center" style={{margin:"0px"}}>
    <h4 className="text-center my-4" id="single-mort">Mortgage calculator</h4>

    <div className="container">
    <Form id="comment-form" className="row p-3" style={{ width: "100% !important" }}>

<Form.Group className="mb-3 col-12 m-auto" style={{ height: '100px', padding: '10px' }}>
    <span className="" >Property Price</span>
    <div className="form-text mt-3">
        <Form.Control
            className="pl-20"
            type="text"
            placeholder="Property Price"
            value={number.toLocaleString()} // Format the number with commas
            onChange={handleInputChange}
            id="youridhere"
        />
        <label for="youridhere" className="static-value">
            AED
        </label>
    </div>
</Form.Group>

<Form.Group className="mb-3 col-12 m-auto mt-3">
    <div className="row"> 
        <div className="col-6 mt-2">
            <span>Down Payment</span>
        </div>
        <div
            className="col-6"
            style={{ display: "flex", justifyContent: "flex-end" }}
        >
            <Typography
                id="non-linear-slider"
                gutterBottom
                style={{ textAlign: "right" }}
            >
                <div
                    className="p-2 "
                    style={{
                        border: "1px solid #e5e7eb",
                        width: "140px",
                        // marginLeft:"10px",
                        paddingRight: "0px",
                        fontSize:"15px"
                    }}
                >
                    {actualDeposit} <span className="ml-2">AED</span>
                </div>
            </Typography>
        </div>
    </div>

    <br />

    <Box sx={{}}>
        <Slider
            defaultValue={50}
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
            aria-label={`Always visible: ${deposit}%`}
            valueLabelDisplay="on"
            valueLabelFormat={deposit + "%"}
            min={20}
            max={100}
            sx={{
                "& .MuiSlider-track": {
                    backgroundColor: "#fcaf17",
                    borderColor: "#fcaf17",
                    height: "5px",
                    width: "auto",
                },
                "& .MuiSlider-thumb": {
                    backgroundColor: "#fcaf17",
                    borderColor: "#fcaf17",
                },
            }}
        />
    </Box>
</Form.Group>

<Form.Group className="mb-3 col-12 m-auto">
    <div className="row">
        <div className="col-6">
            <span>Mortgage Period</span>
        </div>
        <div
            className="col-6"
            style={{ display: "flex", justifyContent: "flex-end" }}
        >
            <Typography id="non-linear-slider" gutterBottom>
                <div
                    className="p-2 "
                    style={{
                        border: "1px solid #e5e7eb",
                        width: "140px",
                        paddingRight: "0px",
                        fontSize:"15px"
                    }}
                >
                    {period} <span className="ml-5">Years</span>
                </div>
            </Typography>
        </div>
    </div>

    <br />

    <Box sx={{}}>
        <Slider
            aria-label="Always visible"
            defaultValue={5}
            // aria-label="Default"
            value={period}
            onChange={(e) => setperiod(e.target.value)}
            min={5} // Set the minimum value
            max={25}
            valueLabelDisplay="on"
            sx={{
                "& .MuiSlider-track": {
                    backgroundColor: "#fcaf17",
                    borderColor: "#fcaf17",
                    height: "5px",
                    width: "auto",
                },
                "& .MuiSlider-thumb": {
                    backgroundColor: "#fcaf17",
                    borderColor: "#fcaf17",
                },
            }}
        />
    </Box>
</Form.Group>

<Form.Group className="mb-3 col-12 m-auto">
    <div className="row">
        <div className="col-6">
            <span>Interest</span>
        </div>
        <div
            className="col-6"
            style={{ display: "flex", justifyContent: "flex-end" }}
        >
            <Typography
                id="non-linear-slider"
                gutterBottom
                style={{ textAlign: "right" }}
            >
                <div
                    className="p-2 "
                    style={{
                        border: "1px solid #e5e7eb",
                        width: "140px",
                        fontSize:"15px",
                        paddingRight: "0px",
                    }}
                >
                    {interestRate} <span className="ml-5">%</span>
                </div>
            </Typography>
        </div>
    </div>

    <br />

    <Box sx={{}}>
        <Slider
            aria-label="Always visible"
            defaultValue={5}
            // aria-label="Default"
            value={interestRate}
            onChange={(e) => setinterestRate(e.target.value)}
            min={1.5} // Set the minimum value
            max={7}
            step={0.1}
            valueLabelFormat={(value) => `${value.toFixed(1)}`}
            valueLabelDisplay="on"
            sx={{
                "& .MuiSlider-track": {
                    backgroundColor: "#fcaf17",
                    borderColor: "#fcaf17",
                    height: "5px",
                    width: "auto",
                },
                "& .MuiSlider-thumb": {
                    backgroundColor: "#fcaf17",
                    borderColor: "#fcaf17",
                },
            }}
        />
    </Box>
</Form.Group>
{monthlyPayment > 0 && (
<div>
    <h4 className="font-bold text-center mb-2">Monthly Payment:</h4>
    <p className="text-center" id="price-mort">AED <strong>{formatNumberWithCommas(monthlyPayment)}</strong></p>
</div>
)}
</Form>
    </div>
</div>

                {/* <div id="mortagecal" className="mt-3 p-2  justify-content-center align-items-center">
                    <h4 className=" text-center my-4" id="single-mort">Mortgage calculator</h4>
            
                  

                </div> */}
            </>
            }

        </div>
    );
};

export default RightSideComponent;