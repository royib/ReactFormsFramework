import React from "react";
import { TextField } from "@material-ui/core";
import FormContext from "./formContext";

class FormField extends React.Component {
  componentDidMount() {
    //update validation state
    let { name, validators } = this.props;
    const {
      validateField,
      updateFieldValidationState,
      getFieldValue
    } = this.context;
    if (validators) {
      // update validationState
      const newValue = getFieldValue({ name });
      const validationResult = validateField(validators, newValue);
      updateFieldValidationState(name, validationResult);
    }
  }
  render() {
    const {
      name,
      initialValue,
      validators,
      Component,
      valueChanged,
      ...otherProps
    } = this.props;
    return (
      <FormContext.Consumer>
        {context => {
          const { state, updateField, getFieldValue } = context;
          const value = getFieldValue({ name }) || "";
          const error =
            state.validationState[name] &&
            !state.validationState[name].valid &&
            (state.touchedState[name] || state.submited);
          const validationText =
            state.validationState[name] &&
            (state.touchedState[name] || state.submited) &&
            state.validationState[name].validationText;
          const onChange = newValue =>
            updateField(name, newValue, validators, false, valueChanged);
          return typeof this.props.children !== "function" ? (
            <Component
              {...otherProps}
              onChange={onChange}
              value={value}
              error={error}
              name={name}
              validationText={validationText}
            />
          ) : (
            this.props.children({
              onChange,
              value,
              error,
              name,
              validationText,
              ...otherProps
            })
          );
        }}
      </FormContext.Consumer>
    );
  }
}
FormField.contextType = FormContext;
export default FormField;

/**
  accepted props : 
      name - the name of the form field
      initialValue- array with objects, each object contains the fields of the array row
      validators - array of validators function
      Component - this component will be rendered. it will get ll the props:
          error - bool
          validationText- text to display to the user on error  
         value - value of the form field               

 */
