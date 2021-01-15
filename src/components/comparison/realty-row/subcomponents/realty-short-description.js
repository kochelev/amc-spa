import React from 'react';
import PropTypes from 'prop-types';

// Material-UI

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'table',
    width: '100%',
    height: 52,
  },
  title: {
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'left',
    padding: theme.spacing(1, 1, 1, 2),
  },
  buttons: {
    display: 'table-cell',
    verticalAlign: 'top',
    padding: theme.spacing(1, 1, 1, 0),
    width: 96,
  },
}));

const RealtyShortDescription = (props) => {

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      
      <Box className={classes.title}>
        {props.realty.region ? (
          <Link variant="body2" href={props.realty.region} target="_blank">
            {props.realty.title}
          </Link>
        ) : (
          <Typography variant="subtitle2" noWrap>{props.realty.title}</Typography>
        )}
      </Box>

      <Box className={classes.buttons}>
        <IconButton
          className={classes.iconButton}
          aria-label="delete"
          onClick={(event) => props.setRealtyHandler(event)}
          disabled={props.isSettingRealtyShown}>
            <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          className={classes.iconButton}
          aria-label="delete"
          onClick={(event) => props.deleteRealtyHandler(event)}
          disabled={props.isSettingRealtyShown}>
            <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

    </Box>
  )
}

RealtyShortDescription.propTypes = {
  realty: PropTypes.object.isRequired,
  setRealtyHandler: PropTypes.func.isRequired,
  deleteRealtyHandler: PropTypes.func.isRequired,
  isSettingRealtyShown: PropTypes.bool.isRequired,
};

export default RealtyShortDescription;