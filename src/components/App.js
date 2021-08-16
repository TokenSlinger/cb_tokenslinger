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
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

// Components
import Header from './static/Header';
import Footer from './static/Footer';

// Add Icons to library
library.add(fas, fab, far)

function App() {
  return (
    <div className="App">
      

      <Router>
        <Header />

        <Route path='/account/:address'>
          <Account />
        </Route>

      </Router>

      <Footer />
    </div>
  );
}

export default App;
