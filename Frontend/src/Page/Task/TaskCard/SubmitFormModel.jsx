import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
   import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksById, updateTask } from '../../../ReduxToolkit/TaskSlice';
import { useLocation } from 'react-router-dom';
import { submitTask } from '../../../ReduxToolkit/SubmissionSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function SubmitFormModel({item, handleClose, open}) {

  const dispatch = useDispatch();
  const location=useLocation();
  const queryParams=new URLSearchParams(location.search);
  const taskId = queryParams.get("taskId"); 

  const {task}=useSelector(store=>store);

   const [FormData, setFormData]=useState({
    githubLink:"",
    description:"",
   });

   const [selectedTags, setSelectedTags]= useState([]);

   const handleChange=(e)=>{
        const {name, value}=e.target;
        setFormData({...FormData,
            [name]: value,
        });
   };

   const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(submitTask({taskId, githubLink: FormData.githubLink}));
    handleClose();
   }

//    useEffect(()=>{
//     dispatch(fetchTasksById(taskId));
//    },[taskId])

  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sx={{ width: '100%' }}>
                    <TextField label="Github Link" fullWidth sx={{ width: '100%' }} name="githubLink" value={FormData.githubLink} onChange={handleChange}/>
                </Grid>
               
                <Grid item xs={12} sx={{ width: '100%' }}>
                    <TextField label="Description" fullWidth multiline rows={4} name="description" value={FormData.description} onChange={handleChange}/>
                </Grid>
              
                <Grid item xs={12} sx={{ width: '100%' }}>
                    <Button fullWidth className='customeButton' type='submit' sx={{padding:".9rem"}}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
          </form>
          
        </Box>
      </Modal>
    </div>
  );
}
