import React from 'react'
import '../../styles/offices/offices.css'
const Our_offices = () => {
    return (
        <>
           <section className="offices-ban">
                    <div className='' id='main-banner-div'>
                        <h2 className='main-banner-heading' style={{}}>Our Offices</h2>
                        <p id='main-banner-subdetails' style={{ width: '650px' }}>
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit. Curabitur non ipsum nec velit tincidunt euismod at ut turpis.
                            Ut accumsan quam quis accumsan hendrerit. Sed est quam, placerat vel lacinia sodales, finibus a erat.</p>
                    </div>
                </section>

            <div style={{ width: '87%', margin: 'auto', marginTop: '50px', marginBottom: '60px' }}>
                <h1 className='text-center mb-5 all-main-heading'>Our Offices</h1>
                <p className='all-para'>With offices throughout Australia and around the globe, Raine & Horne is one of the world’s most substantial real estate networks.</p>
                <p className='all-para'>To view our offices, please click on one of the following links.</p>

                <ul id='links-offices' style={{ paddingLeft: '17px', listStyleType: 'disc' }}>
                    <li className=''><a href='https://www.raineandhorne.com.au/nsw-real-estate-offices'>Raine & Horne offices in New South Wales</a></li>
                    <li className=''><a href='https://www.raineandhorne.com.au/qld-real-estate-offices'>Raine & Horne offices in Queensland</a></li>
                    <li className=''><a href='https://www.raineandhorne.com.au/sa-real-estate-offices'>Raine & Horne offices in South Australia</a></li>
                    <li className=''><a href='https://www.raineandhorne.com.au/wa-real-estate-offices'>Raine & Horne offices in Western Australia</a></li>
                    <li className=''><a href='https://www.raineandhorne.com.au/real-estate-offices-victoria'>Raine & Horne offices in Victoria</a></li>
                    <li className=''><a href='https://www.raineandhorne.com.au/real-estate-offices-tasmania'>Raine & Horne offices in Tasmania</a></li>
                    <li className=''><a href='https://www.raineandhorne.com.au/nt-real-estate-offices'>Raine & Horne offices in the Northern Territory</a></li>
                    <li className=''><a href='https://www.raineandhorne.com.au/act-real-estate-offices'>Raine & Horne offices in the Australian Capital Territory</a></li>
                    <li className=''><a href='https://www.raineandhorne.com.au/new-zealand-real-estate-offices'>Raine & Horne offices in New Zealand</a></li>
                    <li className=''><a href='https://www.raineandhorne.com.au/international-offices'>Raine & Horne offices International</a></li>
                </ul>

                <p className='all-para'>For all other enquiries, please contact our National Corporate Office (02) 9258 5400.</p>
            </div>
        </>
    )
}

export default Our_offices
