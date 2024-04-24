import { useContext, useState, useEffect } from "react";
import axios from 'axios'
const Cookies = () => {
    const createMarkup = (html) => ({ __html: html });
    const [data, setdata] = useState([])
    useEffect(() => {
        const tablename = "cookiepagedb"
       const cookiespol = {"tablename" : "cookiepagedb"};
          axios.post(`http://localhost:4000/staticdata` , cookiespol).then((res) => {
            setdata(res.data)
        })
    }, []);
    return (
        <>
            <div>
                {data.map((item,index)=>{
                    
                    return(
                        <>
                        
                <section className="privacy">
                    <div className="container">
                        {/* <h3 className='privacy-headings'>COOKIE POLICY</h3> */}
                        <p className='all-para' dangerouslySetInnerHTML={createMarkup(item.cookietext)} />
                            {/* This Cookie Policy outlines the use of cookies on the Raine & Horne Real Estate LLC - Dubai website. By using our website, you consent to the use of cookies as described in this policy. */}
                        {/* </p> */}

                        {/* <span className='all-sub-heading' style={{ textAlign: 'left', fontSize: "18px" }}>What Are Cookies:</span>
                        <p className='all-para'>
                            Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently and provide information to website owners.
                        </p>


                        <div className='my-4'>
                            <span className='all-sub-heading' style={{ textAlign: 'left', fontSize: "18px" }}>How We Use Cookies:</span>
                            <p className='all-para'>
                                Raine & Horne Real Estate LLC - Dubai uses cookies for various purposes, including:
                            </p>

                            <div className='my-2'>
                                <li className="m-text" >
                                    <span>Essential Cookies: </span>
                                    Necessary for the website to function properly.
                                </li>
                                <li className="m-text" >
                                    <span>Analytical/Performance Cookies: </span>
                                    Help us understand how visitors interact with the website, enabling us to improve its performance.
                                </li>

                                <li className="m-text" >
                                    <span>Functionality Cookies: </span>
                                    Enhance user experience by remembering preferences.
                                </li>
                            </div>
                        </div>

                        <div className='my-4'>
                            <span className='all-sub-heading' style={{ textAlign: 'left', fontSize: "18px" }}>Types of Cookies We Use:</span>
                            <div className='my-2'>
                                <li className="m-text all-para" >
                                    <span>Session Cookies: </span>
                                    Temporary cookies that are deleted when you close your browser.
                                </li>
                                <li className="m-text all-para" >
                                    <span>Persistent Cookies:  </span>
                                    Remain on your device for a set period or until manually deleted.

                                </li>

                                <li className="m-text all-para" >
                                    <span>Third-Party Cookies: </span>
                                    We may use third-party services that may place cookies on your device.
                                </li>

                                <li className="m-text" >
                                    Third-party cookies are subject to the respective privacy policies of their providers.

                                </li>
                            </div>
                        </div>

                        <div className='my-4'>
                            <span className='all-sub-heading' style={{ textAlign: 'left', fontSize: "18px" }}>Your Choices Regarding Cookies:</span>
                            <div className='my-2'>
                                <li className="m-text all-para" style={{ listStyleType: 'disc' }}>
                                    <span>Browser Settings: </span>
                                    You can choose to accept or decline cookies through your browser settings. Refer to your browser's help menu for instructions.

                                </li>
                                <li className="m-text" style={{ listStyleType: 'disc' }}>
                                    <span>Opting Out of Analytics: </span>
                                    To opt-out of Google Analytics cookies, visit the Google Analytics Opt-out Browser Add-on.
                                </li>


                            </div>
                        </div> */}

                        {/* <div className='my-4'>
                            <span className='all-sub-heading' style={{ textAlign: 'left', fontSize: "18px" }}>Changes to This Policy:</span>
                            <p className='all-para'>Raine & Horne Real Estate LLC - Dubai reserves the right to update this Cookie Policy. Changes are effective when posted on the website.
                            </p>
                        </div>
                        <br />

                        <span className='all-sub-heading' style={{ textAlign: 'left', fontSize: "18px" }}>Contact Us:</span>
                        <p className='all-para'>For any questions regarding this Cookie Policy, contact us at info@rhdubai.ae.

                        </p> */}
                    </div>
                </section>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default Cookies
