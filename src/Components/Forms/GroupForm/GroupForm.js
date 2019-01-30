import React, { Component } from 'react';
import { Paper, TextField, Button } from '@material-ui/core';
import classes from './GroupForm.module.scss';
import classNames from 'classnames';
import fire from '../../../firebase';
import CustomTextField from '../../UI/CustomTextField/CustomTextField';

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
        // let alertString = "Group Name: " + this.state.groupName + "\n Group Description: " + this.state.groupDesc;
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
            <div className={classes.PictureFrame}>
                {/* <img className={classes.Picture} src='https://source.unsplash.com/featured/?friends' alt="Friends"/> */}
            </div>
            <form onSubmit={this.handleSubmit} className={classes.Form}>
                <div className={classes.Inner}>
                    <h4 className={classes.Title}>Create a New Group</h4>
                    {/* <TextField
                        id="standard-name"
                        label="Group Name"
                        value={this.state.eventName}
                        onChange={this.handleChange('groupName')}
                        className={classes.input}
                    /> */}
                    <CustomTextField
                        label="Group Name"
                        value={this.state.eventName}
                        change={this.handleChange}
                        changeStateVar={'groupName'}
                        variant="field"
                    />
                    {/* <TextField
                        id="outlined-multiline-flexible"
                        label="Description"
                        multiline
                        rowsMax="4"
                        value={this.state.eventDesc}
                        onChange={this.handleChange('groupDesc')}
                        className={classes.input}
                        margin="normal"
                        variant="outlined"
                    /> */}
                    <CustomTextField
                        label="Group Description"
                        value={this.state.eventDesc}
                        change={this.handleChange}
                        changeStateVar={'groupDesc'}
                        className={classes.input}
                        variant="area"
                    />
                    
                    <Button type="submit" value="Submit" className={classes.Submit}>
                        Submit
                    </Button>
                </div>
                
            </form>
        </Paper> 
        );
    }
}

export default GroupForm;