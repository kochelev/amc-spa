// TODO: refactor all form
// TODO: use any UI kit library

import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePrerequisites, updateAllRealties } from '../store/actions';
import { useForm } from "react-hook-form";

import Button from '@material-ui/core/Button';

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
            props.close('prerequisites');
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
      <div className="SetPrerequisites">
        <h2>Edit Prerequisites!</h2>
        {isFormChanged ? 'Changed' : 'Original'}
        {props.isPending ? 'Pending...' : null }
        <button onClick={(event) => props.close('prerequisites', event)}>closeDialog</button>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <h3>Personal Information</h3>
          
          <label>Current savings*:</label>
          <input name="current_savings" type="text" ref={register({ required: true, pattern: RegExpList.posInt })} /><span>any currency</span><br/>
          {errors.current_savings && errors.current_savings.type === "required" && (<Fragment><span>This field is required!</span><br/></Fragment>)}
          {errors.current_savings && errors.current_savings.type === "pattern" && (<Fragment><span>Doesn't fit pattern</span><br/></Fragment>)}

          <label>Month income*:</label>
          <input name="month_income" type="text" ref={register({ required: true, pattern: RegExpList.posInt })} /><span>any currency</span><br/>
          {errors.month_income && errors.month_income.type === "required" && (<Fragment><span>This field is required!</span><br/></Fragment>)}
          {errors.month_income && errors.month_income.type === "pattern" && (<Fragment><span>Doesn't fit pattern</span><br/></Fragment>)}

          <label>Month rent*:</label>
          <input name="month_rent" type="text" ref={register({ required: true, pattern: RegExpList.posInt })} /><span>any currency</span><br/>
          {errors.month_rent && errors.month_rent.type === "required" && (<Fragment><span>This field is required!</span><br/></Fragment>)}
          {errors.month_rent && errors.month_rent.type === "pattern" && (<Fragment><span>Doesn't fit pattern</span><br/></Fragment>)}
          
          <label>Deal start month*:</label>
          <input name="deal_month_start" type="text" ref={register({ required: true, pattern: RegExpList.posInt })} /><span>any currency</span><br/>
          {errors.deal_month_start && errors.deal_month_start.type === "required" && (<Fragment><span>This field is required!</span><br/></Fragment>)}
          {errors.deal_month_start && errors.deal_month_start.type === "pattern" && (<Fragment><span>Doesn't fit pattern</span><br/></Fragment>)}

          <label>Deal finish month*:</label>
          <input name="deal_month_finish" type="text" ref={register({ required: true, pattern: RegExpList.posInt })} /><span>any currency</span><br/>
          {errors.deal_month_finish && errors.deal_month_finish.type === "required" && (<Fragment><span>This field is required!</span><br/></Fragment>)}
          {errors.deal_month_finish && errors.deal_month_finish.type === "pattern" && (<Fragment><span>Doesn't fit pattern</span><br/></Fragment>)}

          <h3>Available Credit Scheme for Repairing</h3>

          <label>Interest rate*:</label>
          <input name="interest_rate" type="text" ref={register({ required: true, pattern: RegExpList.posInt })} /><span>any currency</span><br/>
          {errors.interest_rate && errors.interest_rate.type === "required" && (<Fragment><span>This field is required!</span><br/></Fragment>)}
          {errors.interest_rate && errors.interest_rate.type === "pattern" && (<Fragment><span>Doesn't fit pattern</span><br/></Fragment>)}

          <label>Total months*:</label>
          <input name="months" type="text" ref={register({ required: true, pattern: RegExpList.posInt })} /><span>any currency</span><br/>
          {errors.months && errors.months.type === "required" && (<Fragment><span>This field is required!</span><br/></Fragment>)}
          {errors.months && errors.months.type === "pattern" && (<Fragment><span>Doesn't fit pattern</span><br/></Fragment>)}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isFormChanged}>Update</Button>

          <hr/>
          <button onClick={(event) => putDataIntoForm(prerequisites.prerequisites1, event)}>Prerequisites 1</button><br/>
          <button onClick={(event) => putDataIntoForm(prerequisites.prerequisites2, event)}>Prerequisites 2</button><br/>
          <button onClick={(event) => {event.preventDefault(); reset(defaultValues)}}>Cancel changes!</button><br/>
          <button onClick={(event) => {event.preventDefault(); reset()}}>Clear all!</button>

        </form>
      </div>  
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
  isPending: PropTypes.bool.isRequired,
  setIsPending: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SetPrerequisites);