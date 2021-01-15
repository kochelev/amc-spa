import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  table: {
    tableLayout: 'fixed',
    minWidth: "100%",
    '& th': {
        textAlign: 'center',
        padding: theme.spacing(1),
        verticalAlign: 'middle',
        backgroundColor: '#d1e4fc',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    },
    '& td': {
        textAlign: 'center',
        padding: 0,
    },
  },
  description: {
    padding: 0,
    fontSize: '0.7rem',
  },
  bottomControls: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  
  addRealtyButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },

  descriptionRow: {
    '& td': {
      fontSize: '0.65rem',
      lineHeight: '0.7rem',
      textAlign: 'center',
      padding: theme.spacing(0.5),
    },
  },
}));