// TODO: refactor all form
// TODO: use any UI kit library

import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { addRealty, updateRealty } from '../../../store/actions';
import { useForm } from "react-hook-form";
import './set-realty.css';

import * as realties from '../../../testdata/realties';

const SetRealty = (props) => {

  const defaultValues = {
    title:                  props.realty ? props.realty.title : '',
    area:                   props.realty ? props.realty.area.toString() : '',
    has_mall:               props.realty ? props.realty.has_mall.toString() : '',
    subway_distance:        props.realty ? props.realty.subway_distance.toString() : '',
    region:                 props.realty ? props.realty.region : '',
    cost:                   props.realty ? props.realty.cost.toString() : '',
    is_primary:             props.realty ? props.realty.is_primary.toString() : '',
    gotkeys_month:          props.realty ? props.realty.gotkeys_month.toString() : '',
    repairing_expencies:    props.realty ? props.realty.repairing.expencies.toString() : '',
    repairing_months:       props.realty ? props.realty.repairing.months.toString() : '',
    settling_expencies:     props.realty ? props.realty.settling_expencies.toString() : ''
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
    if (!props.prerequisites) return;
    const realty = {
      'id': props.realty ? props.realty.id : Math.round(Math.random() * 10 ** 9),
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
    if (props.realty) {
        props.updateRealty(
          props.prerequisites,
          realty,
          () => {
            props.setIsPending(false);
            props.setIsSettingRealty({
              isShown: false,
              realtyId: null
            });
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
          props.setIsSettingRealty({
            isShown: false,
            realtyId: null
          });
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
      if (key === 'repairing') {
        setValue('repairing_expencies', variant.repairing.expencies, { shouldDirty: true });
        setValue('repairing_months', variant.repairing.months, { shouldDirty: true });
      }
      setValue(`${key}`, variant[key], { shouldDirty: true });
    }
  };

  const closeDialog = (event) => {
    event.preventDefault();
    props.setIsSettingRealty({
        isShown: false,
        realtyId: null
    });
  }

  const RegExpList = {
      posInt: new RegExp(`^[1-9][0-9]*$`),
      posFloat: new RegExp(`^[1-9][0-9]*(.[0-9])?$|^0.[1-9]$`)
  }

  return (
    <Fragment>
      {props.prerequisites ?
        <div className="SetRealty">
          {props.isPending ? 'Pending...' : null }
          {props.realty ? <h2>Edit Realty Form!</h2> : <h2>Add Realty Form!</h2>}
          <button onClick={(event) => closeDialog(event)}>closeDialog</button>
          <form onSubmit={handleSubmit(onSubmit)}>
            
            <label>Title*:</label>
            <input name="title" type="text" ref={register({ required: true, maxLength: 30 })} /><br/>
            {errors.title && errors.title.type === "required" && (<Fragment><span>This field is required!</span><br/></Fragment>)}
            {errors.title && errors.title.type === "maxLength" && (<Fragment><span>Max length: 30 symbols</span><br/></Fragment>)}

            <label>Area:</label>
            <input name="area" type="text" ref={register({ pattern: RegExpList.posFloat })} /><span>square meters</span><br/>
            {errors.area && errors.area.type === "pattern" && (<Fragment><span>Example: 33 or 56.4</span><br/></Fragment>)}

            <label>Has mall:</label>
            <select name="has_mall" ref={register} defaultValue="">  
              <option value="">Doesn't matter</option>
              <option value="true">Has</option>
              <option value="false">Doesn't have</option>
            </select><br/>

            <label>Subway distance:</label>
            <input name="subway_distance" type="text" ref={register({ pattern: RegExpList.posInt })} /><span>minutes by feet</span><br/>
            {errors.subway_distance && errors.subway_distance.type === "pattern" && (<Fragment><span>Doesn't fit pattern</span><br/></Fragment>)}

            <label>Region:</label>
            <input name="region" type="text" ref={register} /><br/>

            <label>Cost*:</label>
            <input name="cost" type="text" ref={register({ pattern: RegExpList.posInt })} /><span>any currency</span><br/>
            {errors.cost && errors.cost.type === "required" && (<Fragment><span>This field is required!</span><br/></Fragment>)}
            {errors.cost && errors.cost.type === "pattern" && (<Fragment><span>Doesn't fit pattern</span><br/></Fragment>)}

            <label>Type of realty*:</label>
            <select name="is_primary" ref={register({ required: true })} defaultValue="">  
              <option value="">Select type</option>
              <option value="true">Primary</option>
              <option value="false">Secondary</option>
            </select><br/>
            
            {/* Is necessary only for primary realty */}
            <label>When to recieve keys (in months):</label>
            <input name="gotkeys_month" type="text" ref={register({ pattern: RegExpList.posInt })} /><span>months</span><br/>
            {errors.gotkeys_month && errors.gotkeys_month.type === "required" && (<Fragment><span>This field is required!</span><br/></Fragment>)}
            {errors.gotkeys_month && errors.gotkeys_month.type === "pattern" && (<Fragment><span>Doesn't fit pattern</span><br/></Fragment>)}

            <label>Repairing expencies*:</label>
            <input name="repairing_expencies" type="text" ref={register({ required: true, pattern: RegExpList.posInt })} /><span>any currency</span><br/>
            {errors.repairing_expencies && errors.repairing_expencies.type === "required" && (<Fragment><span>This field is required!</span><br/></Fragment>)}
            {errors.repairing_expencies && errors.repairing_expencies.type === "pattern" && (<Fragment><span>Doesn't fit pattern</span><br/></Fragment>)}

            <label>Repairing duration in months*:</label>
            <input name="repairing_months" type="text" ref={register({ required: true, pattern: RegExpList.posInt })} /><span>months</span><br/>
            {errors.repairing_months && errors.repairing_months.type === "required" && (<Fragment><span>This field is required!</span><br/></Fragment>)}
            {errors.repairing_months && errors.repairing_months.type === "pattern" && (<Fragment><span>Doesn't fit pattern</span><br/></Fragment>)}

            <label>Settling expencies*:</label>
            <input name="settling_expencies" type="text" ref={register({ required: true, pattern: RegExpList.posInt })} /><span>any currency</span><br/>
            {errors.settling_expencies && errors.settling_expencies.type === "required" && (<Fragment><span>This field is required!</span><br/></Fragment>)}
            {errors.settling_expencies && errors.settling_expencies.type === "pattern" && (<Fragment><span>Doesn't fit pattern</span><br/></Fragment>)}

            <input
                type="submit"
                value={props.realty ? "Update" : "Create"}
                disabled={!isFormChanged} /><br/>

            <hr/>
            
            <button onClick={(event) => putDataIntoForm(realties.realty1, event)}>Realty 1</button><br/>
            <button onClick={(event) => putDataIntoForm(realties.realty2, event)}>Realty 2</button><br/>
            <button onClick={(event) => putDataIntoForm(realties.realty3, event)}>Realty 3</button><br/>
            <button onClick={(event) => putDataIntoForm(realties.realty4, event)}>Realty 4</button><br/>
            <button onClick={(event) => putDataIntoForm(realties.realty5, event)}>Realty 5</button><br/>
            <button onClick={(event) => {event.preventDefault(); reset(defaultValues)}}>Cancel changes!</button><br/>
            <button onClick={(event) => {event.preventDefault(); reset()}}>Clear all!</button>
          </form>
        </div>
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
    addRealty: (...args) => dispatch(addRealty(...args)),
    updateRealty: (...args) => dispatch(updateRealty(...args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetRealty);