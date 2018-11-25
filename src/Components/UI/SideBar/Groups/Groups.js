import React, { Component } from 'react';
import Group from './Group/Group';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';

// class Groups extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
               
//         }
//     }
//     render() {
//         return (
//             <List component="nav">
//                 {
//                     this.state.groups.map(group => 
//                         <Group name={group.name} key={group.id}/>
//                     )
//                 }
//             </List>
//         );
//     }
// }

// export default Groups;
// import React from 'react';

const groups = (props) => (
    <List component="nav">
        {
            props.groups.map(group => 
                <Group name={group.name} key={group.id}/>
            )
        }
    </List>
);

export default groups;
