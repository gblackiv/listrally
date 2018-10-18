import React from 'react';

export const renderInput = (props) => {
    const {input, label, type, meta: { error, touched }} = props;
    console.log('RenderInput props :', props);
    return (
        <div>
            <div className="form-row">
                <div className="form-col">
                    <label className="form-input-label">{label}</label>
                    <input className="form-input-field" {...input} type={ type || 'text' } value={props.nameValue} placeholder={props.placeholder} autoComplete="off"  />
                    <span className="form-helper-text">{ touched && error }</span>
                </div>
            </div>
        </div>
    );
}

export const renderTextArea = (props) => {
    const {input, label, caption, type, meta: { error, touched }} = props;
    return (
        <div>
            <div className="form-row">
                <div className="form-col">
                    <label className="form-input-label date-label">{label}</label>
                    <label className="textarea-caption">{caption}</label>
                    <textarea className="form-textarea-field" {...input} type={ type || 'input' } placeholder={props.placeholder} autoComplete="off"  />
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