import React, { useEffect, useState } from 'react'
import '../../styles/whyus/whyus.css'
import '../../styles/main/common.css'
import '../../styles/banner/banner.css'
import axios from 'axios'

const Why_us = () => {
    const [data, setdata] = useState([])
    useEffect(() => {
		const whydata = {"tablename" : "whyuspagedb"}
        const name = "whyuspagedb"
        axios.post(`http://localhost:4000/staticdata` , whydata).then((res) => {
           setdata(res.data);
        })
            .catch((error) => {
                console.error("Error fetching data from the server:", error);
            });
    }, []);

    return (
        <div id='why-us-page-main'>

            {/* *********************Header************************* */}
            {data.map((item, index) => {
                return (
                    <>
                        <section className="why-ban">
                            <div className='' id='main-banner-div'>
                                <h2 className='main-banner-heading'>{item.sec1heading}</h2>
                                <p id='main-banner-subdetails'>
                                    {item.sec1discription}</p>
                            </div>
                        </section>

                        {/* *********************Points************************* */}

                        <section id="services" className="text-center">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <div className=" my-5">
                                            <h1 className='all-main-heading'> {item.sec2heading}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-4">
                                    {/* Service 1 */}
                                    <div className="col-lg-6 col-md-4">
                                        <div className="service">
                                            <img src="images/person.png" alt="" style={{ margin: 'auto' }} />
                                            <h5 className='all-sub-heading'> {item.sec2iconheading}</h5>
                                            <p className='all-para'> {item.sec2icondiscription}</p>
                                        </div>
                                    </div>
                                    {/* Service 2 */}
                                    <div className="col-lg-6 col-md-4">
                                        <div className="service">
                                            <img src="images/network.png" alt="" style={{ margin: 'auto' }} />
                                            <h5 className='all-sub-heading'>{item.sec2iconheading2}</h5>
                                            <p className='all-para'>{item.sec2icondiscription2}</p>
                                        </div>
                                    </div>
                                    {/* Service 3 */}
                                    <div className="col-lg-6 col-md-4">
                                        <div className="service">
                                            <img src="images/reputation.png" alt="" style={{ margin: 'auto' }} />
                                            <h5 className='all-sub-heading'>{item.sec2iconheading3}</h5>
                                            <p className='all-para'>{item.sec2icondiscription3}</p>
                                        </div>
                                    </div>

                                    {/* Service 4 */}
                                    <div className="col-lg-6 col-md-4">
                                        <div className="service">
                                            <img src="images/service.png" alt="" style={{ margin: 'auto' }} />
                                            <h5 className='all-sub-heading'>{item.sec2iconheading4}</h5>
                                            <p className='all-para'>{item.sec2icondiscription4}</p>
                                        </div>
                                    </div>

                                    {/* Service 5 */}
                                    <div className="col-lg-6 col-md-4">
                                        <div className="service">
                                            <img src="images/education.png" alt="" style={{ margin: 'auto' }} />
                                            <h5 className='all-sub-heading'>{item.sec2iconheading5}</h5>
                                            <p className='all-para'>{item.sec2icondiscription5}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Service 6 */}
                                    <div className="col-lg-6 col-md-4">
                                        <div className="service">
                                            <img src="images/tech.png" alt="" style={{ margin: 'auto' }} />
                                            <h5 className='all-sub-heading'>{item.sec2iconheading6}</h5>
                                            <p className='all-para'>{item.sec2icondiscription6}</p>
                                        </div>
                                    </div>

                                    {/* Service 7 */}
                                    <div className="col-lg-6 col-md-4">
                                        <div className="service">
                                            <img src="images/ethics.png" alt="" style={{ margin: 'auto' }} />
                                            <h5 className='all-sub-heading'>{item.sec2iconheading7}</h5>
                                            <p className='all-para'>{item.sec2icondiscription7}</p>
                                        </div>
                                    </div>
                                    {/* (Render remaining service components in a similar fashion) */}
                                </div>
                            </div>
                        </section>

                    </>
                )
            })}

        </div>
    )
}

export default Why_us
