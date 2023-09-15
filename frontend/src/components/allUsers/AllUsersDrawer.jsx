import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './drawerButton.css'
import { useEffect, useContext, useState } from 'react';
import { sharedState } from '../../App';
import trash from '../../static/images/trash.png'

export default function AllUsersDrawer() {

  let appState = useContext(sharedState)

  let [, , dogOwners, setDogOwners] = appState

  //Drawer state
  const [state, setState] = useState({
    right: false,
  });

  const [closeDrawer, setCloseDrawer]= useState(false)
  const [deleted, setDeleted] = useState(false)

  //controls the drawer functionality
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setCloseDrawer(true)
    setState({ ...state, [anchor]: open });
  };

  //Return app users from db
  useEffect(() => {
    console.log("thisEvent")
    async function getEvents() {
      await fetch("https://dog-event-api.onrender.com/allUsers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          setDogOwners(response);
          
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
    getEvents();
  }, []);


  //delete user
  async function deleteUser(e){
    setDeleted(true)
    await fetch("https://dog-event-api.onrender.com/removeDog", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: e.target.dataset.user,
      }),
      //handle errors
    })
      .then((res) => res.json())
      .then((response) => {
        setDogOwners(response)
       setTimeout(() => {
        setDeleted(false)
       }, 250);
      })
      .catch((error) =>{
         console.log(error)
         alert(error)
        });
  }


  const list = (anchor) => (
    <Box 
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, closeDrawer)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {dogOwners.map((user, index) => (
          <ListItem key={user._id} disablePadding>
            <ListItemButton  >
              <ListItemIcon>
                <AccountCircleIcon color='secondary' />
              </ListItemIcon>
              <ListItemText className='userTab' primary={user.name} secondary={<img src={trash} 
                className="trash"
                data-user={user._id} 
                onClick={deleteUser}
                alt='trash-can' /> 
              } />
            </ListItemButton>
          </ListItem>
        ))}

      </List>
    </Box>
  );

  return (
    <div  className='all-users-btn'>
   
        <React.Fragment key={'right'} >
          <Button onClick={toggleDrawer('right', true)} 
            variant="contained" 
            color="error">{'All users'}</Button>
          <Drawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
            
          >
            {list('right')}
          </Drawer>
        </React.Fragment>
  
    </div>
  );
}
