import './Login.css';
import React, {useState} from 'react';
import {Link} from "react-router-dom";

const Login = () => {
    // States for registration
    const [nameMail, setNameMail] = useState('');
    const [password, setPassword] = useState('');

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    // Handling the name change
    const handleNameMail = (e) => {
        setNameMail(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();  
        console.log(nameMail);      
        if (nameMail === '' || password === '') {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
            setNameMail('');
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
            <h3>Welcome back {nameMail}, you are logged in!</h3>
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
            <h3>Please enter all fields</h3>
        </div>
        );
    };

    return (
        <div className="container-login">
            <div>
                <h2>Welcome Back</h2>
            </div>

            <form>
                {/* Labels and inputs for form data */}
                <label className="label">Username or Email</label>
                <input onChange={handleNameMail} className="input"
                value={nameMail} type="text" />

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
