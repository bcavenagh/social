import React from 'react';
import classes from './Group.module.css';

const group = (props) => (
    <li className={classes.Group}>
        {props.name}
    </li>
);

export default group;