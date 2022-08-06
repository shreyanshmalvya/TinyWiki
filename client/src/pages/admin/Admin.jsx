import React, { useEffect } from 'react'
import LineGraph from '../../charts/LineGraph'
import Navbar from '../../components/navbar/Navbar'
import denied from '../../images/denied.gif'
import './admin.css'

const Admin = () => {
    const [loggedIn, setLoggedIn] = React.useState(false)
    useEffect(() => {
        let token = localStorage.getItem('token')
        console.log(token)
        if (token !== null) {
            setLoggedIn(true)
        }
    }, [loggedIn]);
    return (
        <>

            <Navbar />
            {
                loggedIn ?
                    <LineGraph />
                    :
                    <div className="notauthorizedWrapper">
                        <div className="notAuthorized">
                            Not Authorized
                        </div>
                        <div className="deniedimage">
                            <img src={denied} alt="access denied" />
                        </div>
                    </div>

            }
        </>
    )
}

export default Admin


