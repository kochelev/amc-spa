import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const Realty = (props) => {

  return (
    <Fragment>
    <TableRow>
      <TableCell align="left">
        <h5>{props.realty.title}</h5>
        <h6>Ключи через {props.realty.gotkeys_month} мес.</h6>
        <h6>{props.realty.area} м<sup>2</sup></h6>
        <h6>До метро {props.realty.subway_distance} мин пеш.</h6>
        <h6>{props.realty.has_mall ? 'Есть' : 'Нет'} ТЦ рядом</h6>
        <h6>Цена: {props.realty.realty_cost} р.</h6>
        <h6>Регион: {props.realty.region}</h6>
        <h6>Ремонт за {props.realty.repairing.months} мес. {props.realty.repairing.expencies} р.</h6>
        <h6>На заселение {props.realty.settling_expencies} р.</h6>
        <button onClick={(event) => props.deleteRealty(event, props.realty.id)}>X</button>
        <button onClick={(event) => props.setRealty(event, props.realty.id)} disabled={props.isSettingRealty.isShown}>Edit</button>
      </TableCell>

      {Object.entries(props.realty.schemes).map(([x, scheme],i) => (
        <TableCell key={i} align="center">
          <div className='SaveMoney Plan'>
            {scheme.save ?
            <div>
                <h5>Если копить: {Math.round(((scheme.save.deal_month + scheme.save.total_months) / 12) * 100) / 100} года (лет)</h5>
                <h6>Лучший месяц для сделки: {scheme.save.deal_month}</h6>
                <h6>Всего лет ипотеки: {Math.round(scheme.save.years * 100) / 100} </h6>
                <h6>Ожидаемый первый взнос: {scheme.save.initial_payment}</h6>
                <h6>Сумма ипотеки: {scheme.save.initial_debt}</h6>
                {/* <button onClick={(event) => detalize(event, realty.id, x, 'save')}>Детализация</button> */}
            </div>
            : 'X'}
          </div>
          <div className='GetCredit Plan'>
            {scheme.credit ?
            <div>
                <h5>Если брать кредит: {Math.round(((scheme.credit.deal_month + scheme.credit.total_months) / 12) * 100) / 100} года (лет)</h5>
                <h6>Лучший месяц для сделки: {scheme.credit.deal_month}</h6>
                <h6>Всего лет ипотеки: {Math.round(scheme.credit.years * 100) / 100}</h6>
                <h6>Кредит будет выплачен: {Math.round(scheme.credit.credit_period * 100) / 100}</h6>
                <h6>Ожидаемый первый взнос: {scheme.credit.initial_payment}</h6>
                <h6>Сумма ипотеки: {scheme.credit.initial_debt}</h6>
                {/* <button onClick={(event) => detalize(event, realty.id, x, 'credit')}>Детализация</button> */}
            </div>
            : 'X'}
          </div>
        </TableCell>
        ))}
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