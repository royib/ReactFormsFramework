import React, { Fragment } from "react";
import FormContext from "./formContext";

class FormFieldArray extends React.Component {
  state = {
    currentValue: [],
    key: 3
  };
  addItem = (stateForm, name, updateField) => {
    const fieldNewState = stateForm[name] ? [...stateForm[name], {}] : [{}];
    updateField(name, fieldNewState);
  };
  removeItem = (
    state,
    name,
    index,
    updateItemCallback,
    updateValidationState,
    updateTouchedState
  ) => {
    const fieldNewState = state.form[name].filter((item, i) => i != index);

    //handle validation state
    const newValidationState = Object.keys(state.validationState).reduce(
      (accu, key) => {
        if (!key.includes(`${name}[${index}]`)) {
          accu[key] = state.validationState[key];
        }
        return accu;
      },
      {}
    );
    //handle touch
    const newTouchedState = Object.keys(state.touchedState).reduce(
      (accu, key) => {
        if (!key.includes(`${name}[${index}]`)) {
          accu[key] = state.touchedState[key];
        }
        return accu;
      },
      {}
    );

    //const validationState = state.validationState
    updateItemCallback(name, fieldNewState);
    updateValidationState(newValidationState);
    updateTouchedState(newTouchedState);
  };
  componentDidMount() {
    /* const { state, updateField, updateValidationState } = this.context;
    let { initialValue, name } = this.props;
    if (initialValue) {
      initialValue = Array.isArray(initialValue)
        ? initialValue
        : [initialValue];
      updateField(name, initialValue, [], true);
    }*/
  }
  render() {
    const { name, initialValue, ...otherProps } = this.props;
    const {
      state,
      updateField,
      updateValidationState,
      updateTouchedState
    } = this.context;

    return (
      <Fragment>
        {this.props.children({
          items: state.form[name] || [],
          addItem: () => this.addItem(state.form, name, updateField),
          removeItem: index =>
            this.removeItem(
              state,
              name,
              index,
              updateField,
              updateValidationState,
              updateTouchedState
            ),
          name: name
        })}
      </Fragment>
    );
  }
}
FormFieldArray.contextType = FormContext;
export default FormFieldArray;

/**
  accepted props : 
      name - the name of the form field
      initialValue- array with objects, each object contains the fields of the array row
      children - single function
                sends: 
                    items - the items of the array
                    addItem -  adds new empty item to the array
                    removeitem - gets item index and remove it
                return:
                    JSX - the user needs to return jsx from the function                

 */
