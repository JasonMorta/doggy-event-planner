import React, { useContext } from "react";
import "./dash.css";
import CommentBlock from "../components/commentSection/CommentBlock";
import AllUsersDrawer from "../components/allUsers/AllUsersDrawer";
import AddEventModal from "../components/events/addEvent/AddEventModal";
import Events from "../components/events/eventCard/Events";
import SignUpModal from "../components/signup/SignUpModal";
import About from "../components/footer/About";
import { sharedState } from "../App";

//Dashboard will act as the home page.

export default function Dash() {

  //Parent state
  let state = useContext(sharedState);
  let [, , , , , , , , , , , , , , , , , , , , , ,userRoll, ,] = state;

  //Ff current user is Admin, display two extra buttons on the dash.
  return (
    <div className="dashboard-container">
      <SignUpModal />
      {userRoll === "admin" ? (
        <div className="admin-controllers">
          <AllUsersDrawer />
          <AddEventModal />
        </div>
      ) : (
        <></>
      )}
      <div className="dashboard">
        <Events />
        <CommentBlock  />
      </div>
      <About />
    </div>
  );
}
