import { useState } from 'react';
import { useDispatch } from 'react-redux';

 // Components //
import { createMedication } from '../../features/medications/medSlice';
import MedForm from '../forms/MedForm';
import FilterMedsMenu from '../FilterMedsMenu';

// MUI //
import { Modal, Typography, Button, Box, Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue, purple, white } from '../../colors';

const theme = createTheme({
  palette: {
      primary: {
      main: purple[700],
      light: purple[400],
      dark: purple[800],
      contrastText: blue[50]
      },
      secondary: {
          main: blue[100],
          light: blue[50],
          dark: blue[300],
          contrastText: blue[700]
      },
      text: {
          main: white[100]
      }
  }
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'secondary.light',
  border: '2px solid #004e87',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

const MedFormModal = (props) => {

    const [name, setName] = useState('');
    const [strength, setStrength] = useState('');
    const [doseForm, setDoseForm] = useState('');
    const [directions, setDirections] = useState('');
    const [timeOfDay, setTimeOfDay] = useState('');
    const [prescriber, setPrescriber] = useState('');
    
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const onSubmit = (e) => {
      e.preventDefault();

      dispatch(createMedication({name, strength, doseForm, directions, timeOfDay, prescriber}))
      setName('')
      setStrength('')
      setDoseForm('')
      setDirections('')
      setPrescriber('')
      setTimeOfDay('')

    };

    return (
        <ThemeProvider theme={theme}>
          <form onSubmit={onSubmit}>
              <Grid container justifyContent='center'>
                  <Button 
                    sx={{ bgcolor: 'primary.main', color: 'text.main', borderRadius: 5, m: 1,
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      color: 'text.main',
                    } }}
                    onClick={handleOpen}>
                      + Add New Medication
                  </Button>
                  <FilterMedsMenu />
              </Grid>                   
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
              keepMounted
            >
              <Box sx={style}>
                <Typography id='modal-modal-title' variant='h6' component='h2' color='primary.main' marginBottom='1em'>
                    Add a New Medication
                </Typography> 
                <MedForm />
              </Box>
            </Modal>
          </form>     
      </ThemeProvider>
      );
}

export default MedFormModal