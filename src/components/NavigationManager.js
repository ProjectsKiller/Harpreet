import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // You may need to install react-router-dom if you haven't already
import Swal from 'sweetalert2';



const NavigationManager = () => {
    const [navigationItems, setNavigationItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [navItem, setNavItem] = useState({ id: null, title: '', url: '', position: 0 ,windowopen:"samewindow"});
    const [isEditing, setIsEditing] = useState(false);
    const [logo, setLogo] = useState(null); // Initialized as an empty string
    const [navStyle, setNavStyle] = useState({ color: '#000000', fontSize: '16px', fontFamily: 'Arial' });
    const [buttonText, setButtonText] = useState(''); // Initialized as an empty string
    const [buttonLink, setButtonLink] = useState(''); // Initialized as an empty string
    const [headerBackground, setHeaderBackground] = useState('#FFFFFF');
    const [buttonTextColor, setButtonTextColor] = useState('#FFFFFF'); // New state
    const [buttonBackgroundColor, setButtonBackgroundColor] = useState('#000000'); // New state
    const [buttonFontSize, setButtonFontSize] = useState('16px'); // New state



    const [selectedOption, setSelectedOption] = useState('someOption'); // Initial value
    
    const handleOpenWindowChange = (e) => {
        const { value } = e.target;
        
        setNavItem({ ...navItem, windowopen: value });
    };
    




    useEffect(() => {
        fetchNavigationItems();
        fetchHeaderStyles();
    }, []);
    const handleLogoChange = (e) => {
        setLogo(e.target.files[0]);
    };

    const fetchHeaderStyles = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/header-styles');
            const data = response.data;

            setLogo(data[0].logo);
            setHeaderBackground(data[0].header_background_color);
            setNavStyle({
                color: data[0].nav_color,
                fontSize: data[0].nav_font_size,
                fontFamily: data[0].nav_font_family
            });
            setButtonText(data[0].button_text);
            setButtonLink(data[0].button_link);
            setButtonTextColor(data[0].buttonTextColor || '#FFFFFF');
            setButtonBackgroundColor(data[0].buttonBackgroundColor || '#000000');
            setButtonFontSize(data[0].buttonFontSize );
        } catch (error) {
            console.error('Error fetching header styles:', error);
        }
    };


    const fetchNavigationItems = () => {
        axios.get('http://localhost:4000/api/navigation')
            .then(response => {
                setNavigationItems(response.data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching navigation items:', error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const endpoint = isEditing ? `http://localhost:4000/api/navigation/${navItem.id}` : 'http://localhost:4000/api/navigation';
        const method = isEditing ? 'put' : 'post';
    
        axios[method](endpoint, navItem)
            .then(response => {
                fetchNavigationItems();
                resetForm();
                if (response.status ===200) {
                    // Show success alert
                    Swal.fire({
                        title: 'Success!',
                        text: 'Item Updated successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                      });
                }
                else{
                    Swal.fire({
                        title: 'Success!',
                        text: 'Data is Added successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                      });
                }
            })
            .catch(error => {
                console.error('Error submitting navigation item:', error);
                // Show error alert
                alert('An error occurred while submitting the form.');
            });
    };
    


    
    const handleHeaderStyleSubmit = (e) => {
 
        e.preventDefault();
        const formData = new FormData();

        if (logo) {
            formData.append('logo', logo);
          }
        
        formData.append('headerBackground', headerBackground);
        formData.append('navColor', navStyle.color);
        formData.append('navFontSize', navStyle.fontSize);
        formData.append('navFontFamily', navStyle.fontFamily);
        formData.append('buttonText', buttonText);
        formData.append('buttonLink', buttonLink);
        formData.append('buttonTextColor', buttonTextColor); // Add text color for the button
        formData.append('buttonBackgroundColor', buttonBackgroundColor); // Add background color for the button
        formData.append('buttonFontSize', buttonFontSize); // Add font Size for the button
    
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
    

        axios.post('http://localhost:4000/api/header-editstyles', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
   

            if(response.data.msg==='200'){
                Swal.fire({
                    title: 'Success!',
                    text: 'Header Style settings updated successfully!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  });
            }
        })
        .catch(error => {
            console.error('Error submitting header styles:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update header style settings.',
                icon: 'error',
                confirmButtonText: 'Ok'
              });
        });
    };

    
    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/api/navigation/${id}`)
            .then(() => {
                fetchNavigationItems();
            })
            .catch(error => console.error('Error deleting navigation item:', error));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNavItem({ ...navItem, [name]: value });
    };

    const handleEdit = (item) => {
        console.log(item,"items edited");
        setNavItem(item);
        setIsEditing(true);
    };

    const resetForm = () => {
        setNavItem({ id: null, title: '', urls: '', position: 0 });
        setIsEditing(false);
    };
   

    const handleNavStyleChange = (e) => {
        const { name, value } = e.target;
        setNavStyle({ ...navStyle, [name]: value });
    };

    return (
        <div className="container box">
            {/* <div className="header">
                <h1>Rh Dubai Backend</h1>
            </div> */}
            <div className="editor-header" style={{marginTop:"40px"}}>
                          <div className="title-container">
                          <h1>Navigation Manager</h1>
                          </div>
                          <div className="buttons-container">
                          <Link to="/backend" className="main-button" id="back_backend">
                                Back to Backend
                            </Link>
                          </div>
      </div>

            <div className="container mt-4">
                <h2>Manage Navigation Items</h2>
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="form-group">
                        <input type="text" name="title" placeholder="Title" value={navItem.title} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="text" name="urls" placeholder="URL" value={navItem.urls} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="number" name="position" placeholder="Position" value={navItem.position} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        {/* <select>
                            <option>Select Window</option>
                            <option value="samewindow">Same Window</option>
                            <option value="newwindow">New Window</option>
                        </select> */}
                       
                    <select 
            style={{ width: "100%", border: "1px solid #ddd", padding: "14px" }} 
            onChange={handleOpenWindowChange} 
            // value={selectedOption} 
        >
            <option value="">Select Window</option>
            <option value="samewindow">Same Window</option>
            <option value="newwindow">New Window</option>
        </select>
                    </div>
                    <button type="submit" className="btn btn-success">{isEditing ? 'Update' : 'Add'}</button>
                    {isEditing && <button onClick={resetForm} className="btn btn-secondary ml-2">Cancel</button>}
                </form>

                {loading ? <p>Loading...</p> : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Link</th>
                                <th>Position</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {navigationItems.map(item => (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>/{item.urls}</td>
                                    <td>{item.position}</td>
                                    <td>
                                        <button onClick={() => handleEdit(item)} className="btn btn-success btn-sm">Edit</button>
                                        <button onClick={() => handleDelete(item.id)} className="btn btn-danger btn-sm ml-2">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="container mt-4">
    <h2>Header and Navigation Styling</h2>
    <form onSubmit={handleHeaderStyleSubmit} encType="multipart/form-data">
        <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label>Logo:</label>
                    <input type="file" onChange={handleLogoChange} className="form-control-file"  />
                    <img src={`uploads/${logo}`} alt="Logo" width="250px" />
                </div>
                <div className="form-group">
                    <label>Header Background Color:</label>
                    <input type="color" value={headerBackground} onChange={(e) => setHeaderBackground(e.target.value)} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Nav Color:</label>
                    <input type="color" name="color" value={navStyle.color} onChange={(e) => setNavStyle({ ...navStyle, color: e.target.value })} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Nav Font Size:</label>
                    <input type="text" name="fontSize" value={navStyle.fontSize} onChange={(e) => setNavStyle({ ...navStyle, fontSize: e.target.value })} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Nav Font Family:</label>
                    <input type="text" name="fontFamily" value={navStyle.fontFamily} onChange={(e) => setNavStyle({ ...navStyle, fontFamily: e.target.value })} className="form-control" />
                </div>
            </div>
            <div className="col-md-6">
              
                <div className="form-group">
                    <label>Button Text:</label>
                    <input type="text" value={buttonText} onChange={(e) => setButtonText(e.target.value)} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Button Link:</label>
                    <input type="text" value={buttonLink} onChange={(e) => setButtonLink(e.target.value)} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Button Text Color:</label>
                    <input type="color" value={buttonTextColor} onChange={(e) => setButtonTextColor(e.target.value)} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Button Background Color:</label>
                    <input type="color" value={buttonBackgroundColor} onChange={(e) => setButtonBackgroundColor(e.target.value)} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Button Font Size:</label>
                    <input type="text" value={buttonFontSize} onChange={(e) => setButtonFontSize(e.target.value)} className="form-control" />
                </div>
            </div>
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-primary">Save Header Styles</button>
        </div>
    </form>
</div>

        </div>
    );
};

export default NavigationManager;
