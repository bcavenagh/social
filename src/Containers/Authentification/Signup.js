import React, { Component } from 'react';
import fire from '../../firebase';
import { Paper, Button, FormControl, Typography, Input, InputLabel, Snackbar } from '@material-ui/core';
import classes from './Signup.module.css';

export class Signup extends Component {
    constructor(props){
        super(props);
        this.state= {
            username:'',
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
                    username: this.state.username,
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
    
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackbar: false });
    };

    render(){
        return(
            <div>
                <Paper className={classes.signupPaper}>
                    <Typography variant="h4" className={classes.welcomeText}>Sign Up!</Typography>
                    <form>
                        <div>
                            <FormControl>
                                <InputLabel htmlFor="component-simple">Username</InputLabel>
                                <Input className={classes.loginInput} value={this.state.username} onChange={this.handleChange} required={true} type="text" name="username"/>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <InputLabel htmlFor="component-simple">Email</InputLabel>
                                <Input className={classes.loginInput} value={this.state.email} onChange={this.handleChange} required={true} type="email" name="email"/>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <InputLabel htmlFor="component-simple">Password</InputLabel>
                                <Input className={classes.loginInput} value={this.state.password} onChange={this.handleChange} required={true} type="password" name="password"/>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <InputLabel htmlFor="component-simple">Confirm Password</InputLabel>
                                <Input className={classes.loginInput} value={this.state.verifyPass} onChange={this.handleChange} required={true} type="password" name="verifyPass"/>
                            </FormControl>
                        </div>
                        <Button variant="contained" color="primary" onClick={this.signup}>Signup</Button>
                        
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
                </Paper> 
                
            </div>
        )
    }
}
export default Signup;





