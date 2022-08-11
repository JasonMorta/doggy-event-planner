import "./App.css";
import { createContext } from "react";
import { useState } from "react";
import Dash from "./pages/Dash";
import NavBar from "./components/navigation/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/404";
import Gallery from "./pages/Gallery";

//create context hook
//This hook allow any nested children to read and rewrite the parent's state variables without passing it as props.
export const sharedState = createContext();

function App() {
  //create a state for every value that needs to be changed
  //these values can be changed from the parent or any child component
  const [currentUser, setCurrentUser] = useState("visitor");
  const [userRoll, setUserRoll] = useState("visitor");
  const [loggedIn, setLoggedIn] = useState(false);
  const [dogOwners, setDogOwners] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [editButton, setEditButton] = useState();
  const [eventId, setEventId] = useState("");
  const [thisEvent, setThisEvent] = useState({});
  const [update, setUpdate] = useState(false);
  const [thisComment, setThisComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState("");
  const [limit, setLimit] = useState(false);
  const [thisReply, setThisReply] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    //To pass and sharedState with all components,
    //we use the .Provider element and pass data through value={[stateValues]} attribute.
    <sharedState.Provider
      value = {
        [
          loggedIn,// used to change text and booleans when logged in.
          setLoggedIn,
          dogOwners,// store dog owner API data.
          setDogOwners,
          allEvents,// store event cards API data.
          setAllEvents,
          comments,//store comments API data.
          setComments,
          editButton,// this button get's selected event data.
          setEditButton,
          eventId,// pass current event's id to children.
          setEventId,
          thisEvent,// pass selected event data.
          setThisEvent,
          update, // update selected event.
          setUpdate,
          thisComment, // store add comment text .
          setThisComment,
          commentId, // used to reply to a selected comment.
          setCommentId,
          currentUser, // used for sending user name to API.
          setCurrentUser,
          userRoll,// change text and button properties depending on the user roll.
          setUserRoll,
          limit,// limit the amount of events that can be created.
          setLimit,
          thisReply,// reply to comments.
          setThisReply,
          loading,// show/hide loading animations.
          setLoading,
        ]
      }
    >
      <div className="App">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Dash />} />
            <Route path="/Gallery" element={<Gallery />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </div>
    </sharedState.Provider>
  );
}

export default App;
