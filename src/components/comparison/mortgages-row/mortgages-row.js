import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Material-UI

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

// Custom Components

import MortgageShortPreview from './subcomponents/mortgage-short-preview';

// Custom Styles

import useStyles from './styles';

const MortgagesRow = (props) => {

  const classes = useStyles();

  return (
    <Fragment>
      <TableRow
        className={classes.root}>
        
        <TableCell>Mortgage schemes:</TableCell>

        {props.prerequisites ?
          props.prerequisites.mortgage_schemes.map((scheme, i) => (
            <TableCell
              key={i}
              colSpan={2}
              className={classes.mortgage}>

              <MortgageShortPreview
                scheme={scheme}
                isSettingMortgageScheme={props.isSettingMortgageScheme}
                setMortgageScheme={props.setMortgageScheme}
                deleteMortgageScheme={props.deleteMortgageScheme} />
              
            </TableCell>
          ))
        : null}
        
        <TableCell>
          <IconButton
            aria-label="add mortgage"
            color="secondary"
            variant="outlined"
            onClick={(event) => props.setMortgageScheme(event)}
            disabled={props.isSettingMortgageScheme.isShown}>

            <AddIcon fontSize="small" />
          </IconButton>
        </TableCell>
        
      </TableRow>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    prerequisites: state.prerequisites,
  };
};

MortgagesRow.propTypes = {
  isSettingMortgageScheme: PropTypes.object.isRequired,
  setMortgageScheme: PropTypes.func.isRequired,
  deleteMortgageScheme: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(MortgagesRow);