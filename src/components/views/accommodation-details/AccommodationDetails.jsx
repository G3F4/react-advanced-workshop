import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft.js';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight.js';
import { withStyles } from '@material-ui/core/styles';
import Price from '../../common/price/Price';
import Rating from '../../common/rating/Rating';
import Share from '../../common/share/Share';
import FacilityIcon from './facility-icon/FacilityIcon';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const API_HOST = 'https://warsawjs-workshop-32-book-it-m.herokuapp.com';

const styles = theme => ({
  card: {
    maxWidth: '100%',
  },
  actions: {
    display: 'flex',
  },
  button: {
    margin: theme.spacing.unit,
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
});

class AccommodationDetails extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    theme: PropTypes.object,
    detailsId: PropTypes.string.isRequired,
    onBackToList: PropTypes.func.isRequired,
  };

  state = {
    activeStep: 0,
    shareId: '',
    openedDetails: null,
  };

  componentDidMount() {
    this.fetchDetails();
  }

  fetchDetails = () => {
    const params = `?id=${this.props.detailsId}`;

    this.setState({
      openedDetails: {
        ...(this.state.openedDetails || {}),
        fetching: true,
        errors: null,
      },
    });

    fetch(`${API_HOST}/details${params}`).then(response => {
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

  handleShareDialogOpen = (shareId) => {
    this.setState({ shareId });
  };

  handleShareDialogClose = () => {
    this.setState({ shareId: '' });
  };

  render() {
    const { classes, theme, onBackToList } = this.props;
    const { activeStep, openedDetails } = this.state;

    return openedDetails && (
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
                  avatar={<Rating rating={openedDetails.data.rating} />}
                  action={<Price price={openedDetails.data.price} />}
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
                  <FacilityIcon facilities={openedDetails.data.facilities} />
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <Share
                    id={openedDetails.data.id}
                    open={this.state.shareId === openedDetails.data.id}
                    onClose={this.handleShareDialogClose}
                    onOpen={this.handleShareDialogOpen}
                  />
                  <Button
                    aria-label="Back to list"
                    className={classes.floatRight}
                    onClick={onBackToList}
                  >
                    Back to list
                  </Button>
                </CardActions>
              </Card>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AccommodationDetails);
