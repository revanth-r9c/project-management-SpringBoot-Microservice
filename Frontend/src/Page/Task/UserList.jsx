import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import "../../index.css";
import { Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../../ReduxToolkit/AuthSlice';
import { useEffect } from 'react';
import { assignedTaskToUser } from '../../ReduxToolkit/TaskSlice';
import { useLocation } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  outline: "none",
  boxShadow: 24,
  p: 4,
};


const tasks=[1,1,1,1];

export default function UserList({handleClose, open}) {

  const dispatch=useDispatch();
  const {auth}=useSelector(store=>store);
  const location=useLocation();
  const queryParams=new URLSearchParams(location.search);
  const taskId = queryParams.get("taskId"); 

  useEffect((item)=>{
    dispatch(getUserList(localStorage.getItem("jwt")))
  },[])

  const handleAssignedTask=(user)=>{
    dispatch(assignedTaskToUser({userId:user.id, taskId:taskId}))
  }

  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
            {
                auth.users.map((item,index)=>
                <>
                <div className='flex items-center justify-between w-full'>
                    <div>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar src="https://cdn.leonardo.ai/users/f00fa7d2-e0c9-4e4b-9bba-4fe3d85e0c0b/generations/08d77b29-7c9d-4be4-895b-eeb39dbc8b13/AlbedoBase_XL_Ultra_Long_Exposure_Photography_High_quality_hig_3.jpg?w=512" />
                            </ListItemAvatar>
                            <ListItemText secondary={`@${item.fullName.split(" ").join("_").toLowerCase()}`} primary={item.fullName}/>
                        </ListItem>
                    </div>
                    <div>
                        <Button onClick={()=>handleAssignedTask(item)} className='customerButton'>select</Button>
                    </div>

                    
                </div>
                 {index !==tasks.length-1 && <Divider variant='inset'/>}
                </>)
               
            }
       
        </Box>
      </Modal>
    </div>
  );
}
