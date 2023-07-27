import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul>
      <li className='home'>
        <NavLink exact to="/"><i className="fa-solid fa-house"></i>airbnb</NavLink>
      </li>
      <div className='right-side'>
        {sessionUser && <li id='create-new-spot'><NavLink exact to='/spots/new'>Create a New Spot </NavLink> </li>}
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </div>
    </ul>
  );
}

export default Navigation;