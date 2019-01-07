import React from 'react'
import { Formik, Field, Form as Form, ErrorMessage } from 'formik';

// By combining a vanilla <label> plus Formik's <Field> and <ErrorMessage>,
// we can abstract a generic "Fieldset" component for most of our inputs.
export const Fieldset = ({ name, errors, touched, label, helpmessage, props,...rest}) => {
  return (
    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <Field id={name} name={name} className={`form-control ${errors[name] && touched[name] && 'is-invalid'}`} {...rest} />
        <ErrorMessage name={name} component="div" className="invalid-feedback" />
        <small id={name + "Help"} className="form-text text-muted">{helpmessage}</small>
    </div>
)};

export const InputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
return (
  <div className="form-group">
    <label htmlFor={field.name}>{props.label}</label>
    <input {...field} {...props} className={`form-control ${errors[field.name] && touched[field.name] && 'is-invalid'}`}/>
    <ErrorMessage name={field.name} component="div" className="invalid-feedback" />
    <small id={field.name + "Help"} className="form-text text-muted">{props.helpmessage}</small>
  </div>
)};

export const SelectComponent = ({ name, errors, touched, label, helpmessage, props,...rest}) => {
  return (
    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <Field id={name} name={name} className={`form-control ${errors[name] && touched[name] && 'is-invalid'}`} {...rest} />
        <ErrorMessage name={name} component="div" className="invalid-feedback" />
        <small id={name + "Help"} className="form-text text-muted">{helpmessage}</small>
    </div>
)};