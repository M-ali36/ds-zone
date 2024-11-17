import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('Please select a file first.');
      return;
    }

    try {
      setUploadStatus('Uploading...');
      
      // Convert the file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Data = reader.result.split(',')[1]; // Extract base64 part of the data URL

        // Send the file to the serverless function
        const response = await axios.post('/api/uploadImage', {
          file: base64Data,
          fileName: file.name,
        });

        //setImageUrl(response.data.downloadURL);
        //setUploadStatus('Upload successful!');
        console.log(response)
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Upload failed. Please try again.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} type="button">Upload Image</button>
      <p>{uploadStatus}</p>
      {imageUrl && (
        <div>
          <p>Image URL:</p>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">{imageUrl}</a>
          <img src={imageUrl} alt="Uploaded" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
