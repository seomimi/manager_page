import React from "react";
import { Route } from "react-router-dom";
import "./App.scss";
import Project from "./page/Project";

function App() {
  return (
    <div>
      <Route path="/project" component={Project} />
    </div>
  );
}

export default App;
