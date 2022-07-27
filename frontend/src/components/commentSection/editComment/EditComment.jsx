import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useContext } from 'react';
import { sharedState } from '../../../App';
import edit from '../../../static/images/edit.png'
import { nanoid } from 'nanoid'
import CircularStatic from '../../spinner/CircularLoader';

import TextLoader from '../../spinner/TextLoader';



//Handle the Modal functionality
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//Whenever the edit button is clicked, the current event's data is stored in the "thisEvent" state.

export default function EditComment(props) {

 //shared state
 let state = useContext(sharedState)
 //deconstruct state
 let [loggedIn, setLoggedIn, dogOwners, setDogOwners, allEvents, setAllEvents, comments, setComments, editButton, setEditButton, eventId, setEventId, thisEvent, setThisEvent,update, setUpdate, thisComment, setThisComment, commentId, setCommentId  ] = state

 
 //Handle the Modal button functionality
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)


  //Open Modal
  //Get the selected Comment on click
   //Fill the field with this selected comment.
   async function handleClickOpen(e){
    setCommentId(e.target.dataset.edit)
    setLoading(true)
  
   await fetch("/findOneComment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
     id: e.target.dataset.edit,
   }),
  })
    .then((res) => res.json())
    .then((response) => {
      setThisComment(response[0].comment);
      setOpen(true);
      setTimeout(() => {
       setLoading(false)
     }, 500);
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
    });
  
  };

  //Close Modal
  const handleClickClose = () => {
   setOpen(false);
   setThisComment('')
  
 };


 //Store the current comment into state
 //This will be used in the next fetch and sent to db
  function handleUpdatedComment(e){
    setThisComment(e.target.value)
  }

  //Add new Comment with fetch request
 async function updateComment(e) {
  setLoading(true)
     setOpen(false);
     //Add new user to db
     await fetch("/updateComment", {
       method: "PUT",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
        id: commentId,
        comment: thisComment,
       }),
       //handle errors
     })
       .then((res) => res.json())
       .then((response) => {
        setComments(response);
        setTimeout(() => {
         setLoading(false)
        }, 900);
     
       })
        .catch((error) => {
         console.log(error);
       });
      
 }//end of request function



  return (
    <div className='addCB'>
     <img src={edit} 
      alt="edit-icon"
      onClick={handleClickOpen}
      data-edit={props.id}

   
      />
      
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
          onInput={handleUpdatedComment}
          defaultValue={thisComment}
         />
 

        </DialogContent>}
        <DialogActions>
          <Button variant="contained" onClick={updateComment}>update</Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}