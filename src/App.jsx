import React from 'react';
import { CircularProgress, FormGroup, Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import ShareIcon from '@material-ui/icons/Share';
import SmokeFree from '@material-ui/icons/SmokeFree';
import AccessibleForward from '@material-ui/icons/AccessibleForward';
import LocalParking from '@material-ui/icons/LocalParking';
import Wifi from '@material-ui/icons/Wifi';
import Pets from '@material-ui/icons/Pets';
import FreeBreakfast from '@material-ui/icons/FreeBreakfast';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const API_HOST = 'https://warsawjs-workshop-32-book-it-m.herokuapp.com';

const SORTING = ['MAX_AVG_RATING', 'MAX_REVIEWS', 'MIN_PRICE', 'MAX_PRICE'];

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = theme => ({
  appBar: {
    marginBottom: theme.spacing.unit,
  },
  card: {
    maxWidth: '100%',
  },
  sortingTabs: {
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: '30%',
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: blue[600],
  },
  price: {
    marginTop: theme.spacing.unit,
  },
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
  floatRight: {
    marginLeft: 'auto',
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    margin: '0 auto',
  },
  facilities: {
    marginTop: theme.spacing.unit * 3,
  },
  toolbar: {
    margin: theme.spacing.unit,
  },
  accommodations: {
    marginRight: theme.spacing.unit,
  },
});


class App extends React.Component {
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
    single: '',
    popper: '',
    suggestions: [],
    openedDetails: null,
    activeStep: 0
  };

  componentDidMount() {
    const filters = JSON.parse(localStorage.getItem('filters')) || {};
    const sorting = localStorage.getItem('sorting') || SORTING[0];

    if (window.location.pathname === '/details') {
      this.fetchDetails(filters.id);
    } else {
      this.setState({
        filters: {
          centre: filters.centre || '',
          minAvgRating: filters.minAvgRating || '',
          minPrice: filters.minPrice || '',
          minReviewsCount: filters.minReviewsCount || '',
          searchPhrase: filters.searchPhrase || '',
        },
        sorting: SORTING.indexOf(sorting) < 0 ? 0 : SORTING.indexOf(sorting),
      }, this.fetchList);
    }
  }

  fetchList = () => {
    const { filters, sorting, accommodations } = this.state;
    const { searchPhrase, centre, minPrice, minAvgRating, minReviewsCount } = filters;
    const url = `/list?search=${searchPhrase}&centre=${centre}&minPrice=${minPrice}&minAvgRating=${minAvgRating}&minReviewsCount=${minReviewsCount}&sorting=${SORTING[sorting]}`;

    window.history.pushState(null, '', url);

    this.setState({
      accommodations: {
        data: accommodations.data,
        fetching: true,
        errors: null,
      },
    });

    fetch(`${API_HOST}${url}`).then(response => {
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

  fetchDetails = (id) => {
    const url = `/details?id=${id}`;

    this.setState({
      openedDetails: {
        ...(this.state.openedDetails || {}),
        fetching: true,
        errors: null,
      },
    });

    window.history.pushState(null, '', url);

    fetch(`${API_HOST}${url}`).then(response => {
      response.json().then(({ data }) => {
        this.setState({
          openedDetails: {
            data,
            fetching: false,
            errors: null,
          },
        });
      }, errors => {
        this.setState({
          openedDetails: {
            data: null,
            fetching: false,
            errors: errors.message,
          },
        });
      });
    });
  };

  handleBackToList = () => {
    this.setState({
      openedDetails: null,
    }, this.fetchList);
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
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

  handleSortingChange = (event, sorting) => {
    this.setState({ sorting }, this.fetchList);
  };

  handleSearchChange = (event, { newValue }) => {
    this.setState({
      filters: {
        ...this.state.filters,
        searchPhrase: newValue || event.target.value,
      },
    });
  };

  handleFiltersCentreChange = (event) => {
    this.setState({
      filters: {
        ...this.state.filters,
        centre: event.target.value,
      },
    });
  };

  handleFiltersPriceChange = (event) => {
    this.setState({
      filters: {
        ...this.state.filters,
        minPrice: event.target.value,
      },
    });
  };

  handleFiltersMinAvgRatingChange = (event) => {
    this.setState({
      filters: {
        ...this.state.filters,
        minAvgRating: event.target.value,
      },
    });
  };

  handleFiltersMinReviewsCountChange = (event) => {
    this.setState({
      filters: {
        ...this.state.filters,
        minReviewsCount: event.target.value,
      },
    });
  };

  handleShareDialogOpen = (shareId) => {
    this.setState({ shareId });
  };

  handleShareDialogClose = () => {
    this.setState({ shareId: '' });
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

  renderShareButton(id) {
    return (
      <div>
        <IconButton aria-label="Share" onClick={() => this.handleShareDialogOpen(id)}>
          <ShareIcon />
        </IconButton>
        <Dialog
          fullScreen={this.props.fullScreen}
          open={this.state.shareId === id}
          onClose={this.handleShareDialogClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Copy this link and share!"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`${window.location.origin}/details?id=${id}`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleShareDialogClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  render() {
    const { classes, theme } = this.props;
    const { accommodations, filters, sorting, openedDetails, activeStep, suggestions } = this.state;

    return (
      <div className="App">
        <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit">
              <a href="/">BOOK IT</a>! THE BEST BOOKING HELPER!
            </Typography>
          </Toolbar>
        </AppBar>
        {openedDetails ? (
          <React.Fragment>
            {openedDetails.errors ? (
              <Typography variant="body1">{openedDetails.errors}</Typography>
            ) : (
              <React.Fragment>
                {openedDetails.fetching ? (
                  <CircularProgress size="100%" thickness={2} />
                ) : (
                  <Card className={classes.card}>
                    <CardHeader
                      avatar={
                        <div>
                          <Typography variant="h6" gutterBottom>
                            Good
                          </Typography>
                          <Avatar className={classes.avatar}>
                            {openedDetails.data.rating.average}
                          </Avatar>
                          <Typography variant="overline" gutterBottom>
                            {`${openedDetails.data.rating.reviews} reviews`}
                          </Typography>
                        </div>
                      }
                      action={
                        <div className={classes.price}>
                          <Typography variant="h6" gutterBottom>
                            Price
                          </Typography>
                          <Typography variant="button" gutterBottom>
                            {`${openedDetails.data.price.amount} ${openedDetails.data.price.currency}`}
                          </Typography>
                          <Typography variant="overline" gutterBottom>
                            {openedDetails.data.price.breakfast ? (
                              <span>Breakfast included</span>
                            ) : (
                              <span>Breakfast not included</span>
                            )}
                          </Typography>
                        </div>
                      }
                      title={openedDetails.data.title}
                      subheader={openedDetails.data.address}
                    />
                    <div className={classes.root}>
                      <AutoPlaySwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeStep}
                        onChangeIndex={this.handleStepChange}
                        enableMouseEvents
                      >
                        {openedDetails.data.images.map((image, index) => (
                          <div key={index}>
                            {Math.abs(activeStep - index) <= 2 ? (
                              <img className={classes.img} src={image} alt="" />
                            ) : null}
                          </div>
                        ))}
                      </AutoPlaySwipeableViews>
                      <MobileStepper
                        steps={openedDetails.data.images.length}
                        position="static"
                        activeStep={activeStep}
                        className={classes.mobileStepper}
                        nextButton={
                          <Button size="small" onClick={this.handleNext} disabled={activeStep === openedDetails.data.images.length - 1}>
                            Next
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                          </Button>
                        }
                        backButton={
                          <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            Back
                          </Button>
                        }
                      />
                    </div>
                    <CardContent>
                      <Typography component="div">{openedDetails.data.description}</Typography>
                      <div className={classes.facilities}>
                        {openedDetails.data.facilities.map(facility => (
                          <React.Fragment key={facility}>
                            {facility === 'NON_SMOKING' && (
                              <SmokeFree />
                            )}
                            {facility === 'DISABLED_GUESTS_SERVICE' && (
                              <AccessibleForward />
                            )}
                            {facility === 'PARKING' && (
                              <LocalParking />
                            )}
                            {facility === 'FREE_WIFI' && (
                              <Wifi />
                            )}
                            {facility === 'PETS_ALLOWED' && (
                              <Pets />
                            )}
                            {facility === 'BREAKFAST' && (
                              <FreeBreakfast />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                      {this.renderShareButton(openedDetails.data.id)}
                      <Button
                        aria-label="Back to list"
                        className={classes.floatRight}
                        onClick={this.handleBackToList}
                      >
                        Back to list
                      </Button>
                    </CardActions>
                  </Card>
                )}
              </React.Fragment>
            )}
          </React.Fragment>
        ) : (
          <Grid container>
            <Grid item xs={3}>
              <div className={classes.toolbar}>
                <Typography variant="h6">Search</Typography>
                <FormGroup>
                  <Autosuggest
                    renderSuggestion={this.renderSuggestion}
                    getSuggestionValue={this.getSuggestionValue}
                    renderInputComponent={this.renderInputComponent}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                    inputProps={{
                      classes,
                      placeholder: 'Destination',
                      value: filters.searchPhrase,
                      onChange: this.handleSearchChange,
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
                  <Button onClick={this.fetchList} variant="outlined" color="primary" className={classes.button}>
                    Search
                  </Button>
                  <TextField
                    id="centre"
                    label="Max. centre distance"
                    className={classes.textField}
                    value={filters.centre}
                    onChange={this.handleFiltersCentreChange}
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
                    onChange={this.handleFiltersPriceChange}
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
                    onChange={this.handleFiltersMinAvgRatingChange}
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
                    onChange={this.handleFiltersMinReviewsCountChange}
                    margin="normal"
                    variant="outlined"
                    type="number"
                    inputProps={{
                      step: 10,
                      min: 0,
                    }}
                  />
                  <Button onClick={this.fetchList} variant="outlined" color="primary" className={classes.button}>
                    Search
                  </Button>
                </FormGroup>
              </div>
            </Grid>
            <Grid item xs={9}>
              {accommodations.errors ? (
                <Typography variant="body1">{accommodations.errors}</Typography>
              ) : (
                <React.Fragment>
                  {accommodations.fetching ? (
                    <CircularProgress size="100%" thickness={2} />
                  ) : (
                    <React.Fragment>
                      {accommodations.data && accommodations.data.length === 0 && (
                        <Typography variant="h3">No results found</Typography>
                      )}
                      {accommodations.data && accommodations.data.length > 0 && (
                        <div className={classes.accommodations}>
                          <Typography variant="h3">{`${accommodations.data.length} results found`}</Typography>
                          <Paper className={classes.sortingTabs}>
                            <Tabs
                              value={sorting}
                              onChange={this.handleSortingChange}
                              indicatorColor="primary"
                              textColor="primary"
                              centered
                            >
                              <Tab label="Best rated" />
                              <Tab label="Most reviewed" />
                              <Tab label="Cheapest" />
                              <Tab label="Most expensive" />
                            </Tabs>
                          </Paper>
                          {accommodations.data.map((item, idx) => (
                            <Card className={classes.card} key={idx}>
                              <CardHeader
                                avatar={
                                  <div>
                                    <Typography variant="h6" gutterBottom>
                                      Good
                                    </Typography>
                                    <Avatar className={classes.avatar}>
                                      {item.rating.average}
                                    </Avatar>
                                    <Typography variant="overline" gutterBottom>
                                      {`${item.rating.reviews} rewies`}
                                    </Typography>
                                  </div>
                                }
                                action={
                                  <div className={classes.price}>
                                    <Typography variant="h6" gutterBottom>
                                      Price
                                    </Typography>
                                    <Typography variant="button" gutterBottom>
                                      {`${item.price.amount} zł`}
                                    </Typography>
                                    <Typography variant="overline" gutterBottom>
                                      {item.price.breakfast ? (
                                        <span>Breakfast included</span>
                                      ) : (
                                        <span>Breakfast not included</span>
                                      )}
                                    </Typography>
                                  </div>
                                }
                                title={item.title}
                                subheader={item.location.centre + ' - ' + item.location.address}
                              />
                              <CardMedia
                                className={classes.media}
                                image={item.cover.url}
                                title={item.title}
                              />
                              <CardContent>
                                {item.insights.map((item, idx) => (
                                  <Typography key={idx} component="p">{item.text}</Typography>
                                ))}
                              </CardContent>
                              <CardActions className={classes.actions} disableActionSpacing>
                                {this.renderShareButton(item.id)}
                                <Button
                                  aria-label="Details"
                                  className={classes.floatRight}
                                  onClick={() => this.fetchDetails(item.id)}
                                >
                                  Details
                                </Button>
                              </CardActions>
                            </Card>
                          ))}
                        </div>
                      )}
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
