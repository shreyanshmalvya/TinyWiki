import React from 'react'
import './home.css'
import logo from '../../images/logo.svg'
import Navbar from '../../components/navbar/Navbar'
import Search from '../../components/searchBox/Search'
import LineGraph from '../../charts/LineGraph'

export const Home = () => {
    return (
        <div className='homeWrapper'>
            <div className='home'>
                <Navbar />
                <div className="hero">
                    <div className="logoWrapper">
                        <img src={logo} alt="logo" />
                    </div>
                    <Search />
                </div>
                <div className="creator">
                    <p>Created by Shreyansh Malviya</p>
                </div>
                <LineGraph />
            </div>
        </div>
    )
}
