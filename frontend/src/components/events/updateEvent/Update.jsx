import { Button } from "@mui/material";
import React, { useContext } from "react";
import { sharedState } from "../../../App";

export default function Update(props) {
  //shared
  let state = useContext(sharedState);

  let [
    ,
    ,
    ,
    ,
    ,
    setAllEvents,
    ,
    ,
    ,
    ,
    ,
    ,
    thisEvent,
    ,
    ,
    setUpdate,
  ] = state;

  //Handle updating a single event
  async function Update(e) {
    setUpdate(false);
    await fetch("/updateEvent", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: thisEvent._id,
        heading: thisEvent.heading,
        shortDes: thisEvent.description,
        time: thisEvent.time,
        date: thisEvent.date,
        location: thisEvent.location,
        mapLink: thisEvent.link,
        dogSize: thisEvent.size,
      }),
      //handle errors
    })
      .then((res) => res.json())
      .then((response) => {
        setAllEvents(response);
        setUpdate(true);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    return props.close();
  } // end

  return (
    <Button variant="contained" color="success" onClick={Update}>
      Update
    </Button>
  );
}
