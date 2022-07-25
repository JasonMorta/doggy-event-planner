import React, { useContext, useEffect } from 'react'
import './event.css'
import cloud from '../static/images/cloud.png'
import notLiked from '../static/images/like-notFilled.png'
import isLiked from '../static/images/like-filled.png'
import { DateTime } from "luxon";

import { useState } from 'react'
import { sharedState } from '../App'
import { Button } from '@mui/material'
import EditEventModal from './EditEventModal'

export default function Events() {

  //shared state
  let state = useContext(sharedState)
  //deconstruct state
  let [loggedIn, setLoggedIn, dogOwners, setDogOwners, allEvents, setAllEvents, comments, setComments, editButton, setEditButton, eventId, setEventId,thisEvent, setThisEvent] = state

  const [like, setLike] = useState(false)
  const [likeCount, setLikeCount]=useState(0)


  //Get all task from API on page load
  useEffect(() => {
    console.log(thisEvent)
    async function getEvents() {
      await fetch("/allEvents", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          setAllEvents(response);
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
    getEvents();
  }, []);


  function likeButton(){
    if(like){
      setLikeCount(prev => prev -1)
      setLike(false)
    } else {
      setLikeCount(prev => prev +1)
      setLike(true)
    }
  }

  function editEvent(e){
    alert("working")
  }


  return (
    <>
          { 
          
          allEvents.map(event => 
          <div className='event-card' key={event._id}>
            
            <div className='day-container'>
              <h2>{event.day }</h2>
              <img src={cloud} alt="day_image"/>
            </div>
          <div className='main-content'>
              <div className='heading-container'>
                <h1>{event.heading}</h1>
                <p>{event.shortDes}</p>
              </div>
              <div className='event-details'>
                <p>Time: {event.time}</p>
                <a href={event.link} target="_blank" rel="noreferrer">
                  <p>Location: {event.location}</p></a>
                <p>Dog size: {event.dogSize[0]}</p>
              </div>
          </div>
          
            <div className='likes'>
              <img src={!like ? notLiked : isLiked} alt="likes" onClick={()=>{
                if(like){
                setLikeCount(prev => prev -1)
                setLike(false)
              } else {
                setLikeCount(prev => prev +1)
                setLike(true)
              }}}/>
              <p>{likeCount}</p>
            </div>
              <EditEventModal event={event._id} />
              
          </div>)
          

          }
    </>
  )
}
