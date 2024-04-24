import React, { useState, useEffect } from 'react'
import '../../styles/main/myteam.css'
import axios from 'axios'
import Chatbot from '../Notification/Chatbot'
import WhatsappChat from '../Notification/Whatapp'
import '../../styles/banner/banner.css'

const Meet_My_Team = () => {
    const [data, setdata] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/meetmyteam1`).then((res) => {
            setdata(res.data)
        })
            .catch((error) => {
                console.error("Error fetching data from the server:", error);
            });
    }, []);


    return (
        <>
         

                <section className="meet-team-ban">
                    <div className='' id='main-banner-div'>
                        <h2 className='main-banner-heading' >Meet Our Team</h2>
                        <p id='main-banner-subdetails'>Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit. Curabitur non ipsum nec velit tincidunt euismod at ut turpis.
                            Ut accumsan quam quis accumsan hendrerit. Sed est quam, placerat vel lacinia sodales, finibus a erat.</p>
                    </div>
                </section>

                {/* *********************Header***************************** */}
             




                {/* *********************Members***************************** */}
                
                {/* <div className="container" id="team-member"> */}
                    <h2 id="h-team" className='mb-4 all-main-heading'>Our Team</h2>
                   
                    <div className='row' style={{ padding : '0px' , width : '87%' , margin : 'auto'}} >
                        {data.map((item, key) => {
                            return (
                                <>
                                    <div className='col-sm-12 col-md-12 col-lg-3 col-xl-3 m-0 p-0 mb-5' id='our-team-member' style={{borderRadius : "0px" }} >
                                        {item.Name === 'baljinder' ? <>

                                        </>
                                            :
                                            <>
                                                <div className="card mx-4" style={{borderRadius : "0px" }} >
                                                    <div id="zoom-mem">
                                                        {item.image === null ?
                                                            <>
                                                                <img                                                                                                                                          src="https://st4.depositphotos.com/3557671/23892/v/450/depositphotos_238923408-                                                                 stock-illustration-vector-illustration-of-avatar-and.jpg" className="card-img-                                                                 top person-img" alt="Memer" style={{ height: '285.4px' , borderRadius : "0px"  }} />
                                                            </>
                                                            :
                                                            <>
                                                                <img src={`uploads/${item.image}`} className="card-img-top person-img"                                                                          alt="Memer" style={{minHeight : "271px" , minWidth : '300px' , maxWidth : '400px', borderRadius : "0px" }} />
                                                            </>
                                                        }
                                                    </div>

                                                    <div className="card-body text-center" style={{ backgroundColor: "#E8E8E9" }}>
                                                        <h5 className="card-title all-sub-heading" style={{color : '#212529'}} id='agent-name-                                                          meet'>{item.Name}</h5>
                                                        <p className="card-text meet-team-details" style={{ margin: '0px', marginTop: '-5px'                                                            }}>{item.Job} </p>
                                                        <a href="mailto:info@rhdubai.ae" className="meet-team-details" style={{                                                              textDecoration: 'none', margin: '0px' }}>{item.email}</a>
                                                    </div>

                                                </div>
                                            </>
                                        }
                                    </div>

                                </>
                            )
                        })}
                    {/* </div> */}
               




            </div>
		           <Chatbot />
                <WhatsappChat />
        </>

    )
}

export default Meet_My_Team


