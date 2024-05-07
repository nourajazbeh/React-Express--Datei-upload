import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData);
      setUploadedFiles([...uploadedFiles, response.data]);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>
      <h2>Uploaded Files:</h2>
      <ul>
        {uploadedFiles.map((file, index) => (
          <li key={index}>{file}</li>
        ))}
      </ul>
    </div>
  );
}

export default FileUpload;

