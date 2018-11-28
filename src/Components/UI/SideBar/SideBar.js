import React , { Component } from 'react';
import classes from './SideBar.module.css';
import Groups from './Groups/Groups';
import { Button, Typography } from '@material-ui/core';
import '../UI.css';

class SideBar extends Component {
  constructor(props){
    super(props);
    this.state={
        groups: [
            {name: 'Family', id: 1},
            {name: 'Friends', id: 2},
            {name: 'Colleagues', id: 3},
            {name: 'School', id: 4},
            {name: 'Family', id: 21},
            {name: 'Friends', id: 22},
            {name: 'Colleagues', id: 23},
            {name: 'School', id: 24},
            {name: 'Family', id: 31},
            {name: 'Friends', id: 32},
        ]
    };
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
                <Groups groups={this.state.groups}/>
            </div>
            <div className={classes.CreateGroupButton}>
                <Button color="primary" variant="contained" className={classes.Button}>
                    <h6 className={classes.ButtonText}>Create Group</h6>
                </Button>
            </div>
        </div>
    );
  }
}

export default SideBar;