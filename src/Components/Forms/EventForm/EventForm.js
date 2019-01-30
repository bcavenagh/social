import React, { Component } from 'react';
import { Paper, TextField, Button, MenuItem, InputLabel, Select, FormControlLabel, Radio } from '@material-ui/core';
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
            // eventColorHex:'',
            colorToggleHexes: [
                {color: 'Salmon', hex: '#FF5733'},
                {color: 'Mint', hex: '#07E796'},
                {color: 'Brass', hex: '#E79007'},
                {color: 'Royal', hex: '#7117C7'}
            ],
            selectedColor:-1,
            eventType:''
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
        const newEvent = {
            name:this.state.eventName,
            description:this.state.eventDesc,
            date:this.state.eventDate,
            // colorHex: this.state.eventColorHex,
            eventType: this.state.eventType,
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
            <form onSubmit={this.handleSubmit} className={classes.Form}>
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
                    {/* <ColorToggle change={this.handleColorHex} colors={this.state.colorToggleHexes} selected={this.state.selectedColor}/> */}

                    <div className={classes.SelectContainer}>
                        <InputLabel className={classes.SelectLabel} htmlFor="event-type">Event Type: </InputLabel>
                        <Select
                            value={this.state.eventType}
                            onChange={this.handleChange('eventType')}
                            inputProps={{
                                name: 'eventType',
                                id: 'event-type',
                            }}
                            className={classes.SelectType}
                        >
                            {/* <MenuItem value=""><em>None</em></MenuItem> */}
                            <MenuItem value={'birthday'}>Birthday</MenuItem>
                            <MenuItem value={'entertainment'}>Entertainment</MenuItem>
                            <MenuItem value={'fooddrink'}>Food &amp; Drink</MenuItem>
                            <MenuItem value={'gamenight'}>Game Night</MenuItem>
                            <MenuItem value={'meetup'}>Meetup</MenuItem>
                            <MenuItem value={'outdoors'}>Outdoors</MenuItem>
                            <MenuItem value={'party'}>Party</MenuItem>
                            <MenuItem value={'travel'}>Travel</MenuItem>
                        </Select>
                    </div>


                    {/* RADIO BUTTONS IF WANTED */}
                    {/* <div>
                    <FormControlLabel
                        value="top"
                        control={
                            <Radio
                                checked={this.state.eventType === 'birthday'}
                                onChange={this.handleChange('eventType')}
                                value="birthday"
                                name="radio-button-demo"
                                aria-label="Birthday"
                                />
                        }
                        label="Birthday"
                        labelPlacement="top" />
                    <FormControlLabel
                        value="top"
                        control={
                            <Radio
                                checked={this.state.eventType === 'entertainment'}
                                onChange={this.handleChange('eventType')}
                                value="entertainment"
                                name="radio-button-demo"
                                aria-label="Entertainment"
                                />
                        }
                        label="Entertainment"
                        labelPlacement="top" />
                    <FormControlLabel
                        value="top"
                        control={
                            <Radio
                                checked={this.state.eventType === 'fooddrink'}
                                onChange={this.handleChange('eventType')}
                                value="fooddrink"
                                name="radio-button-demo"
                                aria-label="Food And Drink"
                                />
                        }
                        label="Food &amp; Drink"
                        labelPlacement="top" />
                    <FormControlLabel
                        value="top"
                        control={
                            <Radio
                                checked={this.state.eventType === 'gamenight'}
                                onChange={this.handleChange('eventType')}
                                value="gamenight"
                                name="radio-button-demo"
                                aria-label="Game Night"
                                />
                        }
                        label="Game Night"
                        labelPlacement="top" />
                    <FormControlLabel
                        value="top"
                        control={
                            <Radio
                                checked={this.state.eventType === 'meetup'}
                                onChange={this.handleChange('eventType')}
                                value="meetup"
                                name="radio-button-demo"
                                aria-label="Meetup"
                                />
                        }
                        label="Meetup"
                        labelPlacement="top" />
                    <FormControlLabel
                        value="top"
                        control={
                            <Radio
                                checked={this.state.eventType === 'outdoors'}
                                onChange={this.handleChange('eventType')}
                                value="outdoors"
                                name="radio-button-demo"
                                aria-label="Outdoors"
                                />
                        }
                        label="Outdoors"
                        labelPlacement="top" />
                    <FormControlLabel
                        value="top"
                        control={
                            <Radio
                                checked={this.state.eventType === 'party'}
                                onChange={this.handleChange('eventType')}
                                value="party"
                                name="radio-button-demo"
                                aria-label="Party"
                                />
                        }
                        label="Party"
                        labelPlacement="top" />
                    <FormControlLabel
                        value="top"
                        control={
                            <Radio
                                checked={this.state.eventType === 'travel'}
                                onChange={this.handleChange('eventType')}
                                value="travel"
                                name="radio-button-demo"
                                aria-label="Travel"
                                />
                        }
                        label="Travel"
                        labelPlacement="top" />
                    </div>  */}
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