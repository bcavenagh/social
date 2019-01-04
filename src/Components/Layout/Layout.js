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
            groups:[],
            members: [],
            hasEvents: false,
            hasGroups: false,
            loading: false,
            removeGroup: '',
            userId: fire.auth().currentUser.uid
        })
        this.setEvents = this.setEvents.bind(this);
        this.setGroups = this.setGroups.bind(this);
        this.fetchGroups = this.fetchGroups.bind(this);
        this.child = React.createRef();
         
    }
    
    toggleSideBar = () => {
        this.setState((prevState) => {
            return{ sidebarOpen: !prevState.sidebarOpen };
        });
    }
    toggleGroup = (name, index, id) => {
        let membersHold = [];
        const groupRef = fire.database().ref('groups').child(id);
        groupRef.child('members').once('value', snap => {
            if(snap.val()){
                snap.forEach(member => {
                    membersHold.push(snap.key);
                })
            }
        })
        this.setState({
            group: name,
            index: index,
            id: id,
            members: membersHold
        }, () => {this.setEvents(id);})
        
    }
    setEvents(id){
        this.setState({loading: true});
        let tempIdHold = [];
        let members = [];
        if(id != null){
            const groupRef = fire.database().ref('groups').child(id);
            groupRef.child('members').once('value', snap => {
                if(snap.val()){
                    snap.forEach(member => {
                        members.push(member);
                    });
                    this.setState({members: members}, () => {this.fetchEvents(tempIdHold);});
                }
            })
            groupRef.child('events').once('value', snapshot =>{
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
        if(tempIdHold.length > 0){
            tempIdHold.forEach(event => {
                eventsRef.child(event).once('value', snapshot => {
                    if(snapshot.val() != null){
                        let newEvent = {
                            name:snapshot.val().name,
                            description:snapshot.val().description,
                            snippet:snapshot.val().description.substring(0,10),
                            date: snapshot.val().date,
                            colorHex: snapshot.val().colorHex,
                            groupid:this.state.id,
                            id: snapshot.key
                        };
                        tempEventHold.push(newEvent);   
                        this.setState({
                            events: tempEventHold,
                            loading:false
                        }); 
                    }               
                }); 
            });
        }
    }
    setGroups = () => {
        this.setState({loading: true});

        const user = fire.auth().currentUser.uid;
        const currentUserRef = fire.database().ref('users').child(user);
        const userGroups = currentUserRef.child('groups');
        const idArray = [];
        userGroups.once('value', snapshot => {
            if(snapshot.val()){
                snapshot.forEach(group => {
                    idArray.push(group.key);
                });
                this.setState({hasGroups: true}, () => {this.fetchGroups(idArray);})
            }else{
                this.setState({hasGroups: false});
            }
        });
    }
    fetchGroups(idArray){
        const groupRef = fire.database().ref('groups');
        const groupArray = [];
        if(idArray.length > 0){
            idArray.forEach(group => {
                groupRef.child(group).once('value', snap => {
                    if(snap.val() != null){
                        let addGroup = {
                            id: snap.key,
                            name: snap.val().name
                        }
                        groupArray.push(addGroup);
                        this.setState({
                            groups: groupArray,
                            loading:false
                        });
                    }
                })
                
            })
        }
    }
    handleRemoveGroup = (id) => {
        this.setState({
            removeGroup: id,
            index: -1
        })
        this.child.current.removeGroup();
        const user = fire.auth().currentUser.uid;
        const userDb = fire.database().ref('users').child(user).child('groups').child(id);
        userDb.remove();
    }
    handleLogout(){
        fire.auth().signOut()
        .then(function() {
            console.log('Signed out')
        })
        .catch(function(error) {
            console.log('Error on signout')
        });
    }
    //REFRESH DASHBOARD

    render(){
        let dash = null
        if(this.state.index < 0){
            dash = <p>Please select a group to get started!</p>;
        }else if(!(this.state.hasEvents)){
            dash = <Dashboard 
                        group={this.state.group} 
                        groupId={this.state.id} 
                        members={this.state.members}
                        hasEvents={false} 
                        refresh={this.setEvents}
                        handleRemoveGroup={this.handleRemoveGroup} >There are no events planned for this group yet. Go ahead and add one!</Dashboard>
        }else if(this.state.loading){
            dash = <Spinner/>
        }
        else{
            dash = <Dashboard 
                        group={this.state.group} 
                        groupId={this.state.id} 
                        events={this.state.events} 
                        members={this.state.members}
                        hasEvents={true}
                        refresh={this.setEvents}
                        handleRemoveGroup={this.handleRemoveGroup} />
        }
            return(
                <>
                    <TopBar toggle={this.toggleSideBar} isOpen={this.state.sidebar} logout={this.handleLogout}/>
                    <main className={classes.Main}>
                        <SideBar 
                            show={this.state.sidebarOpen}
                            ref={this.child}
                            groupId={this.state.id} 
                            toggleGroup={this.toggleGroup}
                            removeGroup={this.state.removeGroup}
                            hasGroup={this.state.hasGroups}
                            togg={this.setGroups}/>
                        {dash}
                    </main>
                </>
            )
    }
}

export default Layout;