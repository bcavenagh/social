import React , { Component } from 'react';
import classes from './SideBar.module.css';
import Groups from './Groups/Groups';
import { Button, Modal } from '@material-ui/core';
import '../UI.css';
import GroupForm from '../../Forms/GroupForm/GroupForm';

class SideBar extends Component {
  constructor(props){
    super(props);
        this.state={
            groups: [
                {name: 'Test', id: 1},
            ],
            open: false,
            selectedIndex: 1
        };
    }
handleOpen = () => {
    this.setState({ open: true });
};

handleClose = () => {
    this.setState({ open: false });
};
handleEventAdd = (group) => {
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
                <Groups groups={this.state.groups} selected={this.state.selectedIndex}/>
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
                <GroupForm add={this.handleEventAdd}/>
            </Modal>
        </div>
    );
  }
}

export default SideBar;