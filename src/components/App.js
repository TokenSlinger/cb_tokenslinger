import React from 'react';
import Account from './Account';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// FONT AWESOME LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core'
import { fal } from '@fortawesome/pro-light-svg-icons'
import { far } from '@fortawesome/pro-regular-svg-icons'
import { fas } from '@fortawesome/pro-solid-svg-icons'
import { fad } from '@fortawesome/pro-duotone-svg-icons'

// Components
import Header from './static/Header';
import Footer from './static/Footer';
import Home from './Home';

// Add Icons to library
library.add(fas, fal, fad, far)

function App() {
  return (
    <div className="App">
      

      <Router>
        <Header />

        <Route path='/account/:address'>
          <Account />
        </Route>

        <Route path="/" exact>
          <Home />
        </Route>

      </Router>

      <Footer />
    </div>
  );
}

export default App;
