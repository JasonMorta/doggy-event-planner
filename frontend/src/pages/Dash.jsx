import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'
import AddEventModal from '../components/AddEventModal'
import Events from '../components/Events'
import './dash.css'




export default function Dash(props){



  return (
    <div className='dashboard'>

      <AddEventModal />
      <Events />
    
    </div>
  )
}
