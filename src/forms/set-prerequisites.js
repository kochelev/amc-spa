import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePrerequisites, updateAllRealties } from '../store/actions';
import { useForm } from "react-hook-form";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import * as prerequisites from '../testdata/prerequisites';

const SetPrerequisites = (props) => {
  
  const data = props.prerequisites ? props.prerequisites : null;

  const defaultValues = {
    current_savings: data ? data.personal_info.current_savings.toString() : null,
    month_income: data ? data.personal_info.month_income.toString() : null,
    month_rent: data ? data.personal_info.month_rent.toString() : null,
    deal_month_start: data ? data.personal_info.deal_month_start.toString() : null,
    deal_month_finish: data ? data.personal_info.deal_month_finish.toString() : null,
    interest_rate: data ? data.credit_scheme.interest_rate.toString() : null,
    months: data ? data.credit_scheme.months.toString() : null,
  };

  const {
    register, handleSubmit, errors, reset,
    watch, setValue, getValues} = useForm({
    defaultValues,
    mode: 'onSubmit',
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
        'current_savings': parseInt(formdata.current_savings),
        'month_income': parseInt(formdata.month_income),
        'month_rent': parseInt(formdata.month_rent),
        'deal_month_start': parseInt(formdata.deal_month_start),
        'deal_month_finish': parseInt(formdata.deal_month_finish),
      },
      'credit_scheme': {
        'interest_rate': parseInt(formdata.interest_rate),
        'months': parseInt(formdata.months),
      },
      'mortgage_schemes': props.prerequisites.mortgage_schemes,
    };

    let afterFunction = () => {
      props.close('prerequisites');
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
          }
        );
      }
    }
    props.updatePrerequisites(prerequisites, afterFunction);
  };

  const RegExpList = {
    posInt: new RegExp(`^[1-9][0-9]*$`),
    posFloat: new RegExp(`^[1-9][0-9]*(.[0-9])?$|^0.[1-9]$`)
  }

  const putDataIntoForm = (variant, event = null) => {
    if (event) event.preventDefault();
    for (const key in variant.personal_info) {
      setValue(`${key}`, variant.personal_info[key], { shouldDirty: true });
    }
    for (const key in variant.credit_scheme) {
      setValue(`${key}`, variant.credit_scheme[key], { shouldDirty: true });
    }
  };
  return (
    <Fragment>
      <DialogTitle id="form-dialog-title">Prerequisites</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
            Fill form with personal information.
            {props.isPending ? ' Pending...' : null }
          </DialogContentText>

          <Typography variant="subtitle1" noWrap>
            Personal Infromation
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                autoFocus
                type="text"
                id="current_savings"
                name="current_savings"
                label="Current savings *"
                inputRef={register({ required: true, pattern: RegExpList.posInt })}
                margin="dense"
                fullWidth
                error={errors.current_savings}
                helperText={errors.current_savings ?
                  errors.current_savings.type === "required" ?
                    'This field is required'
                    : 'Positive integer number'
                  : "How much money have you already saved by now?"} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                type="text"
                id="month_income"
                name="month_income"
                label="Month income *"
                inputRef={register({ required: true, pattern: RegExpList.posInt })}
                margin="dense"
                fullWidth
                error={errors.month_income}
                helperText={errors.month_income ?
                  errors.month_income.type === "required" ?
                    'This field is required'
                    : 'Positive integer number'
                  : "How much free money do you have every month?"} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                type="text"
                id="month_rent"
                name="month_rent"
                label="Month rent *"
                inputRef={register({ required: true, pattern: RegExpList.posInt })}
                margin="dense"
                fullWidth
                error={errors.month_rent}
                helperText={errors.month_rent ?
                  errors.month_rent.type === "required" ?
                    'This field is required'
                    : 'Positive integer number'
                  : "How much do you pay for hiring a flat every month?"} />
            </Grid>
          </Grid>
          <DialogContentText>
            Enter the range of months, when you possibly are able to take a mortgage.
          </DialogContentText>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                id="deal_month_start"
                name="deal_month_start"
                label="Deal start month *"
                inputRef={register({ required: true, pattern: RegExpList.posInt })}
                margin="dense"
                fullWidth
                error={errors.deal_month_start}
                helperText={errors.deal_month_start ?
                  errors.deal_month_start.type === "required" ?
                    'This field is required'
                    : 'Positive integer number'
                  : "From which month are you going to make a mortgage deal?"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                id="deal_month_finish"
                name="deal_month_finish"
                label="Deal finish month *"
                inputRef={register({ required: true, pattern: RegExpList.posInt })}
                margin="dense"
                fullWidth
                error={errors.deal_month_finish}
                helperText={errors.deal_month_finish ?
                  errors.deal_month_finish.type === "required" ?
                    'This field is required'
                    : 'Positive integer number'
                  : "Till which month are you going to make a mortgage deal?"} />
            </Grid>
          </Grid>
          
          <Typography variant="subtitle1" noWrap>
            Available Credit Scheme for Repairing
          </Typography>

          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              
              <TextField
                type="text"
                id="interest_rate"
                name="interest_rate"
                label="Interest rate *"
                inputRef={register({ required: true, pattern: RegExpList.posInt })}
                margin="dense"
                fullWidth
                error={errors.interest_rate}
                helperText={errors.interest_rate ?
                errors.interest_rate.type === "required" ?
                    'This field is required'
                    : 'Positive integer number'
                  : "What interest rate would have a possible credit for repairing?"} />

            </Grid>
            <Grid item xs={12} sm={6}>
              
              <TextField
                type="text"
                id="months"
                name="months"
                label="Months *"
                inputRef={register({ required: true, pattern: RegExpList.posInt })}
                margin="dense"
                fullWidth
                error={errors.months}
                helperText={errors.months ?
                errors.months.type === "required" ?
                    'This field is required'
                    : 'Positive integer number'
                  : "How many months would you have for paying out repairing credit?"} />

            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.handleClose}
            color="primary">Cancel</Button>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            disabled={!isFormChanged}>{!props.isPending ? "Update" : "Saving..."}</Button>
        </DialogActions>
      </form>
    </Fragment>
  );
}

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

SetPrerequisites.propTypes = {
  isPending:    PropTypes.bool.isRequired,
  setIsPending: PropTypes.func.isRequired,
  handleClose:  PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetPrerequisites);