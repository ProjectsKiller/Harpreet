import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; 
const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #4caf50;
  color: white;
  padding: 15px;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SmallImg = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const TeamMemberManager = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [photo, setPhoto] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [sno, setSno] = useState(0);
  const [photoUrl, setPhotoUrl] = useState(''); // Add a new state variable for photo URL


  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = () => {
    axios
      .get('http://localhost:4000/api/team-members')
      .then((response) => setTeamMembers(response.data))
      .catch((error) => console.error('Error fetching team members:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('designation', designation);
    formData.append('email', email);
    formData.append('mobile', mobile);
    
    if (isEditMode && editMember) {
      // If photo exists, append it to the formData
      if (photo) {
        formData.append('photo', photo);
      }
  
      axios
        .put(`http://localhost:4000/api/team-members/${editMember.id}`, formData)
        .then(() => {
          Swal.fire({
            title: 'Success!',
            text: 'Member Updated Successfully!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          fetchTeamMembers();
          clearForm();
          setIsEditMode(false);
          setEditMember(null);
        })
        .catch((error) => console.error('Error editing team member:', error));
    } else {
      axios
        .post('http://localhost:4000/api/team-members', formData)
        .then(() => {

          Swal.fire({
            title: 'Success!',
            text: 'New Member Added Successfully!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });


          fetchTeamMembers();
          clearForm();
        })
        .catch((error) => console.error('Error adding team member:', error));
    }
  };
  

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleEdit = (member) => {
    setName(member.name);
    setDesignation(member.designation);
    setEmail(member.email);
    setIsEditMode(true);
    setEditMember(member);
    setPhotoUrl(`uploads/${member.photo}`); // Set photo URL when editing

  };

  const handleDelete = (member) => {
    axios
      .delete(`http://localhost:4000/api/team-members/${member.id}`)
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Team Member Deleted successfully!',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        fetchTeamMembers();
        clearForm();
      })
      .catch((error) => console.error('Error deleting team member:', error));
  };

  const clearForm = () => {
    setName('');
    setDesignation('');
    setEmail('');
    setPhoto(null);
  };

  return (
    <Container className="container">
     <div className="header">
        <h1>Rh Dubai Backend</h1>
      </div>

      <div className="editor-header">
        <div className="title-container">
          <h1>Team Member Management</h1>
        </div>
        <div className="buttons-container">
          <Link to="/backend" className="btn btn-success">
            Back to Backend
          </Link>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter the name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Designation:</label>
          <input
            type="text"
            className="form-control"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            placeholder="Enter the designation"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter the email address"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mobile:</label>
          <input
            type="text"
            className="form-control"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter the email address"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Photo:</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>
        {photoUrl && (
          <div className="mb-3">
            <label className="form-label">Current Photo:</label>
            <img
              src={photoUrl}
              alt={`Photo of ${name}`}
              width="100"
              className="img-thumbnail"
            />
          </div>
        )}
        <button type="submit" className="btn btn-success">
          {isEditMode ? 'Update Team Member' : 'Add Team Member'}
        </button>
      </form>
          <hr></hr>
      <h2 className='text-center'>List of All Team Members</h2>
      <Table>
        <thead>
          <tr>
            <Th>Sno</Th>
            <Th>Name</Th>
            <Th>Designation</Th>
            <Th>Email</Th>
            <Th>Photo</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member, index) => (
            <tr key={member.id}>
              <Td>{index + 1}</Td>
              <Td>{member.name}</Td>
              <Td>{member.designation}</Td>
              <Td>{member.email}</Td>
              <Td>
                <img src={`uploads/${member.photo}`} alt={`Photo of ${member.name}`} width="50" />
              </Td>
              <Td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleEdit(member)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm ms-1"
                  onClick={() => handleDelete(member)}
                >
                  Delete
                </button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TeamMemberManager;
