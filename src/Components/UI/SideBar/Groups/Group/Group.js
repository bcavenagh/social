import React from 'react';
import classes from './Group.module.css';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';

const group = (props) => {
    let id = props.id
    return(
        <>
        <ListItem
            button
            selected={props.selected === id}
            className={classes.Group}
            onClick={(e) => props.handleSelected(id)} 
        >
            <ListItemText 
                className={classes.GroupTitle} 
                primary={props.name} 
                key={props.key}/>
        </ListItem>
        <Divider className={classes.Divider}/>
        </>
    );
};

export default group;