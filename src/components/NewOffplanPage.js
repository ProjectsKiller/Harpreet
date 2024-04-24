import React, { useEffect, useState, useContext } from 'react'
import '../styles/offplan/offplan.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchContext from '../Context/Context1';
export const NewOffplanPage = () => {

    const getContext = useContext(SearchContext);

    const [data, setData] = useState([]);
    const [propertyname, setPropertyname] = useState('');
    useEffect(() => {
        axios.get("http://localhost:4000/getnewly").then((res) => {

            setData(res.data);
        });
    }, [])

    function handleNavigate(id, name) {
        setPropertyname(name)
        localStorage.setItem("internalpageid", id)
        localStorage.setItem("pagename", name)
        console.log(name, "okay name");
        // getContext.setPageid(id);
        getContext.setPagename(name);
    }



    return (
        <div className='container'>
            <div className='row mt-2 '>
                {data.map((item, index) => {
                    console.log(item.bannerimage);
                    return (
                        <div className='col-lg-4 col-md-4 col-sm-6 my-2 pt-1'>
                            <Link to="/internalpage">
                                {/* <a href={`${item.pagelink}`} style={{textDecoration:"none"}}> */}
                                <div style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} onClick={() => handleNavigate(item.id, item.pagelink)}>
                                    <div><img src={`/uploads/${item.bannerimage}`} alt="New Image" width="100%" /></div>
                                    <div className='m-3'>
                                        <div className='dveti d-flex justify-content-between ' style={{ fontWeight: "500", letterSpacing: ".3px", lineHeight: "22px", marginBottom: "10px", color: "#4e5158", height: "45px", fontSize: "22px" }}><span>{item.propertyname}</span><span style={{ fontSize: "20px" }}>{item.developername}</span></div>
                                        <p style={{ fontSize: "14px", fontWeight: "500", color: "#212529" }}>{item.propertylocation}</p>
                                        <p className="dveti" style={{ fontWeight: "500", fontSize: "22px", letterSpacing: ".3px", lineHeight: "22px", marginBottom: "0px", color: "#4e5158", height: "45px" }}>Starting From AED 1.49M</p>
                                        <p style={{ fontSize: "14px", fontWeight: "500", height: "45px", color: "#212529" }}>Project Completed in Q3-2024</p>

                                    </div>
                                    <button className='p-1 hovon' style={{ width: "100%", border: "none", color: "white", fontSize: "16px", fontWeight: "500" }}>Know More</button>
                                </div>
                            </Link>
                            {/* </a> */}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
