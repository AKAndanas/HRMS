import React, { useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom'
import httpClient from './httpClient';

export default function DeleteForm() {
    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
      httpClient.get('http://localhost:5000/check-auth')
      .then((response) => {
        if (response.data.isLoggedIn) {
          navigate("/login")
        }
      }).catch((err) => {
          console.log(err.message);
      });
      // eslint-disable-next-line
    }, []);


  const handleSubmit = event => {
    event.preventDefault();
    httpClient
    .delete(`http://localhost:5000/user/${id}`)
    .then(res => {
      console.log(res.data);
      navigate('/dashboard');
    })
    .catch(err => console.log(err));
 
  };

  

  return (
    <form>
    <p>Are you sure?</p>
    <button onClick={handleSubmit}>YES</button>
    </form>
  );
}