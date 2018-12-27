import React, { Component } from 'react';
import { Paper, Button, TextField } from '@material-ui/core';
import classes from './SettingsModal.module.css';

class SettingsModal extends Component {
  constructor(props){
    super(props);
    this.state={
      editingMode: false,
      eventName: '',
      eventDesc: ''
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
  render(){
    let mode = <></>
    if(this.state.editingMode){
      mode = 
      <>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="outlined-name"
            label="Event Name"
            className={classes.textField}
            value={this.props.event.name}
            onChange={this.handleChange('eventName')}
            margin="normal"
            variant="outlined"
          /><Button variant="outlined" size="small" onClick={(e) => this.toggleEditingMode()}>Save Changes</Button>
          <TextField
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              rowsMax="4"
              value={this.props.event.description}
              onChange={this.handleChange('eventDesc')}
              className={classes.input}
              margin="normal"
              variant="outlined"
          />
        </form>
            {/* <h1 className={classes.Title}>{this.props.event.name}</h1><Button variant="outlined" size="small" onClick={(e) => this.toggleEditingMode()}>Save Changes</Button>
            <p>{this.props.event.description}</p>
            <p>{this.props.event.id}</p> */}
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