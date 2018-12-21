import React , { Component } from 'react';
import classes from './SideBar.module.css';
import Groups from './Groups/Groups';
import { Button, Modal } from '@material-ui/core';
import '../UI.css';
import GroupForm from '../../Forms/GroupForm/GroupForm';
import axios from '../../../axios';
import fire from '../../../firebase';

class SideBar extends Component {
  constructor(props){
    super(props);
        this.state={
            groups: [
                // {name:'Group 1', id: 0},
            ],
            open: false,
            selectedIndex: 0
        };
    }
    componentDidMount(){        
        this.setGroups();
        this.props.toggleGroup('1', 1, 'asjhdbvfasdv')
        // this.props.toggleGroup(this.state.groups[this.state.selectedIndex].name)
    }
    setGroups(){
        const groupRef = fire.database().ref('groups');
        //USE THE SETGROUPS FUNCTION FROM MY MACBOOK FRIEND-GROUP-REACT TO REPLACE BELOW
        //{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}
        const groupArray = [];
        const idArray = [];
        groupRef.once('value', snapshot => {
            snapshot.forEach(group => {
                console.log('groupid: ' + group.key);
                idArray.push(group.key);
                let addGroup = {
                    id: group.key,
                    name: group.val().name
                }
                if(groupArray.length !== idArray.length){
                    groupArray.push(addGroup);
                    console.log('pushed');
                }
            })
            
            this.setState(previousState => ({
                groups: groupArray
            }));
        })
        //{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}
        console.log('in setGroups');
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
            console.log(group)
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