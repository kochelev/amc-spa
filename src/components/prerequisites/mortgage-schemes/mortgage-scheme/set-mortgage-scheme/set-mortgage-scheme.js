import React, { useState, useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import deepEqual from 'deep-equal';
import './set-mortgage-scheme.css';

const SetMortgageScheme = (props) => {

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

  const defaultValues = {
    title: props.scheme.title,
    initial_payment_percent: props.scheme.initial_payment_percent.toString(),
    initial_expencies: props.scheme.initial_expencies.toString(),
    schedule: scheduleConverter(props.scheme.schedule)
  }

  const [ isFormChanged, setIsFormChanged ] = useState(false);
  const [ currentFormState, setCurrentFormState ] = useState(defaultValues);
  const {
    register, unregister,
    handleSubmit, errors, reset,
    watch, setValue, getValues} = useForm({
      defaultValues,
      mode: 'onSubmit',
      criteriaMode: 'all'
  });
  
  const formValues = watch();

  useEffect(() => {
    const currentValues = getValues();
    if (deepEqual(defaultValues, currentValues)) setIsFormChanged(false);
    else setIsFormChanged(true);
  }, [formValues]); // eslint-disable-line react-hooks/exhaustive-deps
  

  const addPeriod = (event) => {
    event.preventDefault();
    const newCurrentFormState = currentFormState;
    const newPeriodId = 'period_' + Math.round(Math.random() * 10 ** 9);
    newCurrentFormState.schedule[newPeriodId] = {
      interest_rate: '',
      months: ''
    }
    setCurrentFormState(newCurrentFormState);
    register('schedule["' + newPeriodId + '"].interest_rate', { required: true });
    register('schedule["' + newPeriodId + '"].months', { required: true });
    setValue('schedule["' + newPeriodId + '"].interest_rate', '11', { shouldValidate: true });
    setValue('schedule["' + newPeriodId + '"].months', '1', { shouldValidate: true });
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
    unregister('initial_payment_percent');
    console.log('FORMDATA: ', formdata);
  }

  const RegExpList = {
    posInt: new RegExp(`^[1-9][0-9]*$`),
    posFloat: new RegExp(`^[1-9][0-9]*(.[0-9])?$|^0.[1-9]$`)
  }

  return (
    <div className="SetMortgageScheme">
      <h4>Scheme id: {props.scheme.id}</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <label>Title*:</label>
        <input name="title" type="text" ref={register({ required: true, maxLength: 100 })} /><br/>
        {errors.title && errors.title.type === "required" && (<Fragment><span>This field is required!</span><br/></Fragment>)}
        {errors.title && errors.title.type === "maxLength" && (<Fragment><span>Max length: 100 symbols</span><br/></Fragment>)}

        <label>Initial Payment*:</label>
        <input name="initial_payment_percent" type="text" ref={register({ required: true, pattern: RegExpList.posInt })} /><span>any currency</span><br/>
        {errors.initial_payment_percent && errors.initial_payment_percent.type === "required" && (<Fragment><span>This field is required!</span><br/></Fragment>)}
        {errors.initial_payment_percent && errors.initial_payment_percent.type === "pattern" && (<Fragment><span>Doesn't fit pattern</span><br/></Fragment>)}
        
        <label>Initial Expencies*:</label>
        <input name="initial_expencies" type="text" ref={register({ required: true, pattern: RegExpList.posInt })} /><span>any currency</span><br/>
        {errors.initial_expencies && errors.initial_expencies.type === "required" && (<Fragment><span>This field is required!</span><br/></Fragment>)}
        {errors.initial_expencies && errors.initial_expencies.type === "pattern" && (<Fragment><span>Doesn't fit pattern</span><br/></Fragment>)}
        
        {Object.entries(currentFormState.schedule).map(([key, period], index) => {
          return (
            <div key={key}>
              <h5>Period — key: {key} | index: {index}</h5>
              <button onClick={(event) => deletePeriod(event, key)} >Delete Period</button><br/>
              
              <label>Interest Rates*:</label>
              <input name={'schedule.' + key + '.interest_rate'}
                type="text" ref={register({ required: true, pattern: RegExpList.posFloat, maxLength: 4 })} />
              <span>any currency</span><br/>
              
              {errors && errors.schedule && errors.schedule[key] &&
                errors.schedule[key].interest_rate ?
                <ul>
                  {Object.keys(errors.schedule[key].interest_rate.types).map((k) => {
                    const errorMessages = {
                      required: 'Required!',
                      pattern: 'Does\'t fit the mask!',
                      maxLength: 'Too much characters!'
                    }
                    return (<li key={k}>{errorMessages[k]}</li>)
                  })}
                </ul>
              : null }

              <label>Months*:</label>
              <input name={'schedule.' + key + '.months'}
                type='text' ref={register({ required: true, pattern: RegExpList.posInt, max: 1200})} />
              <span>any currency</span><br/>

              {errors && errors.schedule && errors.schedule[key] &&
                errors.schedule[key].months ?
                <ul>
                  {Object.keys(errors.schedule[key].months.types).map((k) => {
                    const errorMessages = {
                      required: 'Required!',
                      pattern: 'Does\'t fit the mask!',
                      max: 'Too much months!'
                    }
                    return (<li key={k}>{errorMessages[k]}</li>)
                  })}
                </ul>
              : null }

            </div>
          )
        })}

        <button onClick={(event) => addPeriod(event)}>Add Period</button>
        
        <br/>
        <input
          type="submit"
          value="Save Changes"
          disabled={(Object.keys(errors).length > 0) || !isFormChanged} /><br/>

      </form>
    </div>
  );
}

export default SetMortgageScheme;