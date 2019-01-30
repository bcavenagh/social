import React, { Component } from 'react';
import classes from './AddMembers.module.scss';
import Search from '@material-ui/icons/Search';
import ArrowForward from '@material-ui/icons/ArrowForward';
import NewMemberIcon from '../../UI/NewMemberIcon/NewMemberIcon';
import fire from '../../../firebase';

class AddMembers extends Component {
    constructor(props){
        super(props);
        this.state = {
            addEmail: '',
            newMembers: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.findUsersMatchingEmail = this.findUsersMatchingEmail.bind(this);
    } 
    handleChange = name => event => {
        this.setState({[name]: event.target.value,});
    }
    handleRemove = (i) => {
        var members = [...this.state.newMembers];
        if(i !== -1){
            members.splice(i, 1);
            this.setState({newMembers: members});
        }
    }
    handleAdd = () => {
        let userRef = fire.database().ref('users');
        let membersRef = fire.database().ref('groups').child(this.props.groupId).child('members');
        this.state.newMembers.forEach(member => {
            membersRef.child(member.id).set({
                id: member.id
            })
            userRef.child(member.id).child('groups').child(this.props.groupId).set({
                groupId: this.props.groupId
            })
        })
        this.props.handleMembers(this.state.newMembers);
        this.props.close();
    }
    /**
     * @param {string} emailAddress
     * @return {Object} the object contains zero or more user records, the keys are the users' ids
     */
    findUsersMatchingEmail = ( emailAddress ) => {
        const fb = fire.database().ref('users');
        fb.orderByChild('email').equalTo(emailAddress).once('value')
            .then((snap) => {
                if(snap.val()){
                    let newMember = null
                    snap.forEach(user => {
                        let initials = user.val().firstName.substring(0,1) + user.val().lastName.substring(0,1)
                        console.log(initials)
                        newMember = {
                            fName: user.val().firstName,
                            lName: user.val().lastName,
                            id: user.key,
                            initials: initials
                        }                    
                    })
                    this.setState(previousState => ({
                        newMembers: [...previousState.newMembers, newMember]
                    }));
                }else{
                    alert('No user Found.')
                }
            })
    }


    render(){
        return(
            <>
            <div className={classes.AddMembersModalContainer}>
                <div className={classes.TitleBar}>
                    <h2 className={classes.Title}>ADD MEMBERS</h2>
                </div>
                <div className={classes.EmailInputBar}>
                    <input 
                        className={classes.Email} 
                        onChange={this.handleChange('addEmail')}
                        type="email" 
                        placeholder="Email"
                        value={this.state.addEmail}></input>
                    <div className={classes.IconsContainer}>
                        <div className={classes.SearchIcon}><Search/></div>
                        <button className={classes.ArrowIcon} onClick={() => this.findUsersMatchingEmail(this.state.addEmail)}><ArrowForward/></button>
                    </div>
                </div>
                <div className={classes.InputContainer}>
                    <div className={classes.NewMembersContainer}>
                    {this.state.newMembers.map((member, index) => 
                        <NewMemberIcon 
                            fName={member.fName}
                            lName={member.lName}
                            initials={member.initials}
                            index={index}
                            key={index}
                            delete={this.handleRemove}/>
                    )}
                        
                    </div>
                </div>
                <button className={classes.AddButton} onClick={() => this.handleAdd(this.state.addEmail)}>ADD</button>
            </div>
            {/* <div className={classes.Overlay}></div> */}
            </>
        );
    }
}

export default AddMembers;