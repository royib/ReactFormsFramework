import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import ContactForm from "./contactForm";
import "./styles.css";
import LinearProgress from "@material-ui/core/LinearProgress";
import { HeContainer } from "./UI";

function App() {
  return (
    <Fragment>
      <h1>React Material UI</h1>
      <h2>Royi's Mini forms framework</h2>

      <ContactForm />
    </Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
