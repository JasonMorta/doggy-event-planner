import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import AddLinkIcon from '@mui/icons-material/AddLink';
import './commentButton.css'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useContext } from 'react';
import { sharedState } from '../../../App';
import CircularStatic from '../../spinner/CircularLoader';
import TextLoader from '../../spinner/TextLoader';
import ReusableButton from '../../commonButton/ReusableButton';



//Handle the Modal functionality
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//Whenever the edit button is clicked, the current event's data is stored in the "thisEvent" state.

export default function NewCommentModal() {

 //shared state
 let state = useContext(sharedState)
 //deconstruct state
 let [loggedIn, setLoggedIn, dogOwners, setDogOwners, allEvents, setAllEvents, comments, setComments, editButton, setEditButton, eventId, setEventId, thisEvent, setThisEvent,update, setUpdate, thisComment, setThisComment, commentId, setCommentId, currentUser, setCurrentUser,userRoll, setUserRoll ] = state

 
 //Handle the Modal button functionality
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500);
  };


  const handleClickClose = () => {
   setOpen(false);
   setThisComment('')
  
 };

  /* 
  ========================================
  Handle all the input field values below
  ========================================
  */
 //Store the current comment into state
  function handleCommentDes(e){
    setThisComment(e.target.value)
  }
 


  //Add new Comment with API request
  //Send token with request for validation.
  //if the token is good, server will respond with new data
 async function addComment(e) {

     setOpen(false);
     //Add new user to db
     await fetch("/addComment", {
       method: "POST",
       headers: { 
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem(currentUser.name)}` 
      },
       body: JSON.stringify({
        user: currentUser.name,
        comment: thisComment,
       }),
       //handle errors
     })
       .then((res) => res.json())
       .then(( response) => {
        if (response.err){
          alert('Authentication failed')
        } else {
          setComments(response)
        }
       })
        .catch((error) => {
         console.log(error);
       });
       setLoading(false)
       setThisComment('')
 }//end of request function



  return (
    <div className='addCB'>
      <ReusableButton  
        variant="contained" 
        color="error"  
        sx={{width: '400px'}}
        className='addEvent-btn' 
        onClick={handleClickOpen}>
        Add comment
      </ReusableButton>
      <Dialog
        open={open}
      
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add your comment"}</DialogTitle>

        {/* The only way I could 
        find to clear the input 
        fields was to remove the 
        element from the dom */}

        {loading ? <TextLoader />
        :
        <DialogContent className='newEvent'>

         <TextField
          id="filled-multiline-static"
          label="Your comment"
          multiline
          rows={4}
          variant="filled"
          onInput={handleCommentDes}
          defaultValue={thisComment}
         />
 

        </DialogContent>}
        <DialogActions>
          <Button variant="contained" onClick={addComment}>Add</Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}