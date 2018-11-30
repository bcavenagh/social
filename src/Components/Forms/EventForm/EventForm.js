import React, { Component } from 'react';
import { Paper, Input, TextField, Button } from '@material-ui/core';
import classes from './EventForm.module.css';
import Event from '../../UI/Events/Event.js/Event';

class EventForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            eventName: '',
            eventDate: this.props.date,
            eventDesc: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value,});
    }

    handleSubmit(event) {
        let alertString = "Event Name: " + this.state.eventName + "\n Event Date: " + this.state.eventDate + "\n Event Description: " + this.state.eventDesc;
        // alert('An event was submitted: \n' + alertString);
        event.preventDefault();
        this.props.add({
            name:this.state.eventName,
            description:this.state.eventDesc,
            id:this.state.eventName + Math.random() * (100 - 1) + 1
        });
    }

    render(){
        return(
        <Paper className={classes.EventForm}>
            <form onSubmit={this.handleSubmit}>
                <div className={classes.FormTitle}><h4>Create a New Event</h4></div>
                <div className={classes.InputContainer}>
                    <TextField
                        id="standard-name"
                        label="Event Name"
                        value={this.state.eventName}
                        onChange={this.handleChange('eventName')}
                        className={classes.input}
                    />
                    <TextField
                        id="date"
                        label="Event Date"
                        type="date"
                        value={this.state.eventDate}
                        onChange={this.handleChange('eventDate')}
                        className={classes.input}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Description"
                        multiline
                        rowsMax="4"
                        value={this.state.eventDesc}
                        onChange={this.handleChange('eventDesc')}
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

export default EventForm;