import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePrerequisites, updateAllRealties } from '../store/actions';
import { useForm } from 'react-hook-form';
import deepEqual from 'deep-equal';

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
  
  const data = props.data ? props.data : null;

  const defaultValues = {
    title: data ? data.title : '',
    initial_payment_percent: data ? data.initial_payment_percent.toString() : '',
    initial_expencies: data ? data.initial_expencies.toString() : '',
    schedule: data ? scheduleConverter(data.schedule) : {},
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
      props.close('mortgageScheme');
      //props.setIsSettingPrerequisites(false);
    }

    if (props.realtyList && props.realtyList.length > 0) {
      afterFunction = (x) => {
        // props.setIsPending(true);
        props.updateAllRealties(x, props.realtyList,
          () => {
            // props.setIsPending(false);
            // props.setIsSettingPrerequisites(false);
            alert('close');
            props.close('mortgageScheme');
          },
          (error) => {
            // props.setIsPending(false);
            alert(error);
          }
        );
      }
    }
    props.updatePrerequisites(prerequisites, afterFunction);
  }

  const RegExpList = {
    posInt: new RegExp(`^[1-9][0-9]*$`),
    posFloat: new RegExp(`^[1-9][0-9]*(.[0-9])?$|^0.[1-9]$`)
  }

  return (
    <div className="SetMortgageScheme">
      <h4>Scheme id: {props.scheme ? props.scheme.id : '—'}</h4>
      <button onClick={(event) => props.close('mortgageScheme', event)}>Close</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <label>Title*:</label>
        <input name="title" type="text" ref={register({ required: true, maxLength: 100 })} /><br/>
        {errors.title && errors.title.type === "required" && (<Fragment><span>This field is required!</span><br/></Fragment>)}
        {errors.title && errors.title.type === "maxLength" && (<Fragment><span>Max length: 100 symbols</span><br/></Fragment>)}

        <label>Initial Payment*:</label>
        <input name="initial_payment_percent" type="text" ref={register({ required: true, pattern: RegExpList.posFloat })} /><span>any currency</span><br/>
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
  isPending: PropTypes.bool.isRequired,
  setIsPending: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  data: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(SetMortgageScheme);