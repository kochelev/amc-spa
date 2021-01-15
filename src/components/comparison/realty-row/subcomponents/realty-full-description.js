import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Material-UI

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
    padding: theme.spacing(1, 1, 1, 2),
  },
  text: {
    fontSize: '0.7rem',
    textAlign: 'justify',
  },
}));

const RealtyFullDescription = (props) => {

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      
      <Typography className={classes.text}>
        <strong>{props.realty.realty_cost}</strong> (any currency)
        {props.realty.area ?
          <Fragment>
            &nbsp;for <strong>{props.realty.area}</strong> m<sup>2</sup>
          </Fragment>
        : null}
      </Typography>

      <Typography className={classes.text}>
        Will get keys in <strong>{props.realty.gotkeys_month}</strong> months.
      </Typography>

      <Typography className={classes.text}>
        Subway: <strong>{props.realty.subway_distance}</strong> minutes by feet.
      </Typography>

      <Typography className={classes.text}>
        <strong>{props.realty.has_mall ? 'Yes' : 'No'}</strong> shopping mall not far.
      </Typography>

      <Typography className={classes.text}>
        Repairing: <strong>{props.realty.repairing.expencies}</strong> in <strong>{props.realty.repairing.months}</strong> months.
      </Typography>

      <Typography className={classes.text}>
        Settling expencies: <strong>{props.realty.settling_expencies}</strong>.
      </Typography>

    </Box>
  )
}

RealtyFullDescription.propTypes = {
  realty: PropTypes.object.isRequired,
};

export default RealtyFullDescription;