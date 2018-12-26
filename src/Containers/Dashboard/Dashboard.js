import React, { Component } from 'react';
import classes from './Dashboard.module.css';
import Events from '../../Components/UI/Events/Events';
import { Button, Tooltip, AppBar, Toolbar, Typography, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EventForm from '../../Components/Forms/EventForm/EventForm';
import fire from 'firebase';

class Dashboard extends Component {
    constructor(props){
        super(props);
            this.state={
                events:[
                    // {name:'Example Event', 
                    // description:'Here is what an event would look like in your dashboard. This is where the description of the event is written. It will stretch the card to fit the wording.', 
                    // groupid: this.props.groupId}
                ],
                open: false,
                groupid: ''
            }
    }
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleEventAdd = (event) => {
        fire.database().ref('events').child(event.id).set({
            name: event.name,
            description: event.description,
            groupid: event.groupid,
            id: event.id
        });
        fire.database().ref('groups').child(event.groupid).child('events').child(event.id).set({
            id:event.id
        });

        this.setState(previousState => ({
            events: [...previousState.events, event]
        }));
        this.handleClose();
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
        let content = "";
        if(this.props.hasEvents){
            content = <Events events={this.props.events} group={this.props.group}/>; 
        }else{
            content = this.props.children;
        }
        return( 
            <div className={classes.Dashboard}>
                <AppBar position="static" color="default" className={classes.AppBar}>
                    <Toolbar>
                        <Typography variant="h3" color="inherit">
                            {this.props.group}
                        </Typography>
                        <p>{this.props.groupId}</p>
                    </Toolbar>
                </AppBar>
                
                {content}

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
                    <EventForm date={today} add={this.handleEventAdd} group={this.props.groupId}/>
                </Modal>
            </div>
         );
    }
}

export default Dashboard;