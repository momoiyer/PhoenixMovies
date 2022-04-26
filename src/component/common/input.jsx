import React from 'react';

function Input(props) {
    const { name, label, errors, ...rest } = props;

    return (
        <div className='form-group' >
            <label htmlFor={name}>{label}</label>
            <input            
                {...rest}
                name={name}
                id={name}
                className="form-control" />
            {errors && <div className="alert alert-danger">{errors}</div>}
        </div>
    );
}

export default Input;