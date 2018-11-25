import React from 'react';
import Event from './Event.js/Event';
import { Grid } from '@material-ui/core';


const events = (props) => (
    <div>
        <Grid container spacing={24}>
            {props.events.map(event => 
                <Grid item xs={12} sm={4}>
                    <Event name={event.name} description={event.description} key={event.id}/>
                </Grid>
            )}
        </Grid> 
        {/* <Event name="Thanksgiving"/>
        <Event name="Christmas"/>
        <Event name="New Year"/>
        <Event name="Thanksgiving"/>
        <Event name="Christmas"/>
        <Event name="New Year"/>
        <Event name="Thanksgiving"/>
        <Event name="Christmas"/>
        <Event name="New Year"/>
        <Event name="Thanksgiving"/>
        <Event name="Christmas"/>
        <Event name="New Year"/>
        <Event name="Thanksgiving"/>
        <Event name="Christmas"/>
        <Event name="New Year"/> */}
    </div>
);

export default events;