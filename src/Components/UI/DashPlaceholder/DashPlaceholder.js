import React from 'react';
import classes from './DashPlaceholder.module.scss';
import classNames from 'classnames';
import ChevronLeft from '@material-ui/icons/ChevronLeft'

const dashPlaceholder = (props) => (
  <div className={classes.Dash}>
    <ChevronLeft className={classes.Chevron1}/>
    <ChevronLeft className={classes.Chevron2}/>
    <div className={classes.TextContainer}>
      <p className={classes.Text}>Select or create a group to get started!</p>
    </div>
  </div>
);

export default dashPlaceholder;