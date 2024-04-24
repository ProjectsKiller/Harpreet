import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import { Button } from 'react-bootstrap';

import Swal from 'sweetalert2';

const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
`;

const BlogManager = () => {
	const [featuredHome,setFeaturedForHome]=useState(null);

	 const[ banner,setBanner]=useState('');
  const[ bannertxt,setBannertxt]=useState('');
	 const [bannerheading,setBannerheading]= useState('');
	 const [btnclick, setbtnclick]=useState(false);
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [description, setDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [url, setUrl] = useState('');
  const [editId, setEditId] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);

  useEffect(() => {
    fetchBlogs();
	   fetchBannerblog();
  }, []);

  const fetchBlogs = () => {
    axios
      .get('http://localhost:4000/api/blogs')
      .then((response) => setBlogs(response.data))
      .catch((error) => console.error('Error fetching blogs:', error));
  };
	  const fetchBannerblog = () => {
    axios
      .get('http://localhost:4000/getblogbanner').then((res)=>{
        setBanner(res.data[0].photo)
        setFeaturedForHome(res.data[0].featuredimage)
        
        setBannertxt(res.data[0].text)
      })
  };
  let sno4 = 0; // Initialize the counter

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('date', date);
    formData.append('seoTitle', seoTitle);
    formData.append('description', description);
    formData.append('metaKeywords', metaKeywords);
    formData.append('url', url);
    formData.append('featuredImage', featuredImage);
    formData.append('featuredHome', featuredHome);

    if (editId !== null) {
      // Update Blog
      axios
        .put(`http://localhost:4000/api/blogs/${editId}`, formData)
        .then(() => {
          Swal.fire({
            title: 'Success!',
            text: 'Blogs updated successfully!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          fetchBlogs();
          clearForm();
        })
        .catch((error) => console.error('Error updating blog:', error));
    } else {
      // Add new Blog
      axios
        .post('http://localhost:4000/api/blogs', formData)
        .then(() => {
          Swal.fire({
            title: 'Success!',
            text: 'Blogs Added successfully!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          fetchBlogs();
          clearForm();
        })
        .catch((error) => console.error('Error adding blog:', error));
    }
  };
	
	  function UpdateBanner(e){
		
    e.preventDefault();
    const formData = new FormData();
    formData.append("banner", banner); // Assuming banner is a file

    formData.append("bannertxt", bannertxt);
    formData.append("bannerheading", bannerheading);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios
    .post('http://localhost:4000/bannerblog',formData,config).then((res)=>{
      if (res.status === 201) {
        console.log("heree");
        // Success: Show success message
        Swal.fire({
          title: 'Success!',
          text: 'Data Updated successfully!',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        fetchBannerblog();
      
      }
    })
  }
	  function handlebtnclick(){
    setbtnclick(true);
  }

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setDate(blog.date); // Update date state
    setSeoTitle(blog.seo_title); // Update SEO title state
    setDescription(blog.description);
    setMetaKeywords(blog.meta_keywords); // Update meta keywords state
    setUrl(blog.url);
    setEditId(blog.id);
  };

  const handleDelete = (blog) => {
    axios
      .delete(`http://localhost:4000/api/blogs/${blog.id}`)
      .then(() => {
        fetchBlogs();
        clearForm();
      })
      .catch((error) => console.error('Error deleting blog:', error));
  };

  const handleFeaturedImageChange = (e) => {
    setFeaturedImage(e.target.files[0]);
  };

  const clearForm = () => {
    setTitle('');
    setContent('');
    setDate('');
    setSeoTitle('');
    setDescription('');
    setMetaKeywords('');
    setUrl('');
    setEditId(null);
    setFeaturedImage(null);
    setFeaturedForHome(null)
  };

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
    ]
  };

  var formats = [
    "header", "height", "bold", "italic",
    "underline", "strike", "blockquote",
    "list", "color", "bullet", "indent",
    "link", "image", "align", "size",
  ];

  return (
    <Container className="container">
   

       <div className="editor-header d-flex justify-content-between">
        <div className="title-container">
          <h1>Blog Details</h1>
        </div>
        <div className="buttons-container d-flex">
        <Button variant='success' onClick={handlebtnclick}>Edit Banner</Button>
          <Link to="/backend" className="btn btn-success ml-2">
            Back to Backend
          </Link>
        </div>
      </div>
{btnclick ? (
<div>
          <img src={`uploads/${banner}`} alt="teambanner" style={{marginBottom:"10px", height:"460px"}}/>
        <div className="mb-3">
          <label className="form-label">Banner Image:</label>
          <input
            type="file"
            className="form-control"
       
            onChange={(e) => setBanner(e.target.files[0])}
          
            required
          />
        </div>

        {/* <img src={`uploads/${featuredHome}`} alt="teambanner" style={{marginBottom:"10px", height:"460px"}}/>
        <div className="mb-3">
          <label className="form-label">Featured Image:</label>
          <input
            type="file"
            className="form-control"
       
            onChange={(e) => setFeaturedForHome(e.target.files[0])}
          
            required
          />
        </div> */}
		 <div className="mb-3">
          <label className="form-label">Banner Heading:</label>
          <input
            type="text"
            className="form-control"
            value={bannerheading}
            onChange={(e) => setBannerheading(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Banner Decription:</label>
          <input
            type="text"
            className="form-control"
            value={bannertxt}
            onChange={(e) => setBannertxt(e.target.value)}
            required
          />
        </div>
     
       
        <button type="submit" className="btn btn-success" onClick={UpdateBanner}>
          Update
        </button>
     </div>
	 ) :(
	 <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the blog title"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content:</label>
         

          <ReactQuill 
              value={content}
              onChange={setContent}
              placeholder="Enter the blog content"
              required
            />
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Date:</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">SEO Title:</label>
              <input
                type="text"
                className="form-control"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Enter the SEO title"
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the blog description"
            rows="3"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Meta Keywords:</label>
          <input
            type="text"
            className="form-control"
            value={metaKeywords}
            onChange={(e) => setMetaKeywords(e.target.value)}
            placeholder="Enter meta keywords (comma-separated)"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">URL:</label>
          <input
            type="text"
            className="form-control"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter the blog URL"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Featured Image:</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleFeaturedImageChange}
          />
          
        </div>
        <div className="mb-3">
          <label className="form-label">Small Image:</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e)=>setFeaturedForHome(e.target.files[0])}
          />
          
        </div>
        <button type="submit" className="btn btn-success">
          {editId !== null ? 'Update Blog' : 'Add Blog'}
        </button>
      </form>
      <hr></hr>
      <h2 className='text-center'>List of All Blogs</h2>
     
      <table className="table table-bordered">
        <thead>
          <tr>
          <th width="100">S. No</th> 
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Featured Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
                <td >{++sno4}</td> {/* Increment the counter */}
              <td>{blog.title}</td>
              <td>{blog.description}</td>
              <td>{blog.date}</td>
              <td>
                {blog.featured_image && (
                  <img
                    src={`uploads/${blog.featured_image}`}
                    alt={`Featured Image for ${blog.title}`}
                    className="img-thumbnail"
                    width="200px"
                  />
                )}
              </td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleEdit(blog)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm ms-1"
                  onClick={() => handleDelete(blog)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
	  </div>
	     )
          }
    </Container>
  );
};

export default BlogManager;
