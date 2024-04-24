import React from "react";
import { useContext,useState,useEffect } from "react";
import UserContext from "../../Context/UserContext"
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";

export default function FandQViewPage(){
  const [chgwid, setChgwid] = useState({"margin": "90px 0px 15px 250px"})
  const userVal = useContext(UserContext)
  useEffect(() => {
      if (userVal.user === "Close") {
          setChgwid({
              "transitionDuration": "300ms",
              "transitionProperty": "margin",
              "margin": "90px 0px 15px 0px"
          });

      } else if (userVal.user === "Open") {
          setChgwid({
              "transitionDuration": "500ms",
              "transitionProperty": "margin",
              "margin": "90px 0px 15px 250px"
          });
      }
  }, [userVal.user]);


  return(
      <>
<main id="main" style={chgwid}>
    <div  className="block-header">
      <div  className="container">
      <div  className="row">
          <div  className="col-lg-7 col-md-6 col-sm-12">
              <h2>Dashboard
              <small  className="text-muted">Welcome to Compass</small>
              </h2>
          </div>
          <div  className="col-lg-5 col-md-6 col-sm-12 d-flex justify-content-end">                
              
              <ul  className="breadcrumb float-md-right">
                  <li  className="breadcrumb-item"><a href="index.html"><i  className="bx bx-home"></i> Compass</a></li>
                  <li  className="breadcrumb-item active">F & Q</li>
                 
              </ul>  
                            
          </div>
      </div>
    </div>
  </div>

{/* <!-- box --> */}
<div  className="container">
	<div  className="row">
        <div  className="col-md-12">
        <div  className="table-responsive">
              <table id="mytable"  className="table table-bordred table-striped">
                   
                   <thead>
                   <tr  className="tab-head">
                   <th>S No.</th>
                   <th>Property name</th>
                    <th>Property title</th>
                     <th>Primary view</th>
                     <th>Community</th>
                     <th>Price</th>
                      <th>Size</th>
                      <th>Action</th>
                    </tr>
                   </thead>
    <tbody>
    
    <tr>
      <td>1</td>
    <td>Loss Angel</td>
    <td>xyz</td>
    <td>yes</td>
    <td>multiple</td>
    <td>$4500</td>
    <td>3.5</td>
   
    <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
    </td>
    </tr>
    
    <tr>
      <td>dwsd</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
    </td>
      </tr>

      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
    </td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
    </td>
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
 
            </td>
            </tr>
    
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
 
              </td>
              </tr>
    
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
 
                </td>
                </tr>

                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
 
                  </td>
                  </tr>

                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
 
                    </td>
                    </tr>

                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
 
                      </td>
                      </tr>

                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
 
                        </td>
                        </tr>

                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
 
                          </td>
                          </tr> 
    
    </tbody>
        
</table> 
            </div>
        </div>
	</div>
    <div  className="col-sm-12 sub-opt submit-opt">
        <button type="submit"  className="btn col-sub btn-round">Add More</button>
    </div>
</div>


<div  className="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="edit" aria-hidden="true">
      <div  className="modal-dialog">
    <div  className="modal-content">
          <div  className="modal-header">
        <button type="button"  className="close" data-dismiss="modal" aria-hidden="true"><span  className="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
        <h4  className="modal-title custom_align" id="Heading">Edit Your Detail</h4>
      </div>
          <div  className="modal-body">
          <div  className="form-group">
        <input  className="form-control " type="text" placeholder="Mohsin"/>
        </div>
        <div  className="form-group">
        
        <input  className="form-control " type="text" placeholder="Irshad"/>
        </div>
        <div  className="form-group">
        <textarea rows="2"  className="form-control" placeholder="CB 106/107 Street # 11 Wah Cantt Islamabad Pakistan"></textarea>
    
        
        </div>
      </div>
          {/* <div  className="modal-footer ">
        <button type="button"  className="btn btn-warning btn-lg" style="width: 100%;"><span  className="glyphicon glyphicon-ok-sign"></span> Update</button>
      </div> */}
        </div>
    {/* <!-- /.modal-content -->  */}
  </div>
      {/* <!-- /.modal-dialog -->  */}
    </div>
    
    
    
    <div  className="modal fade" id="delete" tabindex="-1" role="dialog" aria-labelledby="edit" aria-hidden="true">
      <div  className="modal-dialog">
    <div  className="modal-content">
          <div  className="modal-header">
        <button type="button"  className="close" data-dismiss="modal" aria-hidden="true"><span  className="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
        <h4  className="modal-title custom_align" id="Heading">Delete this entry</h4>
      </div>
          <div  className="modal-body">
       
       <div  className="alert alert-danger"><span  className="glyphicon glyphicon-warning-sign"></span> Are you sure you want to delete this Record?</div>
       
      </div>
        <div  className="modal-footer ">
        <button type="button"  className="btn btn-success" ><span  className="glyphicon glyphicon-ok-sign"></span> Yes</button>
        <button type="button"  className="btn btn-default" data-dismiss="modal"><span  className="glyphicon glyphicon-remove"></span> No</button>
      </div>
        </div>
    {/* <!-- /.modal-content -->  */}
  </div>
      {/* <!-- /.modal-dialog -->  */}
    </div>

  </main>
  {/* <!-- End #main --> */}

        
        </>
    );
}

