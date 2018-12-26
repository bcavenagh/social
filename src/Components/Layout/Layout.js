import React, { Component } from 'react';
import classes from './Layout.module.css';
import TopBar from '../UI/TopBar/TopBar';
import SideBar from '../UI/SideBar/SideBar';
import Dashboard from '../../Containers/Dashboard/Dashboard';
import Spinner from '../UI/Spinner/Spinner';
import fire from 'firebase';

class Layout extends Component {
    constructor(props){
        super(props);
        this.state = ({
            group: '',
            sidebarOpen: true,
            id:'',
            index:-1,
            events:[],
            hasEvents: false,
            loading: false
        })
        this.setEvents = this.setEvents.bind(this);
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
        this.setEvents(id);
    }
    setEvents(id){
        this.setState({loading: true});
        let tempIdHold = [];
        if(id != null){
            const groupRef = fire.database().ref('groups').child(id).child('events');
            groupRef.once('value', snapshot =>{
                if(snapshot.val()){
                    snapshot.forEach(snap => {
                        tempIdHold.push(snap.key);
                    });
                    this.setState({hasEvents: true}, () => {this.fetchEvents(tempIdHold);});
                }else{
                    this.setState({hasEvents: false});
                }
            });
        }
    }

    fetchEvents(tempIdHold) {
        const eventsRef = fire.database().ref('events');
        const tempEventHold = [];
        tempIdHold.forEach(event => {
            eventsRef.child(event).once('value', snapshot => {
                let newEvent = {
                    name:snapshot.val().name,
                    description:snapshot.val().description,
                    groupid:this.props.group,
                    id: eventsRef.push().key
                };
                tempEventHold.push(newEvent);    
                this.setState({
                    events: tempEventHold,
                    loading:false
                });                
            }); 
        });
    }
    //REFRESH DASHBOARD

    render(){
        let dash = null
        if(this.state.index < 0){
            dash = <p>Please select a group to get started!</p>;
        }else if(!(this.state.hasEvents)){
            dash = <Dashboard group={this.state.group} groupId={this.state.id} hasEvents={false} refresh={this.setEvents}>There are no events planned for this group yet. Go ahead and add one!</Dashboard>
        }else if(this.state.loading){
            dash = <Spinner/>
        }
        else{
            dash = <Dashboard group={this.state.group} groupId={this.state.id} events={this.state.events} hasEvents={true} />
        }
            return(
                <>
                    <TopBar toggle={this.toggleSideBar} isOpen={this.state.sidebar} />
                    <main className={classes.Main}>
                        <SideBar 
                            show={this.state.sidebarOpen} 
                            toggleGroup={this.toggleGroup}/>
                        {dash}
                    </main>
                </>
            )
    }
}

export default Layout;