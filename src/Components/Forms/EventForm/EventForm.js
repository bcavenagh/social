import React, { Component } from 'react';
import { Paper, TextField, Button } from '@material-ui/core';
import classes from './EventForm.module.css';
import firebase from '../../../firebase';
import fire from '../../../firebase';
import ColorToggle from '../../UI/ColorToggle/ColorToggle';

class EventForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            eventName: '',
            eventDate: this.props.date,
            eventDesc: '',
            eventColorHex:'',
            colorToggleHexes: [
                {color: 'Salmon', hex: '#FF5733'},
                {color: 'Mint', hex: '#07E796'},
                {color: 'Brass', hex: '#E79007'},
                {color: 'Royal', hex: '#7117C7'}
            ],
            selectedColor:-1
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value,});
    }

    handleColorHex = (hex, index) => {
        this.setState({
            eventColorHex: hex,
            selectedColor: index
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const eventsRef = firebase.database().ref('events');
        console.log(this.state.eventColorHex);
        const newEvent = {
            name:this.state.eventName,
            description:this.state.eventDesc,
            date:this.state.eventDate,
            colorHex: this.state.eventColorHex,
            groupid:this.props.group,
            id: eventsRef.push().key,
            postedBy: fire.auth().currentUser.uid
        };

        this.props.add(newEvent);
        // eventsRef.push(newEvent);
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
                    <ColorToggle change={this.handleColorHex} colors={this.state.colorToggleHexes} selected={this.state.selectedColor}/>
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