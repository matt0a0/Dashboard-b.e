// src/components/Clock.jsx
import React, { useState, useEffect } from 'react'

const Clock = ({ type }) => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (type === 'date') {
    return <span>{currentTime.toLocaleDateString()}</span>
  }
  if (type === 'time') {
    return <span>{currentTime.toLocaleTimeString()}</span>
  }
  return (
    <span>
      {currentTime.toLocaleDateString()} - {currentTime.toLocaleTimeString()}
    </span>
  )
}

export default Clock
