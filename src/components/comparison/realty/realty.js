import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Link from '@material-ui/core/Link';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const useRowStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      borderRight: '1px solid rgba(0,0,0,0.1)'
    },
  },
  expanderColumn: {
    padding: '15px 4px !important',
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
  }
}));

const Realty = (props) => {

  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  return (
    <Fragment>
      <TableRow className={classes.root}>
        <TableCell className={classes.expanderColumn}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
              <h6>Ключи через {props.realty.gotkeys_month} мес.</h6>
              <h6>{props.realty.area} м<sup>2</sup></h6>
              <h6>До метро {props.realty.subway_distance} мин пеш.</h6>
              <h6>{props.realty.has_mall ? 'Есть' : 'Нет'} ТЦ рядом</h6>
              <h6>Цена: {props.realty.realty_cost} р.</h6>
              <h6>Ремонт за {props.realty.repairing.months} мес. {props.realty.repairing.expencies} р.</h6>
              <h6>На заселение {props.realty.settling_expencies} р.</h6>
            </Fragment>
          ) : null}
        </TableCell>
        {Object.entries(props.realty.schemes).map(([x, scheme],i) => (
          <TableCell key={i} align="center">
            <Fragment>
              <div className='SaveMoney Plan'>
                {scheme.save ?
                  <Fragment>
                    <h6>{Math.round(((scheme.save.deal_month + scheme.save.total_months) / 12) * 100) / 100} years
                      &nbsp;| Start in {scheme.save.deal_month} months</h6>
                    {open ? (
                      <Fragment>
                        <h5>Если копить: {Math.round(((scheme.save.deal_month + scheme.save.total_months) / 12) * 100) / 100} года (лет)</h5>
                        <h6>Лучший месяц для сделки: {scheme.save.deal_month}</h6>
                        <h6>Всего лет ипотеки: {Math.round(scheme.save.years * 100) / 100} </h6>
                        <h6>Ожидаемый первый взнос: {scheme.save.initial_payment}</h6>
                        <h6>Сумма ипотеки: {scheme.save.initial_debt}</h6>
                        {/* <button onClick={(event) => detalize(event, realty.id, x, 'save')}>Детализация</button> */}
                      </Fragment>
                    ) : null}
                  </Fragment>
                : 'X'}
              </div>
              <Divider />
              <div className='GetCredit Plan'>
                {scheme.credit ?
                  <Fragment>
                    Месяц: {scheme.credit.deal_month} | &nbsp;
                      Лет: {Math.round(((scheme.credit.deal_month + scheme.credit.total_months) / 12) * 100) / 100}
                    {open ? (
                      <Fragment>
                        <h5>Если брать кредит: {Math.round(((scheme.credit.deal_month + scheme.credit.total_months) / 12) * 100) / 100} года (лет)</h5>
                        <h6>Лучший месяц для сделки: {scheme.credit.deal_month}</h6>
                        <h6>Всего лет ипотеки: {Math.round(scheme.credit.years * 100) / 100}</h6>
                        <h6>Кредит будет выплачен: {Math.round(scheme.credit.credit_period * 100) / 100}</h6>
                        <h6>Ожидаемый первый взнос: {scheme.credit.initial_payment}</h6>
                        <h6>Сумма ипотеки: {scheme.credit.initial_debt}</h6>
                        {/* <button onClick={(event) => detalize(event, realty.id, x, 'credit')}>Детализация</button> */}
                      </Fragment>
                    ) : null}
                  </Fragment>
                : 'X'}
              </div>
            </Fragment>
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
    prerequisites: state.prerequisites
  };
};

export default connect(mapStateToProps, null)(Realty);