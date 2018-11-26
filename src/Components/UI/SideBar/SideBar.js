import React , { Component } from 'react';
import classes from './SideBar.module.css';
import Groups from './Groups/Groups';
import { Button, Typography } from '@material-ui/core';

// const sideBar = (props) => (
//     // Possible solution: pass user id's into both sidebar and dashboard
//     // and use that to pass into the Groups props to load the groups
//     // then from the selected group pass a group id to the dashboard to load
//     // groups events
//     <div className={classes.SideBar}>
//         <Groups/>
//     </div>
// );

// export default sideBar;
// import React from 'react';

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
            {name: 'Colleagues', id: 33},
            {name: 'School', id: 34},
            {name: 'Family', id: 41},
            {name: 'Friends', id: 42},
            {name: 'Colleagues', id: 43},
            {name: 'School', id: 44},
            {name: 'Family', id: 51},
            {name: 'Friends', id: 52},
            {name: 'Colleagues', id: 53},
            {name: 'School', id: 54},
            {name: 'Family', id: 61},
            {name: 'Friends', id: 62},
            {name: 'Colleagues', id: 63},
            {name: 'School', id: 64},

        ]
    };
  }
  render(){
    return(
        <div className={classes.SideBar}>
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