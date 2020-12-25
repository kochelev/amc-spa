import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import Prerequisites from '../../components/prerequisites/prerequisites';
import Comparison from '../../components/comparison/comparison';
import Forms from '../../forms';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Home = () => {
  
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [ isPending, setIsPending ] = useState(false);
  const [ isSettingPrerequisites, setIsSettingPrerequisites ] = useState({isShown: false});
  const [ isSettingMortgageScheme, setIsSettingMortgageScheme ] = useState({isShown: false, data: null});
  const [ isSettingRealty, setIsSettingRealty ] = useState({isShown: false, data: null});

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
          <Typography variant="h6" noWrap>
            Awesome Mortgage Calculator
          </Typography>
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

        <div className={classes.drawerHeader}>
          Switch Lang
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
        
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>
        
        <div className={classes.drawerHeader} />

        <Comparison
          isPending={isPending}
          isSettingRealty={isSettingRealty}
          isSettingMortgageScheme={isSettingMortgageScheme}
          setIsPending={setIsPending}
          setIsSettingRealty={setIsSettingRealty}
          setIsSettingMortgageScheme={setIsSettingMortgageScheme} />

        <Forms
          isPending={isPending}
          isSettingPrerequisites={isSettingPrerequisites}
          isSettingRealty={isSettingRealty}
          isSettingMortgageScheme={isSettingMortgageScheme}
          setIsPending={setIsPending}
          setIsSettingPrerequisites={setIsSettingPrerequisites}
          setIsSettingRealty={setIsSettingRealty}
          setIsSettingMortgageScheme={setIsSettingMortgageScheme} />

      </main>

    </div>
  );
};

export default withRouter(Home);