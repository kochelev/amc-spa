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
        padding: theme.spacing(1),
    },
  },
  controlsColumn: {
    textAlign: 'center',
    padding: '4px !important',
    width: '113px',
  },
  expanderColumn: {
    padding: '0 !important',
    width: '60px',
  },
  description: {
    padding: 0,
    fontSize: '0.7rem',
  },
  card: {
    backgroundColor: '#FFCC00',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardActionArea: {
    borderRight: '1px solid rgba(0,0,0,0.1)'
  },
  cardContent: {
    padding: theme.spacing(1),
  },
  cardActions: {
    width: '40px',
    padding: theme.spacing(0),
  },
  bottomControls: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));