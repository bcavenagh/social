import React, { Component } from 'react';
import classes from './Dashboard.module.css';
import Events from '../../Components/UI/Events/Events';
import { Button, Tooltip, AppBar, Toolbar, Typography, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

class Dashboard extends Component {
    constructor(props){
        super(props);
            this.state={
                events:[
                    {name:"Thanksgiving", description:"This is a group event.", id:1},
                    {name:"Friendsgiving", description:"This is a group event.", id:2},
                    {name:"Christmas", description:"This is a group event.", id:3},
                    {name:"Bunco Night", description:"This is a group event.", id:4},
                    {name:"New Year's Eve", description:"This is a group event.", id:5},
                    {name:"New Year's", description:"This is a group event.", id:6},
                    {name:"Fred Birthday", description:"This is a group event.", id:7},
                    {name:"Labor Day", description:"This is a group event.", id:9},
                    {name:"Bar Crawl", description:"This is a group event.", id:10}
                ],
                open: false
            }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render(){
        return( 
            <div className={classes.Dashboard}>
                <AppBar position="static" color="default" className={classes.AppBar}>
                    <Toolbar>
                        <Typography variant="h3" color="inherit">
                            {this.props.group}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Events events={this.state.events}/>
                <Tooltip title="Add Event" placement="bottom">
                    <Button variant="fab" color="primary" onClick={this.handleOpen} aria-label="Add" className={classes.AddEventButton}>
                        <AddIcon />
                    </Button>
                </Tooltip>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div>
                        <p>This is the modal</p>
                    </div>
                </Modal>
            </div>
         );
    }
}

export default Dashboard;