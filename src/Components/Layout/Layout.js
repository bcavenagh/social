import React, { Component } from 'react';
import classes from './Layout.module.css';
import TopBar from '../UI/TopBar/TopBar';
import SideBar from '../UI/SideBar/SideBar';
import Dashboard from '../../Containers/Dashboard/Dashboard';
import firebase from 'firebase';

class Layout extends Component {
    constructor(props){
        super(props);
        this.state = ({
            group: '',
            sidebarOpen: true,
            id:'',
            index:''
        })
    }
    
    toggleSideBar = () => {
        this.setState((prevState) => {
            return{ sidebarOpen: !prevState.sidebarOpen };
        });
    }
    toggleGroup = (name, index, id) => {
        this.setState({
            group: name,
            index: index,
            id: id
        })
    }
    render(){
        return( 
            <>
                <TopBar toggle={this.toggleSideBar} isOpen={this.state.sidebar} />
                <main className={classes.Main}>
                    <SideBar 
                        show={this.state.sidebarOpen} 
                        toggleGroup={this.toggleGroup}/>
                    <Dashboard group={this.state.group} groupId={this.state.id}/>
                </main>
            </>
        );
    }
}

export default Layout;