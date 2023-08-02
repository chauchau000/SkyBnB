import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from '../../../store/session'
import "./SignUpFormModal.css";


function SignUpFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [backendErrors, setBackendErrors] = useState({})
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};
    
    if (!email.length) errors.email = 'Email is required';
    if (username.length < 4) errors.address = 'Username is required';
    if (!firstName.length) errors.firstName = 'First name is required';
    if (!lastName.length) errors.lastName = 'Last name is required';
    if (password.length < 6) errors.password = 'Password is required';
    if (confirmPassword.length < 6) errors.confirmPassword = 'Password is required';
    if (password !== confirmPassword) errors.matchingPassword = 'Passwords must be matching';
    
    setValidationErrors(errors)
    
  }, [email, username, firstName, lastName, password, confirmPassword])
  
  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);


    setBackendErrors({});
    dispatch(
      sessionActions.signup({
        email,
        username,
        firstName,
        lastName,
        password,
      })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setBackendErrors(data.errors);
      }
    });

    setValidationErrors({})
    setHasSubmitted(false);

  };

  return (
    <div className='signup'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label className='signup-label'>
          <span className='signup-span'>Email</span>
          <input className='signup-input'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {backendErrors.email && <p className='errors'>{backendErrors.email}</p>}
        {hasSubmitted && validationErrors.email && <p className='errors'>{validationErrors.email}</p>}

        <label className='signup-label'>
          <span className='signup-span'>Username</span>
          <input className='signup-input'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        {backendErrors.username && <p className='errors'>{backendErrors.username}</p>}
        {hasSubmitted && validationErrors.username && <p className='errors'>{validationErrors.username}</p>}

        <label className='signup-label'>
          <span className='signup-span'>First Name</span>
          <input className='signup-input'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        {backendErrors.firstName && <p className='errors'>{backendErrors.firstName}</p>}
        {hasSubmitted && validationErrors.firstName && <p className='errors'>{validationErrors.firstName}</p>}

        <label className='signup-label'>
          <span className='signup-span'>Last Name</span>
          <input className='signup-input'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        {backendErrors.lastName && <p className='errors'>{backendErrors.lastName}</p>}
        {hasSubmitted && validationErrors.lastName && <p className='errors'>{validationErrors.lastName}</p>}

        <label className='signup-label'>
          <span className='signup-span'>Password</span>
          <input className='signup-input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {backendErrors.password && <p className='errors'>{backendErrors.password}</p>}
        {hasSubmitted && validationErrors.password && <p className='errors'>{validationErrors.password}</p>}

        <label className='signup-label'>
          <span className='signup-span'>Confirm Password</span>
          <input className='signup-input'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {hasSubmitted && validationErrors.confirmPassword && <p className='errors'>{validationErrors.confirmPassword}</p>}
        {hasSubmitted && validationErrors.matchingPassword && <p className='errors'>{validationErrors.matchingPassword}</p>}

        <button type="submit" className='signup-button' disabled={Object.values(validationErrors).length ? true : false}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpFormModal;