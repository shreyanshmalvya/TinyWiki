import React from 'react'
import axios from 'axios'
import './login.css'

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    //sending request to api
    const authCheck = async() => {
        // console.log(email, password);
        const check = await axios.post('http://localhost:5000/user/login', {
            email, password 
        })
        const { data } =  check;
        //store token
        localStorage.setItem('token', data.token);
        //redirect to home page
        window.location.href = '/';

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
                                <input type="text" placeholder="Username" onChange={(e)=> setEmail(e.target.value)} />
                            </div>
                            <div className="login-form-body-input-password">
                                <input type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div className="login-form-body-button" onClick = {()=> authCheck()}>
                            <button>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login