// TODO: check data from SessionStorage before do something

import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { init, updatePrerequisites } from './store/actions';
import defaultPrerequisites from './defaults/defaultPrerequisites';
import Home from './routes/home/home';
import NotFound from './routes/notFound/notFound';

const App = (props) => {

  useEffect(() => {
    if (sessionStorage.getItem('amc')) {
      props.init(JSON.parse(sessionStorage.getItem('amc')), null);
    } else {
      props.updatePrerequisites(defaultPrerequisites, null);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Switch>
      <Route path='/' exact render={() => <Home />} />
      <Route render={() => <NotFound />} />
    </Switch>
  );
};

const mapStateToProps = state => {
  return {
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