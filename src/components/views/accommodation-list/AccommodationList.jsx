import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Filters from './filters/Filters.jsx';
import List from './list/List.jsx';

const API_HOST = 'https://warsawjs-workshop-32-book-it-m.herokuapp.com';

const SORTING = ['MAX_AVG_RATING', 'MAX_REVIEWS', 'MIN_PRICE', 'MAX_PRICE'];

class AccommodationList extends React.Component {
  static propTypes = {
    onDetails: PropTypes.func.isRequired,
  };

  state = {
    accommodations: {
      data: null,
      fetching: false,
      errors: null,
    },
    sorting: 0,
    filters: {
      searchPhrase: '',
      centre: '',
      minPrice: '',
      minAvgRating: '',
      minReviewsCount: '',
    },
    shareId: '',
  };

  componentDidMount() {
    const filters = JSON.parse(localStorage.getItem('filters')) || {};
    const sorting = localStorage.getItem('sorting') || SORTING[0];

    this.setState({
      filters: {
        centre: filters.centre || '',
        minAvgRating: filters.minAvgRating || '',
        minPrice: filters.minPrice || '',
        minReviewsCount: filters.minReviewsCount || '',
        searchPhrase: filters.searchPhrase ? filters.searchPhrase : '',
      },
      sorting: SORTING.indexOf(sorting) < 0 ? 0 : SORTING.indexOf(sorting),
    }, this.fetchList);
  }

  fetchList = () => {
    const { filters, sorting, accommodations } = this.state;
    const { searchPhrase, centre, minPrice, minAvgRating, minReviewsCount } = filters;
    const query = `?search=${searchPhrase}&centre=${centre}&minPrice=${minPrice}&minAvgRating=${minAvgRating}&minReviewsCount=${minReviewsCount}&sorting=${SORTING[sorting]}`;

    localStorage.setItem('filters', JSON.stringify(filters));
    localStorage.setItem('sorting', sorting);

    this.setState({
      accommodations: {
        data: accommodations.data,
        fetching: true,
        errors: null,
      },
    });

    fetch(`${API_HOST}/list${query}`).then(response => {
      response.json().then(({ list }) => {
        this.setState({
          accommodations: {
            data: list,
            fetching: false,
            errors: null,
          },
        });
      }, errors => {
        this.setState({
          accommodations: {
            data: null,
            fetching: false,
            errors: errors.message,
          },
        });
      });
    });
  };

  handleSortingChange = (event, sorting) => {
    this.setState({ sorting }, this.fetchList);
  };

  handleShareDialogOpen = shareId => {
    this.setState({ shareId });
  };

  handleShareDialogClose = () => {
    this.setState({ shareId: '' });
  };

  handleFiltersChange = filters => {
    this.setState({ filters });
  };

  handleSearchChange = (event, { newValue } = {}) => {
    this.handleFiltersChange({
      ...this.state.filters,
      searchPhrase: newValue || event.target.value,
    });
  };

  handleFiltersCentreChange = event => {
    this.handleFiltersChange({
      ...this.state.filters,
      centre: event.target.value,
    });
  };

  handleFiltersPriceChange = event => {
    this.handleFiltersChange({
      ...this.state.filters,
      minPrice: event.target.value,
    });
  };

  handleFiltersMinAvgRatingChange = event => {
    this.handleFiltersChange({
      ...this.state.filters,
      minAvgRating: event.target.value,
    });
  };

  handleFiltersMinReviewsCountChange = event => {
    this.handleFiltersChange({
      ...this.state.filters,
      minReviewsCount: event.target.value,
    });
  };

  render() {
    const {
      onDetails,
    } = this.props;
    const { shareId, filters, accommodations, sorting } = this.state;

    return (
      <Grid container>
        <Filters
          filters={filters}
          onSearch={this.fetchList}
          onSearchChange={this.handleSearchChange}
          onFiltersCentreChange={this.handleFiltersCentreChange}
          onFiltersPriceChange={this.handleFiltersPriceChange}
          onFiltersMinAvgRatingChange={this.handleFiltersMinAvgRatingChange}
          onFiltersMinReviewsCountChange={this.handleFiltersMinReviewsCountChange}
        />
        <List
          accommodations={accommodations}
          shareId={shareId}
          sorting={sorting}
          onDetails={onDetails}
          onSortingChange={this.handleSortingChange}
          onShareDialogClose={this.handleShareDialogClose}
          onShareDialogOpen={this.handleShareDialogOpen}
        />
      </Grid>
    );
  }
}

export default AccommodationList;
