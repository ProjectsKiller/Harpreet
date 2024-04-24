import React from "react";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../Context/UserContext";
import axios from 'axios'
export default function Contact() {
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
    sec1bgimage: '',
    sec1heading: '',
    sec1discription: '',
    sec2callicon: '',
    sec2calltitle: '',
    sec2callnumber: '',
    sec2emailicon: '',
    sec2emailtitle: '',
    sec2emailaddress: '',

    sec2locationicon: '',
    sec2locationtitle: '',
    sec2locationaddress: '',

    sec2officehourstitle: '',
    sec2officehoursdiscription: '',
    sec4button: '',
    maploaction: '',


    // ... other properties
  });

  useEffect(() => {
    const tablename = "contactuspagedb"
	const tablen = {"tablename" : "contactuspagedb"}
    axios.post(`/staticdata` , tablen).then((res) => {
      setbg1(res.data[0].sec1bgimage)


      setIcon1(res.data[0].sec2callicon)
      setIcon2(res.data[0].sec2emailicon)
      setIcon3(res.data[0].sec2locationicon)

      setData({
        sec1bgimage: res.data[0].sec1bgimage,
        sec1heading: res.data[0].sec1heading,
        sec1discription: res.data[0].sec1discription,
        sec2callicon: res.data[0].sec2callicon,
        sec2calltitle: res.data[0].sec2calltitle,
        sec2callnumber: res.data[0].sec2callnumber,


        sec2emailicon: res.data[0].sec2emailicon,
        sec2emailtitle: res.data[0].sec2emailtitle,
        sec2emailaddress: res.data[0].sec2emailaddress,

        sec2locationicon: res.data[0].sec2locationicon,
        sec2locationtitle: res.data[0].sec2locationtitle,
        sec2locationaddress: res.data[0].sec2locationaddress,

        sec2officehourstitle: res.data[0].sec2officehourstitle,
        sec2officehoursdiscription: res.data[0].sec2officehoursdiscription,
        sec4button: res.data[0].sec4button,
        maploaction: res.data[0].maploaction,

      });
    })
  }, []);



  function UpdataData(e) {
    e.preventDefault();
    let mydata = {
      'sec1heading': data.sec1heading, 'sec1discription': data.sec1discription,
      "sec2calltitle": data.sec2calltitle, "sec2callnumber": data.sec2callnumber,
      "sec2emailtitle": data.sec2emailtitle,
      " sec2emailaddress": data.sec2emailaddress,
      "   sec2locationtitle": data.sec2locationicon,
      "  sec2locationaddress": data.sec2locationaddress,
      " sec2officehourstitle": data.sec2officehourstitle,

      " sec2officehoursdiscription": data.sec2officehoursdiscription,
      " sec4button": data.sec4button,
      " maploaction": data.maploaction,

      "bg1": bg1, "icon1": icon1, "icon2": icon2, "icon3": icon3
    }



    const formData = new FormData();

    // Append text data

    formData.append('sec1heading', data.sec1heading);
    formData.append('sec1discription', data.sec1discription);
    formData.append('sec2calltitle', data.sec2calltitle);


    formData.append('sec2callnumber', data.sec2callnumber);
    formData.append('sec2emailtitle', data.sec2emailtitle);
    formData.append('sec2emailaddress', data.sec2emailaddress);

    formData.append('sec2locationtitle', data.sec2locationtitle);
    formData.append('sec2locationaddress', data.sec2locationaddress);
    formData.append('sec2officehourstitle', data.sec2officehourstitle);
    formData.append('sec2officehoursdiscription', data.sec2officehoursdiscription);
    formData.append('sec4button', data.sec4button);
    formData.append('maploaction', data.maploaction);





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

    axios.post(`/updatecontact`, formData).then((res) => {
      if (res.data.msg === "200") {
        alert("Data is updated!")
      }

    })
  }




  return (
    <>
      <main id="whole" style={chgwid}>

        {/* <!-- box --> */}

        <div className="container-fluid">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>Contact Us
                  <small className="text-muted">Welcome to Page</small>
                </h2>
              </div>
              <div className="col-lg-5 col-md-6 col-sm-12 d-flex justify-content-end">

                <ul className="breadcrumb float-md-right">
                  <li className="breadcrumb-item"><a href="index.html"><i className="bx bx-home"></i> Page</a></li>
                  <li className="breadcrumb-item active">Contact</li>

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
                        <div className="dz-message drag-icon-cph">
                          <i className="bi bi-hand-index-thumb"></i>
                          <div className=""><input type="file" onChange={handleChange} /></div>
                          <h3>Drop files here or click to upload.</h3>
                        </div>

                      </form>
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
                          <input type="file" className="form-control" onChange={handleIcon1} />
                        </div>
                      </div>
                      <div className="form_my logo-group col-sm-2">
                        <div className="logo-img"   >


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
                          <input type="file" className="form-control" onChange={handleIcon2} />
                        </div>
                      </div>
                      <div className="form_my logo-group col-sm-2">
                        <div className="logo-img"   >


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
                          <input type="text" className="form-control" value={data.sec2emailtitle} onChange={(e) => setData({ ...data, sec2emailtitle: e.target.value })} />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form_my">
                          <label htmlFor="title" className="form-label">E-mail Text</label>
                          <input type="text" className="form-control" value={data.sec2emailaddress} onChange={(e) => setData({ ...data, sec2emailaddress: e.target.value })} />
                        </div>
                      </div>
                    </div>

                    <h5 className="ban-top"><strong>Location</strong> "Information" </h5>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form_my">
                          <label for="title" className="form-label">Side Image</label>
                          <input type="file" className="form-control" onChange={handleIcon3} />
                        </div>
                      </div>
                      <div className="form_my logo-group col-sm-2">
                        <div className="logo-img"   >


                          {IconChange3 ? (
                            <img src={IconChange3} alt="Updated Icon" />
                          ) : (
                            <img src={`/uploads/${icon3}`} alt="Default Icon" />
                          )}

                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form_my">
                          <label htmlFor="title" className="form-label">Location Heading</label>
                          <input type="text" className="form-control" value={data.sec2locationtitle} onChange={(e) => setData({ ...data, sec2locationtitle: e.target.value })} />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form_my">
                          <label htmlFor="title" className="form-label">Location Name</label>
                          <input type="text" className="form-control" value={data.sec2locationaddress} onChange={(e) => setData({ ...data, sec2locationaddress: e.target.value })} />
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>

              <div className="card">
                <div className="header">
                  <h2><strong>Section 3</strong> "Contact Form" </h2>
                  <ul className="header-dropdown">
                    <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                    </li>
                  </ul>
                </div>
                <div className="body">
                  <div className="row">

                    <div className="col-sm-12">
                      <div className="form_my">
                        <label htmlFor="title" className="form-label">Heading </label>
                        <input type="text" className="form-control" value={data.sec2officehourstitle} onChange={(e) => setData({ ...data, sec2officehourstitle: e.target.value })} />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form_my">
                        <label htmlFor="title" className="form-label">Heading Desription </label>
                        <input type="text" className="form-control" value={data.sec2officehoursdiscription} onChange={(e) => setData({ ...data, sec2officehoursdiscription: e.target.value })} />
                      </div>
                    </div>

                    <div className="col-sm-12">
                      <div className="form_my">
                        <label htmlFor="title" className="form-label">Button Text</label>
                        <input type="text" className="form-control" value={data.sec4button} onChange={(e) => setData({ ...data, sec4button: e.target.value })} />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form_my">
                        <p className="size-cnt"><label htmlFor="w3review" className="form-label">Map Location</label></p>
                        <textarea id="main Description" name="w3review" rows="2" cols="200" value={data.maploaction} onChange={(e) => setData({ ...data, maploaction: e.target.value })}></textarea>
                      </div>
                    </div>
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

