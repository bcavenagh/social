import React from 'react';
import classes from './Group.module.css';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';

const group = (props) => (
    <>
    <ListItem
        button
        // selected={this.state.selectedIndex === 0}
        // onClick={event => this.handleListItemClick(event, 0)}
        className={classes.Group}
    >
        <ListItemText className={classes.GroupTitle} primary={props.name} key={props.key}/>
    </ListItem>
    <Divider className={classes.Divider}/>
    </>
);

export default group;