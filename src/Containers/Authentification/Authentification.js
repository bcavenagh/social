import React, { Component } from 'react';
import fire from '../../firebase';
import { Grid, Modal, Button, FormControl, Input, InputLabel, Paper } from '@material-ui/core';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import classes from './Authentification.module.scss';



class Authentification extends Component {
    constructor(props){
        super(props);
        this.state= {
            email: '',
            password: '',
            open: true,
        }

    }

    toggleForm = () => {
        this.setState(previousState => ({
            open: !previousState.open
        }));
    }

    render(){
        return(
            <div className={classes.loginContainer}>
                <div className={classes.FormContainer}>
                    <form className={classes.LoginForm}>
                        <Login open={this.state.open} handleSwitch={this.toggleForm}/>
                        <Signup open={!this.state.open} handleSwitch={this.toggleForm}/>
                    </form>
                </div>
            </div>
        )
    }



}
export default Authentification;

