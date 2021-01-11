// TODO: make possible to set Gotkeys Month as null

import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRealty, updateRealty } from '../store/actions';
import { useForm } from "react-hook-form";

// Material-UI

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

// Custom Components

import * as realties from '../testdata/realties';
import RegExpList from '../helpers/regExpList';
import ConfiguredTextField from './fields/configuredTextField';
import ConfiguredRadioGroup from './fields/configuredRadioGroup';

const SetRealty = (props) => {

  const data = props.data ? props.data : null;
  
  const defaultValues = {
    title:                  data ? data.title : '',
    region:                 data && data.region ? data.region : '',
    is_primary:             data ? data.is_primary.toString() : '',
    cost:                   data ? data.cost.toString() : '',
    gotkeys_month:          data ? data.gotkeys_month.toString() : '',
    repairing_expencies:    data ? data.repairing.expencies.toString() : '',
    repairing_months:       data ? data.repairing.months.toString() : '',
    settling_expencies:     data ? data.settling_expencies.toString() : '',
    area:                   data && data.area ? data.area.toString() : '',
    subway_distance:        data && data.subway_distance ? data.subway_distance.toString() : '',
    has_mall:               data && data.has_mall ? data.has_mall.toString() : '',
  };

  const { control, register, handleSubmit, errors, reset, watch, setValue, getValues} = useForm({
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
    if (!props.prerequisites) return;
    const realty = {
      'id': data ? data.id : Math.round(Math.random() * 10 ** 9),
      'title': formdata.title,
      'area': parseFloat(formdata.area),
      'has_mall': Boolean(formdata.has_mall),
      'subway_distance': parseInt(formdata.subway_distance),
      'region': formdata.region,
      'cost': parseInt(formdata.cost),
      'is_primary': Boolean(formdata.is_primary),
      'gotkeys_month': parseInt(formdata.gotkeys_month),
      'repairing': {
        'expencies': parseInt(formdata.repairing_expencies),
        'months': parseInt(formdata.repairing_months)
      },
      'settling_expencies': parseInt(formdata.settling_expencies)
    };
    props.setIsPending(true);
    if (data) {
        props.updateRealty(
          props.prerequisites,
          realty,
          () => {
            props.setIsPending(false);
            props.handleClose();
          },
          (error) => {
            props.setIsPending(false);
            alert(error);
          }
        );
    } else {
      props.addRealty(
        props.prerequisites,
        realty,
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

  const putDataIntoForm = (variant, event = null) => {
    if (event) event.preventDefault();
    for (const key in variant) {
      if (variant[key] === null) {
        setValue(`${key}`, '', { });
        continue;
      }
      if (key === 'repairing') {
        setValue('repairing_expencies', variant.repairing.expencies, { });
        setValue('repairing_months', variant.repairing.months, { });
        continue;
      }
      setValue(`${key}`, variant[key].toString(), { shouldDirty: true, shouldValidate: true });
    }
  };

  const textFieldProps = {
    errors,
    register,
    disabled: props.isPending,
  }

  const radioGroupProps = {
    errors,
    control,
    disabled: !props.isPending,
  }

  return (
    props.prerequisites ? (
      <Fragment>
        <DialogTitle id="form-dialog-title" disableTypography={true}>
          <Typography variant="h5" noWrap>
            Realty Params
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers={true}>

            <ConfiguredTextField {...textFieldProps}
              name="title"
              label="Title"
              autoFocus={true}
              required={true}
              helperText="helper text"
              maxLength={30} />

            <ConfiguredTextField {...textFieldProps}
              name="region"
              label="Link"
              maxLength={2000} />
            
            <ConfiguredRadioGroup {...radioGroupProps}
              name="is_primary"
              label="Is realty primary?"
              required={true}
              values={{
                true: "Yes",
                false: "No",
              }} />

            <ConfiguredTextField {...textFieldProps}
              name="cost"
              label="Realty cost"
              required={true}
              pattern={RegExpList.posInt}
              endAdornment="any currency" />
                  
            <ConfiguredTextField {...textFieldProps}
              name="gotkeys_month"
              label="Got keys month"
              required={true}
              pattern={RegExpList.posInt}
              endAdornment="months" />

            <ConfiguredTextField {...textFieldProps}
              name="repairing_expencies"
              label="Repairing expencies"
              required={true}
              pattern={RegExpList.posInt}
              endAdornment="any currency" />

            <ConfiguredTextField {...textFieldProps}
              name="repairing_months"
              label="Expected repairing duration"
              required={true}
              pattern={RegExpList.posInt}
              endAdornment="months" />

            <ConfiguredTextField {...textFieldProps}
              name="settling_expencies"
              label="Settling expencies"
              required={true}
              pattern={RegExpList.posInt}
              endAdornment="any currency" />

            <Box css={{ p: '40px 0 20px' }}>

              <Typography variant="h6" noWrap>
                Additional Infromation
              </Typography>

              <DialogContentText>
                Fill in basic information about realty and additional if needed.
              </DialogContentText>

              <ConfiguredTextField {...textFieldProps}
                name="area"
                label="Area"
                pattern={RegExpList.posFloat}
                endAdornment="square meters" />
              
              <ConfiguredTextField
                {...textFieldProps}
                name="subway_distance"
                label="Subway distance"
                pattern={RegExpList.posInt}
                endAdornment="minutes by feet" />

              <ConfiguredRadioGroup {...radioGroupProps}
                name="has_mall"
                label="Has shopping mall?"
                helperText="Is there any shopping mall within walking distance?"
                values={{
                  "": "Don't know",
                  true: "Yes",
                  false: "No",
                }} />

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
              disabled={!isFormChanged}>{!props.isPending ? data ? "Update" : "Create" : "Saving..."}</Button>
          </DialogActions>
          <DialogActions>
            <button onClick={(event) => putDataIntoForm(realties.realty1, event)}>Realty 1</button><br/>
            <button onClick={(event) => putDataIntoForm(realties.realty2, event)}>Incorrect</button><br/>
            <button onClick={(event) => putDataIntoForm(realties.realty3, event)}>Realty 3</button><br/>
            <button onClick={(event) => putDataIntoForm(realties.realty4, event)}>Realty 4</button><br/>
            <button onClick={(event) => putDataIntoForm(realties.realty5, event)}>Realty 5</button><br/>
            <button onClick={(event) => {event.preventDefault(); reset(defaultValues)}}>Cancel changes!</button><br/>
            <button onClick={(event) => {event.preventDefault(); reset()}}>Clear all!</button>
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
    isRealtyListUpdated: state.isRealtyListUpdated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addRealty: (...args) => dispatch(addRealty(...args)),
    updateRealty: (...args) => dispatch(updateRealty(...args)),
  };
};

SetRealty.propTypes = {
  isPending:    PropTypes.bool.isRequired,
  setIsPending: PropTypes.func.isRequired,
  handleClose:  PropTypes.func.isRequired,
  data:         PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetRealty);