import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { setDetalization } from '../../../store/actions';
import clsx from 'clsx';

// Material-UI

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

// Custom Components

import PlanShortPreview from './subcomponents/plan-short-preview';
import PlanFullPreview from './subcomponents/plan-full-preview';
import RealtyShortDescription from './subcomponents/realty-short-description';
import RealtyFullDescription from './subcomponents/realty-full-description';

// Custom Styles

import useStyles from './styles';

const RealtyRow = (props) => {

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
        
        <TableCell>

          <RealtyShortDescription
            realty={props.realty}
            setRealtyHandler={(event) => props.setRealty(event, props.realty.id)}
            deleteRealtyHandler={(event) => props.deleteRealty(event, props.realty.id)}
            isSettingRealtyShown={props.isSettingRealty.isShown}/>

          {open ?
            <RealtyFullDescription
              realty={props.realty} />
          : null}
          
        </TableCell>

        {props.prerequisites.mortgage_schemes.map((scheme, i) => (
          props.realty.schemes[scheme.id] ? (
            <Fragment>
              <TableCell
                className={clsx(
                  classes.plan,
                  classes.savePlan,
                  !props.realty.schemes[scheme.id].save && classes.impossible)}>
                
                    {props.realty.schemes[scheme.id].save ? (
                    
                      <Fragment>
                        
                        <PlanShortPreview
                          plan={props.realty.schemes[scheme.id].save}
                          clickHandler={(event) => expandPlan(event, props.realty.id, scheme.id, 'save')}/>
                    
                        {open ? 

                          <PlanFullPreview
                            isSave={true}
                            plan={props.realty.schemes[scheme.id].save} />

                        : null}

                      </Fragment>
                    
                    ) : 'X'}

              </TableCell>
              <TableCell
                className={clsx(
                  classes.plan,
                  classes.creditPlan,
                  !props.realty.schemes[scheme.id].credit && classes.impossible)}>
                
                    {props.realty.schemes[scheme.id].credit ? (
                    
                      <Fragment>
                        
                      <PlanShortPreview
                        plan={props.realty.schemes[scheme.id].credit}
                        clickHandler={(event) => expandPlan(event, props.realty.id, scheme.id, 'credit')}/>
                
                        {open ? 

                          <PlanFullPreview
                            isSave={false}
                            plan={props.realty.schemes[scheme.id].credit} />

                        : null}

                      </Fragment>
                    
                    ) : 'X'}

              </TableCell>
            </Fragment>
          ) : (
            <TableCell colSpan={2}>Loading ...</TableCell>
          )
        ))}
        
        <TableCell className={classes.expanderColumn}>
          <IconButton aria-label="expand row" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
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

export default connect(mapStateToProps, mapDispatchToProps)(RealtyRow);