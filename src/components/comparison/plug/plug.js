import React from 'react';

// Material-UI

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CallMadeIcon from '@material-ui/icons/CallMade';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    verticalAlign: 'middle',
    width: '300px',
    margin: '0 auto',
    height: '100%',
  },
  moved: {
    position: 'relative',
    top: '0.4rem',
  },
  rotate90: {
    position: 'relative',
    top: '0.6rem',
    transform: 'rotate(90deg)',
  },
}));

const Plug = () => {

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h6" align="left"><ArrowBackIcon className={classes.moved} /> configure prerequisites</Typography>
      <Typography variant="h6" align="right">add mortgage schemes <CallMadeIcon /></Typography>
      <Typography variant="h6" align="center">add realty variants <CallMadeIcon className={classes.rotate90} /></Typography>
      <Typography variant="h6" align="center">and compare...</Typography>
    </Box>
  )
}

export default Plug;