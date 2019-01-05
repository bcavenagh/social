import React from 'react';
import ColorTile from './ColorTile/ColorTile';
import classes from './ColorToggle.module.css';

const colorToggle = (props) => (
    <div className={classes.Toggle}>
        {props.colors.map((color, i) => {
            const active = ( i === props.selected )
            return <ColorTile hex={color.hex} color={color.color} onClick={props.change} index={i} key={i} selected={active}/>
        })}
    </div>
);

export default colorToggle;