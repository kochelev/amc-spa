import React, { useState, Fragment } from 'react';
import SetMortgageScheme from './set-mortgage-scheme/set-mortgage-scheme';

const MortgageScheme = (props) => {

  const [ isSettingMortgageScheme, setIsSettingMortgageScheme ] = useState(false);

  const deleteMortgageScheme = (event, id) => {
    event.preventDefault();
    alert('Delete');

    // const x = props.prerequisites.mortgage_schemes.filter((element) => element.id !== id);
    // const updatedPerequisites = {
    //   ...props.prerequisites,
    //   mortgage_schemes: x
    // }

    // let afterFunction = () => {
    //   console.log('close without request');
    //   // props.setIsSettingPrerequisites(false);
    // }

    // if (props.realtyList && props.realtyList.length > 0) {
    //   afterFunction = (x) => {
    //     props.setIsPending(true);
    //     props.updateAllRealties(x, props.realtyList,
    //       () => {
    //         props.setIsPending(false);
    //         // props.setIsSettingPrerequisites(false);
    //         console.log('close with request');
    //       },
    //       (error) => {
    //         props.setIsPending(false);
    //         alert(error);
    //       }
    //     );
    //   }
    // }
    // props.updatePrerequisites(updatedPerequisites, afterFunction);
  }

  const editMortgageScheme = (event) => {
    event.preventDefault();
    setIsSettingMortgageScheme(true);
  }

  if (isSettingMortgageScheme) {
    return (
      <Fragment>
        <button onClick={(event) => {setIsSettingMortgageScheme(false)}} >Close</button><br/>
        <SetMortgageScheme
          scheme={props.scheme} />
      </Fragment>
    )
  }
    
  return (
    <div className="MortgageScheme">
      <h4>Scheme id: {props.scheme.id}</h4>
      <button onClick={(event) => deleteMortgageScheme(event, props.scheme.id)} disabled={props.isLastMortgageScheme}>Delete Scheme</button>
      &nbsp;There is only one scheme: <strong>{props.isLastMortgageScheme.toString()}</strong>
      
      <button onClick={(event) => editMortgageScheme(event, props.scheme)} >Edit Mortgage Scheme</button><br/>

      <p>Title: {props.scheme.title}</p>
      <p>Initial Payment: {props.scheme.initial_payment_percent}</p>
      <p>Initial Expencies: {props.scheme.initial_expencies}</p>
        
      {Object.entries(props.scheme.schedule).map(([key, period], index) => {
        return (
          <div key={key}>
            <h5>Period — key: {key} | index: {index}</h5>
            <p>Interest Rate: {period.interest_rate}</p>
            <p>Months: {period.months}</p>
          </div>
        )
      })}
    </div>
  );
}

export default MortgageScheme;