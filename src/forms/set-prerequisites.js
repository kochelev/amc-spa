// TODO: alert(error + '\n Need to make possible save again!!!!!!!!');
// TODO: Control if deal_date_start is less than deal_date_finish
// TODO: Interest rates shoudl be less than 100%?
// TODO: Pass data to that component too? Don't use prerequisites.

import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePrerequisites, updateAllRealties } from '../store/actions';
import { useForm } from "react-hook-form";

// Material-UI

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

// Custom Components

import RegExpList from '../helpers/regExpList';
import ConfiguredTextField from './fields/configuredTextField';

const SetPrerequisites = (props) => {
  
  const data = props.prerequisites ? props.prerequisites : null;

  const defaultValues = {
    current_savings:    data ? data.personal_info.current_savings.toString() : null,
    month_income:       data ? data.personal_info.month_income.toString() : null,
    month_rent:         data ? data.personal_info.month_rent.toString() : null,
    deal_month_start:   data ? data.personal_info.deal_month_start.toString() : null,
    deal_month_finish:  data ? data.personal_info.deal_month_finish.toString() : null,
    interest_rate:      data ? data.credit_scheme.interest_rate.toString() : null,
    months:             data ? data.credit_scheme.months.toString() : null,
  };

  const { register, handleSubmit, errors, watch, getValues } = useForm({
    defaultValues,
    mode: 'onSubmit',
    criteriaMode: 'all',
  });
  const [ isFormChanged, setIsFormChanged ] = useState(false);
  const formValues = watch();

  useEffect(() => {
    const currentState = getValues();
    if (Object.keys(currentState).every(
        (key) => currentState[key] === defaultValues[key])) setIsFormChanged(false);
    else setIsFormChanged(true);
  }, [formValues]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = formdata => {
    const prerequisites = {
      'personal_info': {
        'current_savings':    parseInt(formdata.current_savings),
        'month_income':       parseInt(formdata.month_income),
        'month_rent':         parseInt(formdata.month_rent),
        'deal_month_start':   parseInt(formdata.deal_month_start),
        'deal_month_finish':  parseInt(formdata.deal_month_finish),
      },
      'credit_scheme': {
        'interest_rate':      parseFloat(formdata.interest_rate),
        'months':             parseInt(formdata.months),
      },
      'mortgage_schemes':     props.prerequisites.mortgage_schemes,
    };

    let afterFunction = () => {
      props.handleClose();
    }

    if (props.realtyList && props.realtyList.length > 0) {
      afterFunction = (x) => {
        props.setIsPending(true);
        props.updateAllRealties(x, props.realtyList,
          () => {
            props.setIsPending(false);
            props.handleClose();
          },
          (error) => {
            props.setIsPending(false);
            alert(error);
            props.handleClose();
          }
        );
      }
    }
    props.updatePrerequisites(prerequisites, afterFunction);
  };

  const properties = {
    errors,
    register,
    disabled: props.isPending,
  }

  return (
    <Fragment>
      <DialogTitle id="form-dialog-title" disableTypography={true}>
        <Typography variant="h5" noWrap>
          Prerequisites
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers={true}>
          
          <ConfiguredTextField {...properties}
            name="current_savings"
            label="Current savings"
            autoFocus={true}
            helperText="How much money have you already saved by now?"
            required={true}
            pattern={RegExpList.zeroPosInt}
            endAdornment="any currency" />

          <ConfiguredTextField {...properties}
            name="month_income"
            label="Month income"
            helperText="How much free money do you have every month?"
            required={true}
            pattern={RegExpList.zeroPosInt}
            endAdornment="any currency" />

          <ConfiguredTextField
            {...properties}
            name="month_rent"
            label="Month rent"
            helperText="How much do you pay for hiring a flat every month?"
            required={true}
            pattern={RegExpList.zeroPosInt}
            endAdornment="any currency" />

          <Box css={{ p: '40px 0' }}>
            <DialogContentText>
              Enter the range of months you are able to take a mortgage.
            </DialogContentText>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                
                <ConfiguredTextField {...properties}
                  name="deal_month_start"
                  label="Deal start month"
                  helperText="From which month are you going to make a mortgage deal?"
                  required={true}
                  pattern={RegExpList.posInt}
                  endAdornment="month" />

              </Grid>
              <Grid item xs={12} sm={6}>
                
                <ConfiguredTextField {...properties}
                  name="deal_month_finish"
                  label="Deal finish month"
                  helperText="Till which month are you going to make a mortgage deal?"
                  required={true}
                  pattern={RegExpList.posInt}
                  endAdornment="month" />

              </Grid>
            </Grid>
          </Box>
          <Box css={{ p: '20px 0' }}>
            <Typography variant="h6" noWrap>
              Available Credit Scheme for Repairing
            </Typography>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
            </DialogContentText>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                
                <ConfiguredTextField {...properties}
                  name="interest_rate"
                  label="Interest rate"
                  helperText="What interest rate would have a possible credit for repairing?"
                  required={true}
                  pattern={RegExpList.posFloat}
                  endAdornment="%" />

              </Grid>
              <Grid item xs={12} sm={6}>
                
                <ConfiguredTextField {...properties}
                  name="months"
                  label="Months"
                  helperText="How many months would you have for paying out repairing credit?"
                  required={true}
                  pattern={RegExpList.posInt}
                  endAdornment="months" />

              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.handleClose}
            color="primary">Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isFormChanged}>{!props.isPending ? "Update" : "Saving..."}</Button>
        </DialogActions>
      </form>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    prerequisites:        state.prerequisites,
    realtyList:           state.realtyList,
    isRealtyListUpdated:  state.isRealtyListUpdated,
  };
};
  
const mapDispatchToProps = dispatch => {
  return {
    updatePrerequisites:  (...args) => dispatch(updatePrerequisites(...args)),
    updateAllRealties:    (...args) => dispatch(updateAllRealties(...args)),
  };
};

SetPrerequisites.propTypes = {
  isPending:    PropTypes.bool.isRequired,
  setIsPending: PropTypes.func.isRequired,
  handleClose:  PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetPrerequisites);