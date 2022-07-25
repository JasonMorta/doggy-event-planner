import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { sharedState } from '../../App'

export default function Update(props) {

let state = useContext(sharedState)

let [loggedIn, setLoggedIn, dogOwners, setDogOwners, allEvents, setAllEvents, comments, setComments, editButton, setEditButton, eventId, setEventId,thisEvent, setThisEvent, update, setUpdate  ] = state


 async function addEvent(e){
  setUpdate(false)
  console.log(update)
  await fetch("/updateEvent", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: eventId,
        heading: thisEvent.heading,
        shortDes: thisEvent.description,
        time: thisEvent.time,
        day: thisEvent.day,
        location: thisEvent.location,
        mapLink: thisEvent.link,
        dogSize: thisEvent.size,
      }),
      //handle errors
    })
      .then((res) => res.json())
      .then((response) => {
       setAllEvents(response)
       setUpdate(true)
       console.log(response)
      

      })
      .catch((error) =>{
       console.log(error)
         alert(error)
      });


     return props.close()
 }// end


  return (
   <Button 
    variant="contained" 
    color="success" 
    onClick={addEvent}
    >
    Update
    </Button>
  )
}
