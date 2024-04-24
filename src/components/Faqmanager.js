import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import "../styles/banner/banner.css";

const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
`;

const FAQManager = () => {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = () => {
    axios
      .get('http://localhost:4000/api/faqs')
      .then((response) => setFaqs(response.data))
      .catch((error) => console.error('Error fetching FAQs:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId !== null) {
      // Update FAQ
      axios
        .put(`http://localhost:4000/api/faqs/${editId}`, { question, answer })
        .then(() => {
          Swal.fire({
            title: 'Success!',
            text: 'FAQ updated successfully!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          fetchFaqs();
          setQuestion('');
          setAnswer('');
          setEditId(null);
        })
        .catch((error) => console.error('Error updating FAQ:', error));
    } else {
      // Add new FAQ
      axios
        .post('http://localhost:4000/api/faqs', { question, answer })
        .then(() => {
          Swal.fire({
            title: 'Success!',
            text: 'FAQ Added successfully!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          fetchFaqs();
          setQuestion('');
          setAnswer('');
        })
        .catch((error) => console.error('Error adding FAQ:', error));
    }
  };

  const handleEdit = (faq) => {
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setEditId(faq.id);
  };
  let sno4 = 0; // Initialize the counter


  const handleDelete = (faq) => {
    axios
      .delete(`http://localhost:4000/api/faqs/${faq.id}`)
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'FAQ Deleted successfully!',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        fetchFaqs();
        setQuestion('');
        setAnswer('');
        setEditId(null);
      })
      .catch((error) => console.error('Error deleting FAQ:', error));
  };

  return (

    <Container className="container">
      <div className="header">
        <h1>Rh Dubai Backend</h1>
      </div>

      <div className="editor-header">
        <div className="title-container">
          <h1>FAQ Details</h1>
        </div>
        <div className="buttons-container">
          <Link to="/backend" className="btn btn-success">
            Back to Backend
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Question:</label>
          <input
            type="text"
            className="form-control"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Answer:</label>
          <textarea
            className="form-control"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        <br />
        <button type="submit" className="btn btn-success">
          {editId !== null ? 'Update FAQ' : 'Add FAQ'}
        </button>
      </form>

      <hr></hr>
      <h2 className='text-center'>List of All FAQ's</h2>
     
      <table className="table table-bordered">
        <thead>
          <tr>
            <th width="100">S. No</th> 
            <th>Question</th>
            <th>Answer</th>
            <th width="200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {faqs.map((faq) => (
            <tr key={faq.id}>
              <td >{++sno4}</td> {/* Increment the counter */}
             
              <td>{faq.question}</td>
              <td>{faq.answer}</td>
              <td>
                <div className="btn-group">
                  <button
                    className="btn btn-success"
                    onClick={() => handleEdit(faq)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(faq)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default FAQManager;
