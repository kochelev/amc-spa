import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import clsx from 'clsx';

// Material-UI

import { makeStyles, useTheme } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

// Custom Components

import Prerequisites from '../../components/prerequisites/prerequisites';
import Comparison from '../../components/comparison/comparison';
import Forms from '../../forms';
import Plug from '../../components/comparison/plug/plug';

const drawerWidth = 260;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
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
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    paddingRight: theme.spacing(1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    display: 'flex',
    minHeight: '100%',
    justifyContent: 'space-between',
    flexDirection: "column",
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  contentWrapper: {

  },
  footer: {
    minHeight: theme.spacing(11),
    padding: theme.spacing(2),
  }
}));

const Home = (props) => {
  
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
          <Typography variant="h5" noWrap>
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

        <Box className={classes.contentWrapper}>
          
          <div className={classes.drawerHeader}>
            <ButtonGroup size="small" color="primary" aria-label="small outlined primary button group">
              <Button disabled>Eng</Button>
              <Button disabled>Рус</Button>
              <Button disabled>中文</Button>
            </ButtonGroup>
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
          GitHub links, Copyright...
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
            setIsPending={setIsPending}
            setIsSettingRealty={setIsSettingRealty}
            setIsSettingMortgageScheme={setIsSettingMortgageScheme} />
        </div>

        {!props.realtyList || props.realtyList.length === 0 ?
          <Plug />
        : null}

        <Box className={classes.footer}>
          lksjdfkljs
        </Box>

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

const mapStateToProps = state => {
  return {
    realtyList: state.realtyList,
  };
};

export default connect(mapStateToProps, null)(withRouter(Home));