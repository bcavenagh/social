import React, { Component } from 'react';
import logo from '../../../Assets/logo.png';
import classes from './TopBar.module.css';
import { IconButton, Menu, MenuItem, Toolbar} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

class TopBar extends Component{
    constructor(props){
        super(props);
        this.state = ({
            auth:true
        })
    }
    handleChange = event => {
        this.setState({ auth: event.target.checked });
      };
    
      handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };
    render(){
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return(
            <header className={classes.TopBar}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
                <div className={classes.Logo}><img src={logo} alt='Logo'/></div>
                {auth && (
                    <div>
                        <IconButton
                        aria-owns={open ? 'menu-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                            <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                        </Menu>
                    </div>
                )}
            </header>    
        );
    }
};

export default TopBar;