import React from 'react';
import Event from './Event/Event';
import { Grid } from '@material-ui/core';

const events = (props) => (
    <div>
        
        <Grid container spacing={24}>
            {props.events.map((event, index) => 
                <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
                    <Event 
                        name={event.name} 
                        description={event.description} 
                        snippet={event.snippet}
                        date={event.date}
                        colorHex={event.colorHex}
                        id={event.groupid} 
                        key={event.groupid}
                        open={props.openEvent}
                        eventId={event.id}
                        event={event}
                        />

                </Grid>
            )}
        </Grid> 
    </div>
);

export default events;