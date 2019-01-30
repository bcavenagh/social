import React, { Component } from 'react';
import classes from "./Login.module.scss";
import fire from '../../../firebase';
import classNames from 'classnames';


class Login extends Component {
    constructor(props){
        super(props);
        this.state= {
            email: '',
            password: '',
            open: false
        }
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    login(e){
        e.preventDefault();
        //Dont need then function but can use it to log later
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{}).catch((error) => {
            console.log(error);
        });
    }
    handleChange( e ){
        this.setState({ [e.target.name]: e.target.value});
    }
    render(){
        let openClasses = "";
        this.props.open ? 
            openClasses = classNames(classes.LoginContainer, classes.Open):
            openClasses = classNames(classes.LoginContainer, classes.Close)
        
        return(
            <div className={openClasses}>
                <div className={classes.loginFormContainer}>
                    <div className={classes.loginInputContainer}>
                        {/* <FormControl> */}
                            {/* <label htmlFor="component-simple">Email</label> */}
                            <input className={classes.loginInput} value={this.state.email} placeholder="Email" onChange={this.handleChange} type="email" name="email"/>
                        {/* </FormControl> */}
                    </div>
                    <div className={classes.loginInputContainer}>
                        {/* <FormControl> */}
                            {/* <InputLabel htmlFor="component-simple">Password</InputLabel> */}
                            <input className={classes.loginInput} value={this.state.password} placeholder="Password" onChange={this.handleChange} type="password" name="password"/>
                        {/* </FormControl> */}
                    </div>
                    <div className={classes.LoginButtonGroup}>
                        <button type="submit" onClick={this.login} className={classes.LoginButton}>Login</button>
                        <button  type="button" onClick={this.props.handleSwitch} className={classes.SignupButton}>Signup</button>    
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;