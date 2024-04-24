import React from "react";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../Context/UserContext";
import { Link } from "react-router-dom";
import axios from 'axios';
import "../../styles/admin/Style.css"
function Home() {
  const [chgwid, setChgwid] = useState()
  const userVal = useContext(UserContext);

  const [bg1, setbg1] = useState(null);
  const [bg2, setbg2] = useState(null);
  const [bg3, setbg3] = useState(null);
  const [bg4, setbg4] = useState(null);
  const [bg5, setbg5] = useState(null);

  const [icon1, setIcon1] = useState(null);
  const [icon2, setIcon2] = useState(null);
  const [icon3, setIcon3] = useState(null);
  const [file, setFile] = useState('');
  const [file1, setFile1] = useState('');
  const [file2, setFile2] = useState('')
  const [file3, setFile3] = useState('');
  const [file4, setFile4] = useState('');


  const [IconChange1, setIconChange1] = useState('');
  const [IconChange2, setIconChange2] = useState('');
  const [IconChange3, setIconChange3] = useState('');

  function handleChange(e) {
    const selectedFile = e.target.files[0];

    setFile(URL.createObjectURL(selectedFile));
    setbg1(selectedFile);
  }
  function handleChange1(e) {
    setbg2(e.target.files[0]);
    setFile1(URL.createObjectURL(e.target.files[0]));
  }
  function handleChange2(e) {
    setbg3(e.target.files[0]);
    setFile2(URL.createObjectURL(e.target.files[0]));
  }
  function handleChange3(e) {
    setbg4(e.target.files[0]);
    setFile3(URL.createObjectURL(e.target.files[0]));
  }
  function handleChange4(e) {
    setbg5(e.target.files[0]);
    setFile4(URL.createObjectURL(e.target.files[0]));
  }


  function handleIcon1(e) {
    if (e.target.files[0]) {
      setIcon1(e.target.files[0]);
      setIconChange1(URL.createObjectURL(e.target.files[0]));
    } else {
      setIcon1(null);
      setIconChange1('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXRvUBtumSw6XlzUX71fhs3hcSqe2Crm2bqQ&usqp=CAU');
    }
  }
  function handleIcon2(e) {
    if (e.target.files[0]) {
      setIcon2(e.target.files[0]);
      setIconChange2(URL.createObjectURL(e.target.files[0]));
    } else {
      setIcon2(null);
      setIconChange2('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXRvUBtumSw6XlzUX71fhs3hcSqe2Crm2bqQ&usqp=CAU');
    }
  }
  function handleIcon3(e) {
    if (e.target.files[0]) {
      setIcon3(e.target.files[0]);
      setIconChange3(URL.createObjectURL(e.target.files[0]));
    } else {
      setIcon3(null);
      setIconChange3('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXRvUBtumSw6XlzUX71fhs3hcSqe2Crm2bqQ&usqp=CAU');
    }
  }


  const [data, setData] = useState({
    sec1heading: '',
    sec2heading: '',
    sec3heading: '',
    sec3description: '',
    sec4heading: '',
    sec4subheading: '',
    sec4button: '',
    sec5number1: '',
    sec5numberdiscription1: '',
    sec5number2: '',
    sec5numberdiscription2: '',
    sec5number3: '',
    sec5numberdiscription3: '',
    sec5heading: '',
    sec5discription: '',
    sec6heading: '',
    sec6logo: '',
    sec6logoheading: '',


    sec6logodiscription: '',
    sec7heading: '',
    sec7button: '',

    sec8heading: '',
    sec9heading: '',
    sec9discription: '',
    sec9button: '',
    sec9chackboxtext: '',
    sec9bgimg: '',
    sec3image: '',
    sec4bgimage: '',

    sec5image: '',
    sec6logo2: '',
    sec6logoheading2: '',
    sec6logodiscription2: '',
    sec6logo3: '',
    sec6logoheading3: '',
    sec6logodiscription3: '',

    // ... other properties
  });

  useEffect(() => {
   const tablen = {"tablename" : "homepagedb"}
          axios.post(`http://localhost:4000/staticdata` , tablen).then((res) => {
      // setFile(res.data[0].sec1bg);
      setbg1(res.data[0].sec1bg)


      // setFile1(res.data[0].sec3image);
      setbg2(res.data[0].sec3image)

      // setFile2(res.data[0].sec4bgimage);
      setbg3(res.data[0].sec4bgimage)


      setbg4(res.data[0].sec5image)
      // setFile4(res.data[0].sec9bgimg);
      setbg5(res.data[0].sec9bgimg)

      setIcon1(res.data[0].sec6logo);
      // setIconChange1(res.data[0].sec6logo)

      setIcon2(res.data[0].sec6logo2);
      // setIconChange2(res.data[0].sec6logo2)

      setIcon3(res.data[0].sec6logo3);
      // setIconChange3(res.data[0].sec6logo3)
      setData({
        sec1bg: res.data[0].sec1bg,
        sec1heading: res.data[0].sec1heading,
        sec2heading: res.data[0].sec2heading,
        sec3heading: res.data[0].sec3heading,
        sec3description: res.data[0].sec3description,
        sec4heading: res.data[0].sec4heading,
        sec4subheading: res.data[0].sec4subheading,
        sec4button: res.data[0].sec4button,
        sec5number1: res.data[0].sec5number1,
        sec5numberdiscription1: res.data[0].sec5numberdiscription1,
        sec5number2: res.data[0].sec5number2,
        sec5numberdiscription2: res.data[0].sec5numberdiscription2,
        sec5number3: res.data[0].sec5number3,
        sec5numberdiscription3: res.data[0].sec5numberdiscription3,
        sec5heading: res.data[0].sec5heading,
        sec5discription: res.data[0].sec5discription,
        sec6heading: res.data[0].sec6heading,
        sec6logo: res.data[0].sec6logo,
        sec6logoheading: res.data[0].sec6logoheading,


        sec6logodiscription: res.data[0].sec6logodiscription,
        sec7heading: res.data[0].sec7heading,
        sec7button: res.data[0].sec7button,

        sec8heading: res.data[0].sec8heading,
        sec9heading: res.data[0].sec9heading,
        sec9discription: res.data[0].sec9discription,
        sec9button: res.data[0].sec9button,
        sec9chackboxtext: res.data[0].sec9chackboxtext,
        sec9bgimg: res.data[0].sec9bgimg,

        sec3image: res.data[0].sec3image,
        sec4bgimage: res.data[0].sec4bgimage,

        sec5image: res.data[0].sec5image,
        sec6logo2: res.data[0].sec6logo2,
        sec6logoheading2: res.data[0].sec6logoheading2,
        sec6logodiscription2: res.data[0].sec6logodiscription2,
        sec6logo3: res.data[0].sec6logo3,
        sec6logoheading3: res.data[0].sec6logoheading3,
        sec6logodiscription3: res.data[0].sec6logodiscription3,

      });
    })
  }, []);



  function UpdataData(e) {
    e.preventDefault();
    let mydata = { 'sec1bg': data.sec1bg, 'sec1heading': data.sec1heading, 'sec2heading': data.sec2heading, 'sec3heading': data.sec3heading, "sec3description": data.sec3description, "sec4heading": data.sec4heading, "sec4subheading": data.sec4subheading, "sec4button": data.sec4button, " sec5number1": data.sec5number1, "sec5numberdiscription1": data.sec5numberdiscription1, "sec5number2": data.sec5number2, "sec5numberdiscription2": data.sec5numberdiscription2, "sec5number3": data.sec5number3, "sec5numberdiscription3": data.sec5numberdiscription3, "sec5heading": data.sec5heading, "sec5discription": data.sec5discription, "sec6heading": data.sec6heading, "sec6logo": data.sec6logo, "sec6logoheading": data.sec6logoheading, "sec6logodiscription": data.sec6logodiscription, "sec7heading": data.sec7heading, "sec7button": data.sec7button, "sec8heading": data.sec8heading, "sec9heading": data.sec9heading, "sec9discription": data.sec9discription, "sec9button": data.sec9button, "sec9chackboxtext": data.sec9chackboxtext, "sec3image": data.sec3image, "sec4bgimage": data.sec4bgimage, "sec5image": data.sec5image, "sec6logo2": data.sec6logo2, "sec6logoheading2": data.sec6logoheading2, "sec6logodiscription2": data.sec6logodiscription2, "sec6logo3": data.sec6logo3, "sec6logoheading3": data.sec6logoheading3, "sec6logodiscription3": data.sec6logodiscription3, "bg1": bg1, "bg2": bg2, "bg3": bg3, "bg4": bg4, "bg5": bg5, "icon1": icon1, "icon2": icon2, "icon3": icon3 }
    console.log(mydata);
    const formData = new FormData();

    // Append text data
    formData.append('sec1bg', data.sec1bg);
    formData.append('sec1heading', data.sec1heading);
    formData.append('sec2heading', data.sec2heading);
    formData.append('sec3heading', data.sec3heading);
    formData.append('sec3description', data.sec3description);
    formData.append('sec4heading', data.sec4heading);
    formData.append('sec4subheading', data.sec4subheading);
    formData.append('sec4button', data.sec4button);
    formData.append('sec5number1', data.sec5number1);
    formData.append('sec5numberdiscription1', data.sec5numberdiscription1);
    formData.append('sec5number2', data.sec5number2);
    formData.append('sec5numberdiscription2', data.sec5numberdiscription2);
    formData.append('sec5number3', data.sec5number3);
    formData.append('sec5numberdiscription3', data.sec5numberdiscription3);
    formData.append('sec5heading', data.sec5heading);
    formData.append('sec5discription', data.sec5discription);
    formData.append('sec6heading', data.sec6heading);

    formData.append('sec6logo', data.sec6logo);
    formData.append('sec6logoheading', data.sec6logoheading);
    formData.append('sec6logodiscription', data.sec6logodiscription);
    formData.append('sec7heading', data.sec7heading);
    formData.append('sec7button', data.sec7button);
    formData.append('sec8heading', data.sec8heading);

    formData.append('sec9heading', data.sec9heading);
    formData.append('sec9discription', data.sec9discription);
    formData.append('sec9button', data.sec9button);
    formData.append('sec9chackboxtext', data.sec9chackboxtext);

    formData.append('sec3image', data.sec3image);
    formData.append('sec4bgimage', data.sec4bgimage);
    formData.append('sec5image', data.sec5image);
    formData.append('sec6logo2', data.sec6logo2);
    formData.append('sec6logoheading2', data.sec6logoheading2);

    formData.append('sec6logodiscription2', data.sec6logodiscription2);
    formData.append('sec6logo3', data.sec6logo3);
    formData.append('sec6logoheading3', data.sec6logoheading3);
    formData.append('sec6logodiscription3', data.sec6logodiscription3);


    // Handle images
    function appendImageIfDefined(fieldName, fileVariable) {
      if (fileVariable) {
        formData.append(fieldName, fileVariable);
      } else {
        formData.append(fieldName, data[fieldName]);
      }
    }    

    appendImageIfDefined('bg1', bg1);
    appendImageIfDefined('bg2', bg2);
    appendImageIfDefined('bg3', bg3);
    appendImageIfDefined('bg4', bg4);
    appendImageIfDefined('bg5', bg5);
    appendImageIfDefined('icon1', icon1);
    appendImageIfDefined('icon2', icon2);
    appendImageIfDefined('icon3', icon3);


    console.log(mydata, "data");
    axios.post(`http://localhost:4000/updatehome`, formData).then((res) => {
      if (res.data.msg === "200") {
        alert("Data is updated!")
      }

    })
  }
console.log("bg2",bg2)
  return (
    <>
      <main id="whole" className="p-0 m-auto" style={{width : "100%"}} >
      
        {/* <!-- box --> */}

        <div className="container-fluid">
          
          <div className="row clearfix space-cont box_my">
            <div className="col-lg-12">
       
           {/* *****************Header************** */}
              <div className="card p-4">
                 <h4>Header</h4>
              <hr />

              
                            
               <div className="row" style={{textAlign : "left"}}>  
                   <div className="col-6 my-2">               
                    <input className="mb-2" type="file" onChange={handleChange} style={{border : "1px solid #e2e2e2", width : "100%"}}/>
                    <h5>Drop files here or click to upload.</h5>
                    </div>
                    
                    <div className="col-5" id="frmFileUpload" style={{ backgroundImage: `url('${file ? `${file}` : `/uploads/${bg1}`}')` }}></div>
              </div>

               <div className="col-sm-12 ban-top">                    
                        <label for="title" className="form-label">Banner Heading</label>
                        <input type="text" className="form-control"
                        value={data.sec1heading} onChange={(e) => setData({ ...data, sec1heading: e.target.value })}/>
                </div>
              </div>

{/* *****************Buy Rent************** */}
              <div className="card p-4">
                  <h4>Buy/Rent</h4>
                  <hr />

                       <label for="title" className="form-label">Main Heading</label>
                      <input type="text" className="form-control" value={data.sec2heading}
                        onChange={(e) => setData({ ...data, sec2heading: e.target.value })} />
              </div>

{/* *****************Contact Form************** */}
              <div className="card p-4">
                  <h4><strong>Contact Form</strong></h4>
                 
                  <div className="row" style={{textAlign : "left"}}>  
                    <div className="col-6 my-2">               
                    <input className="mb-2" type="file" onChange={handleChange1} style={{border : "1px solid #e2e2e2", width : "100%"}}/>
                     <h5>Drop files here or click to upload.</h5>
                    </div>
                    
                    <div className="col-5" id="frmFileUpload" style={{ backgroundImage: `url('${file1 ? `${file1}` : `/uploads/${bg2}`}')` }}>
                    </div>
             
               <div className="col-12  ban-top">                    
                        <label for="title" className="form-label" >Main Heading</label>
                        <input type="text" className="form-control" value={data.sec3heading} onChange={(e) => setData({ ...data, sec3heading: e.target.value })}/>
              </div>
      
             <div className="col-12  ban-top" >
                      <p className="size-cnt" ><label for="w3review" className="form-label" >Banner Description</label></p>
                      <textarea className="p-2" name="w3review" rows="2" style={{border : "2px solid #e4e4e4", width : "100%"}} value={data.sec3description} onChange={(e) => setData({ ...data, sec3description: e.target.value })}></textarea>
                </div>

                </div>
              </div>

{/* *****************Holiday Homes************** */}
              <div className="card p-4">
              <h4><strong>Escape to Paradise</strong></h4>

              <div className="row" style={{textAlign : "left"}}>  
                
              <div className="col-6 my-2">               
                    <input className="mb-2" type="file" onChange={handleChange2} style={{border : "1px solid #e2e2e2", width : "100%"}}/>
                     <h5>Drop files here or click to upload.</h5>
                 </div>
               
              <div className="col-5" id="frmFileUpload" style={{ backgroundImage: `url('${file2 ? `${file2}` : `/uploads/${bg3}`}')` }}></div>
             
             <div className="col-12  ban-top">                    
                        <label for="title" className="form-label" >Main Heading</label>
                        <input type="text" className="form-control" value={data.sec4heading} onChange={(e) => setData({ ...data, sec4heading: e.target.value })}/>
                 </div>
      
             <div className="col-12  ban-top" >
                      <p className="size-cnt" ><label for="w3review" className="form-label" >Banner Description</label></p>
                      <textarea className="p-2" name="w3review" rows="2" style={{border : "2px solid #e4e4e4", width : "100%"}} 
                      value={data.sec4subheading} onChange={(e) => setData({ ...data, sec4subheading: e.target.value })}></textarea>
                 </div>

            <div className="col-12  ban-top">                    
                        <label for="title" className="form-label" >Button Text</label>
                        <input type="text" className="form-control"  value={data.sec4button} onChange={(e) => setData({ ...data, sec4button: e.target.value })}/>
                 </div>
            </div>

              </div>

       {/* *****************Offices************* */}
             <div className="card p-4">
              <h4><strong>Offices Section</strong></h4>

              <div className="row" style={{textAlign : "left"}}>  
                
              <div className="col-6 my-2">               
                    <input className="mb-2" type="file" onChange={handleChange3} style={{border : "1px solid #e2e2e2", width : "100%"}}/>
                     <h5>Drop files here or click to upload.</h5>
                 </div>
            
              <div className="col-5" id="frmFileUpload" style={{ backgroundImage: `url('${file3 ? `${file3}` : `/uploads/${bg4}`}')` }}></div>
             
              <div className="col-12 col-sm-12 col-md-12	col-lg-6 col-xl-6  ban-top">                    
                        <label for="title" className="form-label" >Office Text</label>
                        <input type="text" className="form-control"  value={data.sec5numberdiscription1} onChange={(e) => setData({ ...data, sec5numberdiscription1: e.target.value })}/>
                 </div>

             <div className="col-12 col-sm-12 col-md-12	col-lg-6 col-xl-6  ban-top">                    
                        <label for="title" className="form-label" >Number of Offices</label>
                        <input type="text" className="form-control"  value={data.sec5number1} onChange={(e) => setData({ ...data, sec5number1: e.target.value })}/>
                 </div>

                 <div className="col-12 col-sm-12 col-md-12	col-lg-6 col-xl-6  ban-top">                    
                        <label for="title" className="form-label" >Age Text</label>
                        <input type="text" className="form-control"   value={data.sec5numberdiscription2} onChange={(e) => setData({ ...data, sec5numberdiscription2: e.target.value })}/>
                 </div>

             <div className="col-12 col-sm-12 col-md-12	col-lg-6 col-xl-6  ban-top">                    
                        <label for="title" className="form-label" >Age Number</label>
                        <input type="text" className="form-control"  value={data.sec5number2} onChange={(e) => setData({ ...data, sec5number2: e.target.value })}/>
                 </div>

                 <div className="col-12 col-sm-12 col-md-12	col-lg-6 col-xl-6  ban-top">                    
                        <label for="title" className="form-label" >Countries Text</label>
                        <input type="text" className="form-control"   value={data.sec5numberdiscription3} onChange={(e) => setData({ ...data, sec5numberdiscription3: e.target.value })}/>
                 </div>
                 
             <div className="col-12 col-sm-12 col-md-12	col-lg-6 col-xl-6  ban-top">                    
                        <label for="title" className="form-label" >Countries Number</label>
                        <input type="text" className="form-control"  value={data.sec5number3} onChange={(e) => setData({ ...data, sec5number3: e.target.value })}/>
                 </div>

            
      
            </div>
        </div>

         
{/* *****************Our Story************* */}

     <div className="card p-4">
              <h4><strong>Our Story</strong></h4>

              <div className="row" style={{textAlign : "left"}}>  
        
             <div className="col-12  ban-top">                    
                        <label for="title" className="form-label" >Main Heading</label>
                        <input type="text" className="form-control"   value={data.sec5heading}
                          onChange={(e) => setData({ ...data, sec5heading: e.target.value })}/>
                 </div>
      
              <div className="col-12  ban-top" >
                      <p className="size-cnt" ><label for="w3review" className="form-label" >Banner Description</label></p>
                      <textarea className="p-2" name="w3review" rows="2" style={{border : "2px solid #e4e4e4", width : "100%"}} 
                        value={data.sec5discription}
                        onChange={(e) => setData({ ...data, sec5discription: e.target.value })}>   
                      </textarea>
                 </div>

          
            </div>

              </div>


   
            

         {/* ******************Testimonials*************** */}
              <div className="card p-4">
                 <h4><strong>Testimonials</strong></h4>
                 
                 <div className="row">
                 <div className="col-12 col-sm-12 col-md-12	col-lg-6 col-xl-6  ban-top">                    
                        <label for="title" className="form-label" >Main Heading</label>
                        <input type="text" className="form-control"   value={data.sec7heading}
                          onChange={(e) => setData({ ...data, sec7heading: e.target.value })}/>
                 </div>
                 
                <div className="col-12 col-sm-12 col-md-12	col-lg-6 col-xl-6  ban-top">                    
                        <label for="title" className="form-label" >Button Text</label>
                        <input type="text" className="form-control"  value={data.sec7button}
                          onChange={(e) => setData({ ...data, sec7button: e.target.value })}/>
                 </div>
                 </div>
              </div>

         {/* ******************News and Blogs*************** */}
              <div className="card p-4">
                <h4><strong>News and Blogs</strong></h4>
                 <div className="row">
                 <div className="col-12 col-sm-12 col-md-12	col-lg-6 col-xl-6  ban-top">                    
                        <label for="title" className="form-label" >Main Heading</label>
                        <input type="text" className="form-control"   value={data.sec8heading}
                          onChange={(e) => setData({ ...data, sec8heading: e.target.value })}/>
                </div>
                 
                <div className="col-12 col-sm-12 col-md-12	col-lg-6 col-xl-6  ban-top">                    
                        <label for="title" className="form-label" >Button Text</label>
                        <input type="text" className="form-control"  value={data.sec7button}
                          onChange={(e) => setData({ ...data, sec7button: e.target.value })}/>
                 </div>
                </div>
              </div>

              
          {/* ******************Why Us ************** */}
          <div className="card p-4">
              <h4><strong>Why Us</strong></h4>
            
                <div className="body">
                  <div className="row clearfix">

                  <div className="col-12  ban-top">                    
                        <label for="title" className="form-label" >Main Heading</label>
                        <input type="text" className="form-control" value={data.sec6heading}
                          onChange={(e) => setData({ ...data, sec6heading: e.target.value })}/>
                 </div>

                <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                      
                       {IconChange1 ? (
                              <img src={IconChange1} alt="Updated Icon" />
                            ) : (
                              <img src={`/uploads/${icon1}`} alt="Default Icon" style={{height : "150px" , width : "150px"}}/>
                            )}

                        <input type="file" onChange={handleIcon1} />
                      
                </div>

                <div className="col-12 col-sm-12 col-md-12	col-lg-6 col-xl-6  ban-top">                    
                        <label for="title" className="form-label" >Heading 1</label>
                        <input type="text" className="form-control"    value={data.sec6logoheading}
                          onChange={(e) => setData({ ...data, sec6logoheading: e.target.value })}/>

                             <label for="title" className="form-label" >Main Description</label>
                        <div className="col-12  ban-top" >
                      <textarea className="p-2" name="w3review" rows="3" style={{border : "2px solid #e4e4e4", width : "100%"}} 
                     value={data.sec6logodiscription} 
                     onChange={(e) => setData({ ...data, sec6logodiscription: e.target.value })}></textarea>
                 </div>

                       
                </div>

                  <hr className="mt-5"/>
                <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    
                        {IconChange2 ? (
                              <img src={IconChange2} alt="Updated Icon" />
                            ) : (
                              <img src={`/uploads/${icon2}`} alt="Default Icon" style={{height : "150px" , width : "150px"}}/>
                            )}

                        <input type="file" onChange={handleIcon2} />
                      
                </div>

                 <div className="col-12 col-sm-12 col-md-8	col-lg-8 col-xl-8  ban-top">  

                 <label for="title" className="form-label" >Heading 2</label>
                        <input type="text" className="form-control"  value={data.sec6logoheading2}
                          onChange={(e) => setData({ ...data, sec6logoheading2: e.target.value })}/>

                       <label for="title" className="form-label" >Main Description</label>
                        <textarea className="p-2" name="w3review" rows="3" style={{border : "2px solid #e4e4e4", width : "100%"}} 
                        value={data.sec6logodiscription2}
                       onChange={(e) => setData({ ...data, sec6logodiscription2: e.target.value })}></textarea>
                     
                 </div>

                 <hr className="mt-5"/>
                <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                   
                      {IconChange3 ? (
                              <img src={IconChange3} alt="Updated Icon" />
                            ) : (
                               <img src={`/uploads/${icon3}`} alt="Default Icon" style={{height : "150px" , width : "150px"}}/>
                            )}

                        <input type="file" onChange={handleIcon3} />
                         
                </div>

                <div className="col-12 col-sm-12 col-md-12	col-lg-6 col-xl-8  ban-top">                    
                        <label for="title" className="form-label" >Heading 3</label>
                        <input type="text" className="form-control"   value={data.sec6logoheading3}
                          onChange={(e) => setData({ ...data, sec6logoheading3: e.target.value })}/>

                    <label for="title" className="form-label" >Main Description</label>
                     
                     <textarea className="p-2" name="w3review" rows="3" style={{border : "2px solid #e4e4e4", width : "100%"}} 
                   value={data.sec6logodiscription3}
                   onChange={(e) => setData({ ...data, sec6logodiscription3: e.target.value })}></textarea>
                </div>

             </div>
                </div>
              </div>

 {/* ******************Stay Informed*************** */}
              <div className="card p-4">                
                  <h4><strong>Stay Informed</strong></h4>                 
            
                 <div className="row">
              
                 <div className="col-12 col-sm-12 col-md-12	col-lg-6 col-xl-6  ban-top">                    
                 <input className="mb-2" type="file" onChange={handleChange4} style={{border : "1px solid #e2e2e2", width : "100%"}}/>
                     <h5>Drop files here or click to upload.</h5>
                </div>

                <div className="col-5" id="frmFileUpload" style={{ backgroundImage: `url('${file4 ? `${file4}` : `/uploads/${bg5}`}')` }}></div>

                 <div className="col-12  ban-top">                    
                        <label for="title" className="form-label" >Main Heading</label>
                        <input type="text" className="form-control" value={data.sec9heading}
                        onChange={(e) => setData({ ...data, sec9heading: e.target.value })}/>
                </div>
        
                <div className="col-12 ban-top">                    
                        <label for="title" className="form-label" >Main Description</label>

                    <textarea className="p-2" name="w3review" rows="2" style={{border : "2px solid #e4e4e4", width : "100%"}} 
                    value={data.sec9discription} onChange={(e) => setData({ ...data, sec9discription: e.target.value })}></textarea>

                </div>

                <div className="col-6 ban-top">                    
                        <label for="title" className="form-label" >Button Text</label>
                        <input type="text" className="form-control"  value={data.sec7button}
                          onChange={(e) => setData({ ...data, sec7button: e.target.value })}/>
                </div>

                <div className="col-6 ban-top">                    
                        <label for="title" className="form-label" >Terms & Condition Text</label>
                        <input type="text" className="form-control"  value={data.sec9chackboxtext}
                          onChange={(e) => setData({ ...data, sec9chackboxtext: e.target.value })}/>
                </div>

                </div>
              </div>



            </div>
          </div>
        </div>
        <div className="col-sm-12 submit-opt">
          <button type="submit" className="btn col-sub btn-round" onClick={UpdataData}>Update</button>
        </div>

      </main>
      {/* <!-- End #main --> */}
    </>
  );
}

export default Home;