// TODO: control if there is no mortgage scheme at all

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { updatePrerequisites, updateAllRealties, deleteRealty, deleteAllRealties } from '../../store/actions';

// Material-UI

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

// Custom Components

import realtySifter from '../../helpers/realtySifter';
import RealtyRow from './realty-row/realty-row';
import MortgagesRow from './mortgages-row/mortgages-row';

// Custom Styles

import useStyles from './styles';

const Comparison = (props) => {
  
  const classes = useStyles();

  const setMortgageScheme = (event, scheme = null) => {
    event.preventDefault();
    props.setIsSettingMortgageScheme({
      isShown: true,
      data: scheme,
    });
  }

  const deleteMortgageScheme = (event, id) => {
    event.preventDefault();
    
    const result = window.confirm("Are you sure you want to delete mortgage scheme?");
    if (!result) return;

    const x = props.prerequisites.mortgage_schemes.filter((element) => element.id !== id);
    const updatedPerequisites = {
      ...props.prerequisites,
      mortgage_schemes: x
    }

    let afterFunction = () => {}

    if (props.realtyList && props.realtyList.length > 0) {
      afterFunction = (x) => {
        props.setIsPending(true);
        props.updateAllRealties(x, props.realtyList,
          () => {
            props.setIsPending(false);
          },
          (error) => {
            props.setIsPending(false);
            alert(error);
          }
        );
      }
    }
    props.updatePrerequisites(updatedPerequisites, afterFunction);
  }
  
  const setRealty = (event, id = null) => {
    event.preventDefault();
    if (!props.prerequisites) return;
    props.setIsSettingRealty({
      isShown: true,
      data: id ? realtySifter(props.realtyList.find(element => element.id === id)) : null
    });
  }

  const deleteRealty = (event, id) => {
    event.preventDefault();
    
    const result = window.confirm("Are you sure you want to delete realty?");
    if (!result) return;
    
    props.deleteRealty(id);
  }

  const deleteAllRealties = (event) => {
    event.preventDefault();
    if (props.realtyList.length === 0) return;

    const result = window.confirm("Are you sure you want to delete all realties?");
    if (!result) return;
    
    props.deleteAllRealties();
  }

  return (
    <Fragment>
      
      {props.isPending ? 'Pending...' : null }
      {!props.isRealtyListUpdated ? (
        <h3>LIST NOT UPDATED</h3>
      ) : null }

      <TableContainer component={Paper} elevation={0} square>
        <Table className={classes.table} size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <MortgagesRow
              setMortgageScheme={setMortgageScheme}
              deleteMortgageScheme={deleteMortgageScheme}
              isSettingMortgageScheme={props.isSettingMortgageScheme} />
          </TableHead>
          {props.realtyList && props.realtyList.length > 0 ?
          <TableBody>
            
            <TableRow className={classes.descriptionRow}>
              <TableCell>Realty description</TableCell>
              {props.prerequisites ?
                props.prerequisites.mortgage_schemes.map((scheme, i) => (
                  <Fragment key={i}>
                    <TableCell>Save</TableCell>
                    <TableCell>Get credit</TableCell>
                  </Fragment>
                )
              ) : null}
              <TableCell></TableCell>
            </TableRow>

            {props.realtyList.map((realty, i) => (
              <RealtyRow
                key={i}
                realty={realty}
                setRealty={(...args) => setRealty(...args)}
                deleteRealty={(...args) => deleteRealty(...args)}
                isSettingRealty={props.isSettingRealty}
                setIsSettingRealty={props.setIsSettingRealty}
                isDetalizationShown={props.isDetalizationShown}
                setIsDetalizationShown={props.setIsDetalizationShown} />
            ))}
          </TableBody>
          : null}
        </Table>
      </TableContainer>
      
      {props.realtyList && props.realtyList.length > 1 ?
        <Box className={classes.bottomControls}>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={event => deleteAllRealties(event)}
            endIcon={<DeleteIcon />}>Delete all realties</Button>
        </Box>
      : null }

      <Fab
        color="secondary"
        aria-label="add"
        className={classes.addRealtyButton}
        onClick={(event) => setRealty(event)}
        disabled={!props.prerequisites || props.isSettingRealty.isShown}>
          <AddIcon />
      </Fab>

    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    prerequisites: state.prerequisites,
    realtyList: state.realtyList,
    isRealtyListUpdated: state.isRealtyListUpdated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePrerequisites: (...args) => dispatch(updatePrerequisites(...args)),
    updateAllRealties: (...args) => dispatch(updateAllRealties(...args)),
    deleteRealty: (...args) => dispatch(deleteRealty(...args)),
    deleteAllRealties: () => dispatch(deleteAllRealties()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comparison);