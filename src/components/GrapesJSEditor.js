import React, { useEffect, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import 'grapesjs-blocks-basic';
import Modal from 'react-modal';
import ImageCompressor from 'image-compressor';
import '../styles/main/main.css';
import Swal from 'sweetalert2';
import axios from 'axios'; // using axios for AJAX requests

Modal.setAppElement('#root'); // Assuming your root element is '#root'

const GrapesJSEditor = ({ pageId,onBack }) => {
  const [editor, setEditor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');

  const [seoTitle, setSeoTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [keywords, setKeywords] = useState('');

  const [linkAddress, setLinkAddress] = useState('');
	  const styleWithBorder = {
    border: '1px solid #000',
    padding: '15px',
  };

  useEffect(() => {
    const gjsEditor = grapesjs.init({
      container: '#editor',
      fromElement: true,
      height: '800px',
      width: 'auto',
     
      storageManager: false,
      styleManager: {
        sectors: [{
            name: 'General',
            properties:[
              {
                extend: 'float',
                type: 'radio',
                default: 'none',
                options: [
                  { value: 'none', className: 'fa fa-times'},
                  { value: 'left', className: 'fa fa-align-left'},
                  { value: 'right', className: 'fa fa-align-right'}
                ],
              },
              'display',
              { extend: 'position', type: 'select' },
              'top',
              'right',
              'left',
              'bottom',
            ],
          }, {
              name: 'Dimension',
              open: false,
              properties: [
                'width',
                {
                  id: 'flex-width',
                  type: 'integer',
                  name: 'Width',
                  units: ['px', '%'],
                  property: 'flex-basis',
                  toRequire: 1,
                },
                'height',
                'max-width',
                'min-height',
                'margin',
                'padding'
              ],
            },{
              name: 'Typography',
              open: false,
              properties: [
                  'font-family',
                  'font-size',
                  'font-weight',
                  'letter-spacing',
                  'color',
                  'line-height',
                  {
                    extend: 'text-align',
                    options: [
                      { id : 'left',  label : 'Left',    className: 'fa fa-align-left'},
                      { id : 'center',  label : 'Center',  className: 'fa fa-align-center' },
                      { id : 'right',   label : 'Right',   className: 'fa fa-align-right'},
                      { id : 'justify', label : 'Justify',   className: 'fa fa-align-justify'}
                    ],
                  },
                  {
                    property: 'text-decoration',
                    type: 'radio',
                    default: 'none',
                    options: [
                      { id: 'none', label: 'None', className: 'fa fa-times'},
                      { id: 'underline', label: 'underline', className: 'fa fa-underline' },
                      { id: 'line-through', label: 'Line-through', className: 'fa fa-strikethrough'}
                    ],
                  },
                  'text-shadow'
              ],
            },{
              name: 'Decorations',
              open: false,
              properties: [
                'opacity',
                'border-radius',
                'border',
                'box-shadow',
                'background', // { id: 'background-bg', property: 'background', type: 'bg' }
              ],
            },{
              name: 'Extra',
              open: false,
              buildProps: [
                'transition',
                'perspective',
                'transform'
              ],
            },{
              name: 'Flex',
              open: false,
              properties: [{
                name: 'Flex Container',
                property: 'display',
                type: 'select',
                defaults: 'block',
                list: [
                  { value: 'block', name: 'Disable'},
                  { value: 'flex', name: 'Enable'}
                ],
              },{
                name: 'Flex Parent',
                property: 'label-parent-flex',
                type: 'integer',
              },{
                name: 'Direction',
                property: 'flex-direction',
                type: 'radio',
                defaults: 'row',
                list: [{
                  value: 'row',
                  name: 'Row',
                  className: 'icons-flex icon-dir-row',
                  title: 'Row',
                },{
                  value: 'row-reverse',
                  name: 'Row reverse',
                  className: 'icons-flex icon-dir-row-rev',
                  title: 'Row reverse',
                },{
                  value: 'column',
                  name: 'Column',
                  title: 'Column',
                  className: 'icons-flex icon-dir-col',
                },{
                  value: 'column-reverse',
                  name: 'Column reverse',
                  title: 'Column reverse',
                  className: 'icons-flex icon-dir-col-rev',
                }],
              },{
                name: 'Justify',
                property: 'justify-content',
                type: 'radio',
                defaults: 'flex-start',
                list: [{
                  value: 'flex-start',
                  className: 'icons-flex icon-just-start',
                  title: 'Start',
                },{
                  value: 'flex-end',
                  title: 'End',
                  className: 'icons-flex icon-just-end',
                },{
                  value: 'space-between',
                  title: 'Space between',
                  className: 'icons-flex icon-just-sp-bet',
                },{
                  value: 'space-around',
                  title: 'Space around',
                  className: 'icons-flex icon-just-sp-ar',
                },{
                  value: 'center',
                  title: 'Center',
                  className: 'icons-flex icon-just-sp-cent',
                }],
              },{
                name: 'Align',
                property: 'align-items',
                type: 'radio',
                defaults: 'center',
                list: [{
                  value: 'flex-start',
                  title: 'Start',
                  className: 'icons-flex icon-al-start',
                },{
                  value: 'flex-end',
                  title: 'End',
                  className: 'icons-flex icon-al-end',
                },{
                  value: 'stretch',
                  title: 'Stretch',
                  className: 'icons-flex icon-al-str',
                },{
                  value: 'center',
                  title: 'Center',
                  className: 'icons-flex icon-al-center',
                }],
              },{
                name: 'Flex Children',
                property: 'label-parent-flex',
                type: 'integer',
              },{
                name: 'Order',
                property: 'order',
                type: 'integer',
                defaults: 0,
                min: 0
              },{
                name: 'Flex',
                property: 'flex',
                type: 'composite',
                properties  : [{
                  name: 'Grow',
                  property: 'flex-grow',
                  type: 'integer',
                  defaults: 0,
                  min: 0
                },{
                  name: 'Shrink',
                  property: 'flex-shrink',
                  type: 'integer',
                  defaults: 0,
                  min: 0
                },{
                  name: 'Basis',
                  property: 'flex-basis',
                  type: 'integer',
                  units: ['px','%',''],
                  unit: '',
                  defaults: 'auto',
                }],
              },{
                name: 'Align',
                property: 'align-self',
                type: 'radio',
                defaults: 'auto',
                list: [{
                  value: 'auto',
                  name: 'Auto',
                },{
                  value: 'flex-start',
                  title: 'Start',
                  className: 'icons-flex icon-al-start',
                },{
                  value   : 'flex-end',
                  title: 'End',
                  className: 'icons-flex icon-al-end',
                },{
                  value   : 'stretch',
                  title: 'Stretch',
                  className: 'icons-flex icon-al-str',
                },{
                  value   : 'center',
                  title: 'Center',
                  className: 'icons-flex icon-al-center',
                }],
              }]
            }
          ],
      },
      
    
      plugins: ['grapesjs-preset-webpage',  'gjs-blocks-basic', 'grapesjs-plugin-forms',
      'grapesjs-component-countdown',
      'grapesjs-plugin-export',
      'grapesjs-tabs',
      'grapesjs-custom-code',
      'grapesjs-touch',
      'grapesjs-parser-postcss',
      'grapesjs-tooltip',
      'grapesjs-tui-image-editor',
      'grapesjs-typed',
      'grapesjs-style-bg'],
      pluginsOpts: {
        'gjs-blocks-basic': { flexGrid: true },
        'grapesjs-tui-image-editor': {
          script: [
            // 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.6.7/fabric.min.js',
            'https://uicdn.toast.com/tui.code-snippet/v1.5.2/tui-code-snippet.min.js',
            'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.js',
            'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.js'
          ],
          style: [
            'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.css',
            'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.css',
          ],
        },
        'grapesjs-tabs': {
          tabsBlock: { category: 'Extra' }
        },
        'grapesjs-typed': {
          block: {
            category: 'Extra',
            content: {
              type: 'typed',
              'type-speed': 40,
              strings: [
                'Text row one',
                'Text row two',
                'Text row three',
              ],
            }
          }
        },
        'grapesjs-preset-webpage': {
          modalImportTitle: 'Import Template',
          modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
          modalImportContent: function(editor) {
            return editor.getHtml() + '<style>'+editor.getCss()+'</style>'
          },
        },
      },     
    });
   
	    
// Add this inside the useEffect where you initialize the GrapesJS editor

 // Define the custom form block
// Define the custom form block
   gjsEditor.BlockManager.add('custom-form', {
    label: 'Custom Contact Form',
    content: {
        tagName: 'form',
        draggable: true,
        attributes: {
          class: 'custom-form row with-border', // Add a class for styling
          style: `
            border: ${styleWithBorder.border};
            padding: ${styleWithBorder.padding};
          `, // Inline styles
        },

        components: [
          {
            tagName: 'h2',
            attributes: {
              style: 'text-align: center;', // Center the heading
              class: 'ListYourProperty', // Add your custom class here
            },
            content: 'Contact Us',
          },
            {
                tagName: 'div',
                attributes: { class: 'form-group' },
                components: [
                    {
                        tagName: 'input',
                        attributes: { type: 'text', name: 'name', placeholder: 'Full Name ', class: 'form-control' }
                    }
                ]
            },
            {
                tagName: 'div',
                attributes: { class: 'form-group' },
                components: [
                    {
                        tagName: 'input',
                        attributes: { type: 'email', name: 'email', placeholder: 'Email', class: 'form-control' }
                    }
                ]
            },
                     {
                    tagName: 'div',
                    attributes: { class: 'input-group' },
                    components: [
                      {
                        // Left side empty div
                        tagName: 'div',
                        attributes: { class: 'empty-div', style: 'width: 50px; border-right: none;' },
                    },
                    
                      {
                        // Right side input field
                        tagName: 'input',
                        attributes: { type: 'tel', name: 'phone', placeholder: 'Phone Number', class: 'form-control' },
                      },
                    
      ],
    },
            {
                tagName: 'button',
                content: 'Submit',
                attributes: { type: 'submit', class: 'btn btn-primary btcon' }
            }
        ]
    },
    category: 'Basic',
    attributes: { class: 'fab fa-wpforms' }
});
  
	  const formGroup = {
  tagName: 'div',
  attributes: { class: 'form-group phone-field-container' },
  components: [
    {
      tagName: 'div',
      attributes: { class: 'input-group' },
      components: [
        {
          // Left side empty div
          tagName: 'div',
          attributes: { class: 'empty-div', style: 'width: 50px; border-right: none;' },
      },
      
        {
          // Right side input field
          tagName: 'input',
          attributes: { type: 'tel', name: 'phone', placeholder: 'Phone Number', class: 'form-control' },
        },
      ],
    },
  ],
};

gjsEditor.BlockManager.add('Simple Conatct Form', {
  label: 'Simple Conatct Form',
  content: {
      tagName: 'form',
      draggable: true,
      attributes: {
          class: 'custom-form row with-border', // Add a class for styling
          style:`
              border: ${styleWithBorder.border};
              padding: ${styleWithBorder.padding};
          `, // Inline styles
      },

      components: [
          {
              tagName: 'h2',
              attributes: {
                  style: 'text-align: center;', // Center the heading
                  class: 'ListYourProperty', // Add your custom class here
              },
              content: 'Contact Us',
          },
          {
              tagName: 'div',
              attributes: { class: 'form-group' },
              components: [
                  {
                      tagName: 'input',
                      attributes: { type: 'text', name: 'name', placeholder: 'Full Name ', class: 'form-control' }
                  }
              ]
          },
          {
              tagName: 'div',
              attributes: { class: 'form-group' },
              components: [
                  {
                      tagName: 'input',
                      attributes: { type: 'email', name: 'email', placeholder: 'Email', class: 'form-control' }
                  }
              ]
          },
          formGroup, // Using formGroup directly
          {
              tagName: 'button',
              content: 'Submit',
              attributes: { type: 'submit', class: 'btn btn-primary btcon' }
          }
      ]
  },
  category: 'Basic',
  attributes: { class: 'fab fa-wpforms' }
});
	  
	  
  gjsEditor.BlockManager.add('custom-form-1', {
  label: 'Custom Form with Policies',
  content: {
      tagName: 'form',
      draggable: true,
      attributes: {
        class: 'custom-form row with-border', // Add a class for styling
        style: `
          border: ${styleWithBorder.border};
          padding: ${styleWithBorder.padding};
          onsubmit: 'submitForm(event)'
        `, // Inline styles
      },
      components: [
          // Heading component
      {
        tagName: 'h2',
        content: 'Contact Us',
        attributes: {
          style: 'text-align: center;', // Center the heading
          class: 'AboutConatctHeading', // Add your custom class here
         
        },
      },
      // Paragraph component
      {
        tagName: 'p',
        content: "Our experienced team can help you every step of the way and answer any questions you have. Don't miss out on your dream               home - fill out the contact form to reach us today!",
        attributes: {
          style: 'text-align: center;', // Center the heading
          class: 'AboutConatctPara', // Add your custom class here
        },
      },
          {
              tagName: 'div',
              attributes: { class: 'form-group' },
              components: [
                  {
                      tagName: 'input',
                      attributes: { type: 'text', name: 'name', placeholder: 'Full Name ', class: 'form-control' }
                  }
              ]
          },
          {
              tagName: 'div',
              attributes: { class: 'form-group' },
              components: [
                  {
                      tagName: 'input',
                      attributes: { type: 'email', name: 'email', placeholder: 'Email', class: 'form-control' }
                  }
              ]
          },
          {
      tagName: 'div',
      attributes: { class: 'input-group' },
      components: [
        {
          // Left side empty div
          tagName: 'div',
          attributes: { class: 'empty-div', style: 'width: 50px; border-right: none;' },
      },
      
        {
          // Right side input field
          tagName: 'input',
          attributes: { type: 'tel', name: 'phone', placeholder: 'Phone Number', class: 'form-control' },
        },
      ],
    },
        {
          tagName: 'div',
          attributes: { class: 'form-group form-check checkbox-inline' },
          components: [
              {
                  tagName: 'input',
                  attributes: { type: 'checkbox', name: 'terms', id: 'termsCheckbox', class: 'form-check-input' }
              },
              {
                  tagName: 'label',
                  content: 'I accept the Terms & Conditions and Privacy Policy.',
                  attributes: { for: 'termsCheckbox', class: 'form-check-label', id:"tconditions",style: 'margin-top: 5px;' }
              }
          ]
      },
      {
          tagName: 'div',
          attributes: { class: 'form-group form-check checkbox-inline' },
          components: [
              {
                  tagName: 'input',
                  attributes: { type: 'checkbox', name: 'marketing', id: 'marketingCheckbox', class: 'form-check-input' }
              },
              {
                  tagName: 'label',
                  content: 'I agree to receive information about property offers, deals & services from Raine & Horne.',
                  attributes: { for: 'marketingCheckbox', class: 'form-check-label' }
              }
          ]
      },
      {
        tagName: 'button',
        content: 'Submit',
        attributes: { type: 'submit', class: 'btn btn-primary btcon'}
    }
    
      ]
  },
  category: 'Basic',
  attributes: { class: 'fab fa-wpforms' }
});


gjsEditor.BlockManager.add('custom-form-2', {
  label: 'Custom SELL Form',
  content: {
      tagName: 'form',
      draggable: true,
      attributes: {
        class: 'custom-form row with-border', // Add a class for styling
        style: `
          border: ${styleWithBorder.border};
          padding: ${styleWithBorder.padding};
        `, // Inline styles
      },

      components: [
         // Heading component
      {
        tagName: 'h2',
        attributes: {
          style: 'text-align: center;', // Center the heading
          class: 'ListYourProperty', // Add your custom class here
        },
        content: 'List Your Property',
      },
          {
              tagName: 'div',
              attributes: { class: 'col-md-6' },
              components: [
                  {
                      tagName: 'div',
                      attributes: { class: 'form-group' },
                      components: [
                          {
                              tagName: 'input',
                              attributes: { type: 'text', name: 'name', placeholder: 'Full Name', class: 'form-control' }
                          }
                      ]
                  },
               
                  {
                      tagName: 'div',
                      attributes: { class: 'form-group' },
                      components: [
                          {
                              tagName: 'select',
                              attributes: { name: 'propertyType', class: 'form-control' },
                              components: [
                                  { tagName: 'option', content: 'Apartment' },
                                  { tagName: 'option', content: 'Villa' }
                              ]
                          }
                      ]
                  },
                  {
                    tagName: 'div',
                    attributes: { class: 'form-group' },
                    components: [
                        {
                            tagName: 'input',
                            attributes: { type: 'email', name: 'email', placeholder: 'Email', class: 'form-control' }
                        }
                    ]
                },
              ]
          },
          {
              tagName: 'div',
              attributes: { class: 'col-md-6' },
              components: [
                 
               
                
                  {
                      tagName: 'div',
                      attributes: { class: 'form-group' },
                      components: [
                          {
                              tagName: 'select',
                              attributes: { name: 'purpose', class: 'form-control' },
                              components: [
                                  { tagName: 'option', content: 'Rent' },
                                  { tagName: 'option', content: 'Sale', attributes: { selected: 'selected' } }
                              ]
                          }
                      ]
                  },
                
                  {
                      tagName: 'div',
                      attributes: { class: 'form-group' },
                      components: [
                          {
                              tagName: 'input',
                              attributes: { type: 'text', name: 'location', placeholder: 'Location', class: 'form-control' }
                          }
                      ]
                  },
                  {
                    tagName: 'div',
                    attributes: { class: 'input-group' },
                    components: [
                      {
                        // Left side empty div
                        tagName: 'div',
                        attributes: { class: 'empty-div', style: 'width: 50px; border-right: none;' },
                    },
                    
                      {
                        // Right side input field
                        tagName: 'input',
                        attributes: { type: 'tel', name: 'phone', placeholder: 'Phone Number', class: 'form-control' },
                      },
                    ],
                  },
              ]
          },
          {
              tagName: 'button',
              attributes: { type: 'submit', class: 'btn btn-primary btcon ml10' },
              content: 'Submit'
          }
      ]
  },
  category: 'Basic',
  attributes: { class: 'fab fa-wpforms' }
});

gjsEditor.BlockManager.add('bootstrap-card', {
  label: 'Bootstrap Card with Image Selection',
  content: {
      tagName: 'div',
      draggable: true,
      attributes: {
          class: 'card', // Add Bootstrap card class
          style: `
              width: 18rem;
              margin: 20px;
          `,
      },
      components: [
          {
              tagName: 'input',
              attributes: {
                  type: 'file',
                  id: 'imageInput',
                  style: 'display: none;', // Hide the file input
              },
              // Add an event listener to trigger image selection on click
              events: {
                  click: function () {
                      const input = document.getElementById('imageInput');
                      input.click();
                  },
              },
          },
          {
              tagName: 'img',
              attributes: {
                  src: '', // Placeholder image source
                  class: 'card-img-top',
                  alt: 'Card image cap',
                  style: 'cursor: pointer;', // Change cursor to indicate it's clickable
              },
              // Add an event listener to trigger image selection on double-click
              events: {
                  dblclick: function () {
                      const input = document.getElementById('imageInput');
                      input.click();
                  },
              },
          },
          {
              tagName: 'div',
              attributes: { class: 'card-body' },
              components: [
                  {
                      tagName: 'h5',
                      content: 'Card Title',
                      attributes: { class: 'card-title' },
                  },
                  {
                      tagName: 'p',
                      content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
                      attributes: { class: 'card-text' },
                  },
                  {
                      tagName: 'a',
                      content: 'Go somewhere',
                      attributes: {
                          href: '#',
                          class: 'btn btn-primary',
                      },
                  },
              ],
          },
      ],
  },
  category: 'Basic',
  attributes: { class: 'fas fa-id-card' }, // Use an appropriate icon
});

	 
	    gjsEditor.BlockManager.add('compress-image', {
      run: (editor, sender, opts = {}) => {
        const { file } = opts;
        if (file) {
          // Check if the file size is within the accepted limit (2MB)
          if (file.size <= 2 * 1024 * 1024) {
            // Use image-compressor library to compress the image
            const compressor = new ImageCompressor();
            compressor.compress(file, {}).then((result) => {
              // Do something with the compressed image, e.g., set it as an asset in the editor
              editor.AssetManager.add({
                src: result,
                type: 'image',
              });
            });
          } else {
            alert('Image size exceeds the 2MB limit.');
          }
        }
      },
    });
	  

    gjsEditor.I18n.addMessages({
      en: {
        styleManager: {
          properties: {
            'background-repeat': 'Repeat',
            'background-position': 'Position',
            'background-attachment': 'Attachment',
            'background-size': 'Size',
          }
        },
      }
    });


 


 const customEditorCss = `
      * {
        outline: 1px dashed rgba(0, 0, 255, 0.5); /* Blue outline for each element */
      }
    `;

    // Wait for the editor to be ready
    gjsEditor.on('load', () => {
      const iframe = gjsEditor.Canvas.getFrameEl();
      if (iframe && iframe.contentDocument) {
        const styleEl = document.createElement('style');
        styleEl.innerHTML = customEditorCss;
        iframe.contentDocument.head.appendChild(styleEl);
      }
    });

    setEditor(gjsEditor);

    return () => gjsEditor.destroy();
  }, []);



  async function Editor_ok() {
    try {
      if (pageId) {
        // Fetch the page data and load it into the editor
		  
        const response = await axios.get(`http://localhost:4000/api/pages/${pageId}`);
        const data = response.data;
		console.log(data,"dtaa");

        if (editor) {
    
          editor.setComponents(data.fileContent);  // Assuming HTML content is in 'fileContent'
          editor.setStyle(data.cssfile);
        }
  console.log(data.result.title);
        setTitle(data.result.title); // Set the title state
        setSeoTitle(data.result.seoTitle); // Set the SEO title state
        setLinkAddress(data.result.linkAddress); // Set the Link Address
        setMetaDescription(data.result.metaDescription);  // Set the meta description state
        setKeywords(data.result.keywords);  // Set the keywords state
      }
    } catch (error) {
      console.error('Error loading page:', error);
    }
  }

  useEffect(() => {
    Editor_ok()
  }, [pageId, editor]);
  
 
  useEffect(() => {
    if (editor) { // Check if editor is initialized

 // Fetch testimonials from the backend
 editor.BlockManager.add('testimonials-slider', {
  label: 'Testimonials Slider',
  content: {
      tagName: 'div',
      draggable: true,
      attributes: { class: 'testimonials-slider' },
      components: [] // Empty for now, we will fill it with testimonials
  },
  category: 'basic',
  attributes: { class: 'fab fa-sliders-h' }
});


fetch('http://localhost:4000/api/testimonials')
.then(response => response.json())
.then(testimonials => {
    // Create HTML structure for the slider
    let sliderContent = testimonials.map(testimonial => `
          <div class="testimonial-slide">
          
          <h3>${testimonial.Name}</h3>
          <p>${testimonial.Review}</p>
          <div class="testimonial-stars">${'★'.repeat(testimonial.Star)}</div>
      </div>
    `).join('');

    // Find the slider block and set its content
    const sliderBlock = editor.BlockManager.get('testimonials-slider');
    sliderBlock.set('content', {
        ...sliderBlock.get('content'),
        components: [
            {
                type: 'text',
                content: sliderContent
            }
        ]
    });

    // Initialize the slider with a library like Slick or Swiper
    // This might require additional JavaScript outside the editor
})
.catch(error => {
    console.error('Error fetching testimonials:', error);
});


}
}, [editor]); // Dependency array to re-run this effect when editor changes




  const handlePublishOrUpdate = () => {
    setIsModalOpen(true);

  };
  const processedImageCache = new Map();

  const processImage = async (src) => {
    if (processedImageCache.has(src)) {
      // Return the processed image from the cache if available
      return processedImageCache.get(src);
    }
  
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = src;
  
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
  
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  
        // Check if the image has an alpha channel (indicating transparency)
        const hasAlpha = ctx.getImageData(0, 0, canvas.width, canvas.height).data.some((value, index, array) => index % 4 === 3 && value < 255);
  
        // Choose the appropriate format based on transparency
        const format = hasAlpha ? 'image/png' : 'image/jpeg';
  
        // Adjust quality to achieve a minimum size of 5 MB
        let quality = 1.0; // Initial quality value
        let processedImageSrc;
  
        do {
          quality -= 0.1; // Adjust the step size as needed
          processedImageSrc = canvas.toDataURL(format, quality);
        } while (processedImageSrc.length > 5 * 1024 * 1024 && quality > 0);
  
        // Store the processed image in the cache
        processedImageCache.set(src, processedImageSrc);
  
        resolve(processedImageSrc);
      };
  
      image.onerror = (error) => {
        reject(error);
      };
    });
  };
	
	
const handleSave = async () => {
  if (editor) {
	     const images = editor.DomComponents.getWrapper().find('img');
    for (let img of images) {
      const src = img.get('src');

      try {
        const processedImageSrc = await processImage(src);
        img.set('src', processedImageSrc); // Update with processed image
      } catch (error) {
        console.error('Error processing image:', error);
      }
	}

      const html = editor.getHtml();
      const css = editor.getCss();
          const pageVal=localStorage.getItem("pagesvalue");
	  
      const url = pageId ? `http://localhost:4000/api/pages/${pageId}` : 'http://localhost:4000/api/save-page';
      const method = pageId ? 'PUT' : 'POST';
  const htmlSizeKB = (new TextEncoder().encode(html).length) / 1024;

      fetch(url, {
          method: method,
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, html, css, linkAddress,  seoTitle, metaDescription, keywords,pageVal }),
      })
      .then(response => response.json())
      .then(data => {
          alert('Page saved successfully!');
          setIsModalOpen(false);
          setTitle(title);
          setLinkAddress(linkAddress);
          setSeoTitle(seoTitle);
          setMetaDescription(metaDescription);
          setKeywords(keywords);
          // Handle any post-save actions
      })
      .catch(error => {
          console.error('Error saving page:', error);
      });
  }
};
  return (
    <div className="container-fluid box" style={{marginTop:"40px"}}>

      <div className='row'>
    <div className="editor-header">
      <div className="title-container">
        {pageId && <h3>Editing Page: {title} </h3>}
      <h3>Note: Image size should be less than 1.5mb</h3>


      </div>
      <div className="buttons-container">
         
            {/* Buttons for publish or update */}
            <button onClick={handlePublishOrUpdate} className="editor-button main-button">
                    {pageId ? 'Update' : 'Publish'}
                  </button>
             <button onClick={onBack} className="editor-button back-button">Back</button>



      </div>
    </div>
      <Modal 
  isOpen={isModalOpen}
  onRequestClose={() => setIsModalOpen(false)}
  contentLabel="Enter Page Details"
  className="ReactModal__Content"
  overlayClassName="ReactModal__Overlay"
>
  <h2 className="modal-title">Enter Page Title</h2>
  <div className="modal-field">
          <label htmlFor="pageTitle">Page Title</label>
          <input 
            id="pageTitle"
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Page Title"
          />
        </div>

        <div className="modal-field">
          <label htmlFor="linkAddress">Page Link</label>
          <input 
            id="linkAddress"
            type="text" 
            value={linkAddress} 
            onChange={(e) => setLinkAddress(e.target.value)}
            placeholder="Enter Url"
          />
        </div>


<div className="modal-field">
          <label htmlFor="seoTitle">SEO Title</label>
          <input 
            id="seoTitle"
            type="text" 
            value={seoTitle} 
            onChange={(e) => setSeoTitle(e.target.value)}
            placeholder="SEO Title"
          />
        </div>

        <div className="modal-field">
          <label htmlFor="metaDescription">Meta Description</label>
          <textarea 
            id="metaDescription"
            value={metaDescription} 
            onChange={(e) => setMetaDescription(e.target.value)}
            placeholder="Meta Description"
          />
        </div>

        <div className="modal-field">
          <label htmlFor="keywords">Keywords</label>
          <input 
            id="keywords"
            type="text" 
            value={keywords} 
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Keywords (comma-separated)"
          />
        </div>


  <div className="modal-buttons">
    <button onClick={handleSave} className="modal-button modal-button-primary">Save Page</button>
    <button onClick={() => setIsModalOpen(false)} className="modal-button modal-button-secondary">Cancel</button>
  </div>
</Modal>


      <div id="editor"></div>

      </div>
    </div>
  );
};

export default GrapesJSEditor;
