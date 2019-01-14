import React from 'react';
import classes from './Group.module.scss';
import { ListItem, ListItemText, Divider } from '@material-ui/core';

const group = (props) => {
    let index = props.index
    return(
        <>
        <ListItem
            button
            selected={props.selected === index}
            className={classes.Group}
            onClick={(e) => props.handleSelected(index)} 
        >
            <ListItemText 
                className={classes.GroupTitle} 
                primary={props.name} 
                key={props.id}/>
        </ListItem>
        <Divider className={classes.Divider}/>
        </>
    );
};

export default group;