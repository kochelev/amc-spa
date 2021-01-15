import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& > th': {
      textAlign: 'center',
      verticalAlign: 'middle',
      padding: theme.spacing(1),
      borderBottom: '1px solid rgba(0,0,0,0.3)',
      borderRight: '1px solid rgba(0,0,0,0.2)'
    },
    '& > th:first-child': {
      fontSize: '1rem',
      textAlign: 'left',
      width: 230,
      paddingLeft: theme.spacing(2) + 'px !important',
    },
    '& > th:last-child': {
      width: 60,
      paddingRight: theme.spacing(1),
      borderRight: 'none',
    },
  },
  mortgage: {
    padding: '0 !important',
  },
}));