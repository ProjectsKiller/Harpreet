import React from "react";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../Context/UserContext";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import axios from 'axios'

export default function FandQ() {
  const [data, setdata] = useState([])
  const [idfandq, setid] = useState()
  const [chgwid, setChgwid] = useState({ "margin": "66px 0px 15px 250px" })
  const userVal = useContext(UserContext)
  const [heading, setheading] = useState("")
  const [question, setquestion] = useState("")
  const [answer, setanswer] = useState("")

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

  useEffect(() => {
    const tablename = "fandqdb"
	const tablen = {"tablename" : "fandqdb"}
    axios.post(`/staticdata`, tablen).then((res) => {
      setdata(res.data)
    })
  }, []);

  function editData(e) {
    const id = e.target.id
    setid(id)
    data.map((item) => {
      if (item.question_number == id) {
        setquestion(item.question_text)
        setanswer(item.answer_text)
      }
    })
  }

  function Updatedata(e) {
    const data = { "heading": heading, "question": question, "answer": answer , "id" : idfandq }
    console.log(data);
    if (question && answer) {
      axios.post(`/updatefandq`, data).then((res) => {
        if (res.data.msg === "200") {
          alert("Data is updated!")
        }

      })
    }
  }

  return (
    <>
      <main id="whole" style={chgwid}>


        {/* <!-- box --> */}

        <div className="container-fluid">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>FAQ
                  <small className="text-muted">Welcome to Page</small>
                </h2>
              </div>
              <div className="col-lg-5 col-md-6 col-sm-12 d-flex justify-content-end">

                <ul className="breadcrumb float-md-right">
                  <li className="breadcrumb-item"><a href="index.html"><i className="bx bx-home"></i> Page</a></li>
                  <li className="breadcrumb-item active">FAQ</li>

                </ul>

              </div>
            </div>
          </div>
          <div className="row clearfix space-cont box_my">
            <div className="col-lg-12">

              <div className="card">
                <div className="header">
                  <h2><strong>Section 1</strong> "Information" </h2>
                  <ul className="header-dropdown">
                    <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                    </li>
                  </ul>
                </div>

                <div className="body">
                  <div className="row clearfix">
                    {/* ********Main Heading*********** */}
                    <div className="col-sm-12">
                      <div className="form_my">
                        <label for="title" className="form-label" >Main Heading</label>
                        <input type="text" className="form-control" value={heading} onChange={e => setheading(e.target.value)} />
                      </div>
                    </div>
                    {/* *********Question*********** */}
                    <div className="col-sm-12">
                      <div className="form_my">
                        <label for="title" className="form-label" >Question</label>
                        <input type="text" className="form-control" value={question} onChange={e => setquestion(e.target.value)} />
                      </div>
                    </div>
                    {/* *********Answer*********** */}
                    <div className="col-sm-12">
                      <div className="form_my">
                        <label for="title" className="form-label" >Answer</label>
                        <input type="text" className="form-control" value={answer} onChange={e => setanswer(e.target.value)} />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- table --> */}

        <div className="container">
          <div className="row">
            <div className="col-sm-12 sub-opt submit-opt">
              <button type="submit" onClick={Updatedata} className="btn col-sub btn-round">Update</button>
            </div>
            <div className="col-md-12">

              <div className="table-responsive">


                <table id="mytable" className="table table-bordred table-striped my-tab">

                  <thead>
                    <tr className="tab-head">
                      <th>S No.</th>
                      <th>Questions</th>
                      <th>Answer</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>

                    {data.map((item, index) => {
                      return (
                        <>
                          <tr>
                            <td>{item.question_number}</td>
                            <td>{item.question_text}</td>
                            <td>{item.answer_text}</td>
                            <td>
                       {/* <button id={item.question_number} onClick={editData} >       <TiPencil className="icon-tab" /></button> */}
                       <button id={item.question_number} onClick={editData} style={{backgroundColor:"yellow"}}>Edit</button>
                              <FaRegTrashAlt className="icon-tab" />
                            </td>
                          </tr>
                        </>
                      )
                    })}



                  </tbody>

                </table>
                <div className="clearfix"></div>
                <ul className="pagination pull-right">
                  <li className="disabled"><a href="#"><IoIosArrowBack /></a></li>
                  <li className="active"><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">4</a></li>
                  <li><a href="#">5</a></li>
                  <li><a href="#"><IoIosArrowForward />
                  </a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-12 sub-opt submit-opt">
            <button type="submit" className="btn col-sub btn-round">Update</button>
          </div>
        </div>

      </main>
      {/* <!-- End #main --> */}
    </>
  )
}