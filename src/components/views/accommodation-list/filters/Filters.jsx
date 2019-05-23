import React from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const API_HOST = 'https://warsawjs-workshop-32-book-it-m.herokuapp.com';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  suggestionsContainer: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: theme.zIndex.appBar,
    marginTop: theme.spacing.unit * -1,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});

class Filters extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    filters: PropTypes.object.isRequired,
    onSearch: PropTypes.func.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    onFiltersCentreChange: PropTypes.func.isRequired,
    onFiltersPriceChange: PropTypes.func.isRequired,
    onFiltersMinAvgRatingChange: PropTypes.func.isRequired,
    onFiltersMinReviewsCountChange: PropTypes.func.isRequired,
  };

  state = {
    suggestions: [],
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    fetch(`${API_HOST}/suggestions?search=${value}`).then(response => {
      response.json().then(({ suggestions }) => {
        this.setState({ suggestions });
      });
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  getSuggestionValue(suggestion) {
    return suggestion.label;
  }

  renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) =>
            part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            ),
          )}
        </div>
      </MenuItem>
    );
  }

  renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;

    return (
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        InputProps={{
          inputRef: node => {
            ref(node);
            inputRef(node);
          },
          classes: {
            input: classes.input,
          },
        }}
        {...other}
      />
    );
  }

  render() {
    const {
      classes,
      filters,
      onSearch,
      onSearchChange,
      onFiltersCentreChange,
      onFiltersPriceChange,
      onFiltersMinAvgRatingChange,
      onFiltersMinReviewsCountChange,
    } = this.props;

    return (
      <Grid item xs={3}>
        <div className={classes.toolbar}>
          <Typography variant="h6">Search</Typography>
          <FormGroup>
            <Autosuggest
              renderSuggestion={this.renderSuggestion}
              getSuggestionValue={this.getSuggestionValue}
              renderInputComponent={this.renderInputComponent}
              suggestions={this.state.suggestions}
              onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
              inputProps={{
                classes,
                placeholder: 'Destination',
                value: filters.search,
                onChange: onSearchChange,
              }}
              theme={{
                container: classes.suggestionsContainer,
                suggestionsContainerOpen: classes.suggestionsContainerOpen,
                suggestionsList: classes.suggestionsList,
                suggestion: classes.suggestion,
              }}
              renderSuggestionsContainer={options => (
                <Paper {...options.containerProps} square>
                  {options.children}
                </Paper>
              )}
            />
            <Button onClick={onSearch} variant="outlined" color="primary" className={classes.button}>
              Search
            </Button>
            <TextField
              id="centre"
              label="Max. centre distance"
              className={classes.textField}
              value={filters.centre}
              onChange={onFiltersCentreChange}
              margin="normal"
              variant="outlined"
              type="number"
              inputProps={{
                step: 1,
                min: 0,
              }}
            />
            <TextField
              id="minPrice"
              label="Min. price"
              className={classes.textField}
              value={filters.minPrice}
              onChange={onFiltersPriceChange}
              margin="normal"
              variant="outlined"
              type="number"
              inputProps={{
                step: 100,
                min: 0,
              }}
            />
            <TextField
              id="minAvgRating"
              label="Min. average rating"
              className={classes.textField}
              value={filters.minAvgRating}
              onChange={onFiltersMinAvgRatingChange}
              margin="normal"
              variant="outlined"
              type="number"
              inputProps={{
                step: 1,
                min: 0,
              }}
            />
            <TextField
              id="minReviewsCount"
              label="Min. reviews count"
              className={classes.textField}
              value={filters.minReviewsCount}
              onChange={onFiltersMinReviewsCountChange}
              margin="normal"
              variant="outlined"
              type="number"
              inputProps={{
                step: 10,
                min: 0,
              }}
            />
            <Button onClick={onSearch} variant="outlined" color="primary" className={classes.button}>
              Search
            </Button>
          </FormGroup>
        </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(Filters);
