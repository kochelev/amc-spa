import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePrerequisites, updateAllRealties } from '../store/actions';
import { useForm } from "react-hook-form";
import deepEqual from 'deep-equal';

// Material-UI

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

// Custom Components

import RegExpList from '../helpers/regExpList';
import ConfiguredTextField from './fields/configuredTextField';

// Material-UI

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  period: {
    padding: theme.spacing(2),
    margin: '20px 0',
    border: '1px solid rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

const scheduleConverter = (schedule) => {
  const result = {}
  schedule.forEach((period, index) => {
    const newKey = 'period_' + index;
    result[newKey] = {
      interest_rate: period.interest_rate.toString(),
      months: period.months.toString(),
    }
  });
  return result;
}

const SetMortgageScheme = (props) => {
  
  const classes = useStyles();
  
  const data = props.data ? props.data : null;

  const defaultValues = {
    title:                    data ? data.title : '',
    initial_payment_percent:  data ? data.initial_payment_percent.toString() : '',
    initial_expencies:        data ? data.initial_expencies.toString() : '',
    schedule:                 data ? scheduleConverter(data.schedule) : {},
  }

  const { register, unregister, handleSubmit, errors, watch, setValue, getValues} = useForm({
    defaultValues,
    mode: 'onSubmit',
    criteriaMode: 'all',
  });
  const [ isFormChanged, setIsFormChanged ] = useState(false);
  const [ currentFormState, setCurrentFormState ] = useState(defaultValues);
  const formValues = watch();

  useEffect(() => {
    const currentValues = getValues();
    console.log('formValues: ', formValues);
    if (deepEqual(defaultValues, currentValues)) setIsFormChanged(false);
    else setIsFormChanged(true);
  }, [formValues]); // eslint-disable-line react-hooks/exhaustive-deps

  const addPeriod = (event) => {
    event.preventDefault();
    const newCurrentFormState = currentFormState;
    const newPeriodId = 'period_' + Math.round(Math.random() * 10 ** 9);
    newCurrentFormState.schedule[newPeriodId] = {
      interest_rate: '13',
      months: '11'
    }
    register('schedule["' + newPeriodId + '"].interest_rate', { required: true, pattern: RegExpList.posFloat, maxLength: 4 });
    register('schedule["' + newPeriodId + '"].months', { required: true, pattern: RegExpList.posInt, max: 1200 });
    setCurrentFormState(newCurrentFormState);
    // Make this after setCurrentFormState method execution
    setValue('schedule["' + newPeriodId + '"].interest_rate', '13', { shouldValidate: true });
    setValue('schedule["' + newPeriodId + '"].months', '11', { shouldValidate: true });
  }

  const deletePeriod = (event, key) => {
    event.preventDefault();
    const newCurrentFormState = {
      ...currentFormState,
      schedule: Object.keys(currentFormState.schedule)
        .filter(x => x !== key)
        .reduce((obj, key) => {
          return {
            ...obj,
            [key]: currentFormState.schedule[key]
          };
        }, {})
    }
    setCurrentFormState(newCurrentFormState);
    unregister('schedule["' + key + '"].interest_rate');
    unregister('schedule["' + key + '"].months');
    console.log(formValues);
  }

  const onSubmit = formdata => {
    const mortgageScheme = {
      'id': data ? data.id : Math.round(Math.random() * 10 ** 9),
      'title': formdata.title,
      'initial_payment_percent': parseFloat(formdata.initial_payment_percent),
      'initial_expencies': parseInt(formdata.initial_expencies),
      'schedule': Object.values(formdata.schedule).map((period) => {
        return {
          interest_rate: parseFloat(period.interest_rate),
          months: parseInt(period.months)
        }}
      )
    };
    let mortgageSchemes = [];
    if (data) {
      const index = props.prerequisites.mortgage_schemes.findIndex((element) => element.id === data.id);
      mortgageSchemes = props.prerequisites.mortgage_schemes;
      mortgageSchemes[index] = mortgageScheme;
    } else {
      mortgageSchemes = props.prerequisites.mortgage_schemes;
      mortgageSchemes.push(mortgageScheme);
    }

    const prerequisites = {
      ...props.prerequisites,
      mortgage_schemes: mortgageSchemes,
    };

    let afterFunction = () => {
      props.handleClose();
      console.log('without update all realties');
    }

    if (props.prerequisites && props.realtyList && props.realtyList.length > 0) {
      afterFunction = (x) => {
        props.setIsPending(true);
        props.updateAllRealties(x, props.realtyList,
          () => {
            props.setIsPending(false);
            props.handleClose();
            console.log('update all realties: success');
          },
          (error) => {
            props.setIsPending(false);
            alert(error);
            console.log('update all realties: fail');
          }
        );
      }
    }
    props.updatePrerequisites(prerequisites, afterFunction);
  }

  const textFieldProps = {
    errors,
    register,
    disabled: props.isPending,
  }
  return (
    props.prerequisites ? (
      <Fragment>
        <DialogTitle id="form-dialog-title" disableTypography={true}>
          <Typography variant="h5" noWrap>
            Mortgage Scheme
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers={true}>

            <ConfiguredTextField {...textFieldProps}
              name="title"
              label="Title"
              autoFocus={true}
              required={true}
              maxLength={100} />

            <ConfiguredTextField {...textFieldProps}
              name="initial_payment_percent"
              label="Initial payment"
              helperText=".....?"
              required={true}
              pattern={RegExpList.zeroPosFloat}
              endAdornment="%" />

            <ConfiguredTextField {...textFieldProps}
              name="initial_expencies"
              label="Initial expencies"
              helperText=".....?"
              required={true}
              pattern={RegExpList.zeroPosInt}
              endAdornment="any currency" />

            <Box css={{ p: '40px 0 20px' }}>

              <Typography variant="h6" noWrap>
                Schedule
              </Typography>

              <DialogContentText>
                sdfjlksdjflkjsaklfjasdkl
              </DialogContentText>

              {Object.entries(currentFormState.schedule).map(([key, period], index) => {
                return (
                  <Box className={classes.period} key={key}>
                    <Box>
                      <Typography variant="h5">{index + 1}</Typography>
                    </Box>
                    <Box>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          
                          <ConfiguredTextField {...textFieldProps}
                            name={'schedule.' + key + '.interest_rate'}
                            label="Interest Rates"
                            helperText=".....?"
                            required={true}
                            pattern={RegExpList.posFloat}
                            maxLength={4}
                            endAdornment="%" />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                          
                          <ConfiguredTextField {...textFieldProps}
                            name={'schedule.' + key + '.months'}
                            label="Months"
                            helperText=".....?"
                            required={true}
                            pattern={RegExpList.posInt}
                            max={1200}
                            endAdornment="months" />

                        </Grid>
                      </Grid>
                    </Box>
                    <Box>
                      <IconButton
                        className={classes.iconButton}
                        aria-label="delete"
                        onClick={event => deletePeriod(event, key)} >
                          <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                )
              })}

              {!formValues.schedule || Object.keys(formValues.schedule).length < 2 ? (
                <Box className={classes.bottomControls}>
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={event => addPeriod(event)}
                    endIcon={<AddIcon />}>
                      Add Period
                  </Button>
                </Box>
              ) : null}
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
              disabled={(Object.keys(errors).length > 0) || !isFormChanged}>{!props.isPending ? data ? "Update" : "Create" : "Saving..."}</Button>
          </DialogActions>
        </form>
      </Fragment>
    ) : null
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

SetMortgageScheme.propTypes = {
  isPending:    PropTypes.bool.isRequired,
  setIsPending: PropTypes.func.isRequired,
  handleClose:  PropTypes.func.isRequired,
  data:         PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(SetMortgageScheme);