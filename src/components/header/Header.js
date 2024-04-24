
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/main/main.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import '../../styles/header/header.css'
import axios from 'axios';
import styled from 'styled-components';

const Header = () => {
  const [navLinks, setNavLinks] = useState([]);
  const [styleData, setStyleData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/navigation');
        console.log(response.data);
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

  const [admin, setadmin] = useState(true)
  function VerifyPage() {
    const buy = "buy"
    localStorage.setItem("whichpage", buy)
  }

  function VerifyPag() {
    const rent = "rent"
    localStorage.setItem("whichpage", rent)
  }

  const navigate = useNavigate()
  function dropdwnvalue(e) {
    const value = e.target.value
    navigate(`/${value}`)
  }

  return (
    <>
      {/* <nav className="navbar mydesktop navbar-expand-md m-0 p-0 pt-2" style={{border : "2px solid red"}}>
          {styleData && styleData.logo && (
        <a href="/" className="navbar-brand ml-4" style={{ paddingLeft: '2px', height: '74px', padding: '0px', cursor : "pointer", border : "2px slid red" }}>
            <img src={`uploads/${styleData.logo}`} alt="Logo" width="250px" />
        </a>
          )}       
        <ul className="navbar-nav h-16 pt-2 -ml-1 pr-8" id='navbarnav' style={{ width: 'auto' }}>
          {navLinks.map((item) => {
         
            if ([1, 2, 3, 4, 5, 6].includes(item.position)) {
              console.log(item.urls);
              return (
                <li className="nav-item navbarlink" key={item.id}>
                  <Link onClick={VerifyPage} className="nav-link navbarlinks" to={`/${item.urls}`}>
                    {item.title}
                  </Link>
                </li>
              );
            } else {
              return null; 
            }
          })}

          <li className="nav-item navbarlink">
            <Dropdown style={{ backgroundColor: "transparent" }} id="react-drop">
              <Dropdown.Toggle variant="transparent" id="dropdown-basic" className="drop-heading">
                Explore More
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {navLinks.map((item) => {
                  if ([1, 2, 3, 4, 5, 6].includes(item.position)) {
                    return null;
                  } else {
                    return (
                      <Dropdown.Item key={item.id} href={item.urls}>
                        {item.title}
                      </Dropdown.Item>
                    );
                  }
                })}
              </Dropdown.Menu>

            </Dropdown>
          </li>

          <li className='filter'>
            <div className="button-container m-auto mt-12 w-44 h-12 text-white">
              <Button className="btn h-12 m-auto" href="/sale" type="submit" id="listbtn" style={{ color: '#4d4d4f', height: '30px', borderRadius: '5px', paddingTop: '3px' }}>List Your Property</Button>
            </div>
          </li>
        </ul>
      </nav > */}

      {/* <Navbar expand="md" collapseOnSelect class="mymobile" style={{ width: "100%", background: "#fff", color: "#212529" }}>
  <Navbar.Brand as={Link} to="/" className="-mt-2 d-flex align-items-center">
    <img src="/images/rh-logo.PNG" className="navbar-brand" id="logos" style={{ marginLeft: "20px" }} alt="R&H Logo" />
  </Navbar.Brand>

  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav" className="all-nav">
    <Nav className="ml-auto d-flex justify-content-between align-items-center w-100" id="navItems">
      {navLinks.map((item) => {
        return (
          <Nav.Link key={item.id} as={Link} to={item.urls} id={item.urls} onClick={VerifyPage} className="flex-fill chng">{item.title}</Nav.Link>
        );
      })}
    </Nav>
  </Navbar.Collapse>
</Navbar> */}
    </>
  )
}

export default Header