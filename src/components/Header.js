import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router";
import axios from 'axios';
import './Header.css'
import './mystyle.css';

const Header = ({ navigation }) => {
    const navigate = useNavigate()
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const [styleData, setStyleData] = useState(null);
    const [admin, setadmin] = useState(false)
    const [navLinks, setNavLinks] = useState([]);

    function goadminPanel() {
        if (admin === true) {
            navigate("/backend")
        }
    }

    useState(() => {
        const admin = localStorage.getItem("admin");
        const loginpassed = localStorage.getItem("user")
        if (admin === "%@#^#%&^%^&$%@@^@%$%^,^$#@@#8757636345^$%^$%&32422" && loginpassed === "76342391251#@%#^%(^%&^$$%#@$%448941/-++y$#%$^^&^$@") {
            setadmin(true)
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/navigation');
                setNavLinks(response.data);
            } catch (error) {
                console.error('Error fetching navigation:', error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        axios.get('http://localhost:4000/api/getnavstyles').then((res) => {
            setStyleData(res.data[0]); // Assuming you get an array, and you need the first item
        });
    }, []);


    const HeaderContainer = styled.header`
    background-color: ${styleData ? styleData.header_background_color : '#fff'};
    color: white;
    height:82px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem 4rem;
   
    `;

    const Brand = styled.h1`
        margin: 0;
        font-size: 1.5rem;
        color: #f8f9fa;
    `;

    const Nav = styled.nav`
    @media (max-width: 1024px) { // Change from max-width: 768px to max-width: 1024px
        display: ${props => props.open ? 'block' : 'none'};
        position: absolute;
        top: 82px;
        left: 0;
        right: 0;
        background-color: #343a40;
        padding: 1rem;
        z-index: 100;

        a {
            display: block;
            margin: 0.5rem 0;
            color: white;
        }
    }

    @media (min-width: 1025px) { // Ensure it's above 1024px
        display: flex;
       

    }

`;


    const NavLink = styled.a`
    color: ${styleData ? styleData.nav_color : '#f8f9fa'};
    font-size:${styleData ? styleData.nav_font_size : '16px'};
    text-decoration: none;
    padding: 0.5rem 1rem;
    
    &:hover {
        text-decoration: underline;
    }
    `;

    const StyledButton = styled.button`
    color: ${props => props.textColor};
    background-color: ${props => props.backgroundColor};
    font-size: ${props => props.fontSize};
    display: block;

    @media (max-width: 1024px) {
        display: none;
    }
  
`;


    // const MenuButton = styled.button`
    //     background: ${styleData ? styleData.buttonBackgroundColor : '#f8f9fa'};
    //     border: 1px solid red;
    //     color: ${styleData ? styleData.buttonTextColor : '#000000'};
    //     font-size: ${styleData ? styleData.buttonFontSize : '16px'};
    //     cursor: pointer;

    //     @media (min-width: 769px) {
    //         display: none;
    //     }
    // `;
    //     const MenuButton = styled.button`
    //     background: ${styleData ? styleData.buttonBackgroundColor : '#f8f9fa'};
    //     border: 1px solid red;
    //     color: ${styleData ? styleData.buttonTextColor : '#000000'};
    //     font-size: ${styleData ? styleData.buttonFontSize : '16px'};
    //     cursor: pointer;
    //     display: none; // Initially hide the button

    //     @media (max-width: 1024px) { // Show the button when screen width is 1024px and below
    //         display: block;
    //     }

    //     @media (min-width: 769px) { // Hide the button when screen width is above 1024px
    //         display: none;
    //     }
    // `;

    const MenuButton = styled.button`
    background: ${props => props.backgroundColor};
    color: ${props => props.textColor};
    font-size: ${props => props.fontSize};
    cursor: pointer;
    display: none; // Initially hide the button
    border: 1px solid rgb(201, 199, 199);

  
    
    
    @media (max-width: 1024px) {
        display: block; // Show the button when screen width is 1024px and below
        position: absolute;
        top: 0;
        right: 20px; // Adjust this value as needed
        margin-top:20px;
// padding: 7px 10px;
font-size:22px;
        background:transparent;
    }

    @media (min-width: 364px) and (max-width: 600px) {
        .uiefy {
            border: 1px solid red; // Apply red color border to class uiefy
        }
    }
   
`;
    // const screenWidth = window.innerWidth;

    // let sliceEndIndex = 7; // Default slice end index

    // if (screenWidth >= 1025 && screenWidth <= 1260) {
    //     console.log(screenWidth, "width");
    //     sliceEndIndex = 6;
    // }
    const [sliceval,setSliceVal]=useState('');
    useEffect(() => {
        function handleResize() {
            const screenWidth = window.innerWidth;
            let newSliceVal = 7; // Default slice end index
            if (screenWidth >= 1025 && screenWidth <= 1212) {
                console.log(screenWidth, "width");
                newSliceVal = 6;
            }
            setSliceVal(newSliceVal);
        }

        // Initial call to set slice value based on initial screen width
        handleResize();

        // Add event listener to handle screen width changes
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [/* no dependencies */]); 
    return (
        <HeaderContainer id='main-navbar-responsive-view'>

            {styleData && styleData.logo && (
                <a href="/">
                    <img src={`uploads/${styleData.logo}`} alt="Logo" width="215px" />
                </a>
            )}

            {mobileMenuOpen && <>
                <img onClick={goadminPanel} src='/images/guesticon.png' className='guesticon' style={{ height: "30px", position: "absolute", marginLeft: "80%", cursor: "pointer" }} />
            </>}
            <div className='gywf'>
                <MenuButton
                    backgroundColor={styleData ? styleData.buttonBackgroundColor : '#f8f9fa'}
                    textColor={styleData ? styleData.buttonTextColor : '#000000'}
                    fontSize={styleData ? styleData.buttonFontSize : '16px'}
                    onClick={toggleMobileMenu}
                    style={{ height: "30px", width: "40px", marginLeft: "20%", padding: "0px 37px 37px 17px" }}
                    className='uiefy'
                >
                    ☰
                </MenuButton>
                <div className='wgyj'>
                    {admin && (
                        <img onClick={goadminPanel} src='/images/guesticon.png' style={{ height: "30px", position: "absolute", marginLeft: "12%", cursor: "pointer", border: "2px solid red" }} />
                    )}
                </div>
            </div>

            <Nav open={mobileMenuOpen} >

                {mobileMenuOpen
                    ? navLinks.map((item, index) => {
                        return (
                            <>
                                <NavLink key={index} href={item.urls} className='navigation_links' style={{ textDecoration: "none" }}>
                                    {item.title}
                                </NavLink>
                            </>
                        )
                    }
                    )
                    : navLinks.slice(0, sliceval).map((item, index) => {

                        if (item.urls === "https://www.rhvacations.ae ") {
                            return (
                                <>
                                    <NavLink key={index} href={item.urls} style={{ textDecoration: "none" }}>
                                        {item.title}
                                    </NavLink>
                                </>
                            )
                        } else {
                            return (
                                <>
                                    <NavLink key={index} href={item.urls} target={item.openin === "newwindow" ? "_blank" : "_self"} style={{ textDecoration: "none", padding:"0.5rem 0.6rem" }}>
                                        {item.title}
                                    </NavLink>
                                </>
                            )
                        }
                    })
                }

                {navLinks.length > 6 && (
                    <div className="dropdown mobno" >
                        <button onClick={toggleDropdown} style={{ color: "black" }}>Explore More <span class="dropdown-arrow">&#9660;</span></button>
                        {dropdownOpen && (
                            <div className="dropdown-content" >
                                {navLinks.slice(6).map((item, index) => (
                                    <NavLink key={index + 6} href={item.urls} target={item.openin === "newwindow" ? "_blank" : "_self"} style={{ textDecoration: "none" }}>
                                        {item.title}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
                )}

            </Nav>

            <div className="header-button mobno">
                <StyledButton
                    textColor={styleData?.buttonTextColor}
                    backgroundColor={styleData?.buttonBackgroundColor}
                    fontSize={styleData?.buttonFontSize}
                >
                    {styleData ? styleData.button_text : 'Click Me'}
                </StyledButton>
            </div>

        </HeaderContainer>
    );
};


export default Header;