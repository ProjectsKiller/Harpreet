import { useEffect, useState } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import DataTable from 'datatables.net-dt';


const PageList = ({ onSelectPage }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = () => {
    fetch('http://localhost:4000/api/pages')
      .then(response => response.json())
      .then(data => setPages(data))
      .catch(error => console.error('Error fetching pages:', error));
  };

  const handleDelete = (pageId) => {
    fetch(`http://localhost:4000/api/pages/${pageId}`, { method: 'DELETE' })
      .then(() => fetchPages()) // Refresh the list after deletion
      .catch(error => console.error('Error deleting page:', error));
  };


  useEffect(() => {
    if (pages.length > 0) {
      const timeoutId = setTimeout(() => {
        $('#example').DataTable();
      }, 800);
  
      return () => clearTimeout(timeoutId);
    }
  }, [pages]);

  return (


    <table className="table table-striped table-bordered display my-5" id="example" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th >S.No</th>
          <th >Title</th>
          <th >SEO Title</th>
          <th >SEO Meta Description</th>
          <th >Link Address</th>
          <th >Actions</th>
        </tr>
      </thead>
    
      <tbody>
        {pages.map((page, index) => (
          <tr key={page.id}>
            <td >{index + 1}</td>
            <td >{page.title}</td>
            <td >{page.seoTitle}</td>
            <td >{page.metaDescription}</td>
            <td >{page.linkAddress}</td>
            <td >
              <button className="btn btn-success mx-2" onClick={() => onSelectPage(page.id)}>Edit</button>
              <button className="btn btn-danger" onClick={() => handleDelete(page.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

  )
}

export default PageList;

