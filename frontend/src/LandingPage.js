import React, {useEffect} from 'react'
import httpClient from './httpClient';
import { useNavigate } from 'react-router-dom';
import Logo from './components/logo/Logo';
import { Container,Typography,Card} from '@mui/material'
import { styled } from '@mui/material/styles';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));


const LandingPage = () => {
   const navigate=useNavigate();

    

    useEffect(() => {
      httpClient.get('http://localhost:5000/check-auth')
      .then((response) => {
        if (response.data.isLoggedIn) {
          navigate("/login")
        } else {
          navigate("/dashboard")
        }
      }).catch((err) => {
          console.log(err.message);
      });
      // eslint-disable-next-line
    }, []);
  


    /*useEffect(() => {
        httpClient.get('http://localhost:5000/@me')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
              console.log(error)
            });
    }, []);*/
  return (
    <>
    <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

    </StyledRoot>

    <Container maxWidth="sm" >
   
    <div className='StyledContent' >
      <Card className='p-3 text-center ' >
            <Typography variant="h4" gutterBottom>
              You are not Logged In
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Redirecting to Login Page
            </Typography>

      

    </Card>
    </div>
    </Container>


    </>
    
  );
};

export default LandingPage