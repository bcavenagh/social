import React from 'react';
import classes from './CustomTextField.module.scss';

const customTextField = (props) => {
    if(props.variant === "field"){
        return(
        <div className={classes.contain}>
            <input 
                type="text" 
                name="name" 
                className={classes.question} 
                id="nme" 
                required 
                autocomplete="off"
                onChange={props.change(props.changeStateVar)}/>
            <label for="nme"><span>{props.label}</span></label>  
        </div>);
    }
    else if(props.variant === "area"){
        return(
        <div className={classes.contain}>
            <textarea 
                name="message" 
                rows="2" 
                className={classes.question} 
                id="msg" 
                required
                autocomplete="off"
                onChange={props.change(props.changeStateVar)}>
            </textarea>
            <label for="msg"><span>{props.label}</span></label>
        </div>);
    }
};

export default customTextField;

