import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import '../../styles/faq/Faq.css'
const Faq = () => {

    return (
        <>
            <div className='faqmain' id='faq-main-div' >
                <div className='mt-2 row'>
                    <div className='all-main-heading mb-8' style={{ textAlign: 'center' }}><h1>Frequently Asked Questions</h1></div>

                    <div className='col-12'>
                        <Accordion defaultActiveKey="0" className='mb-4'>

                            <Accordion.Item eventKey="0" style={{}} >
                                <Accordion.Header style={{ margin: '0px', padding: '0px' }}><li style={{ margin: '0px' , fontSize : '17px' , fontWeight : '500'}} className='all-para'>  What are the main areas in Dubai for real estate investment?</li></Accordion.Header>
                                <Accordion.Body id='faqs-id' className='accordian-details all-para'>
                                    Some popular areas for real estate investment in Dubai include Downtown Dubai, Dubai Marina,
                                    Palm Jumeirah, Business Bay, and Jumeirah Village Circle, among others. It ultimately depends on your investment goals and preferences.    </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="1" className='mt-2'>
                                <Accordion.Header style={{ margin: '0px', padding: '0px' }}><li style={{ margin: '0px' , fontSize : '17px' , fontWeight : '500'}} className='all-para'> Can foreigners buy property in Dubai?</li></Accordion.Header>
                                <Accordion.Body id='faqs-id' className='accordian-details all-para' >
                                    Yes, Dubai allows foreigners to buy property in designated freehold areas.
                                    These areas are typically found in popular residential and investment neighborhoods.
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="2" className='mt-2' >
                                <Accordion.Header style={{ margin: '0px', padding: '0px' }}><li style={{ margin: '0px' , fontSize : '17px' , fontWeight : '500'}} className='all-para'>  What is the process of buying a property in Dubai as a foreigner?</li></Accordion.Header>
                                <Accordion.Body id='faqs-id' className='accordian-details all-para' >
                                    The process involves selecting a property, signing a Memorandum of Understanding (MOU) or a Sale and Purchase Agreement (SPA), conducting due diligence, and completing the property transfer at the Dubai Land Department.
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="3" className='mt-2' >
                                <Accordion.Header style={{ margin: '0px', padding: '0px' }}><li style={{ margin: '0px' , fontSize : '17px' , fontWeight : '500'}} className='all-para'>  Are there any taxes associated with owning property in Dubai?</li></Accordion.Header>
                                <Accordion.Body id='faqs-id' className='accordian-details all-para' >
                                    There is no income tax or capital gains tax on property in Dubai. However, there is a property registration fee, transfer fee, and annual property service fee.
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="4" className='mt-2' >
                                <Accordion.Header style={{ margin: '0px', padding: '0px' }}><li style={{ margin: '0px' , fontSize : '17px' , fontWeight : '500'}} className='all-para'>  What is the rental market like in Dubai?</li></Accordion.Header>
                                <Accordion.Body id='faqs-id' className='accordian-details all-para' >
                                    Dubai has a competitive rental market. Prices can vary significantly depending on the location and type of property. It's advisable to research and compare different options.
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="5" className='mt-2' >
                                <Accordion.Header style={{ margin: '0px', padding: '0px' }}><li style={{ margin: '0px' , fontSize : '17px' , fontWeight : '500'}} className='all-para'> How do I find a reliable real estate agent in Dubai?</li></Accordion.Header>
                                <Accordion.Body id='faqs-id' className='accordian-details all-para' >
                                    Look for licensed real estate agents and agencies in Dubai. Check their reputation, client reviews, and industry affiliations to ensure reliability.
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="6" className='mt-2' >
                                <Accordion.Header style={{ margin: '0px', padding: '0px' }}><li style={{ margin: '0px' , fontSize : '17px' , fontWeight : '500'}} className='all-para'> What are the legal requirements for property rental in Dubai?</li></Accordion.Header>
                                <Accordion.Body id='faqs-id' className='accordian-details all-para' >
                                    Landlords and tenants need to follow the terms and conditions specified in the tenancy contract issued by the Dubai Real Estate Regulatory Agency (RERA). Additionally, a security deposit is typically required.
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="7" className='mt-2' >
                                <Accordion.Header style={{ margin: '0px', padding: '0px' }}><li style={{ margin: '0px' , fontSize : '17px' , fontWeight : '500'}} className='all-para'> Can I buy property off-plan in Dubai, and what are the risks involved?</li></Accordion.Header>
                                <Accordion.Body id='faqs-id' className='accordian-details all-para' >
                                    Yes, you can purchase off-plan properties. While it offers the potential for a lower price, there are risks such as delays or changes in the project. Research the developer's reputation and track record.
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="8" className='mt-2' >
                                <Accordion.Header style={{ margin: '0px', padding: '0px' }}><li style={{ margin: '0px' , fontSize : '17px' , fontWeight : '500'}} className='all-para'> How can I finance my property purchase in Dubai?</li></Accordion.Header>
                                <Accordion.Body id='faqs-id' className='accordian-details all-para' >
                                    You can finance your property through a mortgage offered by banks in Dubai. Eligibility criteria and interest rates can vary, so it's important to research and compare options.
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="9" className='mt-2' >
                                <Accordion.Header style={{ margin: '0px', padding: '0px' }}><li style={{ margin: '0px' , fontSize : '17px' , fontWeight : '500'}} className='all-para'>  Are there any restrictions on selling property in Dubai?</li></Accordion.Header>
                                <Accordion.Body id='faqs-id' className='accordian-details all-para' >
                                    There are no restrictions on selling property in Dubai, but it's important to understand the process, including capital gains tax implications and transfer fees.
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="10" className='mt-2' >
                                <Accordion.Header style={{ margin: '0px', padding: '0px' }}><li style={{ margin: '0px' , fontSize : '17px' , fontWeight : '500'}} className='all-para'> What should I consider when choosing a property management company in Dubai?</li></Accordion.Header>
                                <Accordion.Body id='faqs-id' className='accordian-details all-para'> 
                                    When selecting a property management company, consider their reputation, experience, services offered, fees, and client reviews. Ensure they can meet your property's specific needs.
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="11" className='mt-2' >
                                <Accordion.Header style={{ margin: '0px', padding: '0px' }}><li style={{ margin: '0px' , fontSize : '17px' , fontWeight : '500'}} className='all-para'>  What's the role of Raine & Horne in Dubai's real estate market?</li></Accordion.Header>
                                <Accordion.Body id='faqs-id' className='accordian-details all-para'> 
                                    Raine & Horne is a trusted partner in Dubai's real estate market, connecting clients with experienced real estate professionals, including trusted mortgage brokers, to guide them through property transactions and investments.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>

                </div>

            </div>
        </>

    )
}

export default Faq

