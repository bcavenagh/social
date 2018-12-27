import React , { Component } from 'react';
import classes from './SideBar.module.css';
import Groups from './Groups/Groups';
import { Button, Modal } from '@material-ui/core';
import '../UI.css';
import GroupForm from '../../Forms/GroupForm/GroupForm';
import fire from '../../../firebase';

class SideBar extends Component {
  constructor(props){
    super(props);
        this.state={
            groups: [
                // {name:'Group 1', id: 0},
            ],
            open: false,
            selectedIndex: -1
        };
    }
    componentDidMount(){        
        this.setGroups();
    }
    setGroups(){
        const groupRef = fire.database().ref('groups');
        //USE THE SETGROUPS FUNCTION FROM MY MACBOOK FRIEND-GROUP-REACT TO REPLACE BELOW
        //{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}
        const groupArray = [];
        const idArray = [];
        groupRef.once('value', snapshot => {
            snapshot.forEach(group => {
                idArray.push(group.key);
                let addGroup = {
                    id: group.key,
                    name: group.val().name
                }
                if(groupArray.length !== idArray.length){
                    groupArray.push(addGroup);
                }
            })
            // this.props.toggleGroup(groupArray[0].name, 0, groupArray[0].id )
            this.setState(previousState => ({
                groups: groupArray
            }));
        })
        //{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}
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
        fire.database().ref('groups').child(group.id).set({
            name: group.name,
            id: group.id
        });
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
        if(this.props.show){
            sideBarClasses = [classes.SideBar, classes.Open].join(' ');
        }else{
            sideBarClasses = [classes.SideBar]
        }
        return(
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
        );
    }
}

export default SideBar;