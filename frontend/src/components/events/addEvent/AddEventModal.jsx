import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import AddLinkIcon from '@mui/icons-material/AddLink';
import './addEventModal.css'
import { createTheme, FormControl, InputLabel, MenuItem, Select, TextField, ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useContext } from 'react';
import { sharedState } from '../../../App';
import TextLoader from '../../spinner/TextLoader';



//Handle the Modal functionality
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//Whenever the edit button is clicked, the current event's data is stored in the "thisEvent" state.

export default function AddEventModal() {

 //shared state
 let state = useContext(sharedState)
 //deconstruct state
 let [loggedIn, setLoggedIn, dogOwners, setDogOwners, allEvents, setAllEvents, comments, setComments, editButton, setEditButton, eventId, setEventId,thisEvent, setThisEvent, update, setUpdate] = state

 
 //Handle the Modal button functionality
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 200);
  };

  const handleClickClose = () => {
   setOpen(false);
   setThisEvent('')
 };

  /* 
  ========================================
  Handle all the input field values below
  ========================================
  */
 //All these state values will be passed to server to add a new event

  // To update a state object we make use of the spread operator.
  //
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
    console.log(e)
  };
  function handleDay(e){
    setThisEvent({...thisEvent, date:e.target.value})
    console.log(e)
  };

  //Add new event with API request
 async function addEvent(e) {
  
     setOpen(false);
     //Add new user to db
     await fetch("/newEvent", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
        heading: thisEvent.heading,
        shortDes: thisEvent.description,
        time: thisEvent.time,
        date: thisEvent.date,
        location: thisEvent.location,
        mapLink: thisEvent.link,
        dogSize: thisEvent.size,
       }),
       //handle errors
     })
       .then((res) => res.json())
       .then(( response) => {
        setAllEvents(response)
        setThisEvent('')
 
       })
        .catch((error) => {
         console.log(error);
       });
  
 
 }//end of request function


 


  return (
  
    <div className='addEvent'>
      <Button  variant="contained" color="error"  className='addEvent-btn' onClick={handleClickOpen}>
        ADD NEW EVENT
      </Button>
      <Dialog 
        open={open}
        TransitionComponent={Transition}
        keepMounted
       
        onClose={handleClickClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle >{"Add a new event"}</DialogTitle>
        
       {loading ? <TextLoader /> 
       :
       <DialogContent className='newEvent'  >
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
          defaultValue={thisEvent.description}
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
          defaultValue={thisEvent.date}
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
             defaultValue={thisEvent.link}
              />
         </Box>
        
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120, margin: 0 }}>
          <InputLabel id="demo-simple-select-filled-label">Dog size</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            value={thisEvent.size===undefined ? '':thisEvent.size }
            onChange={handleDogSize}>
            <MenuItem type='text' value={"Mini"}>Mini</MenuItem>
            <MenuItem type='text' value={"Small"}>Small</MenuItem>
            <MenuItem type='text' value={"Medium"}>Medium</MenuItem>
            <MenuItem type='text' value={"Large"}>Large</MenuItem>
            <MenuItem type='text' value={"All sizes"}>All sizes</MenuItem>
          </Select>
       </FormControl>
         </DialogContent>
       }
      
        <DialogActions>
          <Button variant="contained" color='success' onClick={addEvent}>Add</Button>
          
        </DialogActions>
      </Dialog>
    </div>

  );
}