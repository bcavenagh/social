import React from 'react';
import classes from './DashPlaceholder.module.scss';
import classNames from 'classnames';

const dashPlaceholder = (props) => (
  <div className={classes.Dash}>
    <div className={classes.TextContainer}>
      <p className={classes.Text}>Please select a group to get started!</p>
      </div>
  </div>
);

export default dashPlaceholder;