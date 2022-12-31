import React from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import HomeSheetValidatorComponent from './components/HomeSheetValidatorComponent';
import HomeSheetsDiffComponent from './components/HomeSheetsDiffComponent';
import Header from './components/Header';
import Home from './components/Home';

import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/comparer">
            <HomeSheetsDiffComponent />
          </Route>
          <Route path="/validator">
            <HomeSheetValidatorComponent />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
