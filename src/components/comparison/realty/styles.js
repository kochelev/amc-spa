import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& > *': {
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    borderRight: '1px solid rgba(0,0,0,0.1)'
    },
  },
  expanderColumn: {
    // padding: '15px 4px !important',
    textAlign: 'center',
    verticalAlign: 'top',
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
    height: '100%',
    minHeight: 60,
    tableLayout: 'fixed',
  },
  savePlan: {
    display: 'table-cell',
    verticalAlign: 'middle',
    backgroundColor: '#ffffe0',
  },
  creditPlan: {
    display: 'table-cell',
    verticalAlign: 'middle',
    backgroundColor: '#fff0e0',
  },
  ShortYears: {
    fontWeight: 300,
  },
  ShortMonth: {
    fontSize: '0.7rem',
  }
}));