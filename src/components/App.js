import React from 'react';
import Account from './Account';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>New Project</h1>
      <Router>

        <Route path='/account/:address'>
          <Account />
        </Route>

      </Router>
    </div>
  );
}

export default App;
