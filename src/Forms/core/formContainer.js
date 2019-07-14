import React from "react";
import FormContext from "./formContext";
//const FormContext = React.createContext();

class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    // initial form values/ from default values of from update mode
    var updateMode = false;
    var initialForm = props.defaultValues || {};
    if (
      props.udpateModeValues &&
      Object.keys(props.udpateModeValues).length > 0
    ) {
      updateMode = true;
      for (const prop in props.udpateModeValues) {
        initialForm[prop] = props.udpateModeValues[prop];
      }
    }

    this.state = {
      form: initialForm,
      updateMode: updateMode,
      validationState: {},
      touchedState: {},
      submited: false,
      valid: true
    };
  }

  getFieldValue = ({ name }) => {
    //support arrays
    const indexNumber = name.match(/\[([0-9]+)\]/);
    if (indexNumber) {
      const arrayFieldName = name.slice(0, name.indexOf("["));
      const innerFieldName = name.slice(name.indexOf(".") + 1);
      if (this.state.form[arrayFieldName][indexNumber[1]][innerFieldName]) {
        return this.state.form[arrayFieldName][indexNumber[1]][innerFieldName];
      }
    } else {
      //if (this.state.form[name])
      return this.state.form[name]; //
    }
  };
  updateValidationState = newValidationState => {
    this.setState(state => ({
      validationState: newValidationState
    }));
  };
  updateTouchedState = newTouchedState => {
    this.setState(state => ({
      touchedState: newTouchedState
    }));
  };

  validateField = (validationRules, newValue) =>
    validationRules.reduce(
      (status, validator) => {
        const validationResult = validator(newValue);
        return {
          valid: validationResult.valid && status.valid,
          validationText: validationResult.valid
            ? status.validationText
            : status.validationText
            ? `${status.validationText}, ${validationResult.validationText}`
            : validationResult.validationText
        };
      },
      { valid: true, validationText: "" }
    );
  updateFieldValidationState = (fieldName, validationState) => {
    this.setState(state => ({
      validationState: {
        ...state.validationState,
        [fieldName]: validationState
      }
    }));
  };
  updateField = (
    fieldName,
    newValue,
    validationRules = [],
    initial = false,
    valueChanged = null
  ) => {
    let newFieldState = newValue;
    let stateFieldName = fieldName;

    // support arrays of fields
    const indexNumber = fieldName.match(/\[([0-9]+)\]/);
    if (indexNumber) {
      // this is a field inside an object in array
      // get array field name, index, inner field name
      const arrayFieldName = fieldName.slice(0, fieldName.indexOf("["));
      const innerFieldName = fieldName.slice(fieldName.indexOf(".") + 1);

      let clonedArrayField = [...this.state.form[arrayFieldName]];
      // mutate the cloned objects. innerFieldName- FirstNAme
      // check if field exist
      clonedArrayField[indexNumber[1]] = {
        ...clonedArrayField[indexNumber[1]],
        [innerFieldName]: newValue
      };
      // we update the value of the array in the state
      newFieldState = clonedArrayField;
      stateFieldName = arrayFieldName;
    }
    //validate the field by all his validationRules
    const validationResult = this.validateField(validationRules, newValue);

    this.setState(
      state => ({
        form: { ...state.form, [stateFieldName]: newFieldState }
      }),
      () => {
        if (valueChanged) {
          valueChanged(newFieldState);
        }
      }
    );

    // update validation state only if fields has validation rules
    if (validationRules.length > 0) {
      this.setState(state => ({
        validationState: {
          ...state.validationState,
          [fieldName]: validationResult
        }
      }));
    } else {
      this.setState(state => ({
        validationState: {
          ...state.validationState,
          [fieldName]: { valid: true, validationText: "" }
        }
      }));
    }
    // handle touchedState values - not on initial values
    this.setState(state => ({
      touchedState: {
        ...state.touchedState,
        [fieldName]: true
      }
    }));
  };
  onSubmit = event => {
    // validate all forms field and set validation status

    const valid = Object.keys(this.state.validationState).reduce(
      (accu, field) => accu & this.state.validationState[field].valid,
      true
    );
    // set submited to true
    this.setState({ valid: valid, submited: true });
    if (this.props.onSubmit) {
      this.props.onSubmit(valid, this.state.form);
    }
    event.preventDefault();
  };
  resetField = ({
    name,
    newValue = "",
    validationRules = [],
    isArray = false
  }) => {
    this.updateField(name, newValue, [], true);

    // handle validation state
    this.setState(newState => {
      const newValidationState = Object.keys(newState.validationState).reduce(
        (accu, key) => {
          let NameToSearch = isArray ? `${name}[` : `${name}`;
          if (!key.includes(NameToSearch)) {
            accu[key] = newState.validationState[key];
          } else {
            if (!isArray) {
              accu[key] = this.validateField(validationRules, newValue);
            }
          }
          return accu;
        },
        {}
      );
      // if this field wasn't exist in the validationruls list
      if (
        !newValidationState[name] &&
        validationRules &&
        validationRules.length > 0
      ) {
        newValidationState[name] = this.validateField(
          validationRules,
          newValue
        );
      }
      return {
        validationState: newValidationState
      };
    });
    //handle touch
    this.setState(newState => {
      const newTouchedState = Object.keys(newState.touchedState).reduce(
        (accu, key) => {
          let NameToSearch = isArray ? `${name}[` : `${name}`;
          if (!key.includes(NameToSearch)) {
            accu[key] = newState.touchedState[key];
          }
          return accu;
        },
        {}
      );
      return {
        touchedState: newTouchedState
      };
    });
  };
  render() {
    return (
      <FormContext.Provider
        value={{
          state: this.state,
          updateField: this.updateField,
          updateFieldValidationState: this.updateFieldValidationState,
          validateField: this.validateField,
          getFieldValue: this.getFieldValue,
          updateValidationState: this.updateValidationState,
          updateTouchedState: this.updateTouchedState
        }}
      >
        <form noValidate onSubmit={this.onSubmit}>
          {this.props.children({
            values: this.state.form,
            submited: this.state.submited,
            valid: this.state.valid,
            resetField: this.resetField
          })}
          <pre style={{ direction: "ltr" }}>
            <code>{JSON.stringify(this.state, null, 4)}</code>
          </pre>
        </form>
      </FormContext.Provider>
    );
  }
}

export default FormContainer;

/**
  accepted props :  onSubmit - this function will be triggered on subite event. with(valid, this.state.form)
                    children - one function. the function will get(values,submited,valid)
  context - this component will be the container of the FormContext. the context will have:
            {
              form: {},
              validationState: {},
              touchedState: {},
              submited: false,
              valid: true
          };   
 
 */
