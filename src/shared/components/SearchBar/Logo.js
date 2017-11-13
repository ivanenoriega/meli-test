import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './Logo_ML.png';

const Logo = () => {
  return (<NavLink className='navbar-brand' to='/'>
    <img src={logo} alt='logo' title='logo' />
  </NavLink>);
};

export default Logo;
