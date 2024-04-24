import React from "react";
import { useContext, useState, useEffect } from "react";

import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import axios from 'axios';
import "../../styles/admin/Style.css"
import { Button } from "react-bootstrap";
import e from "cors";
import { logDOM } from "@testing-library/react";
import { height, width } from "@mui/system";
function NewDevelop() {

  var modules = {
    toolbar: [
      // [{ size: ["small", false, "large", "huge"] }],
      [{ size: ["smallest", "smaller", "small", false, "large", "huge"] }],
      // [{ size: ["5px", "11px", "12px", "13px", false] }], // Add font size options
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] }
      ],
      [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
    ],
    
    
  };

  var formats = [
    "header", "height", "bold", "italic",
    "underline", "strike", "blockquote",
    "list", "color", "bullet", "indent",
    "link", "image", "align", "size",
  ];

  const [pagelink,setPagelink]=useState('');
  const [propertyname, setPropertyname] = useState('');
  const [propertyloaction, setPropertyLocation] = useState('');
  const [devname, setDevname] = useState('');
  const [price, setPrice] = useState('');
  const [complete, setComplete] = useState('');
  const [bannerimg, setBannerimg] = useState(null);
  const [floor, setFloorplan] = useState(null);
  const [brochure, setBrochure] = useState(null);
  const [youtube, setyoutube] = useState(null);
  const [location, setLocation] = useState(null);
  const [propertydesc, setPropertydesc] = useState('');
  const [payment, setPayment] = useState('');
  const [facilities, setFacilities] = useState('');
  const [features, setFeatures] = useState('');

  const [gallaryimgs, setGallaryimgs] = useState(null);
  const [updateimagestate, setupdateimagestate] = useState(null);

  const [data, setData] = useState([]);
  const [imgData, setImgdata] = useState([]);
  const [btnval, setBtnval] = useState(false);
  const [EditId, setEditId] = useState('');
  const [showAddUpdateBtn, setShowAddUpdateBtn] = useState(false);
  const [bannerpreview, setBannerPreviewImage] = useState('');

  // const [imgData, setImgdata] = useState([]);
  function GetGallary() {
    axios.get("http://localhost:4000/getallpropertyImages").then((res) => {
      setImgdata(res.data);
    });
  }
  function GetData(){
    axios.get("http://localhost:4000/getnewly").then((res) => {
      setData(res.data);
    });
  }
  useEffect(() => {
    GetData();
    GetGallary();
  }, [])

  const handleBannerImg = (e) => {

    const file = e.target.files[0];
    setBannerimg(file);

    setBannerPreviewImage(URL.createObjectURL(file));
  };

  const handleImageEdit = (index) => {
    const updatedImgData = [...imgData];
    updatedImgData[index].showInput = true;
    setImgdata(updatedImgData);
  };

  const takeFile = (file, index, id) => {
    if (file.size > 3 * 1024 * 1024) {
      alert(`${file.name} exceeds the maximum allowed size of 3MB.`);
      setupdateimagestate(null);
      let choos = document.getElementById("choos");
        if(choos){
          choos.value = null;
        }
      return;
  }
    // console.log(id,"is coming");
    console.log(index, "is coming");
    const updatedImgData = [...imgData];
    // updatedImgData[index].showImage = URL.createObjectURL(file);

    // setImgdata(updatedImgData);
    if (updatedImgData[index]) { // Check if updatedImgData[index] is defined
      updatedImgData[index].showImage = URL.createObjectURL(file);
      setImgdata(updatedImgData);
  }

    setupdateimagestate(file);
    const formData = new FormData();
    formData.append('bannerimg', file); // Append the selected file to the FormData object

    axios.put(`http://localhost:4000/editnewpropertyImages/${index}`, formData)
      .then((res) => {
        if (res.status === 200) {
          alert("Image is updated");
          GetGallary();
        }
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };


  const handleChangepayment = (content, delta, source, editor) => {
    setPayment(content);
  };
  const handleFacilities = (content, delta, source, editor) => { setFacilities(content) };
  const handlePropertyDesc = (content, delta, source, editor) => { setPropertydesc(content) };
  const handleFeatures = (content, delta, source, editor) => { setFeatures(content) };


  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    

    files.forEach(file => {
      console.log(file.size);
        if (file.size > 3 * 1024 * 1024) { // Check if file size exceeds 3MB
            alert(`${file.name} exceeds the maximum allowed size of 3MB.`);
            e.target.value = null;
            return;
            
        }
        setGallaryimgs(files); // Update state with selected files
        
    });

   
};


  const SetButtonValue = () => {
    setBtnval(true);
    setShowAddUpdateBtn(false)
  }
  const Backbutton = () => {
    setBtnval(false)
  }

  // ADD PROPERTY 
  const handleProperty = async () => {

    const formData = new FormData();

    // Append text data
    formData.append('propertyname', propertyname);
    formData.append('propertyloaction', propertyloaction);
    formData.append('devname', devname);
    formData.append('price', price);
    formData.append('complete', complete);
    formData.append('pagelink', pagelink);
    formData.append('youtube', youtube);

    formData.append('propertydesc', propertydesc);
    formData.append('payment', payment);
    formData.append('facilities', facilities);
    formData.append('features', features);
    formData.append('location', location);
    // Append single files
    formData.append('bannerimg', bannerimg);
   
    formData.append('floor', floor);
    formData.append('brochure', brochure);


    // Append multiple files
    if (gallaryimgs) {
      gallaryimgs.forEach((file, index) => {
        formData.append(`galleryimg${index}`, file);
      });
    }

    try {
      const response = await axios.post('http://localhost:4000/newlydata', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }

  };

  // EDIT PROPERTY 
  const handleEdit = (id) => {
    setBtnval(true)
    setEditId(id)
    setShowAddUpdateBtn(true)
    axios.get(`http://localhost:4000/newlyedit/${id}`).then((res) => {
      setPropertyname(res.data[0].propertyname);
      setPropertyLocation(res.data[0].propertylocation);
      setDevname(res.data[0].developername);
      setPrice(res.data[0].price);
      setBannerimg(res.data[0].bannerimage);
      setFloorplan(res.data[0].floorplan);
      setBrochure(res.data[0].brochure);
      setBrochure(res.data[0].complete);
      setyoutube(res.data[0].youtube);
      setLocation(res.data[0].location);
      setPropertydesc(res.data[0].description);
      setPayment(res.data[0].paymentplan);
      setFacilities(res.data[0].facilities);
      setFeatures(res.data[0].keyfeatures);
    });
    axios.get(`http://localhost:4000/getpropertyImages/${id}`).then((res)=>{
      
setImgdata(res.data)
    })
  };


  //UPDATE CODE
  const UpdateProperty = async () => {
    const formData = new FormData();
    console.log(propertyname, "ok");
    // Append text data
    formData.append('propertyname', propertyname);
    formData.append('propertyloaction', propertyloaction);
    formData.append('devname', devname);
    formData.append('price', price);
    formData.append('complete', complete);
    formData.append('pagelink', pagelink);
    formData.append('propertydesc', propertydesc);
    formData.append('payment', payment);
    formData.append('facilities', facilities);
    formData.append('features', features);
    formData.append('youtube', youtube);
    formData.append('location', location);

    // Append single files
    formData.append('bannerimg', bannerimg);
 
    formData.append('floor', floor);
    formData.append('brochure', brochure);
   
    try {
      const response = await axios.post(`http://localhost:4000/updatenewlyproperty/${EditId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        alert("Data is Updated")
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  // console.log(updateimagestate,"file");  
  const handleImageDelete=(id)=>{
    axios.delete(`http://localhost:4000/deletepropertyimage/${id}`).then((res)=>{
      if(res.status===200){
        GetGallary();
        alert("Image is deleted!")
      }
    })

  }
  const handleDelete = (item) => {
    let data = item;
    console.log(data);
  
    // Prompting the confirmation dialog
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    
    if (confirmed) {
      axios.post(`http://localhost:4000/deleteproperty`, data)
        .then((res) => {
          if (res.status === 200) {
            GetData();
            alert("Image is deleted!");
          }
        })
        .catch((error) => {
          console.error("Error deleting image:", error);
          // Handle error cases here
        });
    }
  };
  
  return (
    <>
      <main id="whole" className="p-0 m-auto mt-5" style={{ width: "100%" }} >
        <div className="my-3" style={{ padding: "15px", display: "flex", justifyContent: "space-between" }}>
          <h4>New Development</h4>
          <div >

            <Button className="mr-3" variant="success" onClick={Backbutton}>Back</Button>
            <Button variant="success" onClick={SetButtonValue}>Add Property</Button>
          </div>

        </div>
        {btnval === false ?
          <table className="table table-bordered">
            <thead>
              <tr>
                <th width="100">S. No</th>
                <th>Property Name</th>
                <th>Price</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td >{index + 1}</td>
                  <td>{item.propertyname}</td>
                  <td>{item.price}</td>


                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm ms-1"
                    onClick={() => handleDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          :
          <>
            <div className="container-fluid">
              <div className="row clearfix space-cont box_my">
                <div className="col-lg-12">
                  {/* *****************Header************** */}
                  <div className="card p-4">

                    <div className="card p-4">
                      <h4><strong>Section 1</strong></h4>

                      <div className="row" style={{ textAlign: "left" }}>



                        <div className="col-6  ban-top">
                          <label for="title" className="form-label"  >Banner Image</label>
                          <input type="file" className="form-control"
                            onChange={handleBannerImg}
                          />
                        </div>

                        {bannerpreview ?
                          <img src={bannerpreview} style={{ height: "150px", width: "400px", objectFit: "contain" }} alt="Preview" />
                          :
                          (bannerimg &&
                            <img src={`uploads/${bannerimg}`} style={{ height: "150px", width: "400px", objectFit: "contain" }} alt="Banner Image" />
                          )
                        }


                        <div className="col-12 col-sm-12 col-md-12	col-lg-6 col-xl-6  ban-top">
                          <label for="title" className="form-label"  >Property Name</label>
                          <input type="text"
                            value={propertyname}
                            className="form-control" onChange={(e) => setPropertyname(e.target.value)} />
                        </div>

                        <div className="col-12 col-sm-12 col-md-12	col-lg-6 col-xl-6  ban-top">
                          <label for="title" className="form-label" >Property Location</label>
                          <input type="text"
                            value={propertyloaction}
                            className="form-control" onChange={(e) => setPropertyLocation(e.target.value)} />
                        </div>
                        <div className="col-12 col-sm-12 col-md-12	col-lg-6 col-xl-6  ban-top">
                          <label for="title" className="form-label" >Property Link</label>
                          <input type="text"
                            value={pagelink}
                            className="form-control" onChange={(e) => setPagelink(e.target.value)} />
                        </div>
                        <div className="col-12 col-sm-12 col-md-12	col-lg-6 col-xl-6  ban-top">
                          <label for="title" className="form-label" >Project Completed In</label>
                          <input type="text"
                            value={complete}
                            className="form-control" onChange={(e) => setComplete(e.target.value)} />
                        </div>
                      </div>
                    </div>



                  </div>
                  {/* *****************Contact Form************** */}
                  <div className="card p-4">
                    <h4><strong>Section 2</strong></h4>
                    <div className="row" style={{ textAlign: "left" }}>
                      <div className="col-6  ban-top">
                        <label for="title" className="form-label" >Developer Name</label>
                        <input type="text"
                          value={devname}
                          className="form-control" onChange={(e) => setDevname(e.target.value)} />
                      </div>
                      <div className="col-6  ban-top">
                        <label for="title" className="form-label" >Price</label>
                        <input type="text" value={price} className="form-control" onChange={(e) => setPrice(e.target.value)} />
                      </div>
                      <div className="col-6  ban-top">
                        <label for="title" className="form-label" >Brochure</label>
                        <input type="file" className="form-control" onChange={(e) => setBrochure(e.target.files[0])} />
                        {/* <p className="ml-1">{brochure}</p> */}
                      </div>
                      <div className="col-6  ban-top">
                        <label for="title" className="form-label" >Floor Plan</label>
                        <input type="file" className="form-control" onChange={(e) => setFloorplan(e.target.files[0])} />
                        {/* <p className="ml-1">{floor}</p> */}
                      </div>
                      <div className="col-12 mt-5" style={{ display: "grid" }}>
                        <label for="title" className="form-label" >Key Features</label>
                        <ReactQuill
                          theme="snow"
                          modules={modules}
                          formats={formats}
                          //   placeholder={data.privacytext} // Use placeholder to set initial content
                          value={features}
                          onChange={handleFeatures}

                          style={{ height: "200px", marginTop: "20px", backgroundColor: "white", color: "black", width: "100%", border: "none", marginBottom: "60px" }}

                        >
                        </ReactQuill>
                      </div>
                    </div>
                  </div>

                  {/* *****************Holiday Homes************** */}
                  <div className="card p-4">
                    <h4><strong>Section 3</strong></h4>

                    <div className="row" style={{ textAlign: "left" }}>

                      <div className="col-6  ban-top">
                        <label for="title" className="form-label" >Youtue Link</label>
                        <input type="text" className="form-control" onChange={(e) => setyoutube(e.target.value)} />
                        {/* <p className="ml-1">{youtube}</p> */}
                      </div>

                      <div className="col-6   ban-top">
                        <label for="title" className="form-label">Location Link</label>
                        <input type="text" className="form-control" onChange={(e) => setLocation(e.target.value)} />
                        {/* <p className="ml-1">{location}</p> */}
                      </div>
                      <div className="col-6 mt-5" style={{ display: "grid", justifyContent: "center" }}>
                        <label for="title" className="form-label" >Facilities</label>
                        <ReactQuill
                          theme="snow"
                          modules={modules}
                          formats={formats}

                          value={facilities}
                          onChange={handleFacilities}
                          style={{ height: "200px", width: "auto", marginTop: "20px", backgroundColor: "white", color: "black", border: "none", marginBottom: "60px" }}

                        >

                        </ReactQuill>

                      </div>
                      <div className="col-6 mt-5" style={{ display: "grid", justifyContent: "center" }}>
                        <label for="title" className="form-label" >Payment Plan</label>
                        <ReactQuill
                          theme="snow"
                          modules={modules}
                          formats={formats}
                          value={payment}
                          onChange={handleChangepayment}
                          style={{ height: "200px", width: "auto", marginTop: "20px", backgroundColor: "white", color: "black", border: "none", marginBottom: "60px" }}
                        >

                        </ReactQuill>

                      </div>
                      <div className="col-12 mt-5" style={{ display: "grid" }}>
                        <label for="title" className="form-label" >Property Description</label>
                        <ReactQuill
                          theme="snow"
                          modules={modules}
                          formats={formats}
                          value={propertydesc}
                          onChange={handlePropertyDesc}
                          style={{ height: "200px", marginTop: "20px", backgroundColor: "white", color: "black", width: "100%", border: "none", marginBottom: "60px" }}

                        >
                        </ReactQuill>
                      </div>
                      {showAddUpdateBtn === false ?
                        <>
                          <div className="col-12 ban-top">
                            <label for="title" className="form-label" >Gallary Images</label>
                            <input type="file" multiple className="form-control" onChange={handleFileChange} />
                          </div>
                          <div className="col-sm-12 submit-opt">

                            <button type="submit" className="btn col-sub btn-round" onClick={handleProperty}>
                              Add Property
                            </button>

                          </div>
                        </>
                        :
                        <>
                          <div className="col-sm-12 submit-opt">
                            <button type="submit" className="btn col-sub btn-round" onClick={UpdateProperty}>
                              Update
                            </button>
                          </div>
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th width="100">S. No</th>
                                <th>Property Name</th>
                                <th>Image</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {imgData.map((item, index) => (
                                <tr key={item.id}>
                                  <td>{index + 1}</td>
                                  <td>{item.propertyname}</td>
                                  <td>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                      <img style={{ height: "100px", objectFit: "contain" }} src={`/uploads/${bannerimg}`} />
                                  
                                      {item.showInput ? (
                                        <input type="file" id="choos" onChange={(e) => takeFile(e.target.files[0], item.id, index)} />
                                      ) : null}
                                    </div>
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-success btn-sm"
                                      onClick={() => handleImageEdit(index)}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="btn btn-danger btn-sm ms-1"
                                    onClick={() => handleImageDelete(item.id)}
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              ))}

                            </tbody>
                          </table>
                        </>

                      }
                    </div>

                  </div>

                </div>
              </div>
            </div>

          </>
        }


      </main>

    </>
  );
}

export default NewDevelop;