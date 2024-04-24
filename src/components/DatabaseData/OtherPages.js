import React, { useEffect, useState } from 'react'
import axios from 'axios';


const OtherPages = () => {
    const [data,setData]=useState([])
    function HomeData(e) {
          axios.get(`/otherformdata`, data).then((res) => {
            setData(res.data)
          });
      }
      useEffect(()=>{
        HomeData();
      },[]);
  return (
    <div>
        <h1 className='text-center mb-10'>Query Pages</h1>

      <table class="table" style={{width:"87%", margin:'auto', marginBottom:"60px"}}>
  <thead>
    <tr>
      <th scope="col">Sr. No</th>
      <th scope="col">Full Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone No</th>
      <th scope="col">Page Name</th>
     
    </tr>
  </thead>
  <tbody>
    

    {data.map((item,index)=>{
        return(
<tr>
      <th scope="row">{index+1}</th>
      <td>{item.Name}</td>
      <td>{item.email}</td>
      <td>{item.Phone}</td>
      <td>{item.FromPage}</td>

    </tr>
        );
    })}
  
    
   
  </tbody>
</table>
    </div>
  )
}

export default OtherPages
