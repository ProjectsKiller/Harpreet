import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [navLinks, setNavLinks] = useState([]);

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
  }, [])

  const testingFun = (clickedLink) => {
    alert("Link clicked:", clickedLink);
  };

  return (
    <nav>
      {navLinks.map((link)=>{
        console.log(link.urls);
        return(
          <>
          <Link key={link.id} to={link.urls} onChange={testingFun}>{link.title}</Link>
          
          </>
        )
      })}
    </nav>

  );
};

export default Navigation;
