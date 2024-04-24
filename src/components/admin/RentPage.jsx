import React from "react";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../Context/UserContext";
import axios from 'axios'

export default function RentPage() {
    const [chgwid, setChgwid] = useState({ "margin": "66px 0px 15px 250px" })
    const userVal = useContext(UserContext)
    useEffect(() => {
        if (userVal.user === "Close") {
            setChgwid({
                "transitionDuration": "300ms",
                "transitionProperty": "margin",
                "margin": "66px 0px 15px 0px"
            });

        } else if (userVal.user === "Open") {
            setChgwid({
                "transitionDuration": "500ms",
                "transitionProperty": "margin",
                "margin": "66px 0px 15px 250px"
            });
        }
    }, [userVal.user]);

    const [data, setData] = useState({
        sec1heading: ''
    });

    useEffect(() => {
        const tablename = "rentpagedb"
   const tablen = {"tablename" : "rentpagedb"}
          axios.post(`/staticdata` , tablen).then((res) => {
            setData({
                sec1heading: res.data[0].sec1heading,
            });
        })
    }, []);

    function UpdataData(e) {
        e.preventDefault();
        let mydata = { 'sec1heading': data.sec1heading }

        axios.post(`/updaterent`, mydata).then((res) => {
            if (res.data.msg === "200") {
                alert("Data is updated!")
            }

        })
    }

    return (
        <>
            <main id="whole" style={chgwid}>


                {/* <!-- box --> */}

                <div className="container-fluid">
                    <div className="block-header">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-7 col-md-6 col-sm-12">
                                    <h2>Add Property
                                        <small className="text-muted">Welcome to Compass</small>
                                    </h2>
                                </div>
                                <div className="col-lg-5 col-md-6 col-sm-12 d-flex justify-content-end">

                                    <ul className="breadcrumb float-md-right">
                                        <li className="breadcrumb-item"><a href="index.html"><i className="bx bx-home"></i> Compass</a></li>
                                        <li className="breadcrumb-item active">Buy</li>

                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row clearfix">
                        <div className="col-lg-12">

                            <div className="card">
                                <div className="header">
                                    <h2><strong>Section</strong> "Information"</h2>
                                    <ul className="header-dropdown">
                                        <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="body">
                                    <div className="row clearfix">

                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label for="title" className="form-label">Main Heading</label>
                                                <input type="text" className="form-control" value={data.sec1heading} onChange={(e) => setData({ ...data, sec1heading: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>

                <div className="col-sm-12 submit-opt">
                    <button type="submit" className="btn col-sub btn-round" onClick={UpdataData}>Update</button>
                </div>
            </main>
            {/* <!-- End #main --> */}
        </>
    )
}