import React from 'react';
import './UnitToggle.css';

const UnitToggle = (props) => {
    return (
        <label className='unit-toggle'>
            <input
                type='checkbox'
                className='unit-toggle-input'
                onChange={() => props.onChange()}
            />
            <span className='unit-toggle-slider'></span>
        </label>
    );
};

export default UnitToggle;