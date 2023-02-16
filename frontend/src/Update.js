import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom'
import httpClient from './httpClient';
import DashboardLayout from './layouts/dashboard/DashboardLayout';


export default function UpdateForm() {
    const { id } = useParams()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    noticeperiod: "",
    location: "",
    remarks: "",
    curcompany: "",
    curctc: "",
    expctc: "",
    doi:'',
    status:'',
    feedback:'',
    createdby:'',
    createddate:'',
    updateddate:'',
    vendor:''
  });

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

  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await httpClient.get(`http://localhost:5000/user/${id}`)
            setFormData(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    fetchData()
  }, [id])



  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    httpClient
    .put(`http://localhost:5000/user/${id}`, formData)
    .then(res => {
      console.log(res.data);
      navigate('/dashboard');
    })
    .catch(err => console.log(err));
 
  };

  return (
    <>
    <DashboardLayout/>

 
    <div className='card text-center'>
    <h1>Add New Candidade</h1>
    <hr/>
      <form onSubmit={handleSubmit}>
      <label className='text-dark h5'>
        Name
        <br/>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          
        />
      </label>
      <br />
      <label className='text-dark h5'>
        Phone
        <br/>
        <input
          type="number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className='text-dark h5'>
        Email
        <br/>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label >
      <br />
      <label className='text-dark h5'>
        Position
        <br/>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className='text-dark h5'>
        Experiance
        <br/>
        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className='text-dark h5'>
        Notice Period
        <br/>
        <input
          type="number"
          name="noticeperiod"
          value={formData.noticeperiod}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className='text-dark h5'>
        Location
        <br/>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className='text-dark h5'>
        Remarks
        <br/>
        <input
          type="text"
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
        />
   </label>
   <br />
   <label className='text-dark h5'>
   Current Company
   <br/>
   <input
          type="text"
          name="curcompany"
          value={formData.curcompany}
          onChange={handleChange}
        />
   </label>
   <br />
   <label className='text-dark h5'>
   Current CTC
   <br/>
   <input
          type="number"
          name="curctc"
          value={formData.curctc}
          onChange={handleChange}
        />
   </label>
   <br />
   <label className='text-dark h5'>
   Expected CTC
   <br/>
   <input
          type="number"
          name="expctc"
          value={formData.expctc}
          onChange={handleChange}
        />
   </label>
   <br />
   <label className='text-dark h5'>
        Date of Interview
        <br/>
        <input
          type="date"
          name="doi"
          value={formData.doi}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className='text-dark h5'>
        Status
        <br/>
        <select name="status" value={formData.status} onChange={handleChange}>
      <option value="" disabled>Select an option</option>
      <option value="Active">Active</option>
      <option value="Pending">Pending</option>
      <option value="Rejected">Rejected</option>
    </select>
      </label>
      <br />
      <label className='text-dark h5'>
        Feedback
        <br/>
        <input
          type="text"
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className='text-dark h5'>
        Created By
        <br/>
        <input
          type="text"
          name="createdby"
          value={formData.createdby}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className='text-dark h5'>
        Created Date
        <br/>
        <input
          type="date"
          name="createddate"
          value={formData.createddate}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className='text-dark h5'>
        Updated Date
        <br/>
        <input
          type="date"
          name="updateddate"
          value={formData.updateddate}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className='text-dark h5'>
        Vendor
        <br/>
        <input
          type="text"
          name="vendor"
          value={formData.vendor}
          onChange={handleChange}
        />
      </label>
      <br />
   <button type="submit" className='btn btn-primary'>Submit</button>
   </form>
   </div>
   </>
   );
   }
   