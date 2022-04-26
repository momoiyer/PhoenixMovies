import React, { Component } from 'react';

const Select = ({ items, name, label, error, ...rest }) => {
    return (  <div className="form-group">
    <label htmlFor={name}>{label}</label>        
        <select               
            {...rest}
            name={name}
            id={name}
            className="form-control">
                {items.map(i => 
                    <option key={i._id} value={i._id}>{i.name}</option>)}
                    </select>
        {error && <div className="alert alert-danger">{error}</div>}
    </div>        );
}
 
export default Select;