import React from 'react';
import classes from './Group.module.css';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';

const group = (props) => (
    <ListItem
        button
        // selected={this.state.selectedIndex === 0}
        // onClick={event => this.handleListItemClick(event, 0)}
    >
        <ListItemText primary={props.name} key={props.key}/>
    </ListItem>
);

export default group;