import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './replies.css'
import { ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField } from '@mui/material';
import TextLoader from '../../spinner/TextLoader';
import { useContext } from 'react';
import { sharedState } from '../../../App';
import { useState } from 'react';


//Handle the Modal functionality
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function RepliesModal(props) {

  //Shared stated
  let state = useContext(sharedState);

  let [loggedIn, setLoggedIn, dogOwners, setDogOwners, allEvents, setAllEvents, comments, setComments, editButton, setEditButton, eventId, setEventId, thisEvent, setThisEvent,update, setUpdate, thisComment, setThisComment, commentId, setCommentId, currentUser, setCurrentUser,userRoll, setUserRoll ] = state



  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState('message sent!')
 

  //open the modal
  const handleOpen = () => {
 
    props.getUserId()
    setLoading(true)
    setOpen(true)
    setTimeout(() => {
      setLoading(false)
    }, 500);
  };

  //close the modal
  const handleClickClose = () => {
    setOpen(false);

  };

  //Submit reply to db
  //This function submits the input data to db,
  //then changes the input to a loading animation .5s,
  //then closes the modal.
  function handleClose(){
    console.log(loading)
    props.handleReplySubmit()
     setLoading(true)
     console.log(loading)

    setTimeout(() => {
      setLoading(false);
      console.log(loading)
      setTimeout(() => {
        setOpen(false);
      }, 500);
      
    }, 500);

  };

  return (
    <div>
     
        <Button className='replyToComments-btn' onClick={handleOpen}>Reply</Button>
      
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

       <>
          {
          loading ? <TextLoader />
          :
          <DialogContent className='newEvent'>
           <TextField
            id="filled-multiline-static"
            label="Your comment"
            multiline
            rows={4}
            variant="filled"
            onInput={props.handleReplyInput}
            value={loading ? ' ' : props.thisReply}
           />
          </DialogContent>
          }
       </>
        <DialogActions>
          <Button onClick={handleClose} variant="text">Reply</Button>
          
        </DialogActions>
      </Dialog>

    </div>
  );
}