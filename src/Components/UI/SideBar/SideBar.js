import React from 'react';
import classes from './SideBar.module.css';
import Groups from './Groups/Groups';

const sideBar = (props) => (
    // Possible solution: pass user id's into both sidebar and dashboard
    // and use that to pass into the Groups props to load the groups
    // then from the selected group pass a group id to the dashboard to load
    // groups events
    <div className={classes.SideBar}>
        <Groups/>
    </div>
);

export default sideBar;