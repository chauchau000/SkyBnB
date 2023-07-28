import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import OpenModalButton from './OpenModalButton';
import './ProfileButton.css';
import LoginFormModal from "./LoginFormModal/LoginFormModal";
import SignUpFormModal from './SignUpFormModal/SignUpFormModal';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
    
  };

  const ulClassName = (showMenu ? "profile-dropdown" : " hidden");

  return (
    <div className='outer-div-profile-button'>
      <button className='profile-button' onClick={openMenu}>
        <i className="fa-solid fa-bars" />
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Hello, {user.username}</li>
            <li>{user.email}</li>
            <Link to='/user/spots'>
            <li id="manage-spots-button-container">
              <button id='manage-spots-button'>Manage Spots</button>
            </li>
            </Link>
            <li>
              <button id='logout-button' onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <li className='button-container li-1-container'>
              <OpenModalButton
                className='modal-button'
                buttonText="Log In"
                setShowMenu={setShowMenu}
                modalComponent={<LoginFormModal />}

              />
            </li>
            <li className='button-container li-2-container'>
              <OpenModalButton
                className='modal-button'
                buttonText="Sign Up"
                setShowMenu={setShowMenu}
                modalComponent={<SignUpFormModal />}
              />
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;