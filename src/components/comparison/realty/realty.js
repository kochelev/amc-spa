import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { setDetalization } from '../../../store/actions';

// Material-UI

import Link from '@material-ui/core/Link';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ZoomOutMap from '@material-ui/icons/ZoomOutMap';
import Typography from '@material-ui/core/Typography';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

// Custom Styles

import useStyles from './styles';

const Realty = (props) => {

  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const expandPlan = (event, realtyId, schemeId, save_or_credit) => {
    event.preventDefault();
    const realty = props.realtyList.find(rlt => rlt.id === realtyId)
    props.setDetalization(
      props.prerequisites,
      realty,
      schemeId,
      save_or_credit,
      (response) => {
        props.setIsDetalizationShown({
          isShown: true,
          data: {
            prerequisites: props.prerequisites,
            realty,
            schemeId,
            save_or_credit,
            detalization: response
          }
        });
      },
      () => alert('fail'),
    )
  }

  return (
    <Fragment>
      <TableRow className={classes.root}>
        <TableCell className={classes.expanderColumn}>
          <IconButton aria-label="expand row" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
          </IconButton>
        </TableCell>
        <TableCell align="center">
          {props.realty.region ? (
            <Link variant="body2" href={props.realty.region} target="_blank">
              {props.realty.title}
            </Link>
          ) : (
            <Typography variant="subtitle2" noWrap>{props.realty.title}</Typography>
          )}
          {open ? (
            <Fragment>
              <h6>Will get keys in {props.realty.gotkeys_month} months</h6>
              <h6>Area: {props.realty.area} m<sup>2</sup></h6>
              <h6>Subway: {props.realty.subway_distance} min. by feet</h6>
              <h6>{props.realty.has_mall ? 'Yes' : 'No'} shopping mall not far</h6>
              <h6>Price: {props.realty.realty_cost}</h6>
              <h6>Repairing expencies: {props.realty.repairing.expencies} in {props.realty.repairing.months} months</h6>
              <h6>Settling expencies: {props.realty.settling_expencies} </h6>
            </Fragment>
          ) : null}
        </TableCell>
        {Object.entries(props.realty.schemes).map(([schemeId, scheme],i) => (
          <TableCell className={classes.plansCell} key={i} align="center">
            <div className={classes.plans}>
              <div className={classes.savePlan}>
                {scheme.save ?
                  <Fragment>
                    {!open ? (
                      <Fragment>
                        <Typography variant="body1"className={classes.ShortYears}>
                          <strong>{Math.round(((scheme.save.deal_month + scheme.save.total_months) / 12) * 100) / 100}</strong> y.
                        </Typography>
                        <Typography variant="body2" className={classes.ShortMonth}>
                          from <strong>{scheme.save.deal_month}</strong> m.
                        </Typography>

                        <IconButton
                          aria-label="expand"
                          onClick={(event) => expandPlan(event, props.realty.id, schemeId, 'save')}>
                            <ZoomOutMap fontSize="small" />
                        </IconButton>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <h5>If you are going to save money for repairing,
                          you'd better save some money for initial payment before and start mortgage on <strong>{scheme.save.deal_month}</strong> month.
                          You'll be totally free in <strong>{Math.round(((scheme.save.deal_month + scheme.save.total_months) / 12) * 100) / 100}</strong> years</h5>
                        <h6>Mortgage will take {Math.round(scheme.save.years * 100) / 100} years</h6>
                        <h6>Initial payment should be {scheme.save.initial_payment} (any currency)</h6>
                        <h6>Initial mortgage deabt will be {scheme.save.initial_debt} (any currency)</h6>
                        
                        <IconButton
                          aria-label="expand"
                          onClick={(event) => expandPlan(event, props.realty.id, schemeId, 'save')}>
                            <ZoomOutMap fontSize="small" />
                        </IconButton>
                      </Fragment>
                    )}
                  </Fragment>
                : 'X'}
              </div>
              <div className={classes.creditPlan}>
                {scheme.credit ?
                  <Fragment>
                    {!open ? (
                      <Fragment>
                        <Typography variant="body1"className={classes.ShortYears}>
                          <strong>{Math.round(((scheme.credit.deal_month + scheme.credit.total_months) / 12) * 100) / 100}</strong> y.
                        </Typography>
                        <Typography variant="body2" className={classes.ShortMonth}>
                          from <strong>{scheme.credit.deal_month}</strong> m.
                        </Typography>
                        
                        <IconButton
                          aria-label="expand"
                          onClick={(event) => expandPlan(event, props.realty.id, schemeId, 'credit')}>
                            <ZoomOutMap fontSize="small" />
                        </IconButton>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <h5>If you are going to take a credit for repairing,
                          you'd better some money for initial payment before and start mortgage on <strong>{scheme.credit.deal_month}</strong> month.
                          You'll be totally free in <strong>{Math.round(((scheme.credit.deal_month + scheme.credit.total_months) / 12) * 100) / 100}</strong> years</h5>
                        <h6>Mortgage will take {Math.round(scheme.credit.years * 100) / 100} years</h6>
                        <h6>Repairing credit will take {Math.round(scheme.credit.credit_period * 100) / 100} years</h6>
                        <h6>Initial payment should be {scheme.credit.initial_payment} (any currency)</h6>
                        <h6>Initial mortgage deabt will be {scheme.credit.initial_debt} (any currency)</h6>
                        
                        <IconButton
                          aria-label="expand"
                          onClick={(event) => expandPlan(event, props.realty.id, schemeId, 'credit')}>
                            <ZoomOutMap fontSize="small" />
                        </IconButton>
                      </Fragment>
                    )}
                  </Fragment>
                : 'X'}
              </div>
            </div>
          </TableCell>
        ))}
        <TableCell className={classes.controlsColumn}>
          <IconButton
            className={classes.iconButton}
            aria-label="delete"
            onClick={(event) => props.setRealty(event, props.realty.id)}
            disabled={props.isSettingRealty.isShown}>
              <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            aria-label="delete"
            onClick={(event) => props.deleteRealty(event, props.realty.id)}
            disabled={props.isSettingRealty.isShown}>
              <DeleteIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    prerequisites: state.prerequisites,
    realtyList: state.realtyList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDetalization: (...args) => dispatch(setDetalization(...args)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Realty);