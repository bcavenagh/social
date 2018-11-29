import React, { Component } from 'react';
import classes from './Layout.module.css';
import TopBar from '../UI/TopBar/TopBar';
import SideBar from '../UI/SideBar/SideBar';
import Dashboard from '../../Containers/Dashboard/Dashboard';

class Layout extends Component {
    constructor(props){
        super(props);
        this.state = ({
            group: 'Friends',
            sidebarOpen: true
        })
    }
    toggleSideBar = () => {
        this.setState((prevState) => {
            return{ sidebarOpen: !prevState.sidebarOpen };
        });
    }
    render(){

        return( 
            <>
                <TopBar toggle={this.toggleSideBar} isOpen={this.state.sidebar} />
                <main className={classes.Main}>
                    <SideBar show={this.state.sidebarOpen}/>
                    <Dashboard group={this.state.group}/>
                </main>
            </>
        );
    }
}

export default Layout;