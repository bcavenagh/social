import React, { Component } from 'react';
import classes from './Dashboard.module.css';
import Events from '../../Components/UI/Events/Events';
import { Button, Tooltip, AppBar, Toolbar, Typography, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EventForm from '../../Components/Forms/EventForm';

class Dashboard extends Component {
    constructor(props){
        super(props);
            this.state={
                events:[
                    {name:'Test 1'},
                    // {name:"Test", description:"This is a group event.", id:1},
                    // {name:"Test", description:"This is a group event.", id:2},
                    // {name:"Test", description:"This is a group event.", id:3},
                    // {name:"Test", description:"This is a group event.", id:4},
                    // {name:"Test", description:"This is a group event.", id:5},
                    // {name:"Test", description:"This is a group event.", id:6},
                    // {name:"Test", description:"This is a group event.", id:7},
                    // {name:"Test", description:"This is a group event.", id:9},
                    // {name:"Test", description:"This is a group event.", id:10}
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
    handleEventAdd = (event) => {
        this.setState(previousState => ({
            events: [...previousState.events, event]
        }));
        console.log("Event: " + event);
        console.log("Events Array: " + this.state.events);
    };

    render(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd = '0'+dd
        } 
        if(mm<10) {
            mm = '0'+mm
        } 
        today = yyyy + '-' + mm + '-' + dd;
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
                    <EventForm date={today} add={this.handleEventAdd}/>
                </Modal>
            </div>
         );
    }
}

export default Dashboard;