import React from "react";
import { withStyles } from "@material-ui/styles";
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import NavigateNext from "@material-ui/icons/NavigateNext";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import { isNull } from "util";

const styles = theme => ({
  datePicker: {
    marginTop: "16px"
  }
});

export default withStyles(styles)(function FormDatePicker(props) {
  const {
    name,
    validationText,
    onChange,
    classes,
    className,
    value,
    variant = "date",
    ...otherProps
  } = props;
  const selectedVariant =
    variant === "date" ? (
      <DatePicker
        invalidDateMessage={validationText}
        value={value === "" ? null : value}
        className={`${className} ${classes.datePicker}`}
        clearable
        onChange={(date, value) => onChange(date)}
        {...otherProps}
      />
    ) : variant === "time" ? (
      <TimePicker
        invalidDateMessage={validationText}
        value={value === "" ? null : value}
        className={`${className} ${classes.datePicker}`}
        clearable
        onChange={(date, value) => onChange({ target: { value: date } })}
        {...otherProps}
      />
    ) : (
      isNull
    );
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {selectedVariant}
    </MuiPickersUtilsProvider>
  );
});
