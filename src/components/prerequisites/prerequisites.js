import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { updatePrerequisites, updateAllRealties } from '../../store/actions';
import SetPrerequisites from './set-prerequisites/set-prerequisites';
import MortgageSchemes from './mortgage-schemes/mortgage-schemes';
// import './prerequisites.css';

const Prerequisites = (props) => {

  const [ isSettingPrerequisites, setIsSettingPrerequisites ] = useState(false);
  
  const setPrerequisites = (event) => {
    event.preventDefault();
    if (!props.prerequisites) return;
    setIsSettingPrerequisites(true);
  }

  const refteshRealties = (event) => {
    event.preventDefault();
    if (!props.prerequisites || props.realtyList === 0) return;
    props.setIsPending(true);
    props.updateAllRealties(props.prerequisites, props.realtyList,
      () => props.setIsPending(false),
      (error) => {
        props.setIsPending(false);
        alert(error);
      }
    );
  };

  return (
    <Fragment>

      <div className='Header'>
        <h1>Awesome Mortgage Calculator</h1>
      </div>

      { isSettingPrerequisites ? (
        <SetPrerequisites
          isPending={props.isPending}
          setIsPending={props.setIsPending}
          isSettingPrerequisites={isSettingPrerequisites}
          setIsSettingPrerequisites={setIsSettingPrerequisites} />
      ) : (
        <div className='Form'>
          <button onClick={(event) => setPrerequisites(event)}>Change prerequisites</button>
          <h4>Personal Info</h4>
          <p>Current Savings: {props.prerequisites ? props.prerequisites.personal_info.current_savings : 'None'}
            &nbsp;|&nbsp;
            Month Income: {props.prerequisites ? props.prerequisites.personal_info.month_income : 'None'}
            &nbsp;|&nbsp;
            Month Rent: {props.prerequisites ? props.prerequisites.personal_info.month_rent : 'None'}</p>
          <p>Range of months:
            &nbsp;from {props.prerequisites ? props.prerequisites.personal_info.deal_month_start : 'None'}
            &nbsp;to {props.prerequisites ? props.prerequisites.personal_info.deal_month_finish : 'None'}</p>
          <h4>Repairing credit scheme</h4>
          <p>Interest Rate: {props.prerequisites ? props.prerequisites.credit_scheme.interest_rate : 'None'}
            &nbsp;|&nbsp;Total Months: {props.prerequisites ? props.prerequisites.credit_scheme.months : 'None'}</p>
        </div>
        
      ) }
      
      {!props.isRealtyListUpdated ? (
        <button onClick={(event) => refteshRealties(event)}>REFRESH</button>
      ) : null }

      {props.isPending ? 'Pending... ALL' : null }

      <MortgageSchemes
        isPending={props.isPending}
        setIsPending={props.setIsPending} />
        
    </Fragment>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Prerequisites);