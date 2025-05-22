// src/components/Header.jsx
import React from 'react'
import Clock from './Clock'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <Clock type="date" />
      </div>
      <div className="header-center">
        Centro de Comando Enguia
      </div>
      <div className="header-right">
        <Clock type="time" />
      </div>
    </header>
  )
}

export default Header
