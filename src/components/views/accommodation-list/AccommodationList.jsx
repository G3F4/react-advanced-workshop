import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Filters from './filters/Filters.jsx';
import List from './list/List.jsx';

class AccommodationList extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    accommodations: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    sorting: PropTypes.number.isRequired,
    onDetails: PropTypes.func.isRequired,
    onSortingChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    onFiltersChange: PropTypes.func.isRequired,
  };

  state = {
    shareId: '',
  };

  handleSortingChange = (event, sorting) => {
    this.props.onSortingChange(sorting);
  };

  handleShareDialogOpen = shareId => {
    this.setState({ shareId });
  };

  handleShareDialogClose = () => {
    this.setState({ shareId: '' });
  };

  handleSearchChange = (event, { newValue } = {}) => {
    this.props.onFiltersChange({
      ...this.props.filters,
      search: newValue || event.target.value,
    });
  };

  handleFiltersCentreChange = event => {
    this.props.onFiltersChange({
      ...this.props.filters,
      centre: event.target.value,
    });
  };

  handleFiltersPriceChange = event => {
    this.props.onFiltersChange({
      ...this.props.filters,
      minPrice: event.target.value,
    });
  };

  handleFiltersMinAvgRatingChange = event => {
    this.props.onFiltersChange({
      ...this.props.filters,
      minAvgRating: event.target.value,
    });
  };

  handleFiltersMinReviewsCountChange = event => {
    this.props.onFiltersChange({
      ...this.props.filters,
      minReviewsCount: event.target.value,
    });
  };

  render() {
    const {
      accommodations,
      filters,
      sorting,
      onSearch,
      onDetails,
    } = this.props;
    const { shareId } = this.state;

    return (
      <Grid container>
        <Filters
          filters={filters}
          onSearch={onSearch}
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
