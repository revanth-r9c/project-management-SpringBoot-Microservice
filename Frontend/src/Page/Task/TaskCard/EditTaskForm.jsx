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

const tags=["Angular","React","Vuejs","Spring Boot","Node js", "Python", "Tailwind CSS", "Material UI", "CSS", "Django"];

export default function EditTaskForm({item, handleClose, open}) {

  const dispatch = useDispatch();
  const location=useLocation();
  const queryParams=new URLSearchParams(location.search);
  const taskId = queryParams.get("taskId"); 
  const {task}=useSelector(store=>store);

   const [FormData, setFormData]=useState({
    title:"",
    image:"",
    description:"",
    tags: [],
    deadline: new Date(),
   });

   const [selectedTags, setSelectedTags]= useState([]);

   const handleChange=(e)=>{
        const {name, value}=e.target;
        setFormData({...FormData,
            [name]: value,
        });
   };

   const handleTagsChange=(event, value)=>{
        setSelectedTags(value);
   }



   const handleDeadlineChange=(date)=>{
    setFormData({
        ...FormData,
        deadline: date
    })
   }

   const formateDate=(input)=>{
    let{
        $y:year,
        $M:month,
        $D:day,
        $H:hours,
        $m:minutes,
        $s:seconds,
        $ms:milliseconds,
    } = input;

    // month = month + 1;

    const date = new Date(year,month,day,hours,minutes,seconds,milliseconds);

    const formattedDate = date.toISOString();

    return formattedDate;
   }

   const handleSubmit=(e)=>{
    e.preventDefault();
    const {deadline}=FormData;
    FormData.deadline = formateDate(deadline);
    FormData.tags=selectedTags;
    console.log("formData",FormData, "deadline: ",FormData.deadline);
    dispatch(updateTask({id:taskId, updatedTaskData:FormData}));
    handleClose();
   }

   useEffect(()=>{
      dispatch(fetchTasksById(taskId))
   },[taskId]);

   useEffect(()=>{
      if(task.taskDetails) setFormData(task.taskDetails);
   },[task.taskDetails]);

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
                    <TextField label="Title" fullWidth sx={{ width: '100%' }} name="title" value={FormData.title} onChange={handleChange}/>
                </Grid>
                <Grid item xs={12} sx={{ width: '100%' }}>
                    <TextField label="Image" fullWidth name="image" value={FormData.image} onChange={handleChange}/>
                </Grid>
                <Grid item xs={12} sx={{ width: '100%' }}>
                    <TextField label="Description" fullWidth multiline rows={4} name="description" value={FormData.description} onChange={handleChange}/>
                </Grid>
                <Grid item xs={12} sx={{ width: '100%' }}>
                    <Autocomplete multiple id="multiple-limit-tags" options={tags} onChange={handleTagsChange} getOptionLabel={(option)=>option} renderInput={(params)=><TextField label="Tags" fullWidth name="tags" {...params} />} />
                </Grid>
                <Grid item xs={12} sx={{ width: '100%' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker onChange={handleDeadlineChange} className='w-full' label="Deadline" renderInput={(params)=><TextField {...params} fullWidth/>} />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sx={{ width: '100%' }}>
                    <Button fullWidth className='customeButton' type="submit" sx={{padding:".9rem"}}>
                        Update
                    </Button>
                </Grid>
            </Grid>
          </form>
          
        </Box>
      </Modal>
    </div>
  );
}
