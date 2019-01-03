import React from 'react';
import ColorTile from './ColorTile/ColorTile';
import classes from './ColorToggle.module.css';

const colorToggle = (props) => (
    <div className={classes.Toggle}>
        {props.colors.map((color, i) => {
            const active = ( i === props.selected )
            return <ColorTile hex={color.hex} color={color.color} onClick={props.change} index={i} selected={active}/>
            // {/* <ColorTile hex="#07E796" color="Mint" onClick={props.change}/>
            // <ColorTile hex="#E79007" color="Brass" onClick={props.change}/>
            // <ColorTile hex="#7117C7" color="Royal" onClick={props.change}/> */}
        })}
    </div>
);

export default colorToggle;