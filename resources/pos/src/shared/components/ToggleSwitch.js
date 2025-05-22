import React from 'react';
import PropTypes from 'prop-types';
import './Component.scss';
import { CFormSwitch } from '@coreui/react'

const ToggleSwitch = (props) => {
    const { input, label, checked = false } = props;

    return (
        <div className="d-flex">
            {label ? <span className="toggle-label">{label}</span> : null}
            {/*<CFormSwitch id="formSwitchCheckChecked" defaultChecked {...input}  button={{ color: '#00C6FF' }}*/}
            {/*             size="lg" className="d-inline-block" />*/}
            <div className="form-check form-switch form-switch-lg">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={checked} {...input}/>
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked"/>
            </div>
        </div>
    );
};

ToggleSwitch.propTypes = {
    input: PropTypes.object,
    label: PropTypes.object,
    checked: PropTypes.bool,
};

export default ToggleSwitch;
