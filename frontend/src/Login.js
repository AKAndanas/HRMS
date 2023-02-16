import React, { useState } from 'react';
import httpClient from './httpClient';
import { Container,Link, Stack, Card,Typography,TextField} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import Logo from './components/logo/Logo';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  /*const mdUp = useResponsive('up', 'md');*/



  const logInUser = async() => {

    if (!email.endsWith('@iraysolutions.com')) {
      alert('Only users with email addresses ending in "@iraysolutions.com" can log in');
      return;
    }

    try {
      /*const resp=*/ await httpClient.post('http://localhost:5000/login',{
      email,
      password
    });

    window.location.href ="/dashboard"
  }
    catch (error) {
    if (error.response.status === 401){
      alert("Invalid Credentials");
    }
  }
  }

  const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  }));
  
  /*const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
  }));*/
  
  /*const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
  }));*/


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
      <Card className='p-3 text-center' >
            <Typography variant="h4" gutterBottom>
              Sign in
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
              <a href='/register'><Link variant="subtitle2">Get started</Link></a>
            </Typography>

      
    <Stack spacing={1}>

        <form>
        <TextField name="email" label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />

        <br/><br/>
        <TextField
          name="password"
          label="Password"
          type='password' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}/> 
          
          <br/>
          
          <br/>
        </form>
     </Stack>

     <LoadingButton size="large" type="submit" variant="contained" onClick={()=>logInUser()}>
        Login
        </LoadingButton>

    </Card>
    </div>
    </Container>


    </>
  );
}



