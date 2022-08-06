import React, { useEffect } from 'react'
import LineGraph from '../../charts/LineGraph'
import Navbar from '../../components/navbar/Navbar'

const Admin = () => {
    const [loggedIn, setLoggedIn] = React.useState(false)
    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token !== 'null') {
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
                    'NOT AUTHORIZED'
            }
        </>
    )
}

export default Admin


