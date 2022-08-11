import React from 'react'
import Neon from '../components/neon-glow-text/Neon'
import './404.css'

export default function ErrorPage() {

  //Load this error page when an unknown endpoint/url is entered into browser.
  return (
    <div className='error'>
      <Neon />
      <h2>The page you are looking for does not exist.</h2>
        <h2>Please return to the home page...</h2>
      
      </div>
  )
}
