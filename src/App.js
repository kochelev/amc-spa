// TODO: check data from SessionStorage before do something

import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { init, updatePrerequisites } from './store/actions';
import clsx from 'clsx';

// Material-UI

import { useTheme } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import GitHubIcon from '@material-ui/icons/GitHub';
import Link from '@material-ui/core/Link';

// Custom Components

import Prerequisites from './components/prerequisites/prerequisites';
import Comparison from './components/comparison/comparison';
import Detalization from './components/detalization/detalization';
import Forms from './forms';
import Plug from './components/plug/plug';
import defaultPrerequisites from './defaults/defaultPrerequisites';

// Custum Styles

import useStyles from './styles';

const App = (props) => {

  useEffect(() => {
    if (sessionStorage.getItem('amc')) {
      props.init(JSON.parse(sessionStorage.getItem('amc')), null);
    } else {
      props.updatePrerequisites(defaultPrerequisites, null);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const Home = () => {
  
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
  
    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);
  
    const [ isPending, setIsPending ] = useState(false);
    const [ isSettingPrerequisites, setIsSettingPrerequisites ] = useState({isShown: false});
    const [ isSettingMortgageScheme, setIsSettingMortgageScheme ] = useState({isShown: false, data: null});
    const [ isSettingRealty, setIsSettingRealty ] = useState({isShown: false, data: null});
    const [ isDetalizationShown, setIsDetalizationShown ] = useState({isShown: false, data: null});
  
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          elevation={0}
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}>
          
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}>
              
              <ChevronRightIcon />
            </IconButton>
  
              <ButtonGroup size="small" color="primary" aria-label="small outlined primary button group">
                <Button disabled>Eng</Button>
                <Button disabled>Рус</Button>
                <Button disabled>中文</Button>
              </ButtonGroup>
  
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}>
  
          <Box className={classes.contentWrapper}>
            <div className={classes.drawerHeader}>
  
              <Typography variant="h5">
                Mortgage<br/>Calculator ++
              </Typography>
              
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
              
            </div>

            <Divider />
            
            <Prerequisites
              isPending={isPending}
              isSettingPrerequisites={isSettingPrerequisites}
              setIsPending={setIsPending}
              setIsSettingPrerequisites={setIsSettingPrerequisites} />
          
          </Box>
  
          <Box className={classes.footer}>
            <Link
              href="https://github.com/kochelev"
              color="inherit"
              target="_blank"
              className={classes.iconGitHub} >
              <GitHubIcon />
            </Link>
            <Typography variant="body2">&copy; Kochelev N.</Typography>
          </Box>
          
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}>
          
          <div className={classes.contenWrapper}>
            <div className={classes.drawerHeader} />
            <Comparison
              isPending={isPending}
              isSettingRealty={isSettingRealty}
              isSettingMortgageScheme={isSettingMortgageScheme}
              isDetalizationShown={isDetalizationShown}
              setIsPending={setIsPending}
              setIsSettingRealty={setIsSettingRealty}
              setIsSettingMortgageScheme={setIsSettingMortgageScheme}
              setIsDetalizationShown={setIsDetalizationShown} />
          </div>
          {props.realtyList.lenght}
          {!props.realtyList || props.realtyList.length === 0 ?
            <Plug />
          : null}
  
          <Box className={classes.footer}>
            dfasdf
          </Box>
  
        </main>
        <Forms
          isPending={isPending}
          isSettingPrerequisites={isSettingPrerequisites}
          isSettingRealty={isSettingRealty}
          isSettingMortgageScheme={isSettingMortgageScheme}
          setIsPending={setIsPending}
          setIsSettingPrerequisites={setIsSettingPrerequisites}
          setIsSettingRealty={setIsSettingRealty}
          setIsSettingMortgageScheme={setIsSettingMortgageScheme} />

        <Detalization
          isDetalizationShown={isDetalizationShown}
          setIsDetalizationShown={setIsDetalizationShown} />

      </div>
    );
  };

  return (
    <Switch>
      <Route path='/' exact render={() => <Home />} />
      <Route render={() => <Redirect to="/" /> } />
    </Switch>
  );

};

const mapStateToProps = state => {
  return {
    prerequisites: state.prerequisites,
    realtyList: state.realtyList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    init: (...args) => dispatch(init(...args)),
    updatePrerequisites: (...args) => dispatch(updatePrerequisites(...args)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));