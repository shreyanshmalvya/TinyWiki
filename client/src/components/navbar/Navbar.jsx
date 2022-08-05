import React from 'react'
import logo from '../../images/logo.svg'
import './navbar.css'


const Navbar = () => {
  return (
    <div className="navbarWrapper">
        <div className="logo">
            <img src={logo} alt="logo" />
        </div>
        <div className="loginButton">
            <span className='Login'>Login</span>
        </div>
    </div>
  )
}

export default Navbar