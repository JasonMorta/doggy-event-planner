import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

export default function SignUpModal() {
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Handle user info
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('')

  function handleUserName(e){
   setUserName(e.target.value)
  }

  function handlePassword(e){
   setPassword(e.target.value)
  }

  //Add new dogOwner to db
  async function handleJoin(e){
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
      setNewUser(response[0].name)
      console.log(newUser)
 
       setTimeout(() => {
        console.log(newUser)
        setOpen(false);
        
       }, 2000);
      })
     //Handle errors here
     .catch((error) => {
       if (error) {
       
        
       }
     });
     setNewUser('')
  }

  return (
    <div>
      <Button variant="contained" color='success' onClick={handleClickOpen}>
        SignUp
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Join</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Join our community today and find more friend for your
            dog. <br/>
            ▸ As a new member you can also share your thoughts in the comment section.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Dog name"
            type="email"
            fullWidth
            variant="standard"
            onInput={handleUserName}
            defaultValue={userName}
          />
                    <TextField
            autoFocus
            margin="dense"
            id="password"
            label="password"
            type="email"
            fullWidth
            variant="standard"
            onInput={handlePassword}
            defaultValue={password}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>not now</Button>
          <Button onClick={handleJoin}>join</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
