import React from 'react'
import './loginPage.css'
import Login from '../../components/login/Login'
import Navbar from '../../components/navbar/Navbar'

const loginPage = () => {
  return (
    <div className='loginPageWrapper'>
      <Navbar />
      <div className="upperPageWrapper">
        <Login />
      </div>
    </div>
  )
}

export default loginPage