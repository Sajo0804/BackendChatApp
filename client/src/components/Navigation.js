import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className="nav-container">
        <ul className="nav-list">
            <NavLink to="/">Chattar</NavLink>
            <NavLink to="/chat">Vänner</NavLink>
            <NavLink to="/User">Mitt konto</NavLink>
        </ul>
    </nav>
  )
}

export default Navigation