import React from 'react';
import Group from './Group/Group';

const groups = (props) => (
    <div>
        {/* Map through all groups and make a list of them passing information
        such as "Group Name" as props for display */}
        <Group name="Family"/>
        <Group name="Friends"/>
        <Group name="Colleagues"/>
    </div>
);

export default groups;