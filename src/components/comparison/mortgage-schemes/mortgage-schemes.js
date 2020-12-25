import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MortgageScheme from './mortgage-scheme/mortgage-scheme';
import TableCell from '@material-ui/core/TableCell';

const MortgageSchemes = (props) => {

  const [ isLastMortgageScheme, setIsLastMortgageScheme ] = useState(false);

  useEffect(() => {
    if (props.prerequisites) {
      setIsLastMortgageScheme(props.prerequisites.mortgage_schemes.length < 2);
    }
  }, [props.prerequisites]); // eslint-disable-line react-hooks/exhaustive-deps
  
  const addMortgageScheme = (event) => {
    event.preventDefault();
    props.setIsSettingMortgageScheme({
      ...props.setIsSettingMortgageScheme,
      isShown: true
    });
  }
  const editMortgageScheme = (event, scheme) => {
    event.preventDefault();
    alert('Edit Scheme');
  }

  const closeWindow = (event = null) => {
    if (event) event.preventDefault();
    props.setIsSettingMortgageScheme({
      ...props.setIsSettingMortgageScheme,
      isShown: false
    });
  }

  return (
    <Fragment>
      <TableCell>
        <button
          onClick={(event) => addMortgageScheme(event)}
          disabled={props.isSettingMortgageScheme.isShown}>Add Mortgage Scheme</button>
      </TableCell>
      {props.prerequisites ?
        props.prerequisites.mortgage_schemes.map((scheme) => {
          return (
            <TableCell align="center">
              <button
                onClick={(event) => editMortgageScheme(event, props.scheme)}
                disabled={props.isSettingMortgageScheme.isShown}>{scheme.title}</button>
            </TableCell>
          );
        })
      : null}
    </Fragment>
  );

  // return (
  //   <div className="MortgageSchemes">
  //     {props.prerequisites ?
  //       <h4>Is last: {isLastMortgageScheme.toString()}</h4>
  //     : null}
  //     {props.prerequisites ? props.prerequisites.mortgage_schemes.map((scheme) => {
  //       return (
  //         <MortgageScheme
  //           key={scheme.id}
  //           scheme={scheme}
  //           isLastMortgageScheme={isLastMortgageScheme} />
  //       )
  //     })
  //     : 'Loading mortgage schemes...' }
  //     <button onClick={(event) => addMortgageScheme(event)}>Add Mortgage Scheme</button>
  //     {isAddingMortgageScheme ?
  //       <Fragment>
  //         <button onClick={(event) => closeWindow(event)}>Close</button>
  //         <SetMortgageScheme
  //           isOpened={isAddingMortgageScheme}
  //           close={(event) => closeWindow(event)} />
  //       </Fragment>
  //     : null}
  //   </div>
  // );
}

const mapStateToProps = state => {
  return {
    prerequisites: state.prerequisites,
    realtyList: state.realtyList,
    isRealtyListUpdated: state.isRealtyListUpdated,
  };
};

export default connect(mapStateToProps, null)(MortgageSchemes);