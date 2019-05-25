import React from 'react';
import AccommodationDetailsConnect from './components/views/accommodation-details/AccommodationDetailsConnect';
import AccommodationList from './components/views/accommodation-list/AccommodationList';
import Header from './components/layout/header/Header';

class App extends React.Component {
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
