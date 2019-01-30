import React from 'react';
import classes from './NewMemberIcon.module.scss';
import Close from '@material-ui/icons/Close';

const newMemberIcon = (props) => (
  <div className={classes.NewMember}>
    <div className={classes.Token}>
      <div className={classes.Initials}>
        <p>{props.initials}</p>
      </div>
    </div>
    <button className={classes.DeleteButton} onClick={() => props.delete(props.index)}><Close/></button>
    <div className={classes.Name}>
      <p>{props.fName}</p>
      <p>{props.lName}</p>
    </div>
  </div>
);

export default newMemberIcon;