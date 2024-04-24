import React, { useEffect, useState } from "react";
import ReactDOMServer from 'react-dom/server';
import "./mort.css"
import Form from "react-bootstrap/Form";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
// import Typography from "@mui/material/Typography";
import { Typography } from '@mui/material';
import "../styles/banner/banner.css"

// Assuming you have the required functions and state variables

const DepositSlider = () => {
    
    const handleDepositChange = (e) => {
        setDeposit(e.target.value);
      };

    const [deposit, setDeposit] = useState(20);
    return (
      React.createElement(Box, null,
        React.createElement("input", {
          "aria-label": "Always visible",
          defaultValue: 50,
          value: deposit,
          onChange: handleDepositChange,
          min: 20,
          max: 100,
          type: "range"
        }),
        React.createElement("h1", null, deposit)
        )
    );
  };

  

const MortgageCalculatorContent = () => {
    const [deposit, setDeposit] = useState(20);
    const [period, setperiod] = useState(25);
    const [interestRate, setinterestRate] = useState(4.8);
    const [actualDeposit, setActualDeposit] = useState();
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [number, setNumber] = useState(1000000);

    // ******************Define Logic In AED******************** 
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

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        const parsedValue = parseInt(inputValue.replace(/,/g, ""), 10);
        if (!isNaN(parsedValue)) {
            setNumber(parsedValue);
        }
    };

    function formatNumberWithCommas(number) {
        const formattedNumber = Number(number).toFixed(2);
        return formattedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const [sliderValue, setSliderValue] = useState(50);

    const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
    };

    return (

        <>
        
            <div id="mortagecal" className="mt-12  p-3" style={{ backgroundColor: "#f7f7f7", width: "70%", margin: "auto", marginTop: "30px" }}>

                <h1 className="mt-3 text-center all-head">Mortgage calculator</h1>
                <p className="text-center mb-4 all-para" style={{ width: "500px", margin: "auto" }} id="para-mort-cal">
                    Use our handy mortgage calculator to estimate your monthly payments, including principal and interest. It's a helpful tool in
                    budgeting for your new home.
                </p>

                <label for="deposit">Down Payment (%):</label>
  <input
    type="range"
    id="deposit"
    min="20"
    max="100"
    value="50"
    step="1"
    oninput="updateDepositLabel(this.value)"
  />
  <div id="depositLabel" >50%</div>

  <button onclick="calculateMortgage()">Calculate</button>
  

                <div className="row" id="mort-cal-result-division-row">

                    <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex align-items-center">

                        <Form id="comment-form" className="row p-3" style={{ width: "100%" }}>

                            <Form.Group className="mb-3 col-12 m-auto" style={{ height: '100px', padding: '10px' }}>
                                <span className="all-para" >Property Price</span>
                                <div className="form-text mt-3">
                                    <Form.Control className="pl-20" type="text" placeholder="Property Price" value={number.toLocaleString()} onChange={handleInputChange} id="youridhere" />
                                    <label for="youridhere" className="static-value">AED</label>
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3 col-12 m-auto mt-3">
                                <div className="row">
                                    <div className="col-6 mt-2">
                                        <span className="all-para">Down Payment</span>
                                    </div>
                                    <div className="col-6 left-side-values">
                                        <Typography id="non-linear-slider" gutterBottom style={{ textAlign: "right" }}>
                                            <div className="p-2 left-side-years">
                                                {actualDeposit} <span className="ml-3">AED</span>
                                            </div>
                                        </Typography>

                                    </div>
                                </div>
                                <br />
                                <Box>
                                    
                                    <input defaultValue={50} value={deposit} onChange={(e) => setDeposit(e.target.value)} aria-label={`Always visible: ${deposit}%`}
                                        valueLabelDisplay="on" valueLabelFormat={deposit + "%"} min={20} max={100} type="range"/>
                                </Box>
                            </Form.Group>

                            <Form.Group className="mb-3 col-12 m-auto">
                                <div className="row">
                                    <div className="col-6">
                                        <span className="all-para">Mortgage Period</span>
                                    </div>
                                    <div className="col-6 left-side-values" >
                                        <Typography id="non-linear-slider" gutterBottom>
                                            <div className="p-2 left-side-years">
                                                {period} <span className="ml-16">Years</span>
                                            </div>
                                        </Typography>
                                    </div>
                                </div>
                                <br />

                                <Box>
                                    <input aria-label="Always visible" defaultValue={5} sx={{ "& .MuiSlider-track": { backgroundColor: "#fcaf17", borderColor: "#fcaf17", height: "5px", width: "auto", }, "& .MuiSlider-thumb": { backgroundColor: "#fcaf17", borderColor: "#fcaf17", }, }} value={period} onChange={(e) => setperiod(e.target.value)} min={5} max={25} valueLabelDisplay="on" type="range" />
                                </Box>

                            </Form.Group>

                            <Form.Group className="mb-3 col-12 m-auto">
                                <div className="row">
                                    <div className="col-6">
                                        <span className="all-para">Interest</span>
                                    </div>
                                    <div className="col-6 left-side-values" >
                                        <Typography id="non-linear-slider" gutterBottom style={{ textAlign: "right" }}>
                                            <div className="p-2 left-side-years">
                                                {interestRate} <span className="ml-20">%</span>
                                            </div>
                                        </Typography>
                                    </div>
                                </div>
                                <br />
                                <Box>
                                    <input aria-label="Always visible" defaultValue={5} value={interestRate} onChange={(e) => setinterestRate(e.target.value)} min={1.5} max={7} step={0.1} valueLabelFormat={(value) => `${value.toFixed(1)}`} valueLabelDisplay="on" sx={{ "& .MuiSlider-track": { backgroundColor: "#fcaf17", borderColor: "#fcaf17", height: "5px", width: "auto", }, "& .MuiSlider-thumb": { backgroundColor: "#fcaf17", borderColor: "#fcaf17", }, }} type="range" />
                                </Box>
                            </Form.Group>
                        </Form>
                    </div>

                    {/* *******************************************Right Side**************************************** */}

                    <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex align-items-center" style={{ display: "flex", alignItems: "center", backgroundColor: "#E8E8E9" }}>
                        <div style={{ display: "flex", alignItems: "center", backgroundColor: "#E8E8E9" }}>
                            <div style={{ backgroundColor: "#E8E8E9", padding: "3px" }}>
                                {monthlyPayment > 0 && (
                                    <div className="m-auto" style={{ width: "auto", margin: "auto", alignItems: "center", justifyContent: "center", height: "" }}>
                                        <h1 className=" text-center my-3 all-head">Monthly Payment</h1>
                                        <h2 className=" text-center all-sub-heading">AED <strong className="all-head">{formatNumberWithCommas(monthlyPayment)}</strong></h2>
                                    </div>
                                )}
                                <div className="row mt-4 p-0" style={{ width: "100%", textAlign: 'center', margin: 'auto' }}>
                                    <h1 className="all-main-heading">Monthly Payment</h1>
                                    <div className="col-12">
                                        <p className="all-para">Property Price: <span>{number.toLocaleString()}</span>
                                        </p>
                                    </div>

                                    <div className="col-12">
                                        <p className="all-para">Down Payment:<span>{deposit.toLocaleString()} %</span>
                                        </p>
                                    </div>

                                    <div className="col-12">
                                        <p className="all-para">Mortgage Peroid: <span>{period} Years</span>
                                        </p>
                                    </div>

                                    <div className="col-12">
                                        <p className="all-para">Interest Rate: <span>{interestRate} %</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <hr style={{ marginTop: "20px" }} />
        </>

    );
};

const MortgageCalculatorBlock = (editor, opt = {}) => {
    const blockId = opt.id || 'mortgageCalculator';

    editor.BlockManager.add(blockId, {
        label: 'Mortgage Calculator',
        content: ReactDOMServer.renderToStaticMarkup(<MortgageCalculatorContent />),
        category: 'Basic',
        attributes: { class: 'fa fa-wpforms' }

    });

    return editor;
};

export default MortgageCalculatorBlock;