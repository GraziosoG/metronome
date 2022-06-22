import './Login.css';
import React, {useState} from 'react';
import {Link} from "react-router-dom";
import { GetFirebaseDb, DBRead } from './utils/FirebaseHelper';

const Login = () => {
    // States for login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [errMessage, setErrMessage] = useState('Please enter all fields.');

    // Handling the name change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
        setError(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
        setError(false);
    };

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();       
        if (email === '' || password === '') {
            setErrMessage('Please enter all fields');
            setError(true);
        } else {
            LoginUser();
            setEmail('');
            setPassword('');
        }
    };

    // Showing success message
    const successMessage = () => {
        return (
        <div
            className="success"
            style={{
            display: submitted ? '' : 'none',
            }}>
            <h3>Welcome back {name}, you are logged in!</h3>
        </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
        <div
            className="error"
            style={{
            display: error ? '' : 'none',
            }}>
            <h3>{errMessage}</h3>
        </div>
        );
    };

    const LoginUser = () => {
        const db = GetFirebaseDb();
        DBRead(db, "users", email).then((data) => {
            if (data === null){
                setErrMessage('Account not yet created');
                setError(true);
            } else {
                if(password === data.password) { // password matches, go back to default error msg
                    setName(data.name);
                    setSubmitted(true);
                    setError(false);
                    setErrMessage('Please enter all fields');
                }
                else {                    
                    setErrMessage('Wrong password, please try again');
                    setError(true);
                }
            };
        })       
    };

    return (
        <div className="container-login">
            <div>
                <h2>Welcome Back</h2>
            </div>

            <form>
                {/* Labels and inputs for form data */}
                <label className="label">Email</label>
                <input onChange={handleEmail} className="input"
                value={email} type="email" />

                <label className="label">Password</label>
                <input onChange={handlePassword} className="input"
                value={password} type="password" />

                <button onClick={handleSubmit} className="btn" type="submit">
                Log In
                </button>
            </form>

            {/* Calling to the methods */}
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>

            <div className="join">
                <span style={{display: 'inline-block'}}>Don't have an account? </span><Link to="/register" className="joinLink">Join now</Link>
            </div>

            <br></br>
            <br></br>
        </div>
    )
}

export default Login; 
