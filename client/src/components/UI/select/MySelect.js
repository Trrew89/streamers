import React from 'react';
import './MySelect.css'
const MySelect = ({options}) => {
    return (
        <div className='custom-select'>
            <select >
                {options.map(e => 
                    <option key={e} value={e}>{e}</option>)}
            </select>
        </div>
        );
};

export default MySelect;