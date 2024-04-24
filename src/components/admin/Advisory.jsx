import React from "react";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../Context/UserContext";
import axios from 'axios'

export default function Advisory() {
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
  const [bg4, setbg4] = useState(null);


  const [file, setFile] = useState('');
  const [file1, setFile1] = useState('');
  const [file2, setFile2] = useState('');
  const [file3, setFile3] = useState('');



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



  const [data, setData] = useState({
    sec1bgimage: '',
    sec1heading: '',
    sec1discription: '',
    sec2heading: '',
    sec2subheading1: '',
    sec2discription1: '',
    sec2subheading2: '',
    sec2discription2: '',
    sec2subheading3: '',
    sec2discription3: '',
    sec2subheading4: '',
    sec2discription4: '',

    sec2image: '',
    sec3image: '',
    sec3heading: '',
    sec3subheading1: '',
    sec3subheading2: '',
    sec3subheading3: '',
    sec3subheading4: '',
    sec3subheading5: '',


    sec4heading: '',
    sec4subheading1: '',
    sec4subheading2: '',
    sec4subheading3: '',
    sec4subheading4: '',
    sec4subheading5: '',
    sec4image: '',


    sec5heading: '',
    sec5button: '',

    // ... other properties
  });



  useEffect(() => {
    const tablename = "advisorypagedb"
   const tablen = {"tablename" : "advisorypagedb"}
          axios.post(`/staticdata` , tablen).then((res) => {
      setbg1(res.data[0].sec1bgimage)




      setbg2(res.data[0].sec2image)
      setbg3(res.data[0].sec3image)
      setbg4(res.data[0].sec4image)

      setData({
        sec1bgimage: res.data[0].sec1bgimage,
        sec1heading: res.data[0].sec1heading,
        sec1discription: res.data[0].sec1discription,
        sec2heading: res.data[0].sec2heading,
        sec2subheading1: res.data[0].sec2subheading1,


        sec2discription1: res.data[0].sec2discription1,
        sec2subheading2: res.data[0].sec2subheading2,

        sec2discription2: res.data[0].sec2discription2,
        sec2subheading3: res.data[0].sec2subheading3,
        sec2discription3: res.data[0].sec2discription3,
        sec2subheading4: res.data[0].sec2subheading4,
        sec2discription4: res.data[0].sec2discription4,

        sec2image: res.data[0].sec2image,
        sec3image: res.data[0].sec3image,
        sec3heading: res.data[0].sec3heading,
        sec3subheading1: res.data[0].sec3subheading1,
        sec3subheading2: res.data[0].sec3subheading2,
        sec3subheading3: res.data[0].sec3subheading3,
        sec3subheading4: res.data[0].sec3subheading4,
        sec3subheading5: res.data[0].sec3subheading5,

        sec4heading: res.data[0].sec4heading,
        sec4subheading1: res.data[0].sec4subheading1,
        sec4subheading2: res.data[0].sec4subheading2,
        sec4subheading3: res.data[0].sec4subheading3,
        sec4subheading4: res.data[0].sec4subheading4,
        sec4subheading5: res.data[0].sec4subheading5,


        sec4image: res.data[0].sec4image,
        sec5heading: res.data[0].sec5heading,
        sec5button: res.data[0].sec5button,


      });
    })
  }, []);




  function UpdataData(e) {

    e.preventDefault();
    let mydata = {
      'sec1heading': data.sec1heading, 'sec1discription': data.sec1discription,
      'sec2heading': data.sec2heading,
      "sec2subheading1": data.sec2subheading1, "sec2discription1": data.sec2discription1,

      "sec2subheading2": data.sec2subheading2, "sec2discription2"
        : data.sec2discription2,

      "sec2subheading3": data.sec2subheading3,
      "sec2discription3": data.sec2discription3,

      "sec2subheading4": data.sec2subheading4, "sec2discription4": data.sec2discription4,

      "sec3heading": data.sec3heading,

      "sec3subheading1": data.sec3subheading1, "sec3subheading2": data.sec3subheading2, "sec3subheading3": data.sec3subheading3,


      "sec3subheading4": data.sec3subheading4, "sec3subheading5"
        : data.sec3subheading5,

      "sec4heading": data.sec4heading,

      "sec4subheading1": data.sec4subheading1, "sec4subheading2": data.sec4subheading2, "sec4subheading3": data.sec4subheading3, "sec4subheading4": data.sec4subheading4,
      "sec4subheading5": data.sec4subheading5,

      "sec5heading"
        : data.sec5heading,

      "sec5button": data.sec5button,
      "bg1": bg1, "bg2": bg2, "bg3": bg3, "bg4": bg4
    }
    const formData = new FormData();

    // Append text data
    formData.append('sec1heading', data.sec1heading);
    formData.append('sec1discription', data.sec1discription);
    formData.append('sec2heading', data.sec2heading);
    formData.append('sec2subheading1', data.sec2subheading1);


    formData.append('sec2discription1', data.sec2discription1);
    formData.append('sec2subheading2', data.sec2subheading2);
    formData.append('sec2discription2', data.sec2discription2);

    formData.append('sec2subheading3', data.sec2subheading3);
    formData.append('sec2discription3', data.sec2discription3);
    formData.append('sec2subheading4', data.sec2subheading4);


    formData.append('sec2discription4', data.sec2discription4);
    formData.append('sec3heading', data.sec3heading);
    formData.append('sec3subheading1', data.sec3subheading1);


    formData.append('sec3subheading2', data.sec3subheading2);
    formData.append('sec3subheading3',
      data.sec3subheading3);

    formData.append('sec3subheading4', data.sec3subheading4);
    formData.append('sec3subheading5', data.sec3subheading5);

    formData.append('sec4heading', data.sec4heading);
    formData.append('sec4subheading1', data.sec4subheading1);

    formData.append('sec4subheading2', data.sec4subheading2);
    formData.append('sec4subheading3', data.sec4subheading3);
    formData.append('sec4subheading4', data.sec4subheading4);
    formData.append('sec4subheading5', data.sec4subheading5);

    formData.append('sec5heading', data.sec5heading);
    formData.append('sec5button', data.sec5button);







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





    axios.post(`/updateadvisory`, formData).then((res) => {
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
                <h2>Advisory
                  <small className="text-muted">Welcome to Page</small>
                </h2>
              </div>
              <div className="col-lg-5 col-md-6 col-sm-12 d-flex justify-content-end">

                <ul className="breadcrumb float-md-right">
                  <li className="breadcrumb-item"><a href="index.html"><i className="bx bx-home"></i> Page</a></li>
                  <li className="breadcrumb-item active">Advisory</li>

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
                  <h2><strong>Section 2</strong> "Why Choose Advisory"</h2>
                  <ul className="header-dropdown">
                    <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                    </li>
                  </ul>
                </div>
                <div className="body">
                  <div className="row clearfix">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form_my" >
                          <label for="title" className="form-label">Side Image</label>
                          <input type="file" className="form-control" onChange={handleChange1} />
                        </div>
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
                        <div className="form_my">
                          <label for="title" className="form-label">Main Heading</label>
                          <input type="text" className="form-control" value={data.sec2heading} onChange={(e) => setData({ ...data, sec2heading: e.target.value })} />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form_my">
                          <label for="title" className="form-label">sub heading1</label>
                          <input type="text" className="form-control" value={data.sec2subheading1} onChange={(e) => setData({ ...data, sec2subheading1: e.target.value })} />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form_my">
                          <label for="title" className="form-label">discription1</label>
                          <input type="text" className="form-control" value={data.sec2discription1} onChange={(e) => setData({ ...data, sec2discription1: e.target.value })} />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form_my">
                          <label for="title" className="form-label">sub heading2</label>
                          <input type="text" className="form-control" value={data.sec2subheading2} onChange={(e) => setData({ ...data, sec2subheading2: e.target.value })} />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form_my">
                          <label for="title" className="form-label">discription2</label>
                          <input type="text" className="form-control" value={data.sec2discription2} onChange={(e) => setData({ ...data, sec2discription2: e.target.value })} />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form_my">
                          <label for="title" className="form-label">sub heading3</label>
                          <input type="text" className="form-control" value={data.sec2subheading3} onChange={(e) => setData({ ...data, sec2subheading3: e.target.value })} />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form_my">
                          <label for="title" className="form-label">discription3</label>
                          <input type="text" className="form-control" value={data.sec2discription3} onChange={(e) => setData({ ...data, sec2discription3: e.target.value })} />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form_my">
                          <label for="title" className="form-label">sub heading4</label>
                          <input type="text" className="form-control" value={data.sec2subheading4} onChange={(e) => setData({ ...data, sec2subheading4: e.target.value })} />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form_my">
                          <label for="title" className="form-label">discription4</label>
                          <input type="text" className="form-control" value={data.sec2discription4} onChange={(e) => setData({ ...data, sec2discription4: e.target.value })} />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div className="card">
                <div className="header">
                  <h2><strong>Section 3</strong> "Our Services"</h2>
                  <ul className="header-dropdown">
                    <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                    </li>
                  </ul>
                </div>
                <div className="body">
                  <div className="row clearfix">

                    <div className="col-sm-6">
                      <div className="form_my" >
                        <label for="title" className="form-label">Side Image</label>
                        <input type="file" className="form-control" onChange={handleChange2} />
                      </div>
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
                      <div className="form_my">
                        <label for="title" className="form-label">Main Heading</label>
                        <input type="text" className="form-control" value={data.sec3heading} onChange={(e) => setData({ ...data, sec3heading: e.target.value })} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form_my">
                        <p className="size-cnt"><label for="w3review" className="form-label">Main Point 1</label></p>
                        <textarea id="Main Points" name="w3review" rows="2" cols="200" value={data.sec3subheading1} onChange={(e) => setData({ ...data, sec3subheading1: e.target.value })}></textarea>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form_my">
                        <p className="size-cnt"><label for="w3review" className="form-label">Main Point 2</label></p>
                        <textarea id="Main Points" name="w3review" rows="2" cols="200"
                          value={data.sec3subheading2} onChange={(e) => setData({ ...data, sec3subheading2: e.target.value })}></textarea>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form_my">
                        <p className="size-cnt"><label for="w3review" className="form-label">Main Point 3</label></p>
                        <textarea id="Main Points" name="w3review" rows="2" cols="200" value={data.sec3subheading3} onChange={(e) => setData({ ...data, sec3subheading3: e.target.value })}></textarea>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form_my">
                        <p className="size-cnt"><label for="w3review" className="form-label">Main Point 4</label></p>
                        <textarea id="Main Points" name="w3review" rows="2" cols="200" value={data.sec3subheading4} onChange={(e) => setData({ ...data, sec3subheading4: e.target.value })}></textarea>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form_my">
                        <p className="size-cnt"><label for="w3review" className="form-label">Main Point 5</label></p>
                        <textarea id="Main Points" name="w3review" rows="2" cols="200" value={data.sec3subheading5} onChange={(e) => setData({ ...data, sec3subheading5: e.target.value })}></textarea>
                      </div>
                    </div>

                  </div>
                </div>
              </div>



              <div className="card">
                <div className="header">
                  <h2><strong>Section 4</strong> "Why Us" </h2>
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
                        <input type="file" className="form-control" onChange={handleChange3} />
                      </div>
                    </div>
                    <div className="form_my logo-group col-sm-2">
                      <div className="logo-img"   >
                        {file3 ? (
                          <img src={file3} alt="Updated Icon" />
                        ) : (
                          <img src={`/uploads/${bg4}`} alt="Default Icon" />
                        )}



                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form_my">
                        <label for="title" className="form-label">Main Heading</label>
                        <input type="text" className="form-control" value={data.sec4heading} onChange={(e) => setData({ ...data, sec4heading: e.target.value })} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form_my">
                        <p className="size-cnt"><label for="w3review" className="form-label">Main Point 1</label></p>
                        <textarea id="Main Points" name="w3review" rows="2" cols="200" value={data.sec4subheading1} onChange={(e) => setData({ ...data, sec4subheading1: e.target.value })}></textarea>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form_my">
                        <p className="size-cnt"><label for="w3review" className="form-label">Main Point 2</label></p>
                        <textarea id="Main Points" name="w3review" rows="2" cols="200" value={data.sec4subheading2} onChange={(e) => setData({ ...data, sec4subheading2: e.target.value })}></textarea>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form_my">
                        <p className="size-cnt"><label for="w3review" className="form-label">Main Point 3</label></p>
                        <textarea id="Main Points" name="w3review" rows="2" cols="200" value={data.sec4subheading3} onChange={(e) => setData({ ...data, sec4subheading3: e.target.value })}></textarea>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form_my">
                        <p className="size-cnt"><label for="w3review" className="form-label">Main Point 4</label></p>
                        <textarea id="Main Points" name="w3review" rows="2" cols="200" value={data.sec4subheading4} onChange={(e) => setData({ ...data, sec4subheading4: e.target.value })}></textarea>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form_my">
                        <p className="size-cnt"><label for="w3review" className="form-label">Main Point 5</label></p>
                        <textarea id="Main Points" name="w3review" rows="2" cols="200" value={data.sec4subheading5} onChange={(e) => setData({ ...data, sec4subheading5: e.target.value })}></textarea>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="card">
                <div className="header">
                  <h2><strong>Section 5</strong> "contact Us" </h2>
                  <ul className="header-dropdown">
                    <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                    </li>
                  </ul>
                </div>
                <div className="body">
                  <div className="row clearfix">

                    <div className="col-sm-12">
                      <div className="form_my">
                        <label for="title" className="form-label">Main Heading</label>
                        <input type="text" className="form-control" value={data.sec5heading} onChange={(e) => setData({ ...data, sec5heading: e.target.value })} />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form_my">
                        <label for="title" className="form-label">Button</label>
                        <input type="text" className="form-control" value={data.sec5button} onChange={(e) => setData({ ...data, sec5button: e.target.value })} />
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
        </div>


      </main>
      {/* <!-- End #main --> */}

    </>
  );
}