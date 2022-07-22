import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'
import Events from '../components/Events'
import './dash.css'




export default function Dash(){



  return (
    <div className='dashboard'>
      <Events />
    
    </div>
  )
}
