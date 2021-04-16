import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Appbar from './components/Appbar';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Appbar/>
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route path="/login"><Login /></Route>
          </Switch>
      </BrowserRouter>
    </>
  );
}
export default App;
