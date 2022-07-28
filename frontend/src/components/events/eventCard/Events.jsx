import React, { useContext, useEffect } from 'react'
import './event.css'
import './cardFont.css'
import cloud from '../../../static/images/cloud.png'
import { sharedState } from '../../../App'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import EditEventModal from '../editEvent/EditEventModal'
import FavIcon from '../favIcon/FavIcon'
import { Link } from 'react-router-dom';
import dogsArray from './DogImageArray'

export default function Events() {

  //shared state
  let state = useContext(sharedState)
  //deconstruct state
  let [loggedIn, setLoggedIn, dogOwners, setDogOwners, allEvents, setAllEvents, comments, setComments, editButton, setEditButton, eventId, setEventId, thisEvent, setThisEvent,update, setUpdate, thisComment, setThisComment, commentId, setCommentId, currentUser, setCurrentUser ] = state




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


  return (
    <>
      {allEvents.map((event, index) => (
        <div className="event-card" key={event._id}>
          <div className="day-container">
            <h2>{event.date}</h2>
            <img src={cloud} alt="day_image" />
          </div>
          <div className="main-content">
            <div className="heading-container">
                <h1>{event.heading}</h1>
            </div>
            <div className='details'>
                  <p>{event.shortDes}</p>
            </div>
              <div className="event-details">
                  <p>Time: {event.time}</p>
                <div className="link-location">
                  <p>Location: {event.location}</p>
                  <a href={`${event.mapLink}`} target="_blank" rel="noreferrer">
                    <AddLocationAltIcon />
                  </a>
                </div>
                <p>Dog size: {event.dogSize[0]}</p>
              </div>
              {/* 
              *** use index argument to display the dogs array images. 
              *** Use modulus operator to switch a css value depending on the index.
              */}
              <img src={dogsArray[index].src} alt="dogs" style={index % 2 === 0 ? {right: '-8vw'} : {left: '-8vw'}}  />
          </div>
          <FavIcon id={event._id} fav={event.likes} />
          {currentUser.roll === "admin" ? (
            <EditEventModal event={event._id} />
          ) : (
            <></>
          )}
        </div>
      ))}
    </>
  );
}
