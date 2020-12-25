import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteRealty, deleteAllRealties } from '../../store/actions';
import realtySifter from '../../helpers/realtySifter';
import Realty from './realty/realty';

import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import MortgageSchemes from './mortgage-schemes/mortgage-schemes';

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
});

const Comparison = (props) => {
  
  const classes = useStyles();
  
  const setRealty = (event, id = null) => {
    event.preventDefault();
    if (!props.prerequisites) return;
    props.setIsSettingRealty({
      isShown: true,
      realty: id ? realtySifter(props.realtyList.find(element => element.id === id)) : null
    });
  }

  const deleteRealty = (event, id) => {
    event.preventDefault();
    props.deleteRealty(id);
  }

  const deleteAllRealties = (event) => {
    event.preventDefault();
    if (props.realtyList.length === 0) return;
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
            
            <TableRow>  
              <MortgageSchemes
                isSettingMortgageScheme={props.isSettingMortgageScheme}
                setIsSettingMortgageScheme={props.setIsSettingMortgageScheme} />
            </TableRow>
            
          </TableHead>
          {props.realtyList && props.realtyList.length > 0 ?
          <TableBody>
            {props.realtyList.map((realty, index) => (
              
              <Realty
                key={index}
                realty={realty}
                setRealty={(...args) => setRealty(...args)}
                deleteRealty={(...args) => deleteRealty(...args)}
                isSettingRealty={props.isSettingRealty}
                setIsSettingRealty={props.setIsSettingRealty} />

            ))}
          </TableBody>
          : null}
        </Table>
      </TableContainer>
      
      <button
        onClick={(event) => setRealty(event)}
        disabled={!props.prerequisites || props.isSettingRealty.isShown}>+</button>
      
      {props.realtyList && props.realtyList.length > 1 ?
        <button onClick={(event) => deleteAllRealties(event)}>Удалить все варианты</button>
      : null }

      {!props.realtyList || props.realtyList.length === 0 ?
        'No variants, click "setDefaultPrerequisites"'
      : null}

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
    deleteRealty: (...args) => dispatch(deleteRealty(...args)),
    deleteAllRealties: () => dispatch(deleteAllRealties()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comparison);