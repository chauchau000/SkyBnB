import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginFormModal.css";


function LoginFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.message) setErrors(data);
      }
    );
  }

  const demoUserLogin = (e) => {
    setCredential('demo@user.io')
    setPassword('password')
  }

  return (
    <div className='login-container'>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label className='login-labels'>
          <span className='login-span'>Username or Email</span>
          <input
            className='login-inputs'
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className='login-labels'>
          <span className='login-span'>Password</span>
          <input
            className='login-inputs'

            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <button className='login-button' type="submit">Log In</button>
        {errors.title && <p>{errors.title}</p>}
        <button className='demo-user' type='submit' onClick={demoUserLogin}>Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;