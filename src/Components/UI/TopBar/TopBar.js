import React from 'react';
import logo from '../../../Assets/logo.png';
import classes from './TopBar.module.css';

const topBar = (props) => (
    <header className={classes.TopBar}>
        <div className={classes.Menu}>Menu</div>
        <div className={classes.Logo}><img src={logo} alt='Logo'/></div>
        <div className={classes.Profile}>Profile</div>
    </header>
);

export default topBar;