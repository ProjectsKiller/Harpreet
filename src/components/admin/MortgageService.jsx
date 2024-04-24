import React from "react";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../Context/UserContext";
import axios from 'axios'
import "../../styles/admin/Style.css"
export default function MortagageService() {
  const [chgwid, setChgwid] = useState({ "margin": "66px 0px 15px 250px" })
  const userVal = useContext(UserContext)
  useEffect(() => {
    if (userVal.user === "Close") {
      setChgwid({
        "transitionDuration": "300ms",
        "transitionProperty": "margin",
        "margin": "66px 0px 15px 0px"
      });

    } else if (userVal.user === "Open") {
      setChgwid({
        "transitionDuration": "500ms",
        "transitionProperty": "margin",
        "margin": "66px 0px 15px 250px"
      });
    }
  }, [userVal.user]);




  const [bg1, setbg1] = useState(null);
  const [bg2, setbg2] = useState(null);
  const [bg3, setbg3] = useState(null);


  const [file, setFile] = useState('');
  const [file1, setFile1] = useState('');
  const [file2, setFile2] = useState('');



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


  const [data, setData] = useState({
    sec1bgimage: '',
    sec1heading: '',
    sec1discription: '',
    sec2heading: '',
    sec2discription: '',
    sec3heading: '',
    sec3subhead1: '',

    sec3subdesc1: '',

    sec3subhead2: '',
    sec3subdesc2: '',
    sec3subhead3: '',
    sec3subdesc3: '',
    sec3subhead4: '',
    sec3subdesc4: '',
    sec3subhead5: '',
    sec3subdesc5: '',

    sec3image: '',
    sec4image: '',

    sec4heading: '',
    sec4subhead1: '',
    sec4subheaddesc1: '',

    sec4subhead2: '',
    sec4subheaddesc2: '',

    sec4subhead3: '',
    sec4subheaddesc3: '',

    sec4subhead4: '',
    sec4subheaddesc4: '',

    sec4subhead5: '',
    sec4subheaddesc5: '',
    sec5heading: '',
    sec5button: '',
    sec6heading: '',
  });

  useEffect(() => {
    const tablename = "mortgageservicespagedb"
      const tablen = {"tablename" : "mortgageservicespagedb"}
          axios.post(`http://localhost:4000/staticdata` , tablen).then((res) => {
      setbg1(res.data[0].sec1bgimage)
      setbg2(res.data[0].sec3image)
      setbg3(res.data[0].sec4image)

      setData({
        sec1bgimage: res.data[0].sec1bgimage,
        sec1heading: res.data[0].sec1heading,
        sec1discription: res.data[0].sec1discription,
        sec2heading: res.data[0].sec2heading,
        sec2discription: res.data[0].sec2discription,


        sec3heading: res.data[0].sec3heading,
        sec3subhead1: res.data[0].sec3subhead1,
        sec3subdesc1: res.data[0].sec3subdesc1,

        sec3subhead2: res.data[0].sec3subhead2,
        sec3subdesc2: res.data[0].sec3subdesc2,

        sec3subhead3: res.data[0].sec3subhead3,
        sec3subdesc3: res.data[0].sec3subdesc3,

        sec3subhead4: res.data[0].sec3subhead4,
        sec3subdesc4: res.data[0].sec3subdesc4,

        sec3subhead5: res.data[0].sec3subhead5,
        sec3subdesc5: res.data[0].sec3subdesc5,


        sec3image: res.data[0].sec3image,
        sec4image: res.data[0].sec4image,

        sec4heading: res.data[0].sec4heading,
        sec4subhead1: res.data[0].sec4subhead1,
        sec4subheaddesc1: res.data[0].sec4subheaddesc1,

        sec4subhead2: res.data[0].sec4subhead2,
        sec4subheaddesc2: res.data[0].sec4subheaddesc2,

        sec4subhead3: res.data[0].sec4subhead3,
        sec4subheaddesc3: res.data[0].sec4subheaddesc3,
        sec4subhead4: res.data[0].sec4subhead4,
        sec4subheaddesc4: res.data[0].sec4subheaddesc4,

        sec4subhead5: res.data[0].sec4subhead5,
        sec4subheaddesc5: res.data[0].sec4subheaddesc5,
        sec5heading: res.data[0].sec5heading,
        sec5button: res.data[0].sec5button,
        sec6heading: res.data[0].sec6heading,

      });
    })
  }, []);



  function UpdataData(e) {
    e.preventDefault();
    let mydata = {
      'sec1heading': data.sec1heading, 'sec1discription': data.sec1discription,
      "sec2heading": data.sec2heading, "sec2discription": data.sec2discription,
      "sec3heading": data.sec3heading, "sec3subhead1": data.sec3subhead1, "sec3subdesc1": data.sec3subdesc1, "sec3subhead2": data.sec3subhead2, "sec3subdesc2": data.sec3subdesc2,

      "sec3subhead3": data.sec3subhead3,
      "sec3subdesc3": data.sec3subdesc3,


      "sec3subhead4": data.sec3subhead4,
      "sec3subdesc4": data.sec3subdesc4,

      "sec3subhead5": data.sec3subhead5,
      "sec3subdesc5": data.sec3subdesc5,

      "sec4heading": data.sec4heading,
      "sec4subhead1": data.sec4subhead1,
      "sec4subheaddesc1": data.sec4subheaddesc1,

      "sec4subhead2": data.sec4subhead2,
      "sec4subheaddesc2": data.sec4subheaddesc2,
      "sec4subhead3": data.sec4subhead3,
      "sec4subheaddesc3": data.sec4subheaddesc3,
      "sec4subhead4": data.sec4subhead4,
      "sec4subheaddesc4": data.sec4subheaddesc4,

      "sec4subhead5": data.sec4subhead5,
      "sec4subheaddesc5": data.sec4subheaddesc5,
      "sec5heading": data.sec5heading,
      "sec5button": data.sec5button,
      "sec6heading": data.sec6heading,
      "bg1": bg1, "bg2": bg2, "bg3": bg3
    }


    const formData = new FormData();
    // Append text data

    formData.append('sec1heading', data.sec1heading);
    formData.append('sec1discription', data.sec1discription);
    formData.append('sec2heading', data.sec2heading);


    formData.append('sec2discription', data.sec2discription);
    formData.append('sec3heading', data.sec3heading);
    formData.append('sec3subhead1', data.sec3subhead1);
    formData.append('sec3subdesc1', data.sec3subdesc1);

    formData.append('sec3subhead2', data.sec3subhead2);
    formData.append('sec3subdesc2', data.sec3subdesc2);

    formData.append('sec3subhead3', data.sec3subhead3);
    formData.append('sec3subdesc3', data.sec3subdesc3);

    formData.append('sec3subhead4', data.sec3subhead4);
    formData.append('sec3subdesc4', data.sec3subdesc4);

    formData.append('sec3subhead5', data.sec3subhead5);
    formData.append('sec3subdesc5', data.sec3subdesc5);

    formData.append('sec4heading', data.sec4heading);
    formData.append('sec4subhead1', data.sec4subhead1);
    formData.append('sec4subheaddesc1', data.sec4subheaddesc1);
    formData.append('sec4subhead2', data.sec4subhead2);
    formData.append('sec4subheaddesc2', data.sec4subheaddesc2);

    formData.append('sec4subhead3', data.sec4subhead3);
    formData.append('sec4subheaddesc3', data.sec4subheaddesc3);
    formData.append('sec4subhead4', data.sec4subhead4);
    formData.append('sec4subheaddesc4', data.sec4subheaddesc4);

    formData.append('sec4subhead5', data.sec4subhead5);
    formData.append('sec4subheaddesc5', data.sec4subheaddesc5);
    formData.append('sec5heading', data.sec5heading);
    formData.append('sec5button', data.sec5button);
    formData.append('sec6heading', data.sec6heading);





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




    console.log(mydata, "data");
    axios.post(`http://localhost:4000/updatemort`, formData).then((res) => {
      if (res.data.msg === "200") {
        alert("Data is updated!")
      }

    })
  }



  return (
    <>
      <main id="whole" className="p-0 m-auto" style={{width : "100%"}} >


        {/* <!-- box --> */}

        <div className="container-fluid">
         
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2 className="">Mortgage services
                  <small className="text-muted">Welcome to Page</small>
                </h2>
              </div>
            
            </div>
          </div>

          <div className="row clearfix space-cont box_my">
            <div className="col-lg-12">

            {/* ******************Header*************** */}  
        
              <div className="card p-4">
                <h4><strong>Header</strong></h4>
           
             <div className="row">
                <div className="col-12">

                   <div className="row" style={{textAlign : "left"}}>  

                   <div className="col-6 my-2" >               
                    <input className="mb-2" type="file" onChange={handleChange} style={{border : "1px solid #e2e2e2" , width : "100%"}}/>
                    <h5 className="all-para">Drop files here or click to upload.</h5>
                    </div>

                    <div className="col-6 " id="frmFileUpload" style={{ backgroundImage: `url('${file ? `${file}` : `/uploads/${bg1}`}')` }}></div>
                     </div>
                </div>

                <div className="col-sm-12 ban-top">                    
                        <label for="title" className="form-label">Banner Heading</label>
                        <input type="text" className="form-control"
                        value={data.sec1heading} onChange={(e) => setData({ ...data, sec1heading: e.target.value })}/>
                </div>

                <div className="col-sm-12 ban-top">                    
                        <p className="size-cnt"><label for="w3review" className="form-label">Banner Description</label></p>
                          <textarea className="p-2" name="w3review" rows="3" style={{border : "2px solid #e4e4e4" , width : "100%"}}  value={data.sec1discription} onChange={(e) => setData({ ...data, sec1discription: e.target.value })}></textarea>
                       
                </div>
           </div>

              </div>

{/* ******************Mortgage Calculator*************** */}
              <div className="card p-4">
                      <h4><strong>Mortgage Calculator</strong></h4>
               
                    <div className="row">

                      <div className="col-sm-12">                     
                          <label for="title" className="form-label">Main Heading</label>
                          <input type="text" className="form-control" value={data.sec2heading} onChange={(e) => setData({ ...data, sec2heading: e.target.value })} />
                     </div>

                      <div className="col-sm-12">                    
                          <p className="size-cnt"><label for="w3review" className="form-label">Sub Description</label></p>
                          <textarea className="p-2" name="w3review" rows="3" style={{border : "2px solid #e4e4e4" , width : "100%"}}  value={data.sec2discription} onChange={(e) => setData({ ...data, sec2discription: e.target.value })}></textarea>
                     </div>
               
                 </div>
              </div>
          

{/* ******************Our Mortgage Services*************** */}

            <div className="card p-4">
                   <h4><strong>Our Mortgage Services</strong></h4>

                    <div className="row">
                      <div className="col-sm-6">
                          <label for="title" className="form-label">Side Image</label>
                          <input type="file" className="form-control" onChange={handleChange1} />
                      </div>

                      <div className="form_my logo-group col-sm-2">
                        <div className="logo-img"   >
                          {file1 ? (
                            <img src={file1} alt="Updated Icon" />
                          ) : (
                            <img src={`/uploads/${bg2}`} alt="Default Icon" />
                          )}

                        </div>
                      </div>

                      <div className="col-sm-12">                        
                          <label for="title" className="form-label">Main Heading</label>
                          <input type="text" className="form-control" value={data.sec3heading} onChange={(e) => setData({ ...data, sec3heading: e.target.value })} />
                      </div>

                      <div className="col-sm-6">                       
                          <p className="size-cnt"><label for="w3review" className="form-label">Sub Heading1</label></p>
                          <textarea className="p-2" name="w3review" rows="3" style={{border : "2px solid #e4e4e4" , width : "100%"}}  value={data.sec3subhead1} onChange={(e) => setData({ ...data, sec3subhead1: e.target.value })}></textarea>
                      </div>
                     
                      <div className="col-sm-6">                      
                          <p className="size-cnt"><label for="w3review" className="form-label">Sub Description`</label></p>
                          <textarea className="p-2" name="w3review" rows="3" style={{border : "2px solid #e4e4e4" , width : "100%"}}  value={data.sec3subdesc1} onChange={(e) => setData({ ...data, sec3subdesc1: e.target.value })}></textarea>
                     </div>
                     
                      <div className="col-sm-6">                        
                          <p className="size-cnt"><label for="w3review" className="form-label">Sub Heading2</label></p>
                          <textarea className="p-2" name="w3review" rows="3" style={{border : "2px solid #e4e4e4" , width : "100%"}}  value={data.sec3subhead2} onChange={(e) => setData({ ...data, sec3subhead2: e.target.value })}></textarea>
                        
                      </div>
                      <div className="col-sm-6">                       
                          <p className="size-cnt"><label for="w3review" className="form-label">Sub Description2</label></p>
                          <textarea className="p-2" name="w3review" rows="3" style={{border : "2px solid #e4e4e4" , width : "100%"}}  value={data.sec3subdesc2} onChange={(e) => setData({ ...data, sec3subdesc2: e.target.value })}></textarea>
                      </div>

                      <div className="col-sm-6">                       
                          <p className="size-cnt"><label for="w3review" className="form-label">Sub Heading3</label></p>
                          <textarea className="p-2" name="w3review" rows="3" style={{border : "2px solid #e4e4e4" , width : "100%"}}  value={data.sec3subhead3} onChange={(e) => setData({ ...data, sec3subhead3: e.target.value })}></textarea>
                       </div>

                      <div className="col-sm-6">                      
                          <p className="size-cnt"><label for="w3review" className="form-label">Sub Description3</label></p>
                          <textarea className="p-2" name="w3review" rows="3" style={{border : "2px solid #e4e4e4" , width : "100%"}}  value={data.sec3subdesc3} onChange={(e) => setData({ ...data, sec3subdesc3: e.target.value })}></textarea>
                      </div>
                      
                      <div className="col-sm-6">                    
                          <p className="size-cnt"><label for="w3review" className="form-label">Sub Heading4</label></p>
                          <textarea className="p-2" name="w3review" rows="3" style={{border : "2px solid #e4e4e4" , width : "100%"}}  value={data.sec3subhead4} onChange={(e) => setData({ ...data, sec3subhead4: e.target.value })}></textarea>
                      
                      </div>
                   
                      <div className="col-sm-6">                      
                          <p className="size-cnt"><label for="w3review" className="form-label">Sub Description4</label></p>
                          <textarea className="p-2" name="w3review" rows="3" style={{border : "2px solid #e4e4e4" , width : "100%"}}  value={data.sec3subdesc4} onChange={(e) => setData({ ...data, sec3subdesc4: e.target.value })}></textarea>
                       </div>
                      <div className="col-sm-6">                       
                          <p className="size-cnt"><label for="w3review" className="form-label">Sub Heading5</label></p>
                          <textarea className="p-2" name="w3review" rows="3" style={{border : "2px solid #e4e4e4" , width : "100%"}}  value={data.sec3subhead5} onChange={(e) => setData({ ...data, sec3subhead5: e.target.value })}></textarea>
                    
                      </div>
                     
                      <div className="col-sm-6">                       
                          <p className="size-cnt"><label for="w3review" className="form-label">Sub Description5</label></p>
                          <textarea className="p-2" name="w3review" rows="3" style={{border : "2px solid #e4e4e4" , width : "100%"}}  value={data.sec3subdesc5} onChange={(e) => setData({ ...data, sec3subdesc5: e.target.value })}></textarea>
                      </div>
                    </div>

              </div>


{/* ******************The Mortgage Process*************** */}
              <div className="card p-4">
                   <h4><strong>The Mortgage Process</strong></h4>
               

            
                  <div className="row">
                    <div className="col-sm-6">
                  
                        <label for="title" className="form-label">Side Image</label>
                        <input type="file" className="form-control" onChange={handleChange2} />
                      </div>
                
                    <div className="form_my logo-group col-sm-2">
                      <div className="logo-img"   >


                        {file2 ? (
                          <img src={file2} alt="Updated Icon" />
                        ) : (
                          <img src={`/uploads/${bg3}`} alt="Default Icon" />
                        )}

                      </div>
                    </div>

                    <div className="col-sm-12">
                      
                        <label for="title" className="form-label">Main Heading</label>
                        <input type="text" className="form-control" value={data.sec4heading} onChange={(e) => setData({ ...data, sec4heading: e.target.value })} />
                     
                    </div>

                    <div className="col-sm-6">
                      
                        <p className="size-cnt"><label for="w3review" className="form-label">Sub Heading1</label></p>
                        <input type="text" className="form-control" value={data.sec4subhead1} onChange={(e) => setData({ ...data, sec4subhead1: e.target.value })} />
                   
                    </div>
                    <div className="col-sm-6">
                    
                        <p className="size-cnt"><label for="w3review" className="form-label">Sub Description1</label></p>
                        <textarea className="p-2" name="w3review" rows="3" style={{border : "2px solid #e4e4e4" , width : "100%"}}  value={data.sec4subheaddesc1} onChange={(e) => setData({ ...data, sec4subheaddesc1: e.target.value })}></textarea>
                      
                    </div>
                    <div className="col-sm-6">
                     
                        <p className="size-cnt"><label for="w3review" className="form-label">Sub Heading2</label></p>
                        <input type="text" className="form-control" value={data.sec4subhead2} onChange={(e) => setData({ ...data, sec4subhead2: e.target.value })} />
                 
                    </div>
                    <div className="col-sm-6">
                     
                        <p className="size-cnt"><label for="w3review" className="form-label">Sub Description2</label></p>
                        <textarea className="p-2" name="w3review" rows="3" style={{border : "2px solid #e4e4e4" , width : "100%"}}  value={data.sec4subheaddesc2} onChange={(e) => setData({ ...data, sec4subheaddesc2: e.target.value })}></textarea>
                     
                    </div>
                    <div className="col-sm-6">
                     
                        <p className="size-cnt"><label for="w3review" className="form-label">Sub Heading3</label></p>
                        <input type="text" className="form-control" value={data.sec4subhead3} onChange={(e) => setData({ ...data, sec4subhead3: e.target.value })} />
                    
                    </div>
                    <div className="col-sm-6">
                
                        <p className="size-cnt"><label for="w3review" className="form-label">Sub Description3</label></p>
                        <textarea className="p-2" name="w3review" rows="3" style={{border : "2px solid #e4e4e4" , width : "100%"}}  value={data.sec4subheaddesc3} onChange={(e) => setData({ ...data, sec4subheaddesc3: e.target.value })}></textarea>
             
                    </div>
                    <div className="col-sm-6">
                  
                        <p className="size-cnt"><label for="w3review" className="form-label">Sub Heading4</label></p>
                        <input type="text" className="form-control" value={data.sec4subhead4} onChange={(e) => setData({ ...data, sec4subhead4: e.target.value })} />
                  
                    </div>
                    <div className="col-sm-6">
                   
                        <p className="size-cnt"><label for="w3review" className="form-label">Sub Description4</label></p>
                        <textarea className="p-2" name="w3review" rows="3" style={{border : "2px solid #e4e4e4" , width : "100%"}}  value={data.sec4subheaddesc4} onChange={(e) => setData({ ...data, sec4subheaddesc4: e.target.value })}></textarea>
              
                    </div>
                    <div className="col-sm-6">
                   
                        <p className="size-cnt"><label for="w3review" className="form-label">Sub Heading5</label></p>
                        <input type="text" className="form-control" value={data.sec4subhead5} onChange={(e) => setData({ ...data, sec4subhead5: e.target.value })} />
                   
                    </div>
                    <div className="col-sm-6">
                    
                        <p className="size-cnt"><label for="w3review" className="form-label">Sub Description5</label></p>
                        <textarea className="p-2" name="w3review" rows="3" style={{border : "2px solid #e4e4e4" , width : "100%"}}  value={data.sec4subheaddesc5} onChange={(e) => setData({ ...data, sec4subheaddesc5: e.target.value })}></textarea>
                    
                    </div>
                  </div>

              </div>

{/* ******************Contact Form*************** */}
              <div className="card p-4">
                  <h4><strong>Contact</strong></h4>
               
          
                  <div className="row clearfix">

                    <div className="col-sm-12">
                    
                        <label for="title" className="form-label">Main Heading</label>
                        <input type="text" className="form-control" value={data.sec5heading} onChange={(e) => setData({ ...data, sec5heading: e.target.value })} />
                 
                    </div>
                    <div className="col-sm-12">
                     
                        <p className="size-cnt"><label for="w3review" className="form-label">Buuton text</label></p>
                        <textarea className="p-2" name="w3review" rows="3" style={{border : "2px solid #e4e4e4" , width : "100%"}}  value={data.sec5button} onChange={(e) => setData({ ...data, sec5button: e.target.value })}></textarea>
                  
                    </div>
                    <div className="col-sm-12">
                    
                        <p className="size-cnt"><label for="w3review" className="form-label">News & Insights</label></p>
                        <textarea className="p-2" name="w3review" rows="3" style={{border : "2px solid #e4e4e4" , width : "100%"}}  value={data.sec6heading} onChange={(e) => setData({ ...data, sec6heading: e.target.value })} ></textarea>
                     
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