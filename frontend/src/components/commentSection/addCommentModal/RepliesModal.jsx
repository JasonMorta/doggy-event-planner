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
import { useEffect } from 'react';


//Handle the Modal functionality
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function RepliesModal(props) {

  //Shared stated
  let state = useContext(sharedState);

  let [loggedIn, setLoggedIn, dogOwners, setDogOwners, allEvents, setAllEvents, comments, setComments, editButton, setEditButton, eventId, setEventId, thisEvent, setThisEvent,update, setUpdate, thisComment, setThisComment, commentId, setCommentId, currentUser, setCurrentUser,userRoll, setUserRoll,limit, setLimit, thisReply, setThisReply, ,  ] = state

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputChange, setInputChange] = useState("");
  const [thisCommentId, setThisCommentId] = useState("");

  useEffect(() => {
    setLoading(false);
  }, []);


  /* When REPLY is clicked
  =========================================================================
  * Retrieve the id of the selected comment trough dataset.
  * Store that id into this component's 
  * state(setThisCommentId(e.target.dataset.id).
  * Only the selected comment's id, current user-name and message is needed
  =========================================================================
  */
  //!OPEN the modal
  const handleOpen = (e) => {
    setThisCommentId(e.target.dataset.id);
    setLoading(true);
    setOpen(true);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  //!CLOSE the modal
  const handleClickClose = () => {
    setOpen(false);
    console.log(thisCommentId);
  };

  //!Handle the reply input changes
  function handleInputChanges(e) {
    console.log(e.target.value);
    setInputChange(e.target.value);
  }

  /* SEND reply to db
  ================================================
  * When user clicks reply/send.
  * Data is sent to db and dialog component get reset.
  ======================== ========================
  */
  async function handleReplySubmit(e) {
    setLoading(true);
    await fetch("/replies", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: thisCommentId,
        user: currentUser.name,
        comment: inputChange,
      }),
    })
      .then((res) => res.json())
      .then((response) => {//handle response
        setTimeout(() => {
          setInputChange("Message sent ✔");
          setLoading(false);
          setTimeout(() => {
            setComments(response);//update parent state
          }, 800);
        }, 200);
      })
      .catch((error) => {//handle errors
        console.log(error);
        setInputChange("⁉");
      });

    setTimeout(() => {//close dialog after 1.2s
      setOpen(false);
      setInputChange("");
    }, 1200);
  }

  return (
    <div>
     
        <Button 
          className='replyToComments-btn' 
          data-id={props.data}
          onClick={handleOpen}>Reply</Button>
      
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

       <div>
          { loading ? <TextLoader />
            :
            <DialogContent className='newEvent'>
            <TextField
              id="filled-multiline-static"
              label="Your comment"
              multiline
              rows={4}
              variant="filled"
              onInput={handleInputChanges}
              value={inputChange}
            />
            </DialogContent>
          }
       </div>
        <DialogActions>
          <Button onClick={handleReplySubmit} variant="text">Reply </Button>
          
        </DialogActions>
      </Dialog>

    </div>
  );
}