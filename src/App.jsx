import React from 'react';
import './styles/app.scss'
import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";
import {BrowserRouter as Router, Switch , Route, Redirect} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/:id">
            <Toolbar/>
            <Canvas/>
          </Route>
          <Redirect to={`f${(+new Date()).toString(16)}`}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
