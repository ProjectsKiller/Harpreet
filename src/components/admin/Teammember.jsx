import React from "react";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../Context/UserContext";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { FaRegEye } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";

export default function AddOurTeam() {
  const [chgwid, setChgwid] = useState({ margin: "66px 0px 15px 250px" });
  const userVal = useContext(UserContext);
  useEffect(() => {
    if (userVal.user === "Close") {
      setChgwid({
        transitionDuration: "300ms",
        transitionProperty: "margin",
        margin: "66px 0px 15px 0px",
      });
    } else if (userVal.user === "Open") {
      setChgwid({
        transitionDuration: "500ms",
        transitionProperty: "margin",
        margin: "66px 0px 15px 250px",
      });
    }
  }, [userVal.user]);

  const [bg1, setbg1] = useState(null);
  const [uptbtn, setuptbtn] = useState(false);

  const [file, setFile] = useState("");

  function handleChange(e) {
    const selectedFile = e.target.files[0];

    setFile(URL.createObjectURL(selectedFile));
    setbg1(selectedFile);
  }
  const [data, setData] = useState({
    Name: "",
    Job: "",
    email: "",
    image: "",
  });

  const [teamdata, setTeamdata] = useState([]);
 const [editId,setEditId]=useState('')


 function GetData(){
    const tablename = "ourteam";
    const tablen = { tablename: tablename };
    axios.post(`/staticdata`, tablen).then((res) => {

      setTeamdata(res.data);
      setbg1(res.data[0].sec1bgimage);
      setData({
        sec1bgimage: res.data[0].sec1bgimage,
        sec1heading: res.data[0].sec1heading,
        sec1discription: res.data[0].sec1discription,
        sec2heading: res.data[0].sec2heading,
      });
    });
 }
  useEffect(() => {
 GetData();
  }, []);

  function AddData(e) {
    e.preventDefault();
    let mydata = {
      Name: data.Name,
      Job: data.Job,
      email: data.email,
      bg1: bg1,
    };
    console.log(mydata,"mydata");
    const formData = new FormData();

    // Append text data
    formData.append("Name", data.Name);
    formData.append("Job", data.Job);
    formData.append("email", data.email);

  
    // Handle images
    function appendImageIfDefined(fieldName, fileVariable) {
      if (fileVariable) {
        formData.append(fieldName, fileVariable);
      } else {
        formData.append(fieldName, data[fieldName]);
      }
    }
    appendImageIfDefined("bg1", bg1);

      axios.post(`/addteam`,formData).then((res) => {
        if(res.data.msg==="200"){
          alert("Member is added Sucessfully!!")
          GetData();
        }

      })
  }

  function UpdateMember(e) {

    e.preventDefault();
    let mydata = {
      Name: data.Name,
      Job: data.Job,
      email: data.email,
      bg1: bg1,
      id:editId
    };
    const formData = new FormData();
    formData.append("Name", data.Name);
    formData.append("Job", data.Job);
    formData.append("email", data.email);
    formData.append("id",editId)
    function appendImageIfDefined(fieldName, fileVariable) {
      if (fileVariable) {
        formData.append(fieldName, fileVariable);
      } else {
        formData.append(fieldName, data[fieldName]);
      }
    }
    appendImageIfDefined("bg1", bg1);
      axios.post(`/updatemember`,formData).then((res) => {
        if(res.data.msg==="200"){
          alert("Data is updated!")
          GetData();
        }
      })
  }



  function DataEdit(e) {
    setuptbtn(true);
    const id = e.target.id;
    setEditId(id)
    const tablename = "ourteam";
    const tablen = { "tablename": tablename ,"id":id};
    axios.post(`/staticdatawithid`, tablen).then((res) => {
        setbg1(res.data[0].image);
        setData({ Name: res.data[0].Name,
            Job: res.data[0].Job,
            email: res.data[0].email,
            bg1: res.data[0].image });
    });
  }

  function DeleteMember(e) {
    const id = e.target.id;
    const tablename = "ourteam";
    const tablen = { "tablename": tablename,"id":id };
    axios.post(`/deletewithid`,tablen).then((res) => {
      if (res.data.msg === "200") {
        alert("Member is Deleted Sucessfully!!");
        GetData();
      }
    });
  }



  return (
    <>
      <main id="whole" style={chgwid}>
        {/* <!-- box --> */}

        <div className="container-fluid box_my" id="part">
          <div className="container">
            <div className="block-header">
              <div className="row">
                <div className="col-lg-7 col-md-6 col-sm-12">
                  <h2>
                    Our Team
                    <small className="text-muted">Welcome to Page</small>
                  </h2>
                </div>
                <div className="col-lg-5 col-md-6 col-sm-12 d-flex justify-content-end">
                  <ul className="breadcrumb float-md-right">
                    <li className="breadcrumb-item">
                      <a href="index.html">
                        <i className="bx bx-home"></i> Page
                      </a>
                    </li>
                    <li className="breadcrumb-item active">Our Team</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="header">
                    <h2>
                      <strong>Section</strong> "Our Team"
                    </h2>
                    <ul className="header-dropdown">
                      <li className="dropdown">
                        {" "}
                        <a
                          href="javascript:void(0);"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="bi bi-three-dots-vertical"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="body">
                    <div className="row clearfix">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label for="title" className="form-label">
                            Team Member Image
                          </label>
                          <input
                            type="file"
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-sm-6 mb-5">
                        {/* <div className="form-group logo-group"> */}
                        <div
                          className="logo-img1"
                          //  onClick={My}
                        >
                          {/* <img src="/img/Logo.jpg" alt="Logo image here" /> */}
                          {file ? (
                              // If IconChange1 is not null or undefined (changed), display the updated image
                              <img src={file} alt="Updated Icon" />
                            ) : (
                              // If IconChange1 is null or undefined (not changed), display the image from /uploads/
                              <img src={`/uploads/${bg1}`} alt="Default Icon" />
                            )}
                        </div>
                        {/* </div> */}
                      </div>

                      <div className="col-sm-4">
                        <div className="form-group">
                          <label for="title" className="form-label">
                            Title
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={data.Name}
                            onChange={(e) =>
                              setData({ ...data, Name: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label for="title" className="form-label">
                            Designation
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={data.Job}
                            onChange={(e) =>
                              setData({ ...data, Job: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label for="title" className="form-label">
                            E-mail
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={data.email}
                            onChange={(e) =>
                              setData({ ...data, email: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {uptbtn === false ? (
                    <div className="col-sm-12 sub-opt submit-opt">
                      <button
                        type="submit"
                        className="btn col-sub btn-round"
                        onClick={AddData}
                      >
                        Add
                      </button>
                    </div>
                  ) : (
                    <div className="col-sm-12 sub-opt submit-opt">
                      <button
                        type="submit"
                      
                        className="btn col-sub btn-round"
                        onClick={UpdateMember}
                      >
                        Update
                      </button>
                    </div>
                  )}
                </div>
                <div className="card">
                  <div className="table-responsive">
                    <table
                      id="mytable"
                      className="table table-bordred table-striped my-tab"
                    >
                      <thead>
                        <tr className="tab-head">
                          <th>S No.</th>
                          <th>Name</th>
                          <th>Job</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                       {teamdata.map((item,index)=>{
                        return(
                            <tr>
                            <td>{index + 1}</td>
                            <td>{item.Name}</td>
                            <td>{item.Job}</td>
                            <td>
                              {/* <TiPencil className="icon-tab" /> */}

                              <div>
                                <button
                                   id={item.ID}
                                  onClick={DataEdit}
                                  style={{
                                    backgroundColor: "#fc9e07",
                                    color: "#fff",
                                    padding: "1px 10px",
                                    borderColor: "fc9e07",
                                    border: "1px solid #fc9e07",
                                    borderRadius: "2px",
                                    marginRight: "5px",
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  id={item.ID}
                                  onClick={DeleteMember}
                                  style={{
                                    backgroundColor: "#fc9e07",
                                    color: "#fff",
                                    padding: "1px 10px",
                                    border: "1px solid #fc9e07",
                                    borderRadius: "2px",
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                       })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <!-- End #main --> */}
    </>
  );
}
