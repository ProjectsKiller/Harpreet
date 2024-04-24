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
  text-align:left !important;
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


  const [footerSettings, setFooterSettings] = useState({
    menus: [createNewMenuState(), createNewMenuState(), createNewMenuState()],
    socialMedia: [{ name: '', url: '' }],
    logo: null,
    additionalInfo: {
      copyright: '',
      address: '',
      bottomText: '',
      backgroundColor: '#f4f4f4',
      fontSize: '16px',
      fontFamily: 'Arial, sans-serif',
    },
  });

  const [footerSettingsId, setFooterSettingsId] = useState(null);
  const [error, setError] = useState(null);  // New: Error handling state

  useEffect(() => {
    axios.get('http://localhost:4000/api/get-footer-settings')
      .then((response) => {
        console.log(response.data);

        const { id, menus, social_media, logo, additional_info } = response.data;
        // Double parse the menus and social_media fields
        const parsedMenus = menus ? JSON.parse(JSON.parse(menus)) : [initialMenuState, initialMenuState, initialMenuState];
        const parsedSocialMedia = social_media ? JSON.parse(JSON.parse(social_media)) : [initialLinkState];
        // Parse the additional_info field
        // Double parse the additional_info field
        const parsedAdditionalInfo = additional_info ? JSON.parse(JSON.parse(additional_info)) : {
          copyright: '',
          address: '',
          bottomText: '',
          backgroundColor: '#f4f4f4',
          fontSize: '16px',
          fontFamily: 'Arial, sans-serif',
        };

        console.log("Parsed Additional Info: ", parsedAdditionalInfo); // Debugging line
        
        setFooterSettings({
          menus: parsedMenus,
          socialMedia: parsedSocialMedia,
          logo,
          additionalInfo: parsedAdditionalInfo,
        });
        setFooterSettingsId(id);
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
      const response = await axios({
        url,
        method,
        data: formData,

      });
      console.log(response.data);
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
    <>



      <Form onSubmit={handleSubmit} >
        <div className="mt-5 mb-2 header">
          <h1 className='all-main-heading'>Footer Navigation</h1>
        </div>

        <div className='row p-3' style={{ backgroundColor: "white", borderRadius: "20px" }}>

          {Array.isArray(footerSettings.menus) && footerSettings.menus.map((menu, menuIndex) => (
          
              <Section key={menuIndex} style={{padding : "20px"}} className='col-12 col-sm-12 col-md-12	col-lg-6 col-xl-6 mb-16' >
                <Label>Menu Title:</Label>
                <Input type="text" value={menu.title} onChange={(e) => handleFieldChange(menuIndex, null, 'title', e.target.value)} />

                {menu.links.map((link, linkIndex) => {
                  return (
                    <>
                        <div key={linkIndex} className="text-left row" style={{margin : "auto",  width : "100%"}}>
                          <Input type="text" className='ml-2 col-12 col-sm-12 col-md-4  mt-2' placeholder="Link Name" value={link.name} onChange={(e) => handleFieldChange(menuIndex, linkIndex, 'name', e.target.value)} />
                          <Input type="text" className='ml-2 col-12 col-sm-12 col-md-4  mt-2' placeholder="Link URL" value={link.url} onChange={(e) => handleFieldChange(menuIndex, linkIndex, 'url', e.target.value)} />
                          <Button type="button" className='btn btn-danger col-12 col-sm-12 col-md-3 mt-2  ml-2' onClick={() => removeLinkFromMenu(menuIndex, linkIndex)}>Remove Link</Button>
                        </div>
                     
                    </>
                  )
                })}
            
                <Button type="button" className='btn btn-success b100 my-3' onClick={() => addLinkToMenu(menuIndex)}>Add New Link</Button>
              </Section>
          
          ))}

          <div className='col-12 col-sm-12 col-md-12	col-lg-6 col-xl-6 mt-4'>
            <Label style={{ textAlign: "left", width: "100%"}}>Social Links</Label>
            {Array.isArray(footerSettings.socialMedia) && footerSettings.socialMedia.map((media, index) => (
              <Section>
                <div key={index} className="text-left" style={{margin : "auto" , width : "100%" , padding : "0px"}}>
                  <Input type="text" className='ml-2 col-12 col-sm-12 col-md-4  mt-2' placeholder="Social Media Name" value={media.name} onChange={(e) => handleFieldChange(null, index, 'name', e.target.value)} />
                  <Input type="text" className='ml-2 col-12 col-sm-12 col-md-4  mt-2' placeholder="Social Media URL" value={media.url} onChange={(e) => handleFieldChange(null, index, 'url', e.target.value)} />

                  <Button type="button" className='btn btn-danger col-12 col-sm-12 col-md-3 mt-2  ml-2' onClick={() => removeSocialMediaLink(index)}>Remove Link</Button>
                </div>
              </Section>
            ))}

            <div >

              <Button type="button" className='btn btn-success b100 my-3 ' style={{float :"left"}} onClick={addSocialMediaLink}>Add New Link</Button>
            </div>
          </div>



          <div className='col-12'>

            <Section className='mb-4'>
              <Label>Logo:</Label>
              <Input type="file" onChange={handleLogoChange} />
              {footerSettings.logo && (
                <img width="300" src={footerSettings.logo instanceof File ? URL.createObjectURL(footerSettings.logo) : `uploads/${footerSettings.logo}`} alt="Logo Preview" />
              )}
            </Section>

            <Section className='my-4'>
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

            <Section className='my-4'>
              <Label>Bottom Text:</Label>
              <Input
                type="text"
                value={footerSettings.additionalInfo.bottomText}
                onChange={(e) => handleFieldChange(null, null, 'bottomText', e.target.value)}
              />
            </Section>

            <Section className='my-4'>
              <Label>Background Color:</Label>
              <Input
                type="color"
                value={footerSettings.additionalInfo.backgroundColor}
                onChange={(e) => handleFieldChange(null, null, 'backgroundColor', e.target.value)}
              />
            </Section>

            <Section className='my-4'>
              <Label>Font Size:</Label>
              <Input
                type="text"
                value={footerSettings.additionalInfo.fontSize}
                onChange={(e) => handleFieldChange(null, null, 'fontSize', e.target.value)}
              />
            </Section>

            <Section className='my-4'>
              <Label>Font Family:</Label>
              <Input
                type="text"
                value={footerSettings.additionalInfo.fontFamily}
                onChange={(e) => handleFieldChange(null, null, 'fontFamily', e.target.value)}
              />
            </Section>

            <Button type="submit" className='btn btn-success'>Save Settings</Button>
          </div>
        </div>
      </Form>
    </>

  );
};

export default FooterSettings;