import React from 'react';
import PropTypes from 'prop-types';

// Material-UI

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
  },
  text: {
    fontSize: '0.7rem',
    textAlign: 'justify',
  },
}));

const PlanFullPreview = (props) => {

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      
      {props.plan.deal_month === 1 ?
        <Typography className={classes.text}>
          Don't save money, get mortgage and buy a flat this month.
        </Typography>
      :
        <Typography className={classes.text}>
          Save money for <strong>{props.plan.deal_month}</strong> months.
        </Typography>
      }

      <Typography className={classes.text}>
        Mortgage will take <strong>{Math.round(props.plan.years * 100) / 100}</strong> years, 
        initial payment would be <strong>{props.plan.initial_payment}</strong>, 
        initial mortgage deabt would be <strong>{props.plan.initial_debt}</strong>. 
        You'll be totally free in <strong>{Math.round(((props.plan.deal_month + props.plan.total_months) / 12) * 100) / 100}</strong> years. 
      </Typography>

      {!props.isSave ?
        <Typography className={classes.text}>
          Repairing credit will take <strong>{Math.round(props.plan.credit_period * 100) / 100}</strong> months.
        </Typography>
      : null}

    </Box>
  )
}

PlanFullPreview.propTypes = {
  isSave: PropTypes.bool.isRequired,
  plan: PropTypes.object.isRequired,
};

export default PlanFullPreview;