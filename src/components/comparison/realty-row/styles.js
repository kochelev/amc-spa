import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& > td': {
      verticalAlign: 'top',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      borderRight: '1px solid rgba(0,0,0,0.1)'
    },
    '& > td:last-child': {
      borderRight: 'none',
    }
  },
  expanderColumn: {
    textAlign: 'center',
    verticalAlign: 'top',
    padding: theme.spacing(1) + 'px !important',
  },
  controlsColumn: {
    padding: '4px !important',
    textAlign: 'center',
    verticalAlign: 'top',
  },
  iconButton: {
    margin: theme.spacing(0.5),
  },
  plansCell: {
    padding: '0 !important',
  },
  plans: {
    display: 'table',
    width: '100%',
    minHeight: '100%',
    tableLayout: 'fixed',
  },
  plan: {
    display: 'table-cell',
    verticalAlign: 'top',
  },
  savePlan: {
    backgroundColor: '#ffffe0',
  },
  creditPlan: {
    backgroundColor: '#fff0e0',
  },
  impossible: {
    color: 'red',
    verticalAlign: 'middle !important',
  }
}));