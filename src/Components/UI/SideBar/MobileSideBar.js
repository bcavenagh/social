import React , { Component } from 'react';
import classes from './SideBar.module.scss';
import Groups from './Groups/Groups';
import { Button, Modal } from '@material-ui/core';
import '../UI.css';
import GroupForm from '../../Forms/GroupForm/GroupForm';
import fire from '../../../firebase';

class MobileSideBar extends Component {
  constructor(props){
    super(props);
        this.state={
            groups: [
                // {name:'Group 1', id: 0},
            ],
            open: false,
            selectedIndex: -1,
            hasGroups: false
        };
    }
    componentDidMount(){        
        this.setGroups();
    }
    setGroups(){
        const user = fire.auth().currentUser.uid;
        const currentUserRef = fire.database().ref('users').child(user);
        const groupRef = fire.database().ref('groups');
        const userGroups = currentUserRef.child('groups');
        const groupArray = [];
        const idArray = [];
        userGroups.once('value', snapshot => {
            if(snapshot.val()){
                snapshot.forEach(group => {
                    idArray.push(group.key);
                });
                idArray.forEach(function(group, i) {
                    groupRef.child(group).once('value', snap => {
                        let addGroup = {
                            id: snap.key,
                            name: snap.val().name
                        }
                        if(groupArray.length !== idArray.length){
                            groupArray.push(addGroup);
                        }
                    })
                })
            }
        });
        this.setState(previousState => ({
            groups: groupArray,
        }), () => {
            this.props.togg();
            this.setState(previousState => ({
                hasGroups: true
            }))
        });
    }
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleSelectedIndex = (id) => {
            this.setState({ selectedIndex: id });
            let group = this.state.groups[id];
            this.props.toggleGroup(group.name, group.index, group.id);
        
    };
    handleEventAdd = (group) => {
        const user = fire.auth().currentUser.uid;

        fire.database().ref('groups').child(group.id).set({
            name: group.name,
            id: group.id,
            // members: {
            //     id: user
            // }
        });
        fire.database().ref('groups').child(group.id).child('members').child(user).set({
            id: user
        })
        fire.database().ref('users').child(user).child('groups').child(group.id).set({
            groupId: group.id
        })
        this.setState(previousState => ({
            groups: [...previousState.groups, group]
        }));
        
        this.handleClose();
    };
    removeGroup(){
        const dbref = fire.database().ref('groups').child(this.props.groupId);
        dbref.remove();
        this.setGroups();
        this.deleteAllEvents(dbref);
    }
    deleteAllEvents(dbref){
        // let tempIdHold = [];
        const eventsRef = fire.database().ref('events');
        dbref.child('events').once('value', snap => {
            if(snap.val()){
                snap.forEach(snap => {
                    dbref.child('events').child(snap.key).remove();
                    eventsRef.child(snap.key).remove();
                });
            }
        })
    }
    render(){
        let sideBarClasses;
        let overlay;
        
        if(this.props.show){
            sideBarClasses = [classes.MobileSideBar, classes.MobileOpen].join(' ');
            overlay = [classes.MobileOverlay]
        }else{
            sideBarClasses = [classes.MobileSideBar]
            overlay = ""
        }
        let groupsRender = null;
        if(this.state.groups.length > 0){
            groupsRender = 
            <div className={sideBarClasses}>
                <div className={classes.Groups}> 
                    <Groups 
                        groups={this.state.groups} 
                        selected={this.state.selectedIndex} 
                        handleSelected={this.handleSelectedIndex}/>
                </div>
                <div className={classes.CreateGroupButton}>
                    <Button color="primary" variant="contained" className={classes.Button} onClick={this.handleOpen}>
                        <h6 className={classes.ButtonText}>Create Group</h6>
                    </Button>
                </div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <GroupForm add={this.handleEventAdd} groupCount={this.state.groups.length}/>
                </Modal>
            </div>
        }else{
            groupsRender = 
            <div className={sideBarClasses}>
                <div className={classes.Groups}> 
                    <p>There are no groups. Create one to get started!</p>
                </div>
                <div className={classes.CreateGroupButton}>
                    <Button color="primary" variant="contained" className={classes.Button} onClick={this.handleOpen}>
                        <h6 className={classes.ButtonText}>Create Group</h6>
                    </Button>
                </div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <GroupForm add={this.handleEventAdd} groupCount={this.state.groups.length}/>
                </Modal>
            </div>
        }
        return(
            <>
                {groupsRender}
                <div className={overlay}></div>
            </>
        );
    }
}

export default MobileSideBar;