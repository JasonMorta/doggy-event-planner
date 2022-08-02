import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useContext } from "react";
import "./signIn.css";
import CircularStatic from "../spinner/CircularLoader";
import TextLoader from "../spinner/TextLoader";
import { sharedState } from "../../App";
import ReusableButton from "../commonButton/ReusableButton";
import PasswordInput from "../inputFields/PasswordInput";

//This component will handle both the logIn and sign-up
export default function SignUpModal() {
  let shareState = useContext(sharedState);

  let [
    loggedIn,
    setLoggedIn,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    setCurrentUser,
    ,
    setUserRoll,
  ] = shareState;

  //handle state functions
  const [open, setOpen] = useState(false);
  const [join, setJoin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clearField, setClearField] = useState(false);


  // clear fields before opening
  const handleClickOpen = () => {
   
    setUserName("");
    setPassword("");
    setLoggedIn(false);
    setOpen(true);
    setClearField(true);
    setTimeout(() => {
      setClearField(false);
    }, 300);
  };

  //When Modal opens
  const handleClose = () => {
    setOpen(false); //close modal
    setClearField(false); //clear input fields
    setLoggedIn(false);
  };

  //Handle user info
  //Used for logIn and sign-up requests
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  //handle input username
  function handleUserName(e) {
    setUserName(e.target.value);
  }

  //handle input password
  function handlePassword(e) {
    setPassword(e.target.value);
  }



  /* 
  ==============================================================
  *  When use logs in they receive a JWT token.
  * Token will be used to verify user account when making updates.
  ===============================================================
  */

  //Add new User to db & Log in
  //The response will also contain a JWT token,
  //this token will be stored in session storage,
  //The token will be use to verify the user when
  //interacting with any buttons
  //This JOIN button text will change to LOG-IN if user selected log-in
  async function handleJoin(e) {
 

    if (loggedIn) {
      //If user clicked the log-in button, open the log in modal.
      handleLogIn();
    } else {
      //open join in modal. For creating a new account.
      setTimeout(() => {
        setClearField(false);
      }, 500);
      await fetch("/newDog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response === "Username taken") {
            alert("Name taken");
          } else {
            setCurrentUser(response.data); //set user access
            setUserRoll(response.data.roll);
            sessionStorage.setItem(userName, `${response.token}`);
            setTimeout(() => {
              setOpen(false);
              setJoin(true);
              setLoading(false);
              setLoggedIn(true);
            }, 500);
          }
        })
        //Handle errors here
        .catch((error) => {
          console.log(error);
        });
    }
  } // end of function

    //use must enter a name and password
  //LOG-IN  user
  async function handleLogIn() {
    setLoading(true);
    setTimeout(() => {
      setClearField(false);
    }, 500);
    await fetch("/logIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response)
        if (response.data === null) {
          alert("User not found");
          setLoading(false);
         
        } else {
         
          setCurrentUser(response.data); //set user access
          setUserRoll(response.data.roll);
          sessionStorage.setItem(userName, `${response.token}`);
          setTimeout(() => {
            setOpen(false);
            setJoin(true);
            setLoading(false);
            setLoggedIn(true);
          }, 500);
        }
      })
      //Handle errors here
      .catch((error) => {
        console.log(error);
      });
  } // end of function

  /* 
  ===========================================================
  * Handle the log-in and log-out
  * This button also opens the login modal if not logged in.
  * If logged In, this button will function as a log-out button.
  * When a member loges in, then can add comment and only delete
  * delete their own comment.
  * 
  ===========================================================
  */
  function logInButton(e) {
    setLoggedIn(false);
    setUserName("");
    setPassword("");
    setCurrentUser("");
    setUserRoll("");
  }

  //Log Out button
  //This also clears user statuses and inputs
  function logOut() {
    setLoggedIn(true);
    setUserRoll("none");
    setUserName("");
    setPassword("");
    setOpen(true);
    setClearField(true);
    setTimeout(() => {
      setClearField(false);
    }, 300);
  }

  return (
    <div className="signUp-container">
      <div className="logIn-btn">

        <ReusableButton
          variant="contained"
          color="error"
          disabled={loggedIn ? true : false}
          onClick={handleClickOpen}
        >Join
        </ReusableButton>

        {/* If log-in state is true, switch the function of this button */}
        <ReusableButton
          variant="contained"
          color="success"
          onClick={loggedIn ? logInButton : logOut}>
          {loggedIn ? "LOG OUT" : "LOG IN"}
        </ReusableButton>

      </div>
      <Dialog open={open} onClose={handleClose}>
        <div className="dialog-container">
          <DialogTitle>{loggedIn ? "Log in" : "Join"}</DialogTitle>
          <DialogContent className="DialogContent">
            <DialogContentText>
              Join our community today and find more friend for your dog. <br />
              ▸ As a new member you can also share your thoughts in the comment
              section.
            </DialogContentText>
            {/* load in empty textfield to clear the current ones */}
            {clearField ? (
              <TextLoader />
            ) : (
              <TextField
                autoComplete="off"
                autoFocus
                margin="dense"
                id="name"
                className="name-input"
                label="Dog name"
                type="user name"
                required
                fullWidth
                variant="filled"
                onInput={handleUserName}
                defaultValue={userName}
              />
            )}
            {clearField ? (
              <TextLoader />
            ) : (
              <PasswordInput
              variant='filled'
              value={password}
              onChange={handlePassword}
              />
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>not now</Button>
            {loading ? (
              <CircularStatic />
            ) : (
              <Button onClick={handleJoin}>{loggedIn ? "Log in" : "Join"}</Button>
            )}
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
