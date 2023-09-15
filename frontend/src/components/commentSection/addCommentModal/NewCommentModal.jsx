import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import "./commentButton.css";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import { sharedState } from "../../../App";
import TextLoader from "../../spinner/TextLoader";
import ReusableButton from "../../commonButton/ReusableButton";
import CircularLoader from "../../spinner/CircularLoader";

//Handle the Modal functionality
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//Whenever the edit button is clicked, the current event's data is stored in the "thisEvent" state.

export default function NewCommentModal() {
  //shared state
  let state = useContext(sharedState);
  //deconstruct state
  let [
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    setComments,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    thisComment,
    setThisComment,
    ,
    ,
    currentUser,
    ,
    ,
  ] = state;

  //Handle the Modal button functionality
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleClickClose = () => {
    setOpen(false);
    setThisComment("");
  };

  /* 
  ========================================
  Handle all the input field values below
  ========================================
  */
  //Store the current comment into state
  function handleCommentDes(e) {
    setThisComment(e.target.value);
  }

  //Add new Comment with API request
  //Send token with request for validation.
  //if the token is good, server will respond with new data
  async function addComment(e) {
    setLoading(true);
    //Add new user to db
    await fetch("https://dog-event-api.onrender.com/addComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem(currentUser.name)}`,
      },
      body: JSON.stringify({
        user: currentUser.name,
        comment: thisComment,
      }),
      //handle errors
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.err) {
          alert("Authentication failed");
        } else {
          setComments(response);
          setThisComment("Comment Added ✔")
          setTimeout(() => {
            setOpen(false);
            setThisComment("");
          }, 100);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
    
  } //end of request function

  return (
    <section className="addCB">
      <ReusableButton
        variant="contained"
        color="error"
        sx={{ width: "400px" }}
        className="addEvent-btn"
        onClick={handleClickOpen}
      >
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

        {loading ? (
          <TextLoader />
        ) : (
          <DialogContent className="newEvent">
            <TextField
              id="filled-multiline-static"
              label="Your comment"
              multiline
              rows={4}
              variant="filled"
              onInput={handleCommentDes}
              defaultValue={thisComment}
            />
          </DialogContent>
        )}
        <DialogActions>
          {loading ? <CircularLoader />
          : 
          <Button variant="contained" onClick={addComment}>
            Add
          </Button>}
        </DialogActions>
      </Dialog>
    </section>
  );
}
