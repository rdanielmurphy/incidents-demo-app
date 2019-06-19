import React, { Component } from 'react';
import './App.css';
import { HashRouter } from "react-router-dom";
import { Route, Switch } from 'react-router-dom';
import SelectionComponent from './Components/SelectionComponent';
import CircularProgress from '@material-ui/core/CircularProgress';
import MapComponent from './Components/MapComponent';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: true
    }
  }

  componentDidMount() {
    // TODO: Load incidents
  }

  render() {
    if (this.state.loaded) {
      return (
        <div className="App">
          <HashRouter>
            <Switch>
              <Route path='/selection' component={SelectionComponent} />
              <Route path='/map' component={MapComponent} />
              <Route path='*' component={SelectionComponent} />
            </Switch>
          </HashRouter>
        </div>
      );
    } else {
      return (
        <div className="loading">
          <h2> Loading ... </h2>
          <CircularProgress size={100} />
        </div>
      );
    }
  }
}

export default App;
