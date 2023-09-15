import { Button } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { sharedState } from "../../../App";

export default function DeleteEvent(props) {
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
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    limit,
    setLimit,
  ] = state;

  async function deleteThisEvent(e) {
    await fetch("https://dog-event-api.onrender.com/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: thisEvent._id,
      }),
      //handle errors
    })
      .then((res) => res.json())
      .then((response) => {
        setAllEvents(response);
        if (response.length >= 7) {
          setLimit(true);
        } else {
          setLimit(false);
        }
        console.log(limit);
      })
      .catch((error) => {
        console.log(error);
      });

    return props.close();
  }

  return (
    <Button variant="contained" color="error" onClick={deleteThisEvent}>
      Delete
    </Button>
  );
}
