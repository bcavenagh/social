import React, { Component } from 'react';
import classes from './Dashboard.module.css';
import Events from '../../Components/UI/Events/Events';

class Dashboard extends Component {
    render(){
        return( 
            <div className={classes.Dashboard}>
                <Events />
            </div>
         );
    }
}

export default Dashboard;