import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import DefaultLayout from '../src/layout/Default';
import IndexPage from './page/index';
import PokemonNewPage from './page/pokemon/new';

function App() {
  return (
    <Router>
      <Switch>
        <DefaultLayout>
          <Route path="/" exact component={IndexPage} />
          <Route path="/pokemon/new" component={PokemonNewPage} />
        </DefaultLayout>
      </Switch>
    </Router>
  );
}

export default App;
