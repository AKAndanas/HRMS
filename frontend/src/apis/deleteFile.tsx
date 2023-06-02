import React, { useState } from 'react';

const DeleteFiles = () => {
  const [responseMessage, setResponseMessage] = useState('');

  const handleDeleteFiles = async () => {
    try {
      const response = await fetch('http://localhost:5000/deleteFiles', {
        method: 'POST',
      });
      const data = await response.json();
      const deletedFiles = data.deleted_files.join(', ');
      //const errors = data.errors.join(', ');
      //setResponseMessage(`Deleted Files: ${deletedFiles}. Errors: ${errors}`);
      setResponseMessage(`Deleted Files: ${deletedFiles}`);
    } catch (error: any) {
      setResponseMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <button onClick={handleDeleteFiles}>Delete Files</button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default DeleteFiles;
