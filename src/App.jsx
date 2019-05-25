import React, { Component } from 'react';
import AccommodationDetailsConnect from './components/views/accommodation-details/AccommodationDetailsConnect.jsx';
import AccommodationList from './components/views/accommodation-list/AccommodationList.jsx';
import Header from './components/layout/header/Header.jsx';
import './App.css';

class App extends Component {
  state = {
    detailsId: null,
  };

  handleBackToList = () => {
    this.setState({
      detailsId: null,
    });
  };

  handleDetails = detailsId => {
    this.setState({ detailsId });
  };

  render() {
    const { detailsId } = this.state;

    return (
      <div className="App">
        <Header />
        {detailsId ? (
          <AccommodationDetailsConnect
            detailsId={detailsId}
            onBackToList={this.handleBackToList}
          />
        ) : (
          <AccommodationList
            onDetails={this.handleDetails}
          />
        )}
      </div>
    );
  }
}

export default App;
