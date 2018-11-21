import React, { Component } from 'react';
import classes from './Layout.module.css';
import TopBar from '../UI/TopBar/TopBar';
import SideBar from '../UI/SideBar/SideBar';
import Dashboard from '../../Containers/Dashboard/Dashboard';

class Layout extends Component {
    render(){
        return( 
            <>
                <TopBar/>
                <main className={classes.Main}>
                    <SideBar className={classes.Side}/>
                    <Dashboard className={classes.Dash}/>
                </main>
            </>
        );
    }
}

export default Layout;