import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { setDetalization, clearDetalization } from '../../store/actions';

// Material-UI

import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

// Custom Styles

import useStyles from './styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Detalization = (props) => {
  
  const classes = useStyles();

  const data = props.isDetalizationShown.data ? props.isDetalizationShown.data : null;

  const handleClose = () => {
    props.clearDetalization();
    props.setIsDetalizationShown({isShown: false, data: null});
  };

  return (
    <Fragment>
      <Dialog fullScreen open={props.isDetalizationShown.isShown} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Sound:{props.isDetalizationShown.data ? 
              ' ' + props.isDetalizationShown.data.realtyId +
              ' ' + props.isDetalizationShown.data.schemeId +
              ' ' + props.isDetalizationShown.data.save_or_credit
              : null}
            </Typography>
            <Button color="inherit" onClick={() => alert('Download CSV')}>
              Download
            </Button>
          </Toolbar>
        </AppBar>
        {props.detalization ? (
        <TableContainer className={classes.Table} component={Paper} elevation={0} square>
          <Table className={classes.table} size="small" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell>Income</TableCell>
                <TableCell>Rent expencies</TableCell>
                <TableCell>Save</TableCell>
                <TableCell>Total savings</TableCell>
                
                <TableCell>Int.r.</TableCell>
                <TableCell>Mortgage minimal payment</TableCell>
                <TableCell>Mortgage fact payment</TableCell>
                <TableCell>Mortgage debt</TableCell>
                
                <TableCell>Int.r.</TableCell>
                <TableCell>Credit minimal payment</TableCell>
                <TableCell>Credit fact payment</TableCell>
                <TableCell>Credit debt</TableCell>
                
                <TableCell>Expencies</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.detalization.map(month => (
              <TableRow key={month.id}>
                <TableCell>{month.month}</TableCell>
                <TableCell>+{month.earn}</TableCell>
                <TableCell>
                    {month.rent !== 0 ? '-' : null}{month.rent}
                </TableCell>
                <TableCell>{Math.round(month.save)}</TableCell>
                <TableCell>{Math.round(month.savings)}</TableCell>
                
                {month.debts && month.debts['Mortgage'] ? (
                  <Fragment>
                    <TableCell className={classes.InterestRate}>
                      {month.debts['Mortgage'].interest_rate + '\u2009%'}
                    </TableCell>
                    <TableCell className={classes.MinimalPayment}>
                      {Math.round(month.debts['Mortgage'].min_payment)}
                    </TableCell>
                    <TableCell className={classes.FactPayment}>
                      {Math.round(month.debts['Mortgage'].payment)}
                    </TableCell>
                    <TableCell className={classes.Debt}>
                      {Math.round(month.debts['Mortgage'].debt)}
                    </TableCell>
                  </Fragment>
                ) : (
                  <Fragment>
                    <TableCell>—</TableCell>
                    <TableCell>—</TableCell>
                    <TableCell>—</TableCell>
                    <TableCell>—</TableCell>
                  </Fragment>
                )}

                {month.debts && month.debts['Repairing'] ? (
                  <Fragment>
                    <TableCell className={classes.InterestRate}>
                      {month.debts['Repairing'].interest_rate + '\u2009%'}
                    </TableCell>
                    <TableCell className={classes.MinimalPayment}>
                      {Math.round(month.debts['Repairing'].min_payment)}
                    </TableCell>
                    <TableCell className={classes.FactPayment}>
                      {Math.round(month.debts['Repairing'].payment)}
                    </TableCell>
                    <TableCell className={classes.Debt}>
                      {Math.round(month.debts['Repairing'].debt)}
                    </TableCell>
                    
                  </Fragment>
                ) : (
                  <Fragment>
                    <TableCell>—</TableCell>
                    <TableCell>—</TableCell>
                    <TableCell>—</TableCell>
                    <TableCell>—</TableCell>
                  </Fragment>
                )}
                
                <TableCell className={classes.Expencies}>
                  {month.expencies && month.expencies['buy_realty'] ?
                    <Box className={classes.Expency}><strong>Realty:</strong> {month.expencies['buy_realty']}</Box>
                  : null}
                  {month.expencies && month.expencies['mortgage_insurance'] ?
                    <Box className={classes.Expency}><strong>Insurance:</strong> {month.expencies['mortgage_insurance']}</Box>
                  : null}
                  {month.expencies && month.expencies['repairing'] ?
                    <Box className={classes.Expency}><strong>Repairing:</strong> {month.expencies['repairing']}</Box>
                  : null}
                  {month.expencies && month.expencies['settling'] ?
                    <Box className={classes.Expency}><strong>Settling:</strong> {month.expencies['settling']}</Box>
                  : null}
                  {!month.expencies || (month.expencies && Object.keys(month.expencies).length === 0) ?
                    '—'
                  : null}
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        ) : 'Nothing'}
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    prerequisites: state.prerequisites,
    realtyList: state.realtyList,
    detalization: state.detalization,
    isRealtyListUpdated: state.isRealtyListUpdated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDetalization: (...args) => dispatch(setDetalization(...args)),
    clearDetalization: (...args) => dispatch(clearDetalization(...args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detalization);