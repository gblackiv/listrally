import React from 'react';

export const renderInput = ({input, label, type, meta: { error, touched }}) => {
    
    return (
        <div>
            <div className="form-row">
                <div className="form-col">
                    <label className="form-input-label">{label}</label>
                    <input className="form-input-field" {...input} type={ type || 'text' }  autoComplete="off"  />
                    <span className="form-helper-text">{ touched && error }</span>
                </div>
            </div>
        </div>
    );
}

export const renderTextArea = ({input, label, caption, type, meta: { error, touched }}) => {
    
    return (
        <div>
            <div className="form-row">
                <div className="form-col">
                    <label className="form-input-label date-label">{label}</label>
                    <label className="textarea-caption">{caption}</label>
                    <textarea className="form-textarea-field" {...input} type={ type || 'input' }  autoComplete="off"  />
                    <span className="form-helper-text">{ touched && error }</span>
                </div>
            </div>
        </div>
    );
}

export const renderDate = ({input, label, type, meta: { error, touched }}) => {
    
    return (
        <div className="form-row">
                        <div className="form-col">
                            <fieldset className="date-fieldset">
                                <legend className="form-input-label date-input-label">{label}</legend>
                                    <div>
                                        <input className="form-input-form" type="datetime-local" id="eventDate" name="eventDateInput" {...input} />
                                    </div>
                            </fieldset>
                        </div>
                    </div>
    );
}