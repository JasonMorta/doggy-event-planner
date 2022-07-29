import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import AddLinkIcon from '@mui/icons-material/AddLink';
import './editEventModal.css'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useContext } from 'react';
import { sharedState } from '../../../App';


import TextLoader from '../../spinner/TextLoader';
import Update from '../updateEvent/Update';
import DeleteEvent from '../deleteEvent/DeleteEvent';
import ReusableButton from '../../commonButton/ReusableButton';


//Handle the Modal functionality
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddEventModal(props) {

 //shared state
 let state = useContext(sharedState)
 //deconstruct state
 let [loggedIn, setLoggedIn, dogOwners, setDogOwners, allEvents, setAllEvents, comments, setComments, editButton, setEditButton, eventId, setEventId, thisEvent, setThisEvent, update, setUpdate ] = state


 //When the edit button is clicked, the current event's id is stored
 //in eventId state. This will allow the delete and update buttons
 //to perform fetch request with that id



 //Handle the Modal button functionality
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  //Edit button functionality
  //Fill the fields with this current event values.
  async function handleClickOpen(e){
    setLoading(true)

    await fetch('OneEvent',{
     
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       id: e.target.dataset.listitem,
     }),
    })
      .then(response => response.json())
      .then((data) => {
        setThisEvent(data)
        setOpen(true);
        setTimeout(() => {
          setLoading(false)
        }, 500);
    })
     
      
  };


  const handleClickClose = (e) => {
   setOpen(false);
   setUpdate(false)
   setThisEvent('')
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
function editEventHeading(e){
 setThisEvent({...thisEvent, heading: e.target.value})
}
function editDescription(e){
 setThisEvent({...thisEvent, description:e.target.value})
}
function editEventTime(e){
 setThisEvent({...thisEvent, time:e.target.value})

}
function editEventLocation(e){
 setThisEvent({...thisEvent, location:e.target.value})
}
function editLocationLink(e){
 setThisEvent({...thisEvent, link:e.target.value})
}
function editDogSize(e){
 setThisEvent({...thisEvent, size:e.target.value})
};
function editDay(e){
 setThisEvent({...thisEvent, date:e.target.value})
 
};


  

  return (
    <div className='editEvent'>
     {/* 
     *** Get the id of the selected event with props.
     *** id will be stored in the button dataset attribute 
     */}
      <ReusableButton 
        variant="contained" 
        color="success" 
        data-listitem={props.event} 
        className='addEvent-btn' 
        onClick={handleClickOpen}>
        Edit
      </ReusableButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        data-new={"try"}
        onClose={handleClickClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit Event"}</DialogTitle>
        {loading ?
        <TextLoader /> :
          
          
          <DialogContent className='newEvent'>
        <TextField
          id="filled-textarea"
          label="Event name"
          placeholder="Dog meeting"
          variant="filled"
          color="success"
          onInput={editEventHeading}
          defaultValue={thisEvent.heading}
         />
         <TextField
          id="filled-multiline-static"
          label="Short Description"
          multiline
          rows={4}
          variant="filled"
          color="success"
          onInput={editDescription}
          defaultValue={thisEvent.shortDes}
         />
         <TextField
          id="filled-textarea"
          label="Time"
          placeholder="10:30pm"
          variant="filled"
          color="success"
          onInput={editEventTime}
          defaultValue={thisEvent.time}
         />
        <TextField
          id="filled-textarea"
          label="Date"
          placeholder="2 Jul 2022"
          variant="filled"
          color="success"
          onInput={editDay}
          defaultValue={thisEvent.date}
         />
         <TextField
          id="filled-textarea"
          label="Location"
          placeholder="Green Park"
          variant="filled"
          color="success"
          onInput={editEventLocation}
          defaultValue={thisEvent.location}
         />
         <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
           <AddLinkIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
           <TextField id="input-with-sx"
             label="Location link"
             variant="standard"
             color="success"
             onInput={editLocationLink}
             defaultValue={thisEvent.mapLink}
              />
         </Box>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120, margin: 0 }}>
          <InputLabel id="demo-simple-select-filled-label">Dog size</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={thisEvent.size===undefined ? '':thisEvent.size }
            name={thisEvent.size}
            color="success"
            onChange={editDogSize}>
            <MenuItem type='text' value={"Mini"}>Mini</MenuItem>
            <MenuItem type='text' value={"Small"}>Small</MenuItem>
            <MenuItem type='text' value={"Medium"}>Medium</MenuItem>
            <MenuItem type='text' value={"Large"}>Large</MenuItem>
            <MenuItem type='text' value={"All sizes"}>All sizes</MenuItem>
          </Select>
       </FormControl>
        </DialogContent>}

        <DialogActions>
        
          <DeleteEvent close={handleClickClose} />
          
          <Update close={handleClickClose}/>

          <Button variant="contained" onClick={handleClickClose}>
          Close
          </Button>
        </DialogActions>

      </Dialog>
    </div>
  );
}