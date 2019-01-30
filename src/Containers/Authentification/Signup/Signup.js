import React, { Component } from 'react';
import fire from '../../../firebase';
import { Paper, Button, FormControl, Typography, Input, InputLabel, Snackbar } from '@material-ui/core';
import classes from './Signup.module.scss';
import classNames from 'classnames';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'

export class Signup extends Component {
    constructor(props){
        super(props);
        this.state= {
            username:'',
            fname:'',
            lname:'',
            email: '',
            password: '',
            verifyPass:'',
            openSnackbar: false,
            errorMessage: ''
        }
        this.signup = this.signup.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    signup(e){
        e.preventDefault();
        if(this.state.password === this.state.verifyPass){

            fire.database().ref('users').orderByChild('username')

            fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
                let usersRef = fire.database().ref('users');
                // STORING USER INFO INTO DATABASE
                let userID = user.user.uid;
                usersRef.child(userID).set({
                    email: this.state.email,
                    // username: this.state.username,
                    firstName: this.state.fname,
                    lastName: this.state.lname,
                    id: user.user.uid
                });

            }).catch((error) => {
                this.setState({ errorMessage: error.message});
                this.handleSnackbar();
            });
        }  
        else{
            this.setState({ errorMessage: "Passwords do not match"});
            this.handleSnackbar();
        }
    }

    handleChange( e ){
        this.setState({ [e.target.name]: e.target.value});
    }
    handleSnackbar = () => {
        this.setState({ openSnackbar: true });
      };
    

    render(){
        let openClasses = "";
        this.props.open ? 
            openClasses = classNames(classes.signupContainer, classes.Open):
            openClasses = classNames(classes.signupContainer, classes.Close)

        return(
            <div className={openClasses}>
                <div className={classes.signupFormContainer}>
                    <div className={classes.BackToLogin} onClick={this.props.handleSwitch}>
                        <KeyboardArrowUp/>
                        <p>Back to Login</p>
                    </div>
                    {/* <Typography variant="h4" className={classes.welcomeText}>{open}</Typography> */}
                    <form>
                        
                        <div className={classes.SignupInputContainer}>
                            {/* <FormControl>
                                <InputLabel htmlFor="component-simple">Email</InputLabel> */}
                                <input className={classes.loginInput} placeholder="Email" value={this.state.email} onChange={this.handleChange} required={true} type="email" name="email"/>
                            {/* </FormControl> */}
                        </div>
                        <div className={classes.SignupInputContainer}>
                            {/* <FormControl> */}
                                {/* <InputLabel htmlFor="component-simple">Username</InputLabel> */}
                                <input className={classes.loginInput} placeholder="First Name" value={this.state.fname} onChange={this.handleChange} required={true} type="text" name="fname"/>
                            {/* </FormControl> */}
                        </div>
                        <div className={classes.SignupInputContainer}>
                            {/* <FormControl> */}
                                {/* <InputLabel htmlFor="component-simple">Username</InputLabel> */}
                                <input className={classes.loginInput} placeholder="Last Name" value={this.state.lname} onChange={this.handleChange} required={true} type="text" name="lname"/>
                            {/* </FormControl> */}
                        </div>
                        <div className={classes.SignupInputContainer}>
                            {/* <FormControl>
                                <InputLabel htmlFor="component-simple">Password</InputLabel> */}
                                <input className={classes.loginInput} placeholder="Password" value={this.state.password} onChange={this.handleChange} required={true} type="password" name="password"/>
                            {/* </FormControl> */}
                        </div>
                        <div className={classes.SignupInputContainer}>
                            {/* <FormControl> */}
                                {/* <InputLabel htmlFor="component-simple">Confirm Password</InputLabel> */}
                                <input className={classes.loginInput} placeholder="Confirm Password" value={this.state.verifyPass} onChange={this.handleChange} required={true} type="password" name="verifyPass"/>
                            {/* </FormControl> */}
                        </div>
                        <button className={classes.SignupButton} type="submit" onClick={this.signup}>Signup</button>
                    </form>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        open={this.state.openSnackbar}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{this.state.errorMessage}</span>}
                        style={{
                            bottom: -60
                        }}
                    />
                </div> 
                
            </div>
        )
    }
}
export default Signup;





