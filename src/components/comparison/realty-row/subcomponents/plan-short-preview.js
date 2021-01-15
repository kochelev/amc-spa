import React from 'react';
import PropTypes from 'prop-types';

// Material-UI

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ZoomOutMap from '@material-ui/icons/ZoomOutMap';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'table',
    width: '100%',
    height: 52,
  },
  previewDescription: {
    display: 'table-cell',
    verticalAlign: 'middle',
    padding: theme.spacing(1),
  },
  previewExpandButton: {
    display: 'table-cell',
    verticalAlign: 'top',
    padding: theme.spacing(1, 1, 1, 0),
    width: 52,
  },
  shortYears: {
    fontWeight: 300,
  },
  shortMonth: {
    fontSize: '0.7rem',
  }
}));

const PlanShortPreview = (props) => {

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <div className={classes.previewDescription}>
        <Typography
          variant="body1"
          className={classes.shortYears}>
            <strong>{Math.round(((props.plan.deal_month + props.plan.total_months) / 12) * 100) / 100}</strong> y.
        </Typography>
        <Typography
          variant="body2"
          className={classes.shortMonth}>
            from <strong>{props.plan.deal_month}</strong> m.
        </Typography>
      </div>
      <div className={classes.previewExpandButton}>
        <IconButton
          aria-label="expand"
          onClick={props.clickHandler}>
            <ZoomOutMap fontSize="small" />
        </IconButton>
      </div>
    </Box>
  )
}

PlanShortPreview.propTypes = {
  plan: PropTypes.object.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default PlanShortPreview;