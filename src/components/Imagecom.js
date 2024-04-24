import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';

function ImageCompressor () {
  const [originalImage, setOriginalImage] = useState ();
  const [compressedImage, setCompressedImage] = useState ();

  async function handleImageUpload (event) {
    const imageFile = event.target.files [0];
    setOriginalImage (imageFile);
    console.log ('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log (`originalFile size $ {imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    try {
      const compressedFile = await imageCompression (imageFile, options);
      setCompressedImage (compressedFile);
      console.log ('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
      console.log (`compressedFile size $ {compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
    } catch (error) {
      console.log (error);
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange= {event => handleImageUpload (event)}/>
      {originalImage && <img src= {URL.createObjectURL (originalImage)} alt="original-image"/>}
      {compressedImage && <img src= {URL.createObjectURL (compressedImage)} alt="compressed-image"/>}
    </div>
  );
}

export default ImageCompressor;
