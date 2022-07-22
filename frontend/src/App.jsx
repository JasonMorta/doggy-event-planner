
import './App.css';
import { createContext } from 'react';
import { useState } from 'react';
import Dash from './pages/Dash';
import Shape from './components/spinner/shadpe-devider/Shape';


//create context hook
//This hook allow any nested children to share and alter data with the use of props.
export const sharedState = createContext()

function App() {

  //create a state for every value that needs to be changed
  //these values can be changed from the parent or any child component
  const [loggedIn, setLoggedIn] = useState(false);
  const [fetch, setFetch]       = useState(false);
  const [userData, setUserData] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [events, setEvents] = useState([]);




  return (
    //To pass and sharedState with all components, we use the .Provider element and pass data through value={[stateValues]}
    <sharedState.Provider value={[loggedIn, setLoggedIn]}>
    <div className="App">
      <Shape />
      <Dash />
    </div>
    </sharedState.Provider>
  );
}

export default App;
