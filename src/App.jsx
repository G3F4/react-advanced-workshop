import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layout/header/Header';

const AccommodationDetailsConnect = lazy(() => import('./components/views/accommodation-details/AccommodationDetailsConnect'));
const AccommodationList = lazy(() => import('./components/views/accommodation-list/AccommodationList'));

const App = () => (
  <Router>
    <Header/>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/details" component={AccommodationDetailsConnect} />
        <Route path="/" component={AccommodationList} />
      </Switch>
    </Suspense>
  </Router>
);

export default App;
