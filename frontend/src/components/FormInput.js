import React from 'react';

const FormInput = ({ label, type, name, value, onChange, required = false, minLength, error }) => {
    return (
        <div className="form-group">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                minLength={minLength}
                className={`form-control ${error ? 'is-invalid' : ''}`}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default FormInput;