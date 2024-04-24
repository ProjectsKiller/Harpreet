import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router";
import axios from 'axios';

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
        if (admin === "%@#^#%&^*%^&$%@@^@%$%^,^$#@@#8757636345^$%^$%&32422" && loginpassed === "76342391251#@%#^%*(^%&^$$%#@$%448941/*-++y$#%$^^&^*$@") {
            setadmin(true)
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/navigation');
                setNavLinks(response.data);
            } catch (error) {
                console.error('Error fetching navigation:', error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        axios.get('/api/getnavstyles').then((res) => {
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
    @media (max-width: 768px) {
        display: ${props => props.open ? 'block' : 'none'};
        position: absolute;
        top: 82px; // Adjusted to align below the header
        left: 0;
        right: 0;
        background-color: #343a40;
        padding: 1rem; // Increased padding for better touch targets
        z-index: 100; // Ensure it's above other content
    
        a {
            display: block; // Stack links vertically
            margin: 0.5rem 0; // Add some space between items
            color: white;
        }
    }
    
    @media (min-width: 769px) {
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


    const MenuButton = styled.button`
        background: ${styleData ? styleData.buttonBackgroundColor : '#f8f9fa'};
        border: none;
        color: ${styleData ? styleData.buttonTextColor : '#000000'};
        font-size: ${styleData ? styleData.buttonFontSize : '16px'};
        cursor: pointer;
    
        @media (min-width: 769px) {
            display: none;
        }
    `;

    return (
        <HeaderContainer id='main-navbar-responsive-view'>
            {styleData && styleData.logo && (
                <a href="/" >
                    <img src={`uploads/${styleData.logo}`} alt="Logo" width="230px" />
                </a>
            )}

            {mobileMenuOpen && <>
                <img onClick={goadminPanel} src='/images/guesticon.png' style={{ height: "30px", position: "absolute", marginLeft: "80%", cursor: "pointer" }} />
            </>}

            <MenuButton onClick={toggleMobileMenu} style={{ height: "30px", width: "40px", marginLeft: "20%" }}>☰</MenuButton>

            <Nav open={mobileMenuOpen} >
                {mobileMenuOpen
                    ? navLinks.map((item, index) => {
                        return (
                            <>
                                <NavLink key={index} href={item.urls} style={{ textDecoration: "none" }}>
                                    {item.title}
                                </NavLink>
                            </>
                        )
                    }
                    )
                    : navLinks.slice(0, 6).map((item, index) => {
                        console.log(item.urls, "item.urls");
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
                                    <NavLink key={index} href={item.urls} target='_blank' style={{ textDecoration: "none" }}>
                                        {item.title}
                                    </NavLink>
                                </>
                            )
                        }
                    })
                }
            </Nav>

            <div className="header-button mobno">
                {admin && <>
                    <img onClick={goadminPanel} src='/images/guesticon.png' style={{ height: "30px", position: "absolute", marginLeft: "12%", cursor: "pointer" }} />
                </>}

                <button style={{ color: styleData?.buttonTextColor, backgroundColor: styleData?.buttonBackgroundColor, fontSize: styleData?.buttonFontSize }}>
                    {styleData ? styleData.button_text : 'Click Me'}
                </button>

            </div>
        </HeaderContainer>
    );
};


export default Header;