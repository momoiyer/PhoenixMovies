import React from 'react';

function Input(props) {
    const { name, label, value, errors, onChange} = props;

    return (
        <div className='form-group' >
            <label htmlFor={name}>{label}</label>
            <input            
                value={value}
                onChange={onChange}
                name={name}
                id={name}
                type="text"
                className="form-control" />
            {errors && <div className="alert alert-danger">{errors}</div>}
        </div>
    );
}

export default Input;