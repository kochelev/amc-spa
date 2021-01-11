import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { updatePrerequisites, updateAllRealties } from '../../store/actions';

// Material-UI

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%',
  },
  headline: {
    padding: theme.spacing(2),
  }
}));

const Prerequisites = (props) => {

  const classes = useStyles();
  
  const setPrerequisites = (event) => {
    event.preventDefault();
    if (!props.prerequisites) return;
    props.setIsSettingPrerequisites({isShown: true});
  }

  const refteshRealties = (event) => {
    event.preventDefault();
    if (!props.prerequisites || props.realtyList === 0) return;
    props.setIsPending(true);
    props.updateAllRealties(props.prerequisites, props.realtyList,
      () => props.setIsPending(false),
      (error) => {
        props.setIsPending(false);
        alert(error);
      }
    );
  };
  
  const personal_info = [
    { "name": "Current savings:",
      "value": props.prerequisites ? props.prerequisites.personal_info.current_savings : 'None' },
    { "name": "Month income:",
      "value": props.prerequisites ? props.prerequisites.personal_info.month_income : 'None' },
    { "name": "Month rent:",
      "value": props.prerequisites ? props.prerequisites.personal_info.month_rent : 'None'},
    { "name": "Range of months:",
      "value": (props.prerequisites ? props.prerequisites.personal_info.deal_month_start : 'None')
      + "\u2009\u2013\u2009" + (props.prerequisites ? props.prerequisites.personal_info.deal_month_finish : 'None') }
  ]

  const credit_scheme = [
    { "name": "Interest rate:",
      "value": props.prerequisites ? props.prerequisites.credit_scheme.interest_rate + '\u2009%': 'None' },
    { "name": "Total months:",
      "value": props.prerequisites ? props.prerequisites.credit_scheme.months: 'None' }
  ]

  return (
    <Fragment>

      <Box className={classes.headline}>
        <Typography variant="h6" align="left" display="block">Personal Information</Typography>
      </Box>
      
      <TableContainer component={Paper} elevation={0} square>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableBody>
            {personal_info.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box className={classes.headline}>
        <Typography variant="h6" align="left" display="block">Available Credit Scheme</Typography>
      </Box>

      <TableContainer component={Paper} elevation={0} square>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableBody>
            {credit_scheme.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box align="left" css={{ p: '16px 16px' }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={(event) => setPrerequisites(event)}
          disabled={props.isSettingPrerequisites.isShown}>Edit</Button>
      </Box>

      {!props.isRealtyListUpdated ? (
        <button onClick={(event) => refteshRealties(event)}>REFRESH</button>
      ) : null }
      {props.isPending ? 'Pending... ALL' : null }
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    prerequisites: state.prerequisites,
    realtyList: state.realtyList,
    isRealtyListUpdated: state.isRealtyListUpdated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePrerequisites: (...args) => dispatch(updatePrerequisites(...args)),
    updateAllRealties: (...args) => dispatch(updateAllRealties(...args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Prerequisites);