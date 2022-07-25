import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import AddLinkIcon from '@mui/icons-material/AddLink';
import './editEventModal.css'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useContext } from 'react';
import { sharedState } from '../App';
import Update from './updateEvent/Update';


//Handle the Modal functionality
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddEventModal(props) {

 //shared state
 let state = useContext(sharedState)
 //deconstruct state
 let [loggedIn, setLoggedIn, dogOwners, setDogOwners, allEvents, setAllEvents, comments, setComments, editButton, setEditButton, eventId, setEventId, thisEvent, setThisEvent, update, setUpdate ] = state




 //Handle the Modal button functionality
  const [open, setOpen] = useState(false);

  //Edit button functionality
  async function handleClickOpen(e){
    setOpen(true);
    setEventId(e.target.dataset.listitem)
    await fetch('oneEvent',{
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       id: e.target.dataset.listitem,
     }),
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        setThisEvent(data)
     
      
      })
    
   
  };

  const handleClickClose = (e) => {
   setOpen(false);
   setUpdate(false)
    console.log(thisEvent)
 };




  /* 
  ========================================
  Handle all the input field values below
  ========================================
  */
 //All these state values will be passed to server to add a new event

 //All these state values will be passed to server to add a new event
//The ThisEvent state value can also be accessed by other components through useContext hook
function handleEventHeading(e){
 setThisEvent({...thisEvent, heading: e.target.value})
}
function handleDescription(e){
 setThisEvent({...thisEvent, description:e.target.value})
}
function handleEventTime(e){
 setThisEvent({...thisEvent, time:e.target.value})
}
function handleEventLocation(e){
 setThisEvent({...thisEvent, location:e.target.value})
}
function handleLocationLink(e){
 setThisEvent({...thisEvent, link:e.target.value})
}
function handleDogSize(e){
 setThisEvent({...thisEvent, size:e.target.value})
};
function handleDay(e){
 setThisEvent({...thisEvent, day:e.target.value})
};


  

  return (
    <div className='editEvent'>
     {/* 
     *** Get the id of the selected event with props.
     *** id will be stored in the button dataset attribute 
     */}
      <Button variant="contained" color="success" data-listitem={props.event} className='addEvent-btn' onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        data-new={"try"}
        onClose={handleClickClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit Event"}</DialogTitle>
        <DialogContent className='newEvent'>
        <TextField
          id="filled-textarea"
          label="Event name"
          placeholder="Dog meeting"
          multiline
          variant="filled"
          onInput={handleEventHeading}
          defaultValue={thisEvent.heading}
         />
         <TextField
          id="filled-multiline-static"
          label="Short Description"
          multiline
          rows={4}
          variant="filled"
          onInput={handleDescription}
          defaultValue={thisEvent.shortDes}
         />
         <TextField
          id="filled-textarea"
          label="Time"
          placeholder="10:30pm"
          multiline
          variant="filled"
          onInput={handleEventTime}
          defaultValue={thisEvent.time}
         />
        <TextField
          id="filled-textarea"
          label="Date"
          placeholder="2 Jul 2022"
          multiline
          variant="filled"
          onInput={handleDay}
          defaultValue={thisEvent.day}
         />
         <TextField
          id="filled-textarea"
          label="Location"
          placeholder="Green Park"
          multiline
          variant="filled"
          onInput={handleEventLocation}
          defaultValue={thisEvent.location}
         />
         <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
           <AddLinkIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
           <TextField id="input-with-sx"
             label="Location link"
             variant="standard"
             onInput={handleLocationLink}
             defaultValue={thisEvent.mapLink}
              />
         </Box>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120, margin: 0 }}>
          <InputLabel id="demo-simple-select-filled-label">Dog size</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            defaultValue={thisEvent.size}
            onChange={handleDogSize}>
            <MenuItem type='text' value={"Mini"}>Mini</MenuItem>
            <MenuItem type='text' value={"Small"}>Small</MenuItem>
            <MenuItem type='text' value={"Medium"}>Medium</MenuItem>
            <MenuItem type='text' value={"Large"}>Large</MenuItem>
            <MenuItem type='text' value={"All sizes"}>All sizes</MenuItem>
          </Select>
       </FormControl>
        </DialogContent>
        <DialogActions>
        <Button variant="contained" color="error" >Delete</Button>
          <Update close={handleClickClose}/>
          <Button variant="contained" onClick={handleClickClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}