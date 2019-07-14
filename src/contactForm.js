import React, { Fragment } from "react";
import { FormContainer, FormField, FormFieldArray } from "./Forms";
import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import {
  Button,
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  Typography,
  Switch,
  Paper,
  InputLabel,
  FormControlLabel
} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import { FormTextField, FormDatePicker } from "./Forms/components";
import { require, onlyNumbers } from "./Forms/validators";
import { FeedbackSnackbar } from "./UI";

const Styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    paddingLeft: "25px",
    paddingRight: "25px",
    backgroundColor: "#F0F4F6",
    boxSizing: "border-box"
  },
  TextField: {
    width: "140px",
    marginLeft: "15px",
    marginRight: "15px"
    //marginBottom:'40px',
  },
  TextFieldBackground: {
    backgroundColor: "#F0F4F6"
  },
  TextFieldFullWidth: {
    width: "652px"
  },
  TextFieldLarge: {
    width: "310px"
  },
  break: {
    flexBasis: "100%",
    width: "0px",
    height: "0px",
    overflow: "hidden"
  },
  addTeacherRoot: {
    width: "100%",
    marginTop: "10px",
    marginBottom: "10px"
  },
  teachersListContainer: {
    display: "flex",
    flexWrap: "wrap"
  },
  oneRowContainer: {
    flex: "0 0 100%"
  },
  submit: {
    marginTop: "20px",
    marginBottom: "20px",
    textAlign: "left"
  },
  multimedia: {
    padding: "8px"
  },
  updateModeContainer: {
    padding: "10px",
    direction: "rtl"
  }
};

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    // usualy you will get it from props

    this.state = {
      initialState: null,
      containerKey: 1
    };
  }
  initialStateDemo = {
    fullName: "Danny",
    habits: [
      {
        title: "surfing",
        note: "in the bahamas"
      },
      {
        title: "painting",
        note: "portrait"
      },
      {
        title: "Karate",
        note: "free style"
      }
    ],
    birthDate: "2019-08-01T10:37:00.000Z",
    birthTime: {
      target: {
        value: "2019-07-14T09:50:29.041Z"
      }
    },
    age: "44",
    occupation: "software programer ",
    smoking: true
  };
  onSubmitEventHandler = (validatioState, form) => {
    console.log(validatioState, form);
  };
  onClassNameChange = newValue => {
    console.log(newValue);
  };
  setUpdateMode = updateMode => {
    if (updateMode) {
      this.setState(state => ({
        initialState: this.initialStateDemo,
        containerKey: state.containerKey + 1
      }));
    } else {
      this.setState(state => ({
        initialState: null,
        containerKey: state.containerKey + 1
      }));
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Paper className={classes.updateModeContainer}>
          <FormControlLabel
            control={
              <Switch
                onChange={e => this.setUpdateMode(e.target.checked)}
                value="checkedB"
                color="primary"
              />
            }
            label="Update Mode Demo"
          />
        </Paper>
        <FormContainer
          key={this.state.containerKey}
          onSubmit={this.onSubmitEventHandler}
          udpateModeValues={this.state.initialState}
          defaultValues={{ fullName: "Danny", habits: [{}, {}] }}
        >
          {({ values, submited, valid, resetField }) => {
            return (
              <div className={classes.container}>
                <FormField
                  className={classes.TextField}
                  label="Full Name"
                  required
                  placeholder="Full Name"
                  name="fullName"
                  Component={FormTextField}
                  validators={[require]}
                  valueChanged={newValue =>
                    this.onClassNameChange(newValue, resetField)
                  }
                />
                <FormField
                  className={classes.TextField}
                  label="Age"
                  placeholder="Age"
                  name="age"
                  Component={FormTextField}
                  validators={[require, onlyNumbers]}
                />
                <FormField
                  className={classes.TextField}
                  label="Birth Date"
                  placeholder="10/10/2018"
                  name="birthDate"
                  Component={FormDatePicker}
                  validators={[require]}
                  format="dd/MM/yyyy"
                />
                <FormField
                  className={classes.TextField}
                  label="Birth Time"
                  name="birthTime"
                  Component={FormDatePicker}
                  validators={[require]}
                  ampm={false}
                  variant="time"
                />
                <FormField
                  className={`${classes.TextField} ${classes.TextFieldLarge}`}
                  label="Occupation"
                  placeholder="occupation"
                  name="occupation"
                  Component={FormTextField}
                />

                <FormFieldArray name="habits">
                  {({ items, addItem, removeItem, name }) => {
                    return (
                      <div className={classes.addTeacherRoot}>
                        <ExpansionPanel defaultExpanded>
                          <ExpansionPanelSummary
                            aria-controls="panel1c-content"
                            id="panel1c-header"
                          >
                            <div className={classes.column}>
                              <Typography className={classes.heading}>
                                My Habbits
                              </Typography>
                            </div>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails
                            className={classes.teachersListContainer}
                          >
                            {items.map((item, index) => (
                              <div
                                key={index}
                                className={classes.oneRowContainer}
                              >
                                <FormField
                                  className={classes.TextField}
                                  label="Habit"
                                  placeholder="Habit"
                                  name={`${name}[${index}].title`}
                                  Component={FormTextField}
                                  validators={[require]}
                                />
                                <FormField
                                  className={classes.TextField}
                                  label="Note"
                                  placeholder="Note"
                                  name={`${name}[${index}].note`}
                                  Component={FormTextField}
                                  validators={[require]}
                                />
                                <Close onClick={e => removeItem(index)} />
                              </div>
                            ))}
                          </ExpansionPanelDetails>

                          <Divider />
                          <ExpansionPanelActions>
                            <Button
                              size="small"
                              color="primary"
                              onClick={addItem}
                            >
                              Add Habit
                            </Button>
                          </ExpansionPanelActions>
                        </ExpansionPanel>
                      </div>
                    );
                  }}
                </FormFieldArray>
                <Paper
                  className={clsx(classes.oneRowContainer, classes.multimedia)}
                >
                  <FormField name="smoking">
                    {({ onChange, validationText, value, ...otherProps }) => (
                      <Fragment>
                        <InputLabel>Smoking?</InputLabel>
                        <Switch
                          onChange={e => onChange(e.target.checked)}
                          checked={value}
                          {...otherProps}
                        />
                      </Fragment>
                    )}
                  </FormField>
                </Paper>
                <div className={clsx(classes.oneRowContainer, classes.submit)}>
                  <Button variant="outlined" color="primary" type="submit">
                    Submit
                  </Button>
                </div>
                <FeedbackSnackbar
                  open={submited && !valid}
                  message="ישנם מספר שגיאות בטופס!"
                />
              </div>
            );
          }}
        </FormContainer>
      </Fragment>
    );
  }
}

export default withStyles(Styles)(ContactForm);
