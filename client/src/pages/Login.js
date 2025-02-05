import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import { Box, Container, Button, TextField, Typography, AppBar, Toolbar } from '@mui/material';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import SymplestImage from '../images/symplest.png';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { brown, blue } from '../colors';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: brown[500],
        light: brown[50]
      },
      secondary: {
        main: blue[700],
        light: blue[300],
        dark: blue[800]
      },
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <AppBar position='fixed' elevation={0} sx={{ bgcolor: 'primary.dark', color: 'text.main' }} >
          <Container maxWidth='xl'>
            <Toolbar disableGutters>

            </Toolbar>
          </Container>
        </AppBar>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <Container
              margin='normal'
              maxWidth='sm'
              sx={{ width: 1 }}
            >
              <img src={SymplestImage} 
                alt={'Symplest: your data, your choice'} 
                style={{ maxWidth: '100%', height: 'auto' }} 
              />
            </Container>
            <Typography component="h1" variant="h5" paddingTop='1rem'>
              Sign in
            </Typography>
            <Box component='form' onSubmit={onSubmit} sx={{ mt: 1 }}>
              <TextField
                margin='normal'
                id='email'
                variant='outlined'
                label='Email Address'
                type='email'
                name='email'
                autoComplete='email'
                autoFocus
                placeholder='example@email.com'
                value={email}
                onChange={onChange}
                required
                sx={{ width: 1 }}
              />
              <TextField
                margin='normal'
                id='password'
                variant='outlined'
                label='Password'
                type='password'
                name='password'
                autoComplete='current-password'
                value={password}
                onChange={onChange}
                required
                sx={{ width: 1, '&:focus': { bgcolor: 'primary.light' } }}
              />
              <Button
                type='submit'
                variant='contained'
                sx={{ width: 1, mt: 3, mb: 2, borderRadius: 5, bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' }}}
              >
                Sign In
              </Button>
              <span><Link to='/register' color='secondary.main'>Create an Account</Link></span>
            </Box>       
          </Box>        

        <Footer />
      </Container>
    </ThemeProvider> 
    
  );
}

export default Login