import { Button } from '@mui/material'
import React from 'react'
import { useContext } from 'react'
import { sharedState } from '../../App'

export default function DeleteEvent(props) {

let state = useContext(sharedState)

let [loggedIn, setLoggedIn, dogOwners, setDogOwners, allEvents, setAllEvents, comments, setComments, editButton, setEditButton, eventId, setEventId, thisEvent, setThisEvent, update, setUpdate ] = state



async function deleteThisEvent(e){


 await fetch("/delete", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    id: thisEvent._id,
  }),
  //handle errors
})
  .then((res) => res.json())
  .then((response) => {
   setAllEvents(response)
  })
  .catch((error) =>{
   console.log(error)
  });

 return props.close()
}

  return (
   <Button variant="contained" color="error" onClick={deleteThisEvent} >Delete</Button>
  )
}
