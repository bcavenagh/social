import React, { Component } from 'react';
import classes from './Dashboard.module.css';
import Events from '../../Components/UI/Events/Events';
import { Button, Fab, Tooltip, AppBar, Toolbar, Typography, Modal, IconButton, Menu } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Close from '@material-ui/icons/Close';
import EventForm from '../../Components/Forms/EventForm/EventForm';
import fire from 'firebase';
import Settings from '@material-ui/icons/Settings';
import SettingsModal from '../../Components/Forms/SettingsModal/SettingsModal';

class Dashboard extends Component {
    constructor(props){
        super(props);
            this.state={
                events:[
                    // {name:'Example Event', 
                    // description:'Here is what an event would look like in your dashboard. This is where the description of the event is written. It will stretch the card to fit the wording.', 
                    // groupid: this.props.groupId}
                ],
                openEventForm: false,
                openSettings: false,
                openEventDetails: false,
                groupid: '',
                eventDetails: null
            }
    }
    closeModals = () => {
        this.setState({
            openEventForm: false,
            openSettings: false,
            openEventDetails: false,
            eventDetails: null
        })
    }
    openEventForm = () => {
        this.setState({ openEventForm: true });
    };
    closeEventForm = () => {
        this.setState({ openEventForm: false });
    }
    openSettings = () => {
        this.setState({ openSettings: true });
    };
    closeSettings = () => {
        this.setState({ openSettings: false });
    }
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
        this.props.refresh(event.groupid);
        this.closeEventForm();
    };
    handleMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };
    handleLeaveGroup = () => {
        this.deleteGroup();
    }
    deleteGroup = () => {
        this.props.handleRemoveGroup(this.props.groupId);
        // this.setState({events:[]})
    }
    handleEventOpen = (event) => {
        this.setState({ openEventDetails: true, eventDetails: event });
    }
    handleRemoveEvent = (event) => {
        const groupsRef = fire.database().ref('groups').child(this.props.groupId).child('events').child(event.id);
        const eventsRef = fire.database().ref('events').child(event.id); 
        groupsRef.remove();
        eventsRef.remove();
        this.props.refresh(this.props.groupId);
    }
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
            content = <Events 
                        events={this.props.events} 
                        group={this.props.group}
                        openEvent={this.handleEventOpen}/>; 
        }else{
            content = this.props.children;
        }
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        let detailsModal = null;
        if(this.state.eventDetails != null){
            detailsModal = 
            <SettingsModal 
                event={this.state.eventDetails} 
                groupid={this.props.groupId} 
                delete={this.handleRemoveEvent} 
                refresh={this.props.refresh}/>
        }
        return( 

            <div className={classes.Dashboard}>
                <AppBar position="static" color="default" className={classes.AppBar}>
                    <Toolbar>
                        <Typography variant="h3" color="inherit" className={classes.grow}>
                            {this.props.group}
                        </Typography>
                        <p>{this.props.groupId}</p>
                        <IconButton color="inherit" onClick={this.handleMenuOpen}>
                            <Settings/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                
                {content}

                <Tooltip title="Add Event" placement="bottom">
                    <Fab color="primary" onClick={this.openEventForm} aria-label="Add" className={classes.AddEventButton}>
                        <AddIcon />
                    </Fab>
                </Tooltip>

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.openEventForm}
                    onClose={this.closeModals}
                >
                    <EventForm date={today} add={this.handleEventAdd} group={this.props.groupId}/>
                </Modal>

                {/* EVENT DETAILS MODAL */}
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.openEventDetails}
                    onClose={this.closeModals}
                >
                    {detailsModal}
                </Modal>

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
                    onClose={this.closeModals}
                    >
                        <Button 
                            variant="outlined" 
                            onClick={this.handleMenuClose} 
                            className={classes.MenuButtons}>Add Members</Button>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            onClick={this.handleLeaveGroup} 
                            className={classes.MenuButtons}>Leave Group</Button>
                        <Button onClick={this.handleMenuClose}><Close/></Button>
                </Menu>
            </div>
         );
    }
}

export default Dashboard;