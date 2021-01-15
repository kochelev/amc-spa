import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  Table: {
    tableLayout: 'fixed',
    minWidth: "100%",
    '& th': {
      fontSize: '0.6rem',
      fontWeight: 600,
      lineHeight: '0.9rem',
      textAlign: 'center',
      padding: theme.spacing(1),
      verticalAlign: 'middle',
      backgroundColor: '#d1e4fc',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      borderRight: '1px solid rgba(0, 0, 0, 0.1)',
    },
    '& td': {
      fontSize: '0.7rem',
      lineHeight: '1rem',
      textAlign: 'center',
      padding: theme.spacing(1),
      borderRight: '1px solid rgba(0, 0, 0, 0.1)',
    },
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },

  InterestRate: {
    fontSize: '0.6rem !important',
    width: '3rem',
    padding: theme.spacing(0.5),
    backgroundColor: '#f0f0f0',
  },
  MinimalPayment: {
    fontSize: '0.6rem !important',
    backgroundColor: '#f0f0f0',
    // backgroundColor: '#fffeda',
  },
  FactPayment: {
    fontWeight: 700,
    backgroundColor: '#e3ffd3',
  },
  Debt: {
    fontWeight: 700,
    backgroundColor: '#ffe3d3',
  },

  Expencies: {
    
  },
  Expency: {
    
  },
  milestone: {
    '& > td': {
      backgroundColor: '#f8ffa4',
    }
  },
}));