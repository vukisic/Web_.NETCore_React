import React from 'react';
import './App.css';

import Home from './components/home';
import Department from './components/department';
import Employee from './components/employee';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Navigation from './components/navigation';

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="m-3 d-flex justify-content-center">React Client App</h3>
        <h5 className="m-3 d-flex justify-content-center">Employee Managment App</h5>
        <Navigation />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/department" component={Department} />
          <Route path="/employee" component={Employee} exact />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
