import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Close from '@material-ui/icons/Close.js';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  favoriteInfo: {
    padding: theme.spacing.unit,
    paddingBottom: 0,
  },
  favoriteActions: {
    padding: 0,
  },
  favoriteCard: {
    maxWidth: 345,
    minWidth: 345,
  },
  favoriteMedia: {
    objectFit: 'cover',
  },
  price: {
    marginTop: theme.spacing.unit,
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
  bottomDrawer: {
    position: 'sticky',
    bottom: 0,
    display: 'flex',
    overflow: 'scroll',
    zIndex: theme.zIndex.drawer,
  },
});

const FavoritesDrawer = ({ classes, favorites, onDetails, onFavorite }) => (
  <Card className={classes.bottomDrawer}>
    {favorites.map(item => (
      <Card className={classes.favoriteCard} key={item.id}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={item.title}
            className={classes.favoriteMedia}
            height="100"
            image={item.cover.url}
            title={item.title}
          />
          <CardContent className={classes.favoriteInfo}>
            <Typography variant="subheading">
              {item.title}
            </Typography>
            <div className={classes.price}>
              <Typography variant="body1">
                {`Price: ${item.price.amount} ${item.price.currency}`}
              </Typography>
              <Typography variant="body1">
                {item.price.breakfast ? (
                  <span>Breakfast included</span>
                ) : (
                  <span>Breakfast not included</span>
                )}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.favoriteActions}>
          <IconButton onClick={() => onFavorite(item)} aria-label="Remove from favorites">
            <Close/>
          </IconButton>
          <Button
            className={classes.floatRight}
            aria-label="Details"
            onClick={() => onDetails(item.id)}
          >
            Details
          </Button>
        </CardActions>
      </Card>
    ))}
  </Card>
);

FavoritesDrawer.propTypes = {
  classes: PropTypes.object,
  favorites: PropTypes.array.isRequired,
  onDetails: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
};

export default withStyles(styles)(FavoritesDrawer);
