import './Register.css';
import React, {useState} from 'react';
import {Link} from "react-router-dom";

const Register = () => {
    // States for registration
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [errMessage, setErrMessage] = useState('Please enter all fields');

    // Handling the name change
    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };

    // Handling the email change
    const handleEmail = (e) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ( re.test(e.target.value) ) { 
            // this is a valid email address            
            setError(false);
            setErrMessage('Please enter all fields'); // make sure return to default error message
        }
        else {
            // invalid email, maybe show an error to the user.
            setError(true);
            setErrMessage('Please enter valid email'); // change error message as long as email format not valid
        }
        setEmail(e.target.value);
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
        if (name === '' || email === '' || password === '') {
            setError(true);
        } else if (error === true){ // all fields are non-empty but email format not valid
            setError(true);
        }else {
            console.log(name);
            setSubmitted(true);
            console.log(name);
            setError(false);
            setName('');
            console.log(name);
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
            <h3>Welcome {name}, you are successfully registered!!</h3>
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

    return (
        <div className="container-register">
            <div>
                <h2>Create Account</h2>
            </div>

            <form>
                {/* Labels and inputs for form data */}
                <label className="label">Name</label>
                <input onChange={handleName} className="input"
                value={name} type="text" />

                <label className="label">Email</label>
                <input onChange={handleEmail} className="input"
                value={email} type="email" />

                <label className="label">Password</label>
                <input onChange={handlePassword} className="input"
                value={password} type="password" />

                <button onClick={handleSubmit} className="btn" type="submit">
                Register
                </button>
            </form>

            {/* Calling to the methods */}
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>

            <div className="login">
                <span style={{display: 'inline-block'}}>Already have an account? </span><Link to="/login" className="loginLink">Log in</Link>
            </div>

            <br></br>
            <br></br>
        </div>
    )
}

export default Register; 
