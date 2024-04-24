import React from "react";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../Context/UserContext"
import axios from 'axios'
export default function PropertyManagement() {
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


  const [file, setFile] = useState('');
  const [file1, setFile1] = useState('');



  function handleChange(e) {
    const selectedFile = e.target.files[0];

    setFile(URL.createObjectURL(selectedFile));
    setbg1(selectedFile);
  }
  function handleChange1(e) {
    setbg2(e.target.files[0]);
    setFile1(URL.createObjectURL(e.target.files[0]));
  }


  const [data, setData] = useState({
    sec1bgimage: '',
    sec1heading: '',
    sec1discription: '',
    sec2discription: '',
    sec2image: '',
    sec3heading: '',
    sec3discription: '',
    sec3button: '',


    // ... other properties
  });

  useEffect(() => {
    const tablename = "propertymanagementpagedb"
   const tablen = {"tablename" : "propertymanagementpagedb"}
          axios.post(`/staticdata` , tablen).then((res) => {
      setbg1(res.data[0].sec1bgimage)
      setbg2(res.data[0].sec2image)

      setData({
        sec1bgimage: res.data[0].sec1bgimage,
        sec1heading: res.data[0].sec1heading,
        sec1discription: res.data[0].sec1discription,
        sec2discription: res.data[0].sec2discription,
        sec2image: res.data[0].sec2image,  sec3heading: res.data[0].sec3heading,
        sec3discription: res.data[0].sec3discription,
        sec3button: res.data[0].sec3button,
      });
    })
  }, []);



  function UpdateData(e) {
    e.preventDefault();
    let mydata = {
      'sec1heading': data.sec1heading, 'sec1discription': data.sec1discription,
      "sec2discription": data.sec2discription, "sec3heading": data.sec3heading,
      "sec3discription": data.sec3discription,
      "sec3button": data.sec3button,

      'bg1': bg1, "bg2": bg2
    }

    const formData = new FormData();

    // Append text data

    formData.append('sec1heading', data.sec1heading);
    formData.append('sec1discription', data.sec1discription);
    formData.append('sec2discription', data.sec2discription);


    formData.append('sec3heading', data.sec3heading);
    formData.append('sec3discription', data.sec3discription);
    formData.append('sec3button', data.sec3button);



    console.log(data.sec1discription);

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

    axios.post(`/updatepman`, formData).then((res) => {
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
            <div className="container">
              <div className="row">
                <div className="col-lg-7 col-md-6 col-sm-12">
                  <h2>Property Management
                    <small className="text-muted">Welcome to Page</small>
                  </h2>
                </div>
                <div className="col-lg-5 col-md-6 col-sm-12 d-flex justify-content-end">

                  <ul className="breadcrumb float-md-right">
                    <li className="breadcrumb-item"><a href="index.html"><i className="bx bx-home"></i> Page</a></li>
                    <li className="breadcrumb-item active">Property Managemnet</li>

                  </ul>

                </div>
              </div>
            </div>
          </div>
          <div className="row clearfix box_my">
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
                  <h2><strong>Section 2</strong> "Property Managemnet"</h2>
                  <ul className="header-dropdown">
                    <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                    </li>
                  </ul>
                </div>
                <div className="body">
                  <div className="row clearfix">
                    <div className="col-sm-6">
                      <div className="form_my">
                        <label for="title" className="form-label">Side Image</label>
                        <input type="file" className="form-control" onChange={handleChange1} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form_my logo-group">
                        <div className="logo-img"
                        >
                          {/* <img src="/img/Logo.jpg" alt="Logo image here" /> */}
                          {file1 ? (
                            <img src={file1} alt="Updated Icon" />
                          ) : (
                            <img src={`/uploads/${bg2}`} alt="Default Icon" />
                          )}

                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form_my">
                        <p className="size-cnt"><label for="w3review" className="form-label">Main Description</label></p>
                        <textarea id="Main Description" name="w3review" rows="2" cols="200" value={data.sec2discription} onChange={(e) => setData({ ...data, sec2discription: e.target.value })}></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="header">
                  <h2><strong>Section 3</strong> "Contact Form"</h2>
                  <ul className="header-dropdown">
                    <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                    </li>
                  </ul>
                </div>
                <div className="body">
                  <div className="row clearfix">

                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form_my">
                          <label for="title" className="form-label">Main Heading</label>
                          <input type="text" className="form-control" value={data.sec3heading} onChange={(e) => setData({ ...data, sec3heading: e.target.value })} />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form_my">
                          <p className="size-cnt"><label for="w3review" className="form-label">Main Description</label></p>
                          <textarea id="Main Description" name="w3review" rows="2" cols="200" value={data.sec3discription} onChange={(e) => setData({ ...data, sec3discription: e.target.value })}></textarea>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form_my">
                          <p className="size-cnt"><label for="w3review" className="form-label">Button Text</label></p>
                          <textarea id="Main Description" name="w3review" rows="2" cols="200" value={data.sec3button} onChange={(e) => setData({ ...data, sec3button: e.target.value })}></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>

        <div className="col-sm-12 submit-opt">
          <button type="submit" className="btn col-sub btn-round" onClick={UpdateData}>Update</button>
        </div>
      </main>
      {/* <!-- End #main --> */}
    </>
  );
}