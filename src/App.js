import React from 'react';
import 'antd/dist/antd.css';
import './app.scss';
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import HomePage from './components/homepage/HomePage';
import Toolbar from './components/toolbar/Toolbar';

function App() {
  return (
    <div className="App">
      <Toolbar />
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
