import React, { useEffect, useState } from "react";
import "../../styles/mortage/mortage.css";
import "../../styles/internal/right.css";
import Form from "react-bootstrap/Form";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import '../../styles/banner/banner.css'
import Countries from '../CommonElements/CountryInfo';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2';

const Mortage_Services = () => {
    const [deposit, setDeposit] = useState(20);
    const [period, setperiod] = useState(25);
    const [interestRate, setinterestRate] = useState(4.8);
    const [actualDeposit, setActualDeposit] = useState();
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [number, setNumber] = useState(1000000);
    const [selectedCountry, setSelectedCountry] = useState(Countries[1]);
    const [more, setMore] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const dialCode = selectedCountry.phone[0];
    const [data, setdata] = useState([])

    const [policy1Checked, setPolicy1Checked] = useState(false);
  const [policy2Checked, setPolicy2Checked] = useState(false);

    useEffect(() => {
        const name = "mortgageservicespagedb"
        const mortgage = { "tablename": "mortgageservicespagedb" };
        axios.post(`http://localhost:4000/staticdata`, mortgage).then((res) => {
            setdata(res.data);
        })
            .catch((error) => {
                console.error("Error fetching data from the server:", error);
            });
    }, []);


    const handleInputChange = (e) => {
        const inputValue = e.target.value;

        // Remove commas from the input and parse it to an integer
        const parsedValue = parseInt(inputValue.replace(/,/g, ""), 10);

        if (!isNaN(parsedValue)) {
            setNumber(parsedValue);
        }
    };


    useEffect(() => {
        setMore(false);
    }, [more]);

    const handleCountrySelect = (item) => {
        setSelectedCountry(item);
    };


    const about = "Mortagege Services";
    function Aboutsubmit(e) {
        e.preventDefault();
    
        if (phoneNumber && name && Email && about) {
            if (policy1Checked && policy2Checked) {
                let data = { 'phoneNumber': phoneNumber, 'dialCode': dialCode, 'name': name, 'Email': Email, "about": about };
                axios.post(`http://localhost:4000/common`, data).then((res) => {
                    if (res.data.msg === "200") {

                        Swal.fire({
                            title: 'Success!',
                            text: 'Data is Added Successfully!',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                          });
                    } else {
                        // alert("Userinfo is already present!");
    
                        Swal.fire({
                            title: 'Warning!',
                            text: 'Data is Already Present!',
                            icon: 'Warning',
                            confirmButtonText: 'Ok'
                          });
                    }
                });
            } else {
                if (!policy1Checked) {
                    
                    Swal.fire({
                        title: 'Warning!',
                        text: 'Please accept the Terms & Conditions and Privacy Policy.!',
                        icon: 'Warning',
                        confirmButtonText: 'Ok'
                      });
                }
                if (!policy2Checked) {
                 
                    Swal.fire({
                        title: 'Warning!',
                        text: 'Please agree to receive information about property offers, deals & services from Raine & Horne.!',
                        icon: 'warning',
                        confirmButtonText: 'Ok'
                      });
                }
            }
        }
        else {
            
            Swal.fire({
                title: 'Warning!',
                text: 'Please Enter Valid Details!',
                icon: 'Warning',
                confirmButtonText: 'Ok'
              });
        }
    }
    

    function formatNumberWithCommas(number) {
        const formattedNumber = Number(number).toFixed(2);

        return formattedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    useEffect(() => {
        if (deposit) {
            const percentageAmount = (deposit / 100) * number;
            setActualDeposit(percentageAmount.toLocaleString());
        }

        if (deposit && period && interestRate && number) {
            const downPaymentAmount = (deposit / 100) * number;
            // console.log(downPaymentAmount,"downPaymentAmount");
            const loanAmount = number - downPaymentAmount;

            const monthlyInterestRate = interestRate / 100 / 12;
            const numberOfPayments = period * 12;

            const monthlyPaymentInUSD =
                (loanAmount * monthlyInterestRate) /
                (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
            setMonthlyPayment(monthlyPaymentInUSD);
        }
    }, [deposit, interestRate, period, number]);



    function extractTextFromHtml1(html, tag, index, charLimit) {
        const match = html.match(new RegExp(`<${tag}.*?>(.*?)<\/${tag}>`, 'g'));
        if (match && match.length > index) {
            const plainText = match[index].replace(new RegExp(`<${tag}.*?>|<\/${tag}>`, 'g'), '');
            return plainText.length > charLimit ? plainText.substring(0, charLimit) + '...' : plainText;
        }
        return '';
    }
    // **************Blog Data Fetch****************
    const [blogdata, setBlogdata] = useState([])
    const [first, setfirst] = useState([])
    useEffect(() => {

        axios.get(`http://localhost:4000/blogdatafecth`, blogdata).then((response) => {
            setBlogdata(response.data.slice(1, 4));
            setfirst(response.data.slice(0, 1));

        })
    }, []);



    return (
        <div>
            {data.map((item, index) => {
                return (
                    <>


                        <section
                            className="mort-ban"
                            style={{
                                backgroundImage: `url(/uploads/${item.sec1bgimage})`,
                                display: "flex",
                                justifyContent: "center", // Center horizontally
                                alignItems: "center", // Center vertically
                                textAlign: "center" // Center text within its container
                            }}
                        >
                            <div className='' id='main-banner-div'>
                                <h2 className='main-mortgagebanner-heading'>{item.sec1heading}</h2>
                                <p id='mortbannerpara'>{item.sec1discription}</p>
                            </div>
                        </section>


                        {/****************************Mort Cal************************* */}
                        <div style={{ width: "87%", margin: "auto" }}>
                            <div
                                id="mortagecal"
                                className="mt-12  p-3"
                                style={{
                                    backgroundColor: "#e8e8e9",
                                    width: "100%",
                                    margin: "auto",
                                }}
                            >

                                <h1 className="text-center all-head" style={{ marginTop: "25px" }}>
                                    Mortgage calculator
                                </h1>
                                <p
                                    className="text-center mb-4 all-para"
                                    style={{ margin: "auto" }}
                                    id="para-mort-cal"
                                >
                                    Use our handy mortgage calculator to estimate your monthly
                                    payments, including principal and interest. It's a helpful tool in
                                    budgeting for your new home.
                                </p>

                                <div
                                    className="row"
                                    style={{
                                        width: "80%",
                                        margin: "auto",
                                        boxShadow: "rgb(222 222 222) 2px 2px 5px 5px",
                                        marginBottom: "40px",
                                        backgroundColor: "#fff",
                                        paddingTop: "0px !important"

                                    }}
                                >
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex align-items-center">
                                        <Form id="comment-form" className="row p-3" style={{ width: "100%" }}>
                                            <Form.Group className="mb-3 col-12 m-auto" style={{ height: '100px', padding: '10px' }}>
                                                <span className="all-para" >Property Price</span>
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
                                                    <div className="col-6 mt-2 samemortgagetxt" >
                                                        <span className="all-para">Down Payment</span>
                                                    </div>
                                                    <div
                                                        className="col-6 sameclassforcal"
                                                    // style={{ display: "flex", justifyContent: "flex-end" }}
                                                    >
                                                        <Typography
                                                            id="non-linear-slider"
                                                            gutterBottom
                                                            style={{ textAlign: "right" }}
                                                        >
                                                            <div
                                                                className="p-2 widthformort"
                                                                style={{
                                                                    border: "1px solid #e5e7eb",
                                                                    paddingRight: "0px",
                                                                    display: "flex",
                                                                    justifyContent: "space-between", // Aligns the content evenly along the main axis
                                                                    alignItems: "center" // Aligns the content vertically in the center
                                                                }}
                                                            >
                                                               
                                                                <span>{actualDeposit}</span> 
    <span>AED</span>
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
                                                <div className="row ">
                                                    <div className="col-6 samemortgagetxt" >
                                                        <span className="all-para ">Mortgage Period</span>
                                                    </div>
                                                    <div
                                                        className="col-6 sameclassforcal "

                                                    >
                                                        <Typography id="non-linear-slider" gutterBottom>
                                                            <div
                                                                className="p-2 widthformort"
                                                                style={{
                                                                    border: "1px solid #e5e7eb",
                                                                    paddingRight: "0px",
                                                                    display: "flex",
                                                                    justifyContent: "space-between", // Aligns the content evenly along the main axis
                                                                    alignItems: "center" // Aligns the content vertically in the center
                                                                }}
                                                            >
                                                                <span className="">{period}</span>
                                                                <span className="">Years</span>
                                                            </div>

                                                        </Typography>
                                                    </div>
                                                </div>

                                                <br />

                                                <Box sx={{}}>
                                                    <Slider aria-label="Always visible" defaultValue={5} value={period} onChange={(e) => setperiod(e.target.value)} min={5} max={25} valueLabelDisplay="on"
                                                        sx={{ "& .MuiSlider-track": { backgroundColor: "#fcaf17", borderColor: "#fcaf17", height: "5px", width: "auto", }, "& .MuiSlider-thumb": { backgroundColor: "#fcaf17", borderColor: "#fcaf17", }, }} />
                                                </Box>
                                            </Form.Group>

                                            <Form.Group className="mb-3 col-12 m-auto">
                                                <div className="row">
                                                    <div className="col-6 samemortgagetxt">
                                                        <span className="all-para">Interest</span>
                                                    </div>

                                                    <div className="col-6 sameclassforcal"
                                                    //  style={{ display: "flex", justifyContent: "flex-end" }}
                                                    >

                                                        <Typography id="non-linear-slider" gutterBottom style={{ textAlign: "right" }}>
                                                            <div
                                                                className="p-2 widthformort"
                                                                style={{
                                                                    border: "1px solid #e5e7eb",
                                                                    paddingRight: "0px",
                                                                    display: "flex",
                                                                    justifyContent: "space-between", // Aligns the content evenly along the main axis
                                                                    alignItems: "center" // Aligns the content vertically in the center
                                                                }}
                                                            >
                                                                <span>{interestRate}</span>
                                                                <span className="ml-20">%</span>
                                                            </div>

                                                        </Typography>

                                                    </div>
                                                </div>

                                                <br />

                                                <Box sx={{}}>
                                                    <Slider aria-label="Always visible" defaultValue={5} value={interestRate} onChange={(e) => setinterestRate(e.target.value)} min={1.5} max={7} step={0.1} valueLabelFormat={(value) => `${value.toFixed(1)}`} valueLabelDisplay="on" sx={{ "& .MuiSlider-track": { backgroundColor: "#fcaf17", borderColor: "#fcaf17", height: "5px", width: "auto", }, "& .MuiSlider-thumb": { backgroundColor: "#fcaf17", borderColor: "#fcaf17", }, }} />
                                                </Box>
                                            </Form.Group>
                                        </Form>
                                    </div>

                                    {/* *********************Rigth Side**************************************** */}

                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex align-items-center" style={{ display: "flex", alignItems: "center", backgroundColor: "#E8E8E9", marginTop: "-10px" }}>

                                        <div style={{ display: "flex", alignItems: "center", backgroundColor: "#E8E8E9", color: "#fff" }}>

                                            <div style={{ backgroundColor: "#E8E8E9", padding: "3px" }}>
                                                {monthlyPayment > 0 && (
                                                    <div className="m-auto" style={{ width: "auto", margin: "auto", alignItems: "center", justifyContent: "center", height: "" }}>
                                                        <h1 className=" text-center my-3 all-head">Monthly Payment</h1>
                                                        <h2 className=" text-center all-sub-heading">AED <strong className="all-head">{formatNumberWithCommas(monthlyPayment)}</strong></h2>
                                                    </div>
                                                )}

                                                <div className="row mt-4 p-0" style={{ width: "100%", textAlign: 'center', margin: 'auto' }}>

                                                    <div className="col-12">
                                                        <p className="all-para" >Property Price: <span>{number.toLocaleString()}</span></p>
                                                    </div>

                                                    <div className="col-12" >
                                                        <p className="all-para" >Down Payment:<span>{deposit.toLocaleString()} %</span></p>
                                                    </div>

                                                    <div className="col-12">
                                                        <p className="all-para" >Mortgage Peroid: <span>{period} Years</span></p>
                                                    </div>

                                                    <div className="col-12">
                                                        <p className="all-para" >Interest Rate: <span>{interestRate} %</span></p>
                                                    </div>
                                                </div>

                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                        {/* ***********************Services*********************** */}
                        <div id="mortage-main">
                            {/* <div className="p-0 row " style={{ width: "87%", margin: "auto", padding: '0px' }}>

                                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex align-items-center mortfirstpara" style={{ padding: '0px' }}>

                                    <ul className="ml-16 custom-list " id="mort-ser" style={{ marginLeft: "0px", paddingLeft: "0px", width: "580px" }}>
                                        <h1 className=" all-head">{item.sec3heading}</h1>

                                        <li className="my-4 m-text">
                                            <p className="all-para" >
                                                <span>{item.sec3subhead1}</span>
                                                {item.sec3subdesc1}
                                            </p>
                                        </li>

                                        <li className="my-4 m-text">
                                            <p className="all-para">
                                                <span>{item.sec3subhead2} </span>
                                                {item.sec3subdesc2}
                                            </p>
                                        </li>

                                        <li className="my-4 m-text">
                                            <p className="all-para" >

                                                <span>{item.sec3subhead3} </span>
                                                {item.sec3subdesc3}     </p>
                                        </li>

                                        <li className="my-4 m-text">
                                            <p className="all-para" >
                                                <span>{item.sec3subhead4}</span>
                                                {item.sec3subdesc4}
                                            </p>
                                        </li>

                                        <li className="my-4 m-text">
                                            <p className="all-para" >
                                                <span>{item.sec3subhead5}</span>
                                                {item.sec3subdesc5}
                                            </p>
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex align-items-center" id='mort-pro-img-div' >
                                    <img alt="mortagege" src={`uploads/${item.sec3image}`} id='mort-pro-img' style={{ width: "100%" }} />
                                </div>


                            </div> */}

<div className="p-0 row " style={{ width: "87%", margin: "auto", padding: '0px' }}>

<div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex align-items-center mortfirstpara" style={{ padding: '0px' }}>

    <ul className="ml-16 custom-list " id="mort-ser" style={{ marginLeft: "0px", paddingLeft: "0px", width: "580px" }}>
        <h1 className=" all-head">{item.sec3heading}</h1>

        <li className="my-4 m-text">
            <p className="all-para" >
                <span>{item.sec3subhead1}</span>
                {item.sec3subdesc1}
            </p>
        </li>

        <li className="my-4 m-text">
            <p className="all-para">
                <span>{item.sec3subhead2} </span>
                {item.sec3subdesc2}
            </p>
        </li>

        <li className="my-4 m-text">
            <p className="all-para" >

                <span>{item.sec3subhead3} </span>
                {item.sec3subdesc3}     </p>
        </li>

        <li className="my-4 m-text">
            <p className="all-para" >
                <span>{item.sec3subhead4}</span>
                {item.sec3subdesc4}
            </p>
        </li>

        <li className="my-4 m-text">
            <p className="all-para" >
                <span>{item.sec3subhead5}</span>
                {item.sec3subdesc5}
            </p>
        </li>
    </ul>
</div>

<div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex align-items-center" id='mort-pro-img-div' >
    <img alt="mortagege" src={`uploads/${item.sec3image}`} id='mort-pro-img' style={{ width: "100%" }} />
</div>


</div>

                            {/* **********************Proccess*************************** */}

                            {/* <div className="p-0 row" style={{ width: "87%", margin: "auto" }} id="main-proccess-div-row">

                                <div className="col-12 col-sm-12 col-md-12	col-lg-6 col-xl-6  d-flex align-items-center" style={{ paddingLeft: "0px" }} id='mort-process-img-div'>
                                    <img alt="mortagege" src={`uploads/${item.sec4image}`} style={{ width: "100%" }} id='mort-process-img' />
                                </div>

                                <div className="col-12 col-sm-12 col-md-12	col-lg-6 col-xl-6  d-flex align-items-center" style={{ justifyContent: "flex-                      end", margin: "0" }} id='mort-process-details-div' >

                                    <ul className="custom-list" id='mort-process-details-ul' style={{ width: "580px", padding: "0px" }} >
                                        <h1 className="mt-5 all-head">{item.sec4heading}</h1>

                                        <li className="my-6 m-text">
                                            <p className="all-para">
                                                <span>{item.sec4subhead1} </span>
                                                {item.sec4subheaddesc1}
                                            </p>
                                        </li>

                                        <li className="my-6 m-text">
                                            <p className="all-para" >
                                                <span>{item.sec4subhead2} </span>
                                                {item.sec4subheaddesc2}
                                            </p>
                                        </li>

                                        <li className="my-8 m-text">
                                            <p className="all-para">

                                                <span>{item.sec4subhead3} </span>
                                                {item.sec4subheaddesc3}
                                            </p>
                                        </li>

                                        <li className="my-8 m-text">
                                            <p className="all-para" >
                                                <span>{item.sec4subhead4} </span>
                                                {item.sec4subheaddesc4}        </p>
                                        </li>

                                        <li className="my-8 m-text">
                                            <p className="all-para">
                                                <span>{item.sec4subhead5} </span>
                                                {item.sec4subheaddesc5} </p>
                                        </li>
                                    </ul>
                                </div>


                            </div> */}
<div className="p-0 row" style={{ width: "87%", margin: "auto" }} id="main-proccess-div-row">
    <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex align-items-center" style={{ paddingLeft: "0px" }} id='mort-process-img-div'>
        <img alt="mortgage" src={`uploads/${item.sec4image}`} style={{ width: "100%" }} id='mort-process-img' />
    </div>
    <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex align-items-center justify-content-end" style={{ margin: "0" }} id='mort-process-details-div'>
        <ul className="custom-list" id='mort-process-details-ul' style={{  padding: "0px" }}>
            <h1 className="mt-5 all-head">{item.sec4heading}</h1>
            <li className="my-6 m-text">
                <p className="all-para">
                    <span>{item.sec4subhead1}</span>
                    {item.sec4subheaddesc1}
                </p>
            </li>
            <li className="my-6 m-text">
                <p className="all-para">
                    <span>{item.sec4subhead2}</span>
                    {item.sec4subheaddesc2}
                </p>
            </li>
            <li className="my-8 m-text">
                <p className="all-para">
                    <span>{item.sec4subhead3}</span>
                    {item.sec4subheaddesc3}
                </p>
            </li>
            <li className="my-8 m-text">
                <p className="all-para">
                    <span>{item.sec4subhead4}</span>
                    {item.sec4subheaddesc4}
                </p>
            </li>
            <li className="my-8 m-text">
                <p className="all-para">
                    <span>{item.sec4subhead5}</span>
                    {item.sec4subheaddesc5}
                </p>
            </li>
        </ul>
    </div>
</div>



                            {/* **************************Form*********************** */}
                            <div className="container property-form" id="mortagageform">
  <div style={{ margin:"40px 10px"}}>

                                <h2 className="text-center" id='list-property'>{item.sec5heading}</h2>


                                <div className="container">
                                    <div className="row" >
                                        <div className="col-md-12 col-sm-12 col-xs-12" >

                                            <form action="#" style={{ margin: "auto"}}>

                                                <div className="form-group col-12 sameformformort">
                                                    <input style={{ width: "100% !important" }} type="text" id="name" placeholder="Full name*" name="name" required onChange={(e) => setName(e.target.value)} />
                                                </div>


                                                <div className="form-group col-12 sameformformort">
                                                    <input style={{ width: "100%" }} type="email" className="form-                                                             control" id="mail" placeholder="Email*" onChange={(e) => setEmail(e.target.value)} />
                                                </div>

                                                <div className="form-group" style={{ position: "relative" }}>

                                                    <Dropdown style={{ width: "80px", position: "absolute", borderRight: "1px solid #ddd" }}>

                                                   
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

                                                    <input type="phone" className="form-control contcolor" placeholder="Phone No.*" required style={{ left: "160px", paddingLeft: "90px", paddingTop: "5px" }} onChange={(e) => setPhoneNumber(e.target.value)} />
                                                </div>
                                                {/* <div style={{ marginTop: "10px" }}>
        <input type="checkbox" id="policy1" name="policy1" />
        <label htmlFor="policy1">I accept the Terms & Conditions and Privacy Policy.</label>
    </div> */}
<div style={{ marginTop: "10px", display: "flex", alignItems: "flex-start" }}>
    <input type="checkbox" name="policy1" style={{ marginTop: "3px", width: "15px", height: "15px", borderRadius: "0", border: "1px solid black" }}  onChange={() => setPolicy1Checked(!policy1Checked)} />
    <label htmlFor="policy1" style={{ marginLeft: "5px", marginBottom: "0" }}>I accept the Terms & Conditions and Privacy Policy.</label>
</div>
<div style={{ marginTop: "10px", display: "flex", alignItems: "flex-start" }}>
    <input type="checkbox"  name="policy2" style={{ marginTop: "3px", width: "15px", height: "15px", borderRadius: "0", border: "1px solid black" }}  onChange={() => setPolicy2Checked(!policy2Checked)}/>
    <label htmlFor="policy2" style={{ marginLeft: "5px", marginBottom: "0", textAlign: "left" }}>I agree to receive information about property offers, deals & services from Raine & Horne</label>
</div>



    {/* <div>
        <input type="checkbox" id="policy2" name="policy2" />
        <label htmlFor="policy2">I agree to receive information about property offers, deals & services from Raine & Horne.</label>
    </div>
                                                */}
                                                    <button type="submit" className="btn btn-secondary" style={{marginTop:"30px",marginLeft:"0px !important",border:"1px solid #ddd"}} onClick={Aboutsubmit}>{item.sec5button}</button>
                                                
                                            </form>
                                        </div>
                                    </div>
                                </div>
  </div>
                            </div>




                        </div>

                        {/* **************************News And Insights*********************** */}

                        <div className='container' style={{ marginBottom: "60px", marginTop: "60px" }}>
                            <h2 className="my-4 text-center">NEWS & INSIGHTS</h2>
                            <div className='unique'>
                                <div className='uTNk3' >
                                    {first.map((item, index) => {
                                        const extractedText = extractTextFromHtml1(item.content, 'p', 0, 90);
                                        return (
                                            <div className='unTWc' key={index}>
                                                <div className='lfimg'>
                                                    <a href={`/${item.url}`}>
                                                        <img className="lmimg" src={`uploads/${item.featured_image}`} alt="some text" />
                                                    </a>
                                                </div>
                                                <div className='lftttl'>
                                                    <h3 className='all-sub-heading' style={{ textAlign: "left", marginTop: "15px" }}>                                                             {item.title}</h3>
                                                </div>
                                                <div className='ltttttt'>
                                                    <p className='rd2mp4'>{extractedText}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className='rgtoe'>
                                    {blogdata.map((item, index) => {
                                        const extractedText = extractTextFromHtml1(item.content, 'p', 0, 90);
                                        const extractedTitle = item.title.split(/\s+/).slice(0, 10).join(' ');
                                        return (

                                            <div className='rtcont' key={index}>
                                                <div className="newsroatecls">

                                                <div className='rtIMG'>
                                                    <a href={`/${item.url}`}>
                                                        <img className='igm4r' src={`uploads/${item.featured_image}`} alt="some text" />
                                                    </a>
                                                </div>
                                                <div className='rCd3TR'>
                                                    <div className='rtlo4d'>
                                                        <h4 className="rhh3d all-sub-heading" style={{ textAlign: "left" }}>{extractedTitle}                                                               </h4>
                                                    </div>
                                                    <div className='rd3hd'>
                                                        <p className="rd2mp4 all-para" >{extractedText}</p>
                                                    </div>
                                                </div>
                                                    </div>
                        

                                            </div>

                                        );
                                    })}
                                </div>
                            </div>

                        </div>
                    </>
                )
            })}

        </div>
    );
};

export default Mortage_Services;