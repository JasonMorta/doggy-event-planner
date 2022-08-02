import React, { useContext, useEffect } from "react";
import "./event.css";
import "./cardFont.css";

import { sharedState } from "../../../App";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import EditEventModal from "../editEvent/EditEventModal";
import FavIcon from "../favIcon/FavIcon";
import dogsArray from "./DogImageArray";
import Placeholder from "./Placeholder";
import './cardAnimation.css'

export default function Events() {
  //shared state
  let state = useContext(sharedState);
  //deconstruct state
  let [
    ,
    ,
    ,
    ,
    allEvents,
    setAllEvents,
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
    userRoll,
    ,
    ,
    setLimit,
  ] = state;

  //Get all task from API on page load
  useEffect(() => {
    async function getEvents() {
      await fetch("/allEvents", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          setAllEvents(response);
          if (response.length >= 7) {
            setLimit(true);
          } else {
            setLimit(false);
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }

    getEvents();
  }, []);

  return (
    <div className="event-main-container">
      <h1>Weekly Events</h1>
      <>
        {allEvents.length < 1 ? (
          <div className="skeletons">
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </div>
        ) : (
          allEvents.map((event, index) => (
            <div
              className= {`event-card ${index % 2 === 0 ? " slide-in-left": " slide-in-right"}`}
              style={{
                backgroundImage: `url(${dogsArray[index].src})`,
              }}
              key={dogsArray[index].id}
            >
              <div className="day-container">
                <h2>{event.date}</h2>
              </div>
              <div
              // change the margin in every second card
                className="main-content"
                style={
                  index % 2 === 0
                    ? { marginLeft: "32%", alignItems: "flex-end" }
                    : { marginRight: "32%", alignItems: "flex-start" }
                }
              >
                <div className="heading-container">
                  <h1>{event.heading}</h1>
                </div>
                <div className="details">
                  <p>{event.shortDes}</p>
                </div>
                <div className="event-details">
                  <p>Time: {event.time}</p>
                  <div className="link-location">
                    <p>Location: {event.location}</p>
                    <a
                      href={`${event.mapLink}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <AddLocationAltIcon />
                    </a>
                  </div>
                  <p>Dog size: {event.dogSize[0]}</p>
                </div>
                {/*
                 *** use index argument to display the dogs array images.
                 *** Use modulus operator to switch a css value depending on the index.
                 */}
              </div>
              <FavIcon id={event._id} fav={event.likes} />
              {userRoll === "admin" ? (
                <EditEventModal event={event._id} />
              ) : (
                <></>
              )}
            </div>
          ))
        )}
      </>
    </div>
  );
}
