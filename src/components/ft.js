import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom'; // You may need to install react-router-dom if you haven't already

import Swal from 'sweetalert2';

// Styled Components
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
 
`;

const FooterSettings = () => {
  const initialLinkState = { name: '', url: '' };
  const initialMenuState = { title: '', links: [initialLinkState] };
  const createNewMenuState = () => ({ title: '', links: [{ name: '', url: '' }] });


  // const [footerSettings, setFooterSettings] = useState({
  //   menus: [createNewMenuState(), createNewMenuState(), createNewMenuState()],
  //   socialMedia: [{ name: '', url: '' }],
  //   logo: null,
  //   additionalInfo: {copyright: '',address: '', bottomText: '', backgroundColor: '#f4f4f4', fontSize: '16px',fontFamily: 'Arial, sans-serif',},
  // });


  const [footerSettings, setFooterSettings] = useState({
    footermenustate: { title: '', links: [{ name: '', url: '' }] },
    socialMedia:  [{ name: '', url: '' }],
    logo: null,
    additionalInfo: { copyright: '',address: '', bottomText: '', backgroundColor: '#f4f4f4', fontSize: '16px',fontFamily: 'Arial, sans-serif',}
  })


  const [footerSettingsId, setFooterSettingsId] = useState(null);
  const [error, setError] = useState(null);  // New: Error handling state

  useEffect(() => {
    axios.get('http://localhost:4000/api/get-footer-settings')
      .then((response) => {
        console.log(response.data);
        const { id, menus, social_media, logo, additional_info } = response.data;
        const footermenus = menus.split();
        const medialinks = social_media.split();
        const info = additional_info.split();

 
      
        // console.log(footermenus , "footermenu");

      //   setFooterSettings({
      //     footermenustate : {
      //       title: menus.fullname,
      //     }
      // });
      // setbank({
      //     bankname: profileData.bankname,
      //     branch: profileData.branch,
      //     accountholder: profileData.accountholder,
      //     accountNumber: profileData.accountNumber,
      //     ifsc: profileData.ifsc,
      // });


            
        // setFooterSettings({
        //   id, menus: Array.isArray(menus) ? footermenus : [initialMenuState, initialMenuState, initialMenuState],

        //   socialMedia: Array.isArray(social_media) ? medialinks : [initialLinkState],
        //   logo,

        //   additionalInfo: Array.isArray(additional_info) ? info : {
        //     copyright: '',
        //     address: '',
        //     bottomText: '',
        //     backgroundColor: '#f4f4f4',
        //     fontSize: '16px',
        //     fontFamily: 'Arial, sans-serif',
        //   },
        // });

        // setFooterSettingsId(id);
        // console.log(footerSettings);

      })
      .catch((error) => {
        console.error('Error fetching footer settings:', error);
        setError('Failed to fetch footer settings'); // Set error state
      });
  }, []);



  // Handle field change
  const handleFieldChange = (menuIndex, linkIndex, field, value) => {
    // Deep clone the current state to avoid direct mutation
    const updatedFooterSettings = JSON.parse(JSON.stringify(footerSettings));

    if (menuIndex !== null) {
      if (linkIndex !== null) {
        updatedFooterSettings.menus[menuIndex].links[linkIndex][field] = value;
      } else {
        updatedFooterSettings.menus[menuIndex][field] = value;
      }
    } else if (linkIndex !== null) {
      updatedFooterSettings.socialMedia[linkIndex][field] = value;
    } else {
      updatedFooterSettings.additionalInfo[field] = value;
    }

    // Preserve the logo when updating other settings
    updatedFooterSettings.logo = footerSettings.logo;

    setFooterSettings(updatedFooterSettings);
  };


  // Handle logo change
  const handleLogoChange = (e) => {
    if (e.target.files[0]) {
      setFooterSettings((prevState) => ({
        ...prevState,
        logo: e.target.files[0], // Update the logo with the selected file
      }));
    } else {
      // If no file is selected, preserve the existing logo
      setFooterSettings((prevState) => ({
        ...prevState,
      }));
    }
  };

  const addLinkToMenu = (menuIndex) => {
    const updatedFooterSettings = { ...footerSettings };
    updatedFooterSettings.menus[menuIndex].links.push(initialLinkState);
    setFooterSettings(updatedFooterSettings);
  };

  const addSocialMediaLink = () => {
    const updatedFooterSettings = { ...footerSettings };
    updatedFooterSettings.socialMedia.push({ name: '', url: '' });
    setFooterSettings(updatedFooterSettings);
  };



  const removeLinkFromMenu = (menuIndex, linkIndex) => {
    const updatedFooterSettings = { ...footerSettings };
    updatedFooterSettings.menus[menuIndex].links.splice(linkIndex, 1);
    setFooterSettings(updatedFooterSettings);
  };

  const removeSocialMediaLink = (index) => {
    const updatedFooterSettings = { ...footerSettings };
    updatedFooterSettings.socialMedia.splice(index, 1);
    setFooterSettings(updatedFooterSettings);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append the logo if it's a File object
    if (footerSettings.logo instanceof File) {
      formData.append('logo', footerSettings.logo);
    }

    formData.append('menus', JSON.stringify(footerSettings.menus));
    formData.append('socialMedia', JSON.stringify(footerSettings.socialMedia));
    formData.append('additionalInfo', JSON.stringify(footerSettings.additionalInfo));


    console.log("Submitting Footer Settings: ", footerSettings);


    const url = footerSettingsId
      ? `http://localhost:4000/api/footer-settings/${footerSettingsId}`
      : 'http://localhost:4000/api/footer-settings';
    const method = footerSettingsId ? 'PUT' : 'POST';


    try {
      const response = await axios({ url, method, data: formData, });
      if (!footerSettingsId) setFooterSettingsId(response.data.id); // Set ID if newly created
      // Display success message
      Swal.fire({
        title: 'Success!',
        text: 'Footer settings updated successfully!',
        icon: 'success',
        confirmButtonText: 'Ok'
      });

    } catch (error) {
      console.error('Error submitting footer settings:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update footer settings.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  };

  return (
    <div className="container box">
      <div className="header">
        <h1>Rh Dubai Backend</h1>
      </div>
      <div className="editor-header">
        <div className="title-container">
          <h1>Navigation Manager</h1>
        </div>
        <div className="buttons-container">
          <Link to="/backend" className="main-button">
            Back to Backend
          </Link>
        </div>
      </div>






      <Form onSubmit={handleSubmit}>
        {/* {footerSettings.menus.map((menu, menuIndex) => {
          return (

            <Section key={menuIndex}>
              <Label>Menu Title:</Label>
              <Input
                type="text"
                value={menu.title}
                onChange={(e) => handleFieldChange(menuIndex, null, 'title', e.target.value)}
              />
              {menu.links.map((link, linkIndex) => (
                <div key={linkIndex} >
                  <Input
                    type="text"
                    placeholder="Link Name"
                    value={link.name}
                    onChange={(e) => handleFieldChange(menuIndex, linkIndex, 'name', e.target.value)}
                  />
                  <Input
                    type="text"
                    className='ml-10'
                    placeholder="Link URL"
                    value={link.url}
                    onChange={(e) => handleFieldChange(menuIndex, linkIndex, 'url', e.target.value)}
                  />
                  <Button type="button" className='btn btn-danger ml-10' onClick={() => removeLinkFromMenu(menuIndex, linkIndex)}>
                    Remove Link
                  </Button>
                </div>
              ))}
              <Button type="button" className='btn btn-success b100' onClick={() => addLinkToMenu(menuIndex)}>
                Add New Link
              </Button>
            </Section>
          )
        })} */}

        {/* Render Social Media Links */}
        <Section>
          {footerSettings.socialMedia.map((media, index) => (
            <div key={index}>
              <Input
                type="text"
                placeholder="Social Media Name"
                value={media.name}
                onChange={(e) => handleFieldChange(null, index, 'name', e.target.value)}
              />
              <Input
                type="text"
                className='ml-10'
                placeholder="Social Media URL"
                value={media.url}
                onChange={(e) => handleFieldChange(null, index, 'url', e.target.value)}
              />

              <Button type="button" className='btn btn-danger ml-10' onClick={() => removeSocialMediaLink(index)}>
                Remove Social Media Link
              </Button>
            </div>
          ))}
          <Button type="button" className='btn btn-success b100' onClick={addSocialMediaLink}>
            Add New Social Media Link
          </Button>
        </Section>

        <Section>
          <Label>Logo:</Label>
          <Input type="file" onChange={handleLogoChange} />
          {footerSettings.logo && (
            <img
              width="300"
              src={
                footerSettings.logo instanceof File
                  ? URL.createObjectURL(footerSettings.logo)
                  : `uploads/${footerSettings.logo}`
              }
              alt="Logo Preview"
            />
          )}
        </Section>

        <Section>
          <Label>Copyright:</Label>
          <Input
            type="text"
            value={footerSettings.additionalInfo.copyright}
            onChange={(e) => handleFieldChange(null, null, 'copyright', e.target.value)}
          />
          <Label>Address:</Label>
          <Input
            type="text"
            value={footerSettings.additionalInfo.address}
            onChange={(e) => handleFieldChange(null, null, 'address', e.target.value)}
          />
        </Section>

        <Section>
          <Label>Bottom Text:</Label>
          <Input
            type="text"
            value={footerSettings.additionalInfo.bottomText}
            onChange={(e) => handleFieldChange(null, null, 'bottomText', e.target.value)}
          />
        </Section>

        <Section>
          <Label>Background Color:</Label>
          <Input
            type="color"
            value={footerSettings.additionalInfo.backgroundColor}
            onChange={(e) => handleFieldChange(null, null, 'backgroundColor', e.target.value)}
          />
        </Section>

        <Section>
          <Label>Font Size:</Label>
          <Input
            type="text"
            value={footerSettings.additionalInfo.fontSize}
            onChange={(e) => handleFieldChange(null, null, 'fontSize', e.target.value)}
          />
        </Section>

        <Section>
          <Label>Font Family:</Label>
          <Input
            type="text"
            value={footerSettings.additionalInfo.fontFamily}
            onChange={(e) => handleFieldChange(null, null, 'fontFamily', e.target.value)}
          />
        </Section>

        <Button type="submit" className='btn btn-success'>Save Settings</Button>
      </Form>


    </div>
  );
};

export default FooterSettings;
