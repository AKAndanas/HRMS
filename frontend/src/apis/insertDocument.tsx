const insertDocument = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('filename_as_doc_id', 'true');

  const response = await fetch('http://localhost:5000/uploadFile', {
    mode: 'cors',
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const responseText = await response.text();
    return responseText;
  } else {
    const errorData = await response.json();
    console.error("Server Error:", errorData.error);
    throw new Error(errorData.error);
  }
};

export default insertDocument;
