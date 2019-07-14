import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import clsx from "clsx";
import ErrorIcon from "@material-ui/icons/Error";
const useStyles = makeStyles(theme => ({
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));
export default function FeedbackSnackbar(props) {
  const { open, message } = props;

  const classes = useStyles();

  return (
    <div>
      <Snackbar
        className={classes.error}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={2000}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
      >
        <SnackbarContent
          className={classes.error}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <ErrorIcon className={clsx(classes.icon, classes.iconVariant)} />
              {message}
            </span>
          }
        />
      </Snackbar>
    </div>
  );
}
