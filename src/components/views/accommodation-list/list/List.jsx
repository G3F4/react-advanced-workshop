import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Price from '../../../common/price/Price';
import Rating from '../../../common/rating/Rating';
import Share from '../../../common/share/Share';

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

const List = ({
  classes,
  accommodations,
  shareId,
  sorting,
  onDetails,
  onSortingChange,
  onShareDialogClose,
  onShareDialogOpen,
}) => (
  <Grid item xs={9}>
    {accommodations.errors ? (
      <Typography variant="body1">{accommodations.errors}</Typography>
    ) : (
      <React.Fragment>
        {accommodations.fetching ? (
          <CircularProgress size="100%" thickness={2}/>
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
                    onChange={onSortingChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                  >
                    <Tab label="Best rated"/>
                    <Tab label="Most reviewed"/>
                    <Tab label="Cheapest"/>
                    <Tab label="Most expensive"/>
                  </Tabs>
                </Paper>
                {accommodations.data.map((item, idx) => (
                  <Card className={classes.card} key={idx}>
                    <CardHeader
                      avatar={<Rating rating={item.rating}/>}
                      action={<Price price={item.price}/>}
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
                      <Share
                        id={item.id}
                        open={shareId === item.id}
                        onClose={onShareDialogClose}
                        onOpen={onShareDialogOpen}
                      />
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

List.propTypes = {
  classes: PropTypes.object,
  accommodations: PropTypes.object.isRequired,
  shareId: PropTypes.string.isRequired,
  sorting: PropTypes.number.isRequired,
  onDetails: PropTypes.func.isRequired,
  onSortingChange: PropTypes.func.isRequired,
  onShareDialogClose: PropTypes.func.isRequired,
  onShareDialogOpen: PropTypes.func.isRequired,
};

export default withStyles(styles)(List);
