import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { clearData, clearComparison, clearDetalization } from '../../store/actions';
import './dataform.css';

const dataform = (props) => {
  const clearDataform = (event) => {
    event.preventDefault();
    props.clearDetalization();
    props.clearComparison();
    props.clearData();
  }
  return (
    <Fragment>
      <div className='Dataform'>
        <button onClick={(event) => clearDataform(event)}>Закрыть</button>

      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    detalization: state.detalization
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearDetalization: () => dispatch(clearDetalization())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(dataform);