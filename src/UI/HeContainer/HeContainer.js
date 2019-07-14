import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { StylesProvider, jssPreset } from "@material-ui/styles";
import rtl from "jss-rtl";
import { create } from "jss";

const theme = createMuiTheme({
  direction: "rtl",
  typography: {
    fontFamily: ["Open Sans Hebrew"].join(","),
    fontSize: 14
  },
  palette: {
    primary: {
      main: "#0A70B4"
    },
    secondary: {
      main: "#2E2E2E"
    },
    error: {
      main: "#DF0100"
    }
  }
});
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function HeContainer(props) {
  return (
    <MuiThemeProvider theme={theme}>
      <StylesProvider jss={jss}>{props.children}</StylesProvider>
    </MuiThemeProvider>
  );
}

export default HeContainer;
