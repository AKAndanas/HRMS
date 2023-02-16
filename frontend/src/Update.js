import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom'
import httpClient from './httpClient';
import { Container,Typography,Card,Stack,TextField,Toolbar} from '@mui/material';
import DashboardLayout from './layouts/dashboard/DashboardLayout';
import { styled} from '@mui/material/styles';



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

  const StyledRoot = styled(Toolbar)(({ theme }) => ({
    height: 30,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3),
    marginLeft: '17.5%'
  }));



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

 
    <Container className='font-link' >
      <StyledRoot>
        <Stack>
       <Typography variant="h4" gutterBottom className='m-3'>
           Update Candidate
         </Typography>
         </Stack>
         </StyledRoot>
      <Card className=' text-center card1'>
    <div className='m-3 d-flex flex-row justify-content-center col-md-12'>
      <div className='card2 text-center'>
      <Stack spacing={1}>

      <form onSubmit={handleSubmit}>
        <div className='container'>
        <div className='row'>
        <TextField className='col-md-5 m-3' name="name" label="Name" value={formData.name} onChange={handleChange} variant="standard"/>
      <br />      <br />

      <TextField className='col-md-5 m-3' name="phone" label="Phone" value={formData.phone} onChange={handleChange} variant="standard" />
      <br />      <br />

      <TextField className='col-md-5 m-3' name="email" label="Email" value={formData.email} onChange={handleChange} variant="standard" />
      <br />
      <TextField className='col-md-5 m-3' name="position" label="Position" value={formData.position} onChange={handleChange} variant="standard" />
      <br />
      <TextField className='col-md-5 m-3' name="experience" type='number' label="Experience" value={formData.experience} onChange={handleChange} variant="standard" />
      <br />
      <TextField className='col-md-5 m-3' name="noticeperiod" label="Notice Period" value={formData.noticeperiod} onChange={handleChange} variant="standard" />
      <br />
      <TextField className='col-md-5 m-3' name="location" label="Location" value={formData.location} onChange={handleChange} variant="standard" />
      <br />
      <TextField className='col-md-5 m-3' name="remarks" label="Remarks" value={formData.remarks} onChange={handleChange} variant="standard" />
      <br />
      <TextField className='col-md-5 m-3' name="curcompany" label="Current Company" value={formData.curcompany} onChange={handleChange} variant="standard" />
      <br />
      <TextField className='col-md-5 m-3' name="curctc" label="Current CTC" value={formData.curctc} onChange={handleChange} variant="standard" />
      <br />
      <TextField className='col-md-5 m-3' name="expctc" label="Expected CTC" value={formData.expctc} onChange={handleChange} variant="standard" />
      <br />
      <TextField type="date" className='col-md-5 m-3' name="doi" label="Date of Interview" value={formData.doi} onChange={handleChange} variant="standard" />
      <br /> <br/>
      <label className='text-secondary col-md-5 m-3'>
        Status
        <br/>
        <select className='text-secondary' name="status" value={formData.status} onChange={handleChange}>
      <option value="" disabled>Select an option</option>
      <option value="Active">Active</option>
      <option value="Pending">Pending</option>
      <option value="Rejected">Rejected</option>
    </select>
      </label>
        <br />
      <TextField className='col-md-5 m-3' name="feedback" label="Feedback" value={formData.feedback} onChange={handleChange} variant="standard" />
      <br />
      <TextField className='col-md-5 m-3' name="createdby" label="Created By" value={formData.createdby} onChange={handleChange} variant="standard" />
      <br />
      <TextField type="date" className='col-md-5 m-3' name="createddate" label="Created Date" value={formData.createddate} onChange={handleChange} variant="standard" />
      <br />
      <TextField  type="date" className='col-md-5 m-3' name="updateddate" label="Updated Date" value={formData.updateddate} onChange={handleChange} variant="standard" />
      <br />
      <label className='text-secondary col-md-5 m-3'>
        Vendor
        <br/>
      <select className='text-secondary' name="vendor" value={formData.vendor} onChange={handleChange}>
      <option value="" disabled>Select an option</option>
      <option value="LinkedIN">LinkedIN</option>
      <option value="Naukri">Naukri</option>
      <option value="Referral">Referral</option>
      <option value="Others">Others</option>
      </select>
      </label>

      <br />
            <div>
   <button type="submit" className='btn btn-primary mt-3 card3'>Submit</button>
   <br/>
   <br/>
   </div>
   </div>
   </div>
   </form>
   </Stack>
   </div>
   </div>
   </Card>
   </Container>
   </>
   );
   }
   