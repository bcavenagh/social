import React from 'react';
import classes from './ColorTile.module.css';
import classNames from 'classnames';

const colorTile = (props) => {
    const selected = props.selected ? classes.selected : '';
    return(
        <div>
            <div className={classNames(classes.Tile, selected)} style={{backgroundColor: props.hex}} onClick={(e) => props.onClick(props.hex, props.index)}/>
            <p className={classes.ColorName}>{props.color}</p>
        </div>
    );
};

export default colorTile;