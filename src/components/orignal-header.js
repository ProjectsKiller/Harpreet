import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import axios from 'axios';

import './mystyle.css';

const Header = ({ navigation }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const [styleData, setStyleData] = useState(null);



    useEffect(()=>{
        axios.get('/api/getnavstyles').then((res) => {
            setStyleData(res.data[0]); // Assuming you get an array, and you need the first item

            
        });
    },[]);
    
const HeaderContainer = styled.header`
background-color: ${styleData ? styleData.header_background_color : '#343a40'};
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
    color: ${styleData ? styleData.buttonTextColor : '#f8f9fa'};
    font-size: ${styleData ? styleData.buttonFontSize : '16px'};
    cursor: pointer;

    @media (min-width: 769px) {
        display: none;
    }
`;
return (
    <HeaderContainer>
        {styleData && styleData.logo && (
            <img src={`uploads/${styleData.logo}`} alt="Logo" width="250px" />
        )}
        <MenuButton onClick={toggleMobileMenu}>☰</MenuButton>
        <Nav open={mobileMenuOpen}>
             {mobileMenuOpen
                    ? navigation.map((item, index) => (
                          <NavLink key={index} href={item.urls}>
                              {item.title}
                          </NavLink>
                      ))
                    : navigation.slice(0, 6).map((item, index) => (
                          <NavLink key={index} href={item.urls}>
                              {item.title}
                          </NavLink>
                      ))
                }
            {navigation.length > 6 && (
                <div className="dropdown mobno">
                    <button onClick={toggleDropdown}>Explore More <span class="dropdown-arrow">&#9660;</span></button>
                    {dropdownOpen && (
                        <div className="dropdown-content">
                            {navigation.slice(6).map((item, index) => (
                                <NavLink key={index + 6} href={item.urls}>
                                    {item.title}
                                </NavLink>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </Nav>
        <div className="header-button mobno">
       

          
               
              <button style={{ color: styleData?.buttonTextColor, backgroundColor: styleData?.buttonBackgroundColor, fontSize: styleData?.buttonFontSize }}>
                {styleData ? styleData.button_text : 'Click Me'}
               
            </button>
          
        </div>
    </HeaderContainer>
);
};


export default Header;