import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MortgageScheme from './mortgage-scheme/mortgage-scheme';

const MortgageSchemes = (props) => {

  const [ isLastMortgageScheme, setIsLastMortgageScheme ] = useState(false);

  useEffect(() => {
    if (props.prerequisites) {
      setIsLastMortgageScheme(props.prerequisites.mortgage_schemes.length < 2);
    }
  }, [props.prerequisites]); // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <div className="MortgageSchemes">
      {props.prerequisites ?
        <h4>Is last: {isLastMortgageScheme.toString()}</h4>
      : null}
      {props.prerequisites ? props.prerequisites.mortgage_schemes.map((scheme) => {
        return (
          <MortgageScheme
            key={scheme.id}
            scheme={scheme}
            isLastMortgageScheme={isLastMortgageScheme} />
        )
      })
      : 'Loading mortgage schemes...' }
      
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

export default connect(mapStateToProps, null)(MortgageSchemes);