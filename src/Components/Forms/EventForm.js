import React, { Component } from 'react';
import { Paper, Input, TextField, Button } from '@material-ui/core';
import classes from './EventForm.module.css';

class EventForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value,});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
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
                        value={this.state.value}
                        onChange={this.handleChange('value')}
                        className={classes.input}
                    />
                    <TextField
                        id="datetime-local"
                        label="Event Date"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        className={classes.input}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Multiline"
                        multiline
                        rowsMax="4"
                        // value={this.state.multiline}
                        // onChange={this.handleChange('multiline')}
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