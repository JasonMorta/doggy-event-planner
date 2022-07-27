
import './App.css';
import { createContext } from 'react';
import { useState } from 'react';
import Dash from './pages/Dash';
import Shape from './components/spinner/shadpe-devider/Shape';
import NavBar from './components/navigation/NavBar';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import Gallery from './pages/Gallery';



//create context hook
//This hook allow any nested children to share and alter data with the use of props.
export const sharedState = createContext()

function App() {

  //create a state for every value that needs to be changed
  //these values can be changed from the parent or any child component
  const [currentUser, setCurrentUser] = useState('');
  const [userRoll, setUserRoll] = useState('visitor');
  const [loggedIn, setLoggedIn] = useState(false);
  const [dogOwners, setDogOwners] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  
  const [editButton, setEditButton] = useState();
  const [eventId, setEventId] = useState("")
  //Store selected event id in state
  const [thisEvent, setThisEvent] = useState({});
  const [update, setUpdate] = useState(false);
  const [thisComment, setThisComment] = useState("")
  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState('');


  return (
    //To pass and sharedState with all components, we use the .Provider element and pass data through value={[stateValues]}
    <sharedState.Provider value={[loggedIn, setLoggedIn, dogOwners, setDogOwners, allEvents, setAllEvents, comments, setComments, editButton, setEditButton, eventId, setEventId, thisEvent, setThisEvent,update, setUpdate, thisComment, setThisComment, commentId, setCommentId, currentUser, setCurrentUser,userRoll, setUserRoll ]}>
    <div className="App">
      
    


      <Router>
      <NavBar />
        <Routes>
          <Route path="/" element={<Dash />} />
          <Route path="/About" element={<About />} />
          <Route path="/Gallery" element={<Gallery />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
     
      </Router>

    </div>
    </sharedState.Provider>
  );
}

export default App;
