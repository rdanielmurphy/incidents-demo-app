import React, { Component } from 'react';
import './App.css';
import { HashRouter } from "react-router-dom";
import { Route, Switch } from 'react-router-dom';
import SelectionComponent from './Components/SelectionComponent';
import MapComponent from './Components/MapComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route path='/selection' component={SelectionComponent} />
            <Route path='/map/:i' component={MapComponent} />
            <Route path='*' component={SelectionComponent} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
