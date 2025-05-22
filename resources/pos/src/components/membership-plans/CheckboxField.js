import React from "react";

const CheckboxField = ({ input, label }) => {
    console.log("input", input);
    return (
        <div className="form-check">
            <input
                {...input}
                type="checkbox"
                className="form-check-input"
                id={input.name}
            />
            <label className="form-check-label" htmlFor={input.name}>
                {label}
            </label>
        </div>
    );
};

export default CheckboxField;
