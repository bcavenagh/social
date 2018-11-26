import React, { Component } from 'react';
import Group from './Group/Group';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import classes from './Groups.module.css';

const groups = (props) => (
    <List component="nav" className={classes.GroupContainer}>
        {
            props.groups.map(group => 
                <Group name={group.name} key={group.id}/>
            )
        }
    </List>
);

export default groups;
