import React from 'react'
import './style.css'

export default function About() {

  let h1 = 'WHY'
  const text = h1.split('')//splits each word into an array


  return (

    <div className='about-container'>
     <div className='headingText'>
       {text.map((letter, index)=>(
        <h1 
        style={{color: `${index % 2 === 0 ? '#7f8aff':'#ff7ca3'}`, animationDuration: `3.${index}s`}}
        className='jello-vertical'
        >{letter}</h1>
       ))}
     </div>
      <p>
        Some dogs need socialization, others may need a calm fiend,
        or evn just one that's the same size.
        Whether thy're tiny, wild, anxious or old, they deserve a time and space where they can feel
        secure and free with other dogs of a similar size and/or energy level.
      </p>
      <p>A safe space for your furbabies to plan meetups, Socialize, and Play.</p>
      <p>Different groups for different needs (mini, active, giant, anxious,...)</p>
      <p>Save time by knowing exactly when meet-ups are happening.</p>
      <p>Connect with other dog parents.</p>
    </div>
   
  )
}
