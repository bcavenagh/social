import React from 'react';
import classes from './Event.module.css';

const event = (props) => (
    <div className={classes.Event}>
        Event {props.name}
    </div>
);

export default event;