// src/components/Compass.jsx
import React, { useEffect, useState } from 'react'

const Compass = () => {
  const [rotation, setRotation] = useState(0)
  const [direction, setDirection] = useState('Norte')

  useEffect(() => {
    const interval = setInterval(() => {
      const newRotation = Math.random() * 360
      setRotation(newRotation)

      if (newRotation >= 0 && newRotation < 45) {
        setDirection('Norte')
      } else if (newRotation >= 45 && newRotation < 135) {
        setDirection('Leste')
      } else if (newRotation >= 135 && newRotation < 225) {
        setDirection('Sul')
      } else {
        setDirection('Oeste')
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: '#fff'
    }}>
      <div style={{ marginBottom: '10px', fontSize: '20px' }}>
        {direction}
      </div>
      <div
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: '2px solid #00f6ff',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 3s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '30px'
          }}
        >
          <i className="fa-regular fa-compass"></i>
        </div>
      </div>
    </div>
  )
}

export default Compass
