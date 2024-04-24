import React from "react";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../Context/UserContext"
import axios from 'axios';
export default function Joinus() {
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


  const [file, setFile] = useState('');


  const [icon1, setIcon1] = useState(null);
  const [icon2, setIcon2] = useState(null);
  const [icon3, setIcon3] = useState(null);



  const [IconChange1, setIconChange1] = useState('');
  const [IconChange2, setIconChange2] = useState('');
  const [IconChange3, setIconChange3] = useState('');




  function handleChange(e) {
    const selectedFile = e.target.files[0];

    setFile(URL.createObjectURL(selectedFile));
    setbg1(selectedFile);
  }




  function handleIcon1(e) {
    if (e.target.files[0]) {
      setIcon1(e.target.files[0]);
      setIconChange1(URL.createObjectURL(e.target.files[0]));
    } else {
      setIcon1(null);
      setIconChange1('');
    }
  }
  function handleIcon2(e) {
    if (e.target.files[0]) {
      setIcon2(e.target.files[0]);
      setIconChange2(URL.createObjectURL(e.target.files[0]));
    } else {
      setIcon2(null);
      setIconChange2('');
    }
  }
  function handleIcon3(e) {
    if (e.target.files[0]) {
      setIcon3(e.target.files[0]);
      setIconChange3(URL.createObjectURL(e.target.files[0]));
    } else {
      setIcon3(null);
      setIconChange3('');
    }
  }







  const [data, setData] = useState({
    sec1bgimage: '',
    sec1heading: '',
    sec1discription: '',
    sec2calltitle: '',
    sec2callnumber: '',
    sec2emailheading: '',
    sec2emailaddress: '',
    sec2officehoursheading: '',
    sec2officehoursmfopeningtime: '',

    sec2officehoursmfclosingtime: '',
    sec2officehourssopeningtime: '',
    sec2officehourssclosingtime: '',
    sec3heading: '',
    sec3button: '',


    sec2logo1: '',
    sec2logo2: '',
    sec2logo3: '',


    // ... other properties
  });




  useEffect(() => {
    const tablename = "joinuspagedb"
   const tablen = {"tablename" : "joinuspagedb"}
          axios.post(`/staticdata` , tablen).then((res) => {
      setbg1(res.data[0].sec1bgimage)
      setIcon1(res.data[0].sec2logo1);
      setIcon2(res.data[0].sec2logo2);
      setIcon3(res.data[0].sec2logo3);





      setData({
        sec1bgimage: res.data[0].sec1bgimage,
        sec1heading: res.data[0].sec1heading,
        sec1discription: res.data[0].sec1discription,
        sec2calltitle: res.data[0].sec2calltitle,
        sec2callnumber: res.data[0].sec2callnumber,


        sec2emailheading: res.data[0].sec2emailheading,
        sec2emailaddress: res.data[0].sec2emailaddress,

        sec2officehoursheading: res.data[0].sec2officehoursheading,
        sec2officehoursmfopeningtime: res.data[0].sec2officehoursmfopeningtime,
        sec2officehoursmfclosingtime: res.data[0].sec2officehoursmfclosingtime,
        sec2officehourssopeningtime: res.data[0].sec2officehourssopeningtime,
        sec2officehourssclosingtime: res.data[0].sec2officehourssclosingtime,

        sec3heading: res.data[0].sec3heading,
        sec3button: res.data[0].sec3button,
        sec2logo1: res.data[0].sec2logo1,
        sec2logo2: res.data[0].sec2logo2,
        sec2logo3: res.data[0].sec2logo3,


      });
    })
  }, []);



  function UpdataData(e) {
    e.preventDefault();
    let mydata = {
      'sec1heading': data.sec1heading, 'sec1discription': data.sec1discription,
      "sec2calltitle": data.sec2calltitle, "sec2callnumber": data.sec2callnumber,

      "sec2emailheading": data.sec2emailheading, "sec2emailaddress": data.sec2emailaddress, " sec2officehoursheading"
        : data.sec2officehoursheading,
      "sec2officehoursmfopeningtime": data.sec2officehoursmfopeningtime,
      "sec2officehoursmfclosingtime": data.sec2officehoursmfclosingtime, "sec2officehourssopeningtime": data.sec2officehourssopeningtime, "sec2officehourssclosingtime": data.sec2officehourssclosingtime,

      "sec3heading": data.sec3heading, "sec3button": data.sec3button,


      "bg1": bg1, "icon1": icon1, "icon2": icon2, "icon3": icon3
    }


    console.log(mydata, "mydataaa");
    const formData = new FormData();

    // Append text data
    formData.append('sec1heading', data.sec1heading);
    formData.append('sec1discription', data.sec1discription);
    formData.append('sec2calltitle', data.sec2calltitle);
    formData.append('sec2callnumber', data.sec2callnumber);


    formData.append('sec2emailheading', data.sec2emailheading);
    formData.append('sec2emailaddress', data.sec2emailaddress);
    formData.append('sec2officehoursheading', data.sec2officehoursheading);

    formData.append('sec2officehoursmfopeningtime', data.sec2officehoursmfopeningtime);
    formData.append('sec2officehoursmfclosingtime', data.sec2officehoursmfclosingtime);
    formData.append('sec2officehourssopeningtime', data.sec2officehourssopeningtime);


    formData.append('sec2officehourssclosingtime', data.sec2officehourssclosingtime);
    formData.append('sec3heading', data.sec3heading);
    formData.append('sec3button', data.sec3button);



    // Handle images
    function appendImageIfDefined(fieldName, fileVariable) {
      if (fileVariable) {
        formData.append(fieldName, fileVariable);
      } else {
        formData.append(fieldName, data[fieldName]);
      }
    }

    appendImageIfDefined('bg1', bg1);

    appendImageIfDefined('icon1', icon1);
    appendImageIfDefined('icon2', icon2);
    appendImageIfDefined('icon3', icon3);



    console.log(mydata, "data");
    axios.post(`/joinusupdate`, formData).then((res) => {
      if (res.data.msg === "200") {
        alert("Data is updated!")
      }

    })
  }

  return (
    <>
      <main id="whole" style={chgwid}>

        {/* <!-- box --> */}

        <div className="container-fluid" id="part">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>Join Us
                  <small className="text-muted">Welcome to Page</small>
                </h2>
              </div>
              <div className="col-lg-5 col-md-6 col-sm-12 d-flex justify-content-end">

                <ul className="breadcrumb float-md-right">
                  <li className="breadcrumb-item"><a href="index.html"><i className="bx bx-home"></i> Page</a></li>
                  <li className="breadcrumb-item active">Join Us</li>

                </ul>

              </div>
            </div>
          </div>
          <div className="row clearfix space-cont box_my">
            <div className="col-lg-12">

              <div className="card">
                <div className="header">
                  <h2><strong>Section 1</strong> "Background Image" </h2>
                  <ul className="header-dropdown">
                    <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                    </li>
                  </ul>
                </div>
                <div className="body">
                  <div className="row clearfix">
                    <div className="col-sm-12">
                      <form action="/" id="frmFileUpload" className="dropzone dz-clickable" method="post" enctype="multipart/form-data" style={{ backgroundImage: `url('${file ? `${file}` : `/uploads/${bg1}`}')` }}>

                      </form>
                      <div className="dz-message drag-icon-cph mt-4">
                        <i className="bi bi-hand-index-thumb"></i>
                        <div className="text-center"><input type="file" onChange={handleChange} /></div>
                      </div>
                    </div>
                    <div className="row ban-top">
                      <div className="col-sm-12">
                        <div className="form_my">
                          <label for="title" className="form-label">Banner Heading</label>
                          <input type="text" className="form-control" value={data.sec1heading} onChange={(e) => setData({ ...data, sec1heading: e.target.value })} />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form_my">
                          <p className="size-cnt"><label for="w3review" className="form-label">Banner Description</label></p>
                          <textarea id="Banner Description" name="w3review" rows="2" cols="200" value={data.sec1discription} onChange={(e) => setData({ ...data, sec1discription: e.target.value })}></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="card">
                <div className="header">
                  <h2><strong>Section 2</strong> "Contact" </h2>
                  <ul className="header-dropdown">
                    <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                    </li>
                  </ul>
                </div>
                <div className="body">
                  <div className="row clearfix">
                    <h5 className="ban-top"><strong>Call</strong> "Information" </h5>
                    <div className="row">

                      <div className="col-sm-6">
                        <div className="form_my">
                          <label for="title" className="form-label">Side Image</label>
                          <input id="ChooseImg" type="file" onChange={handleIcon1} className="form-control" />
                        </div>
                      </div>
                      <div className="col-sm-6 mb-4">
                        <div className="logo-img">
                          {IconChange1 ? (
                            <img src={IconChange1} alt="Updated Icon" />
                          ) : (
                            <img src={`/uploads/${icon1}`} alt="Default Icon" />
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form_my">
                          <label htmlFor="title" className="form-label">Call Title</label>
                          <input type="text" className="form-control" value={data.sec2calltitle} onChange={(e) => setData({ ...data, sec2calltitle: e.target.value })} />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form_my">
                          <label htmlFor="title" className="form-label">Call Number</label>
                          <input type="text" className="form-control" value={data.sec2callnumber} onChange={(e) => setData({ ...data, sec2callnumber: e.target.value })} />
                        </div>
                      </div>
                    </div>
                    <h5 className="ban-top"><strong>E- Mail</strong> "Information" </h5>
                    <div className="row">


                      <div className="col-sm-6">
                        <div className="form_my">
                          <label for="title" className="form-label">Side Image</label>
                          <input id="ChooseImg" type="file" onChange={handleIcon2} className="form-control" />



                        </div>

                      </div>
                      <div className="col-sm-6 mb-4">
                        <div className="logo-img">
                          {/* <img src="/img/Logo.jpg" alt="Logo image here" />
                             */}

                          {IconChange2 ? (
                            <img src={IconChange2} alt="Updated Icon" />
                          ) : (
                            <img src={`/uploads/${icon2}`} alt="Default Icon" />
                          )}
                        </div>
                      </div>


                      <div className="col-sm-6">
                        <div className="form_my">
                          <label htmlFor="title" className="form-label">E-mail Title</label>
                          <input type="text" className="form-control" value={data.sec2emailheading} onChange={(e) => setData({ ...data, sec2emailheading: e.target.value })} />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form_my">
                          <label htmlFor="title" className="form-label">E-mail Text</label>
                          <input type="text" className="form-control" value={data.sec2emailaddress} onChange={(e) => setData({ ...data, sec2emailaddress: e.target.value })} />
                        </div>
                      </div>
                    </div>

                    <h5 className="ban-top"><strong>Office Hours</strong> "Information" </h5>
                    <div className="row">

                      <div className="col-sm-6">
                        <div className="form_my">
                          <label for="title" className="form-label">Side Image</label>
                          <input id="ChooseImg" type="file" onChange={handleIcon3} className="form-control" />



                        </div>

                      </div>
                      <div className="col-sm-6 mb-4">
                        <div className="logo-img">
                          {/* <img src="/img/Logo.jpg" alt="Logo image here" /> */}

                          {IconChange3 ? (
                            <img src={IconChange3} alt="Updated Icon" />
                          ) : (
                            <img src={`/uploads/${icon3}`} alt="Default Icon" />
                          )}
                        </div>
                      </div>


                      <div className="col-sm-6">
                        <div className="form_my">
                          <label htmlFor="title" className="form-label">Title</label>
                          <input type="text" className="form-control" value={data.sec2officehoursheading} onChange={(e) => setData({ ...data, sec2officehoursheading: e.target.value })} />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form_my">
                          <label htmlFor="title" className="form-label my-4 fs-3">Office  routine </label>
                        </div>
                      </div>
                      <div className="col-sm-4 mt-4">
                        <h6>Monday-Friday   -- </h6>
                      </div>
                      <div className="col-sm-4 mb-4">

                        <label htmlFor="title" className="form-label">Opening Timing </label>
                        <input type="text" className="form-control opening" value={data.sec2officehoursmfopeningtime} onChange={(e) => setData({ ...data, sec2officehoursmfopeningtime: e.target.value })} />

                      </div>
                      <div className="col-sm-4">


                        <label htmlFor="title" className="form-label">Closing Timing </label>
                        <input type="text" className="form-control opening" value={data.sec2officehoursmfclosingtime} onChange={(e) => setData({ ...data, sec2officehoursmfclosingtime: e.target.value })} />
                      </div>
                      <div className="col-sm-4 mt-4">
                        <h6>Saturday   -- </h6>
                      </div>
                      <div className="col-sm-4 mb-4">

                        <label htmlFor="title" className="form-label">Opening Timing </label>
                        <input type="text" className="form-control opening" value={data.sec2officehourssopeningtime} onChange={(e) => setData({ ...data, sec2officehourssopeningtime: e.target.value })} />

                      </div>
                      <div className="col-sm-4">


                        <label htmlFor="title" className="form-label">Closing Timing </label>
                        <input type="text" className="form-control opening" value={data.sec2officehourssclosingtime} onChange={(e) => setData({ ...data, sec2officehourssclosingtime: e.target.value })} />
                      </div>

                    </div>

                  </div>

                </div>
              </div>
              <div className="card">
                <div className="header">
                  <h2><strong>Section 3</strong> "Contact us" </h2>
                  <ul className="header-dropdown">
                    <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                    </li>
                  </ul>
                </div>
                <div className="body">
                  <div className="row clearfix">
                    <div className="row">

                      <div className="col-sm-6">
                        <div className="form_my">
                          <label htmlFor="title" className="form-label">Heading</label>
                          <input type="text" className="form-control" value={data.sec3heading} onChange={(e) => setData({ ...data, sec3heading: e.target.value })} />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form_my">
                          <label htmlFor="title" className="form-label">Button</label>
                          <input type="text" className="form-control" value={data.sec3button} onChange={(e) => setData({ ...data, sec3button: e.target.value })} />
                        </div>
                      </div>
                    </div>
                    {/* <div className="row">
              
              <div className="col-sm-6">
                <div className="form_my">
                  <label htmlFor="title" className="form-label">E-mail Title</label>
                    <input type="text" className="form-control"/>
                </div>
            </div>
            <div className="col-sm-6">
              <div className="form_my">
                <label htmlFor="title" className="form-label">E-mail Text</label>
                  <input type="text" className="form-control"/>
              </div>
          </div>
        </div> */}

                    {/* <h5 className="ban-top"><strong>Office Hours</strong> "Information" </h5>
        <div className="row">
          
          <div className="col-sm-6">
            <div className="form_my">
              <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control"/>
            </div>
        </div>
        <div className="col-sm-6">
          <div className="form_my">
            <label htmlFor="title" className="form-label">Office Hour Text</label>
              <input type="text" className="form-control"/>
          </div>
      </div>
    </div> */}

                  </div>

                </div>
              </div>


            </div>
          </div>
          <div className="col-sm-12 submit-opt">
            <button type="submit" className="btn col-sub btn-round" onClick={UpdataData}>Update</button>
          </div>
        </div>

      </main>
      {/* <!-- End #main --> */}
    </>
  );
}