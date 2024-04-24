import React from 'react'

const Logout = () => {
  
  function Logoutadmin() {
    localStorage.removeItem("admin");
    localStorage.removeItem("user");
    window.location.href = "/";
  }
  return (
   <>
   <button style={{border : "2px solid red"}} onClick={Logoutadmin} className='btn btn-danger'>Logout</button>
   </>
  )
}

export default Logout
