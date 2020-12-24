import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { init, updatePrerequisites } from './store/actions';
import Comparison from './components/comparison/comparison';
import Prerequisites from './components/prerequisites/prerequisites';
// import Detalization from './components/detalization/detalization';
import defaultPrerequisites from './defaults/defaultPrerequisites';
import './App.css';

const App = (props) => {

  const [ isPending, setIsPending ] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('amc')) {
      // SHOULD CHECK THE DATA AND IF IT'S NOT APPROPRIATE - CLEAR IT
      props.init(JSON.parse(sessionStorage.getItem('amc')), null);
    } else {
      props.updatePrerequisites(defaultPrerequisites, null);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  const home = () => {
    return (
      <div className="App">
        <main className="App-main">
          <div className='Sidebar Column'>
            <Prerequisites
              isPending={isPending}
              setIsPending={setIsPending} />
          </div>
          <div className='Comparison Column'>
            {!props.detalization ? 'No detalization' : null }
            <Comparison
              isPending={isPending}
              setIsPending={setIsPending} />
          </div>
        </main>
      </div>
    )
  };

  const notFound = () => {
    return (
      <div>
          <h1>404</h1>
      </div>
    );
  };

  return (
    <Switch>
      <Route path='/' exact render={() => home()} />
      <Route render={() => notFound()} />
    </Switch>
  );
};

const mapStateToProps = state => {
  return {
    state: state,
    prerequisites: state.prerequisites
  };
};

const mapDispatchToProps = dispatch => {
  return {
    init: (...args) => dispatch(init(...args)),
    updatePrerequisites: (...args) => dispatch(updatePrerequisites(...args))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));