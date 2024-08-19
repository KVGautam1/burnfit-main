import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 64,
    height: 64,
    backgroundColor: theme.palette.secondary.main,
    marginBottom: 16,
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const nav = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [confirmPassword, setCpass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = () => {
    nav('/student-login'); // Navigate to StudentLogin.js on successful registration
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword && password !== '' && email !== '') {
      try {
        const response = await axios.post('http://localhost:8080/api/users/register', {
          email,
          password,
          firstName,
          lastName,
          dob,
          mobileNumber,
          gender
        });
        console.log('Registration response:', response.data);
        handleSignUp(); // Navigate to StudentLogin.js
      } catch (error) {
        console.error('Error during registration:', error);
        setErrorMessage('Registration failed. Please try again.');
      }
    } else {
      setErrorMessage('Passwords do not match or required fields are missing.');
    }
  };

  return (
    <div className="sign-up-container">
      <video className="background-video" autoPlay loop muted>
        <source src="/2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="form-wrapper">
        <Avatar className={classes.avatar} />
        <h1>Sign Up</h1>
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <input
            className="input-field"
            type="text"
            id="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="input-field"
            type="text"
            id="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            className="input-field"
            type="date"
            id="dob"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <input
            className="input-field"
            type="tel"
            id="mobileNumber"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <select
            className="input-field"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="" disabled>Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
          <input
            className="input-field"
            type="email"
            id="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input-field"
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
          />
          <input
            className="input-field"
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setCpass(e.target.value)}
          />
          <button type="submit" className="submit-button">
            Sign Up
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}
