import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';

const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
`;
const TestimonialManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [star, setStar] = useState('');
  const [review, setReview] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleStarChange = (value) => {
    setStar(value);
  };


  const fetchTestimonials = () => {
    axios.get('http://localhost:4000/api/testimonials')
      .then(response => setTestimonials(response.data))
      .catch(error => console.error('Error fetching testimonials:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const testimonial = { name, time, star, review };

    if (editId !== null) {
      axios.put(`http://localhost:4000/api/testimonials/${editId}`, testimonial)
        .then(() => {
          Swal.fire('Success!', 'Testimonial updated successfully!', 'success');
          resetForm();
          fetchTestimonials();
        })
        .catch(error => console.error('Error updating testimonial:', error));
    } else {
      axios.post('http://localhost:4000/api/testimonials', testimonial)
        .then(() => {
          Swal.fire('Success!', 'Testimonial added successfully!', 'success');
          resetForm();
          fetchTestimonials();
        })
        .catch(error => console.error('Error adding testimonial:', error));
    }
  };

  const handleEdit = (testimonial) => {
    setName(testimonial.Name);
    setTime(testimonial.time);
    setStar(testimonial.Star);
    setReview(testimonial.Review);
    setEditId(testimonial.TID);
  };

  const handleDelete = (testimonial) => {
    axios.delete(`http://localhost:4000/api/testimonials/${testimonial.TID}`)
      .then(() => {
        Swal.fire('Success!', 'Testimonial deleted successfully!', 'success');
        fetchTestimonials();
      })
      .catch(error => console.error('Error deleting testimonial:', error));
  };

  const resetForm = () => {
    setName('');
    setTime('');
    setStar('');
    setReview('');
    setEditId(null);
  };
  let sno4 = 0; // Initialize the counter



  return (
    <div className="container my-4 box">
       <div className="header">
        <h1>Rh Dubai Backend</h1>
      </div>

      <div className="editor-header">
        <div className="title-container">
          <h1>Testimonial Details</h1>
        </div>
        <div className="buttons-container">
          <Link to="/backend" className="btn btn-success">
            Back to Backend
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input 
            type="text" 
            className="form-control" 
            id="name"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="time" className="form-label">Time:</label>
          <input 
            type="text" 
            className="form-control"
            id="time" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="star" className="form-label">Star Rating:</label>
          <Rating
            start={0}
            stop={5}
            step={1}
            fractions={2}
            initialRating={star}
            onChange={handleStarChange}
            emptySymbol="far fa-star icon-color"
            fullSymbol="fas fa-star icon-color"
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="review" className="form-label">Review:</label>
          <textarea 
            className="form-control"
            id="review"
            value={review} 
            onChange={(e) => setReview(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-success">
          {editId !== null ? 'Update Testimonial' : 'Add Testimonial'}
        </button>
      </form>

      <h2 className="mb-3">Testimonials</h2>
      <table className="table table-striped">
        <thead>
          <tr>
          <th width="100">S. No</th> 
                      <th>Name</th>
            <th>Time</th>
            <th>Star Rating</th>
            <th>Review</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((testimonial) => (
            <tr key={testimonial.TID}>
               <td >{++sno4}</td> {/* Increment the counter */}
              <td>{testimonial.Name}</td>
              <td>{testimonial.time}</td>
              <td>{testimonial.Star}</td>
              <td>{testimonial.Review}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(testimonial)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(testimonial)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default TestimonialManager;
