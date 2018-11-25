import React, { Component } from 'react';
import classes from './Dashboard.module.css';
import Events from '../../Components/UI/Events/Events';

class Dashboard extends Component {
    constructor(props){
        super(props);
            this.state={
                events:[
                    {name:"Thanksgiving", description:"This is a group event.", id:1},
                    {name:"Friendsgiving", description:"This is a group event.", id:2},
                    {name:"Christmas", description:"This is a group event.", id:3},
                    {name:"Bunco Night", description:"This is a group event.", id:4},
                    {name:"New Year's Eve", description:"This is a group event.", id:5},
                    {name:"New Year's", description:"This is a group event.", id:6},
                    {name:"Fred Birthday", description:"This is a group event.", id:7},
                    {name:"Labor Day", description:"This is a group event.", id:9},
                    {name:"Bar Crawl", description:"This is a group event.", id:10}
                ]
            }
    }
    render(){
        return( 
            <div className={classes.Dashboard}>
                <Events events={this.state.events}/>
            </div>
         );
    }
}

export default Dashboard;