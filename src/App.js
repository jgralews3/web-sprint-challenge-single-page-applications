import React from "react";
import Form from "./Form.js";
import HomePage from "./HomePage.js";
import {Route, Switch} from 'react-router-dom';
import './App.css'

const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <p>Welcome to Lambda Eats!</p>
      <Switch>
        <Route path="/pizza">
          <Form />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </>
  );
};
export default App;
