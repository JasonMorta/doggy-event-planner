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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Handle user info
  const [useName, setUserName] = useState('');
  const [password, setPassword] = useState('')

  //Add new dogOwner to db
  async function handleJoin(e){

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
            defaultValue={useName}
          />
                    <TextField
            autoFocus
            margin="dense"
            id="password"
            label="password"
            type="email"
            fullWidth
            variant="standard"
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
