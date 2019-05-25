import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ErrorBoundary from './components/layout/error-boundary/ErrorBoundary';
import Header from './components/layout/header/Header';

const AccommodationDetailsConnect = lazy(() => import('./components/views/accommodation-details/AccommodationDetailsConnect'));
const AccommodationList = lazy(() => import('./components/views/accommodation-list/AccommodationList'));

const App = () => (
  <ErrorBoundary>
    <Router>
      <Header/>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/details" component={AccommodationDetailsConnect} />
          <Route exact path="/" component={AccommodationList} />
        </Switch>
      </Suspense>
    </Router>
  </ErrorBoundary>
);

export default App;
