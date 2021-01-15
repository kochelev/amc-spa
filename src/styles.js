import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 260;

export default makeStyles(theme => ({
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
    borderRight: '4px solid #3f51b5',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'start',
    padding: theme.spacing(1, 1, 1, 2),
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
    // no style
  },
  footer: {
    minHeight: theme.spacing(11),
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'flex-start',
  },
  iconGitHub: {
    marginRight: theme.spacing(2),
    height: 24,
  },
  siteName: {
    fontSize: '1.6rem',
    letterSpacing: '0.12rem',
    lineHeight: '2.1rem',
  },
}));