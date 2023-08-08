import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div id='nav-bar-container'>
      <ul id='nav-bar'>
        <li className='home'>
          <NavLink exact to="/">
            <img id='skybnb-icon' src='https://companieslogo.com/img/orig/ABNB-4aaade0f.png' alt='skybnb-icon' width='30px' height='30px' />
            <span>skybnb</span>
          </NavLink>
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
    </div>
  );
}

export default Navigation;