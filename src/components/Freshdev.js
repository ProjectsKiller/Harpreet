import React, { useEffect, useState ,useContext} from 'react'
import '../styles/offplan/offplan.css'
import WhatsappChat from "./Notification/Whatapp";
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchContext from '../Context/Context1';
const GodsPlan = () => {
    const getContext = useContext(SearchContext);
    const [data,setData]=useState([]);
    const [propertyname,setPropertyname]=useState('');
    useEffect(()=>{
    axios.get("http://localhost:4000/getnewly").then((res)=>{
        
        setData(res.data);
    });
    },[])

    function handleNavigate(id,name){
        setPropertyname(name)
     localStorage.setItem("internalpageid",id)
     localStorage.setItem("pagename",name)

    // getContext.setPageid(id);
    getContext.setPagename(name);
    }

const name=localStorage.getItem('pagename');
    
  return (
    <div className='container'>
	  <div className="j5dj8e">New Development in Dubai</div>
    <div className='row mt-2 newdev-change-margin'>
        {data.map((item,index)=>{
         
	    const relativePath = item.bannerimage.substring(item.bannerimage.indexOf('/uploads/'));
	
            return(
                <div className='col-12 col-xl-4 col-lg-4  col-sm-12 my-2 pt-1 mymediaclass'>
      <Link to={`/${item.pagelink}`}>

            <div className="mar-sm-30" style={{boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} onClick={()=>handleNavigate(item.id, item.pagelink)}>
                <div><img src={relativePath} alt="New Image"  width="100%"/></div>
                <div className='m-2' style={{padding:"10px"}}>
                    <div className='dveti d-flex justify-content-between ' style={{color:"#4e5150" ,fontWeight:"bold"   }}><span>{ item.propertyname}</span><span style={{marginLeft:"20px",fontWeight:"bold"  }}>{item.developername}</span></div>
                    <p className="huye" style={{fontWeight:"500",color:"#212529"}}>{item.propertylocation}</p>
                    <p className="dwet" style={{color:"#4e5150",lineHeight: "22px",marginTop: "15px",fontWeight:"bold"  }}>Starting From AED {item.price}</p>
                    <p className="joy" style={{fontWeight:"500",color:"#212529"  }}>Project Completed in {item.complete}</p>
                    
                </div>
                <button className  ='p-1 hovon' style={{width:"100%",border:"none",color:"white", fontSize:"18px",fontWeight:"500", height:"40px"}}>Know More</button>
            </div>
                </Link>

            </div>
            );
        })}
</div>
<WhatsappChat/>
</div>
  )
}

export default GodsPlan;