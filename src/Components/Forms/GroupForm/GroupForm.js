import React, { Component } from 'react';
import { Paper, Input, TextField, Button } from '@material-ui/core';
import classes from './GroupForm.module.css';
import fire from '../../../firebase';
class GroupForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            groupName: '',
            groupDesc: '',
            groupIndex: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = name => event => {
        this.setState({[name]: event.target.value, groupIndex: this.props.groupCount});
    }

    handleSubmit(group) {
        let alertString = "Group Name: " + this.state.groupName + "\n Group Description: " + this.state.groupDesc;
        group.preventDefault();

        //Handling forming the group for Firebase
        const groupsRef = fire.database().ref('groups');
        console.log("Groups Ref:" + groupsRef)
        const groupId = groupsRef.push().key;

        this.props.add({
            name:this.state.groupName,
            // description:this.state.groupName,
            id:groupId,
            index: this.state.groupIndex
        });
    }

    render(){        
        return(
        <Paper className={classes.GroupForm}>
            <form onSubmit={this.handleSubmit}>
                <div className={classes.FormTitle}><h4>Create a New Group</h4></div>
                <div className={classes.InputContainer}>
                    <TextField
                        id="standard-name"
                        label="Group Name"
                        value={this.state.eventName}
                        onChange={this.handleChange('groupName')}
                        className={classes.input}
                    />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Description"
                        multiline
                        rowsMax="4"
                        value={this.state.eventDesc}
                        onChange={this.handleChange('groupDesc')}
                        className={classes.input}
                        margin="normal"
                        variant="outlined"
                    />
                </div>
                <Button type="submit" value="Submit" className={classes.Submit}>
                    Submit
                </Button>
            </form>
        </Paper> 
        );
    }
}

export default GroupForm;