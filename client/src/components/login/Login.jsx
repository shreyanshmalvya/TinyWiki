import React from 'react'
import axios from 'axios'
import './login.css'
import { Navigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [authorize, setAuthorize] = React.useState(false);
    //sending request to api

    const authCheck = async () => {
        // console.log(email, password);
        const check = await axios.post('http://localhost:5000/user/login', {
            email, password
        })
        const { data } = check;
        console.log(data);
        if (data.message !== 'Auth failed') {
            //store token
            localStorage.setItem('token', data.token);
            //redirect to home page
            setAuthorize(true);
        }else{
            alert('Auth failed');
        }
    }

    return (
        <div className="loginWrapper">
            <div className="login">
                <div className="login-form">
                    <div className="login-form-header">
                        <h1>Login</h1>
                    </div>
                    <div className="login-form-body">
                        <div className="login-form-body-input">
                            <div className="login-form-body-input-username">
                                <input type="text" placeholder="Username" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="login-form-body-input-password">
                                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                        <div className="login-form-body-button" onClick={() => authCheck()}>
                            <button>Login</button>
                            {
                                authorize ?
                                    <Navigate to="/admin" />
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login