import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { withStyles } from '@material-ui/core/styles';
import Price from '../common/price/Price.jsx';
import Rating from '../common/rating/Rating.jsx';

const styles = theme => ({
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
  floatRight: {
    marginLeft: 'auto',
  },
  accommodations: {
    marginRight: theme.spacing.unit,
  },
});

class AccommodationList extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    accommodations: PropTypes.object.isRequired,
    sorting: PropTypes.number.isRequired,
    favorites: PropTypes.array.isRequired,
    onFavorite: PropTypes.func.isRequired,
    onDetails: PropTypes.func.isRequired,
  };

  state = {
    shareId: '',
  };

  handleSortingChange = (event, sorting) => {
    this.props.onSortingChange({ sorting });
  };

  handleShareDialogOpen = (shareId) => {
    this.setState({ shareId });
  };

  handleShareDialogClose = () => {
    this.setState({ shareId: '' });
  };

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
    const {
      classes,
      accommodations,
      sorting,
      favorites,
      onFavorite,
      onDetails,
    } = this.props;

    return (
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
                          avatar={<Rating rating={item.rating} />}
                          action={<Price price={item.price} />}
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
                          <IconButton
                            onClick={() => { onFavorite(item); }}
                            aria-label="Add to favorites"
                          >
                            <FavoriteIcon color={favorites.map(({ id }) => id).includes(item.id) ? 'error' : 'disabled'} />
                          </IconButton>
                          {this.renderShareButton(item.id)}
                          <Button
                            aria-label="Details"
                            className={classes.floatRight}
                            onClick={() => onDetails(item.id)}
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
    );
  }
}

export default withStyles(styles)(AccommodationList);
