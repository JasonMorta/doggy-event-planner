import React, { useContext } from 'react'


import './dash.css'
import { BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";
import CommentBlock from '../components/commentSection/CommentBlock';
import Footer from '../components/footer/Footer';
import AllUsersDrawer from '../components/allUsers/AllUsersDrawer';
import AddEventModal from '../components/events/addEvent/AddEventModal';
import Events from '../components/events/eventCard/Events';
import SignUpModal from '../components/signup/SignUpModal';
import { sharedState } from '../App';


export default function Dash(props){

  let state = useContext(sharedState)

  let [loggedIn, setLoggedIn, dogOwners, setDogOwners, allEvents, setAllEvents, comments, setComments, editButton, setEditButton, eventId, setEventId, thisEvent, setThisEvent,update, setUpdate, thisComment, setThisComment, commentId, setCommentId, currentUser, setCurrentUser,userRoll, setUserRoll ] = state;

  return (
    <div className='dashboard-container'>
      <SignUpModal />
        {userRoll==='admin' ?
        <div className='admin-controllers'>
          <AllUsersDrawer />
          <AddEventModal />
        </div>
        : <></>}
      <div className='dashboard'>
        <Events />
        <CommentBlock />
      <Footer />
      </div>
    </div>
  )
}
