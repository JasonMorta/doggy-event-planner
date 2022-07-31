import React, { useContext, useState } from "react";
import notLiked from "../../../static/images/like-notFilled.png";
import isLiked from "../../../static/images/like-filled.png";
import { sharedState } from "../../../App";
import "./fav.css";
import hearCount from "../../../static/images/heartCount.png";

//When a user click the like, increment likes count by 1 change, likes image
//When clicked again, decrease the count by 1 and change likes image back.
// Every click makes a fetch request to the API

export default function FavIcon(props) {
  //shared state
  let state = useContext(sharedState);
  //deconstruct state
  let [, , , , , setAllEvents, , , , , , , , , ,] = state;

  const [like, setLike] = useState(false);

  async function likeButton(e) {
    if (!like) {
      //Increment likes
      await fetch("incLike", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: e.target.dataset.id,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          setAllEvents(res);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
      setLike(true);
    } else {
      //Decrement likes
      await fetch("decLikes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: e.target.dataset.id,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          setAllEvents(res);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
      setLike(false);
    }
  }

  return (
    <div className="likes">
      <img
        src={like ? isLiked : notLiked}
        data-id={props.id}
        alt="likes"
        onClick={likeButton}
      />
      <div className="hear-counter">
        <p>{props.fav}</p>
        <img src={hearCount} alt="counter" />
      </div>
    </div>
  );
}
