import React from 'react'


import './dash.css'
import { BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";
import CommentBlock from '../components/commentSection/CommentBlock';
import Footer from '../components/footer/Footer';
import AllUsersDrawer from '../components/allUsers/AllUsersDrawer';
import AddEventModal from '../components/events/addEvent/AddEventModal';
import Events from '../components/events/eventCard/Events';
import SignUpModal from '../components/signup/SignUpModal';


export default function Dash(props){



  return (
    <div className='dashboard-container'>
      <SignUpModal />
      <div className='admin-controllers'>
          <AllUsersDrawer />
          <AddEventModal />
        </div>
      <div className='dashboard'>
        <Events />
        <CommentBlock />
      <Footer />
      </div>
    </div>
  )
}
