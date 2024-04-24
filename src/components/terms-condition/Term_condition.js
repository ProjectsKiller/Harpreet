import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

const Term_condition = () => {
    const createMarkup = (html) => ({ __html: html });
    const [data, setdata] = useState([])
    useEffect(() => {
        const term = {"tablename" : "termcondition"};
        axios.post(`http://localhost:4000/staticdata` , term).then((res) => {
            setdata(res.data)
        })
    }, []);

    return (
        <>
            <div>
                {data.map((item, index) => {
                    console.log(item);
                    return (
                        <>
                            <section className="privacy">
                                <div className="container">
                                    <p className='all-para' dangerouslySetInnerHTML={createMarkup(item.termtext)} />
                                    {/* <span className='all-sub-heading' style={{ textAlign: 'left', fontSize: "18px" }}>1. Acceptance of Terms</span>
                        <p className='all-para'>
                            By accessing and using the Raine & Horne Real Estate LLC website
                            (rhdubai.ae), you agree to comply with and be bound by these terms
                            and conditions.
                        </p>

                        <span className='all-sub-heading' style={{ textAlign: 'left', fontSize: "18px" }}>2. Intellectual Property</span>
                        <p className='all-para'>
                            All content on this website, including text, graphics, logos, images,
                            audio clips, and software, is the property of Raine & Horne Real Estate
                            LLC and is protected by intellectual property laws.
                        </p>

                        <span className='all-sub-heading' style={{ textAlign: 'left', fontSize: "18px" }}>3. User Conduct</span>
                        <p className='all-para'>
                            You agree not to engage in any activity that may interfere with the proper functioning of the website. This includes, but is not limited to, hacking, distributing malware, or engaging in any unlawful or unethical behavior.
                        </p>

                        <span className='all-sub-heading' style={{ textAlign: 'left', fontSize: "18px" }}>4. Privacy Policy</span>
                        <p className='all-para'>
                            Our Privacy Policy governs the collection, use, and disclosure of personal information. By using our website, you agree to the terms outlined in the Privacy Policy.
                        </p>

                        <span className='all-sub-heading' style={{ textAlign: 'left', fontSize: "18px" }}>5. Links to Third-Party Websites</span>
                        <p className='all-para'>
                            Our website may contain links to third-party websites. We are not responsible for the content or privacy practices of these sites. Please review the terms and conditions and privacy policies of any third-party websites you visit.
                        </p>

                        <span className='all-sub-heading' style={{ textAlign: 'left', fontSize: "18px" }}>6. Disclaimer of Warranties</span>
                        <p className='all-para'>
                            Raine & Horne Real Estate LLC makes no warranties, expressed or implied, regarding the accuracy, completeness, or reliability of the content on this website. Your use of the website is at your own risk.
                        </p>

                        <span className='all-sub-heading' style={{ textAlign: 'left', fontSize: "18px" }}>7. Limitation of Liability</span>
                        <p className='all-para'>
                            Raine & Horne Real Estate LLC will not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to or use of the website.
                        </p>

                        <span className='all-sub-heading' style={{ textAlign: 'left', fontSize: "18px" }}>8. Changes to Terms and Conditions</span>
                        <p className='all-para'>
                            Raine & Horne Real Estate LLC reserves the right to modify or revise these terms and conditions at any time. It is your responsibility to review these terms regularly.
                        </p>

                        <span className='all-sub-heading' style={{ textAlign: 'left', fontSize: "18px" }}>9. Governing Law</span>
                        <p className='all-para'>
                            These terms and conditions are governed by and construed in accordance with the laws of the UAE. Any disputes arising from or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in the UAE.
                        </p>

                        <span className='all-sub-heading' style={{ textAlign: 'left', fontSize: "18px" }}>10. Accuracy of Information:</span>
                        <p className='all-para'>
                            Raine & Horne Real Estate LLC and its agents do not guarantee the accuracy or completeness of the information provided. Clients acknowledge that information received is for informational purposes only and should not be considered legal, financial, or investment advice.
                        </p>

                        <span className='all-sub-heading' style={{ textAlign: 'left', fontSize: "18px" }}>11. Content Changes:</span>
                        <p className='all-para'>
                            The content of this website is for general information and is subject to change without notice.
                        </p>

                        <span className='all-sub-heading' style={{ textAlign: 'left', fontSize: "18px" }}>12. No Offer or Solicitation:</span>
                        <p className='all-para'>
                            The information on this website is not an offer, solicitation, or commitment to purchase, sell, or lease properties. Visitors are advised to seek professional advice before making any financial decisions.
                        </p>

                        <span className='all-sub-heading' style={{ textAlign: 'left', fontSize: "18px" }}>13. Use of Information:</span>
                        <p className='all-para'>
                            Users are responsible for ensuring that information, services, or products obtained through this website meet their specific requirements.
                        </p>

                        <span className='all-sub-heading' style={{ textAlign: 'left', fontSize: "18px" }}>14. Intellectual Property:</span>
                        <p className='all-para'>
                            All content on this website, including images and logos, is protected by copyrights and other intellectual property rights owned by Raine & Horne Real Estate LLC.
                        </p>

                        <span className='all-sub-heading' style={{ textAlign: 'left', fontSize: "18px" }}>15. Termination and Suspension:</span>
                        <p className='all-para'>
                            Raine and Horne Real Estate LLC reserves the right to terminate or suspend access to our website at any time, without notice, for conduct violating these Terms and Conditions or for any other reason. Termination will revoke website access, but all applicable restrictions, licenses, and limitations of liability mentioned in these Terms will remain in effect post-termination.
                        </p>

                        <span className='all-sub-heading' style={{ textAlign: 'left', fontSize: "18px" }}>16. Indemnification:</span>
                        <p className='all-para'>
                            Users agree to indemnify and hold Raine and Horne Real Estate LLC and its affiliates harmless from any claims, liabilities, losses, damages, and expenses, including legal fees, arising from their use of the website or their violation of these Terms and Conditions.
                        </p>

                        <span className='all-sub-heading' style={{ textAlign: 'left', fontSize: "18px" }}>17. Force Majeure:</span>
                        <p className='all-para'>
                            Raine and Horne Real Estate LLC is not liable for delays or failures in performance resulting from acts beyond its control, including natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fires, floods, accidents, network infrastructure failures, strikes, or shortages of transport facilities, fuel, energy, labor, or materials.
                        </p>

                        <span className='all-sub-heading' style={{ textAlign: 'left', fontSize: "18px" }}>18. Compliance with Local Laws:</span>
                        <p className='all-para'>
                            Raine and Horne Real Estate LLC operates in compliance with the laws and regulations of Dubai and the UAE. Users must adhere to all applicable local, national, and international laws and regulations in their use of our website.
                        </p>

                        <br />
                        <p className='all-para'>
                            If you have any questions or concerns about these terms and conditions, please contact Raine & Horne Real Estate LLC at info@rhdubai.ae */}
                                    {/* </p> */}

                                </div>
                            </section>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default Term_condition
