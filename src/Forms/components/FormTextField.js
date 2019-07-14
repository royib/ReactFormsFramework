import React from "react";
import { TextField } from "@material-ui/core";

class FormTextField extends React.Component {
  render() {
    const { name, validationText, onChange, ...otherProps } = this.props;

    return (
      <TextField
        helperText={validationText}
        onChange={e => onChange(e.target.value)}
        {...otherProps}
        margin="normal"
      />
    );
  }
}

export default FormTextField;
