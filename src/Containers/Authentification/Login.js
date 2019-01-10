import React, { Component } from 'react';
import fire from '../../firebase';
import { Grid, Modal, Button, FormControl, Input, InputLabel, Paper } from '@material-ui/core';
import { Signup } from './Signup';
import classes from './Login.module.scss';


class Login extends Component {
    constructor(props){
        super(props);
        this.state= {
            email: '',
            password: '',
            open: false
        }
        this.login = this.login.bind(this);
        // this.signup = this.signup.bind(this);
        this.openSignup = this.openSignup.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    login(e){
        e.preventDefault();
        //Dont need then function but can use it to log later
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{}).catch((error) => {
            console.log(error);
        });
    }
    openSignup = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
      };
    // signup(e){
    //     e.preventDefault();
    //     //Dont need then function but can use it to log later
    //     fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{}).catch((error) => {
    //         console.log(error);
    //     });
    // }

    handleChange( e ){
        this.setState({ [e.target.name]: e.target.value});
    }

    render(){
        return(
            <div className={classes.loginContainer}>
                <Grid   container 
                        className={classes.loginGridContainer}
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: '100vh' }}>
                    <Grid className={classes.loginGrid} item xs={6}>
                        <h3 className={classes.welcomeText}>Welcome!</h3>
                        <Paper className={classes.loginPaper}>
                            <form>
                                <div>
                                    <FormControl>
                                        <InputLabel htmlFor="component-simple">Email</InputLabel>
                                        <Input className={classes.loginInput} value={this.state.email} onChange={this.handleChange} type="email" name="email"/>
                                    </FormControl>
                                </div>
                                <div>
                                    <FormControl>
                                        <InputLabel htmlFor="component-simple">Password</InputLabel>
                                        <Input className={classes.loginInput} value={this.state.password} onChange={this.handleChange} type="password" name="password"/>
                                    </FormControl>
                                </div>
                                <Button size="large" variant="contained" color="primary" type="submit" onClick={this.login} className={classes.LoginButton}>Login</Button>
                                <Button size="large" variant="contained" color="secondary" onClick={this.openSignup} className={classes.SignupButton}>Signup</Button>
                                <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                >
                                    <Signup />
                                </Modal>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }



}
export default Login;

