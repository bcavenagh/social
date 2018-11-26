import React from 'react';
import logo from '../../../Assets/logo.png';
import classes from './TopBar.module.css';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const topBar = (props) => (
    <header className={classes.TopBar}>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
        <div className={classes.Logo}><img src={logo} alt='Logo'/></div>
        <div className={classes.Profile}>Profile</div>
    </header>
);

export default topBar;