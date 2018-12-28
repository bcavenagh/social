import React, { Component } from 'react';
import { Paper, Button, TextField } from '@material-ui/core';
import classes from './SettingsModal.module.css';
import fire from '../../../firebase';

class SettingsModal extends Component {
  constructor(props){
    super(props);
    this.state={
      editingMode: false,
      eventName: this.props.event.name,
      eventDesc: this.props.event.description
    };
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  toggleEditingMode(){
    this.setState({
      editingMode: !this.state.editingMode
    })
  }
  saveChanges(){

    const eventRef = fire.database().ref('events').child(this.props.event.id);
    let updates = {
      name: this.state.eventName,
      description: this.state.eventDesc
    }

    eventRef.update(updates);
    this.props.refresh(this.props.groupid);
  } 
  render(){
    let mode = <></>
    if(this.state.editingMode){
      mode = 
      <>
        <form className={classes.container} onSubmit={this.saveChanges} noValidate autoComplete="off">
          <TextField
            id="outlined-name"
            label="Event Name"
            className={classes.textField}
            value={this.state.eventName}
            onChange={this.handleChange('eventName')}
            margin="normal"
            variant="outlined"
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                // Do code here
                ev.preventDefault();
              }
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
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  // Do code here
                  ev.preventDefault();
                }
              }}
          />
          <Button variant="outlined" size="small" onClick={(e) => this.saveChanges()}>Save Changes</Button>
        </form>
      </>
    }else{
      mode = 
        <>
            <h1 className={classes.Title}>{this.props.event.name}</h1><Button variant="outlined" size="small" onClick={(e) => this.toggleEditingMode()}>Edit</Button>
            <p>{this.props.event.description}</p>
            <p>{this.props.event.id}</p>
        </>
    }

    return(
      <>
        <Paper className={classes.SettingsModal}>
            {mode}
            <Button variant="contained" color="secondary" onClick={(e) => this.props.delete(this.props.event)}>Delete Event</Button>
        </Paper>
      </>
    );
  }
}

export default SettingsModal;