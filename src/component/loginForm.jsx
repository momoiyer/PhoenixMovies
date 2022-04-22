import React, { useState } from 'react';
import Joi from 'joi-browser'
import Input from './common/input';

function LoginForm(props) {

    const [account, setAccount] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});

    const schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    };

    const validate = () => {
        const {error} = Joi.validate(account, schema, { abortEarly: false });
        if (!error) return null;

        const currentErrors = {};
        error.details.map(item => currentErrors[item.path[0]] = item.message);
        return currentErrors;
    }

    const validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const currentSchema = { [name]: schema[name] };
        const { error } = Joi.validate(obj, currentSchema);
        if (!error) return null;
        return error.details[0].message;
    }

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate() || {});
    }

    const handleChange = ({ currentTarget: input }) => {
        const currentError = { ...errors };
        const errorMessage = validateProperty(input);
        if (errorMessage) currentError[input.name] = errorMessage;
        else delete currentError[input.name];
        setErrors(currentError);
        
        const currentAccount = { ...account };
        currentAccount[input.name] = input.value;
        setAccount(currentAccount);
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    name="username"
                    label="Username"
                    value={account.username}
                    errors={errors.username}
                    onChange={handleChange}
                />
                <Input
                    name="password"
                    label="Password"
                    value={account.password}
                    errors={errors.password}
                    onChange={handleChange}
                />
                <button className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;