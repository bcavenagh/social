import React, { Component } from 'react';
import classes from './Dashboard.module.scss';
import Events from '../../Components/UI/Events/Events';
import { Button, Fab, Tooltip, AppBar, Toolbar, Modal, IconButton, Menu } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Close from '@material-ui/icons/Close';
import EventForm from '../../Components/Forms/EventForm/EventForm';
import fire from 'firebase';
import Settings from '@material-ui/icons/Settings';
import SettingsModal from '../../Components/Forms/SettingsModal/SettingsModal';
import AddMembers from '../../Components/Forms/AddMembers/AddMembers';

class Dashboard extends Component {
    constructor(props){
        super(props);
            this.state={
                events:[
                    // {name:'Example Event', 
                    // description:'Here is what an event would look like in your dashboard. This is where the description of the event is written. It will stretch the card to fit the wording.', 
                    // groupid: this.props.groupId}
                ],
                members: this.props.members,
                openEventForm: false,
                openSettings: false,
                openAddMember: false,
                openEventDetails: false,
                // groupid: '',
                eventDetails: null
            }
            this.findUsersMatchingEmail = this.findUsersMatchingEmail.bind(this);
    }
    closeModals = () => {
        this.setState({
            openEventForm: false,
            openSettings: false,
            openAddMember: false,
            openEventDetails: false,
            eventDetails: null
        })
    }
    handleMembers = (newMembers) => {
        this.setState(previousState => ({ 
            members: [...previousState.members, newMembers] 
        }));
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
    openAddMember = () => {
        this.setState({ openAddMember: true });
    };
    closeSettings = () => {
        this.setState({ openSettings: false });
    }
    handleEventAdd = (event) => {
        fire.database().ref('events').child(event.id).set({
            name: event.name,
            description: event.description,
            date: event.date,
            groupid: event.groupid,
            id: event.id,
            eventType: event.eventType,
            postedBy: event.postedBy
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
    /**
     * @param {string} emailAddress
     * @return {Object} the object contains zero or more user records, the keys are the users' ids
     */
    findUsersMatchingEmail( emailAddress, groupId ) {
        let userRef = fire.database().ref('users');
        let membersRef = fire.database().ref('groups').child(this.props.groupId).child('members');
        userRef.orderByChild('email').equalTo(emailAddress).once('value', function(snap) {
            if(snap.val()){
                snap.forEach(user => {
                    membersRef.child(user.key).set({
                        id: user.key
                    })
                    userRef.child(user.key).child('groups').child(groupId).set({
                        groupId: groupId
                    })
                })
            }else{
                alert(emailAddress + ' does not exist :(');
            }
        });
        
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
                        <h2 className={classes.grow}>
                            {this.props.group}
                        </h2>
                        {/* <IconButton 
                            color="inherit"
                            aria-owns={open ? 'dash-appbar' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleMenuOpen}>
                            <Settings/>
                        </IconButton> */}
                        <Button
                            variant="outlined" 
                            onClick={this.openAddMember} 
                            className={classes.MenuButtons}>Add Members</Button>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            onClick={this.handleLeaveGroup} 
                            className={classes.MenuButtons}>Leave Group</Button>
                    </Toolbar>
                    <p className={classes.MemberCount}>
                        <span className={classes.bold}>{this.state.members.length}</span> members
                    </p>
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
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.openAddMember}
                    onClose={this.closeModals}
                >
                    <AddMembers 
                        groupId={this.props.groupId} 
                        handleMembers={this.handleMembers}
                        close={this.closeModals}/>
                </Modal>
                <Menu
                    id="dash-appbar"
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
                    onClick={this.closeModals}
                    >
                        <Button 
                            variant="outlined" 
                            onClick={this.handleAddMember} 
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