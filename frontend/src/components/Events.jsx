import React from 'react'
import './event.css'
import cloud from '../static/images/cloud.png'
import notLike from '../static/images/like-notFilled.png'
import isLiked from '../static/images/like-filled.png'

import { useState } from 'react'

export default function Events() {

  const [like, setLike] = useState(false)

  let events = {
    evHeading: "Heading",
    evDesc: "Short description of event",
    evDay: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    evName: "Event Name",
    evTime: "12:30pm",
    evLocLink: "https://goo.gl/maps/QB9vGjd9V1TvdhpU9",
    evLocation: "Sea Point",
    dogSize: ["mini", "small", "medium", "large"],
    likes: 5
  }

  function liked(){
    setLike(prev => !prev)
    
  }

  return (
    <div className='event-card'>

      <div className='day-container'>
        <h2>{events.evDay[0]}</h2>
        <img src={cloud} alt="day_image"/>
      </div>
     <div className='main-content'>
        <div className='heading-container'>
          <h1>{events.evHeading}</h1>
          <p>{events.evDesc}</p>
        </div>
        <div className='event-details'>
          <p>Time: {events.evTime}</p>
          <a href={events.evLocLink} target="_black"><p>Location: {events.evLocation}</p></a>
          <p>Dog size: {events.dogSize[0]}</p>
        </div>
     </div>
    
      <div className='likes'>
        <img src={!like ? notLike : isLiked} alt="likes" onClick={liked}/>
        <p>{!like ? events.likes : events.likes+1}</p>
      </div>

      <div className='btn-container'>
      <a href="/" className="edit-btn">edit</a>
      </div>

    </div>
  )
}
