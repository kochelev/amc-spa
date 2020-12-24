import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteRealty, deleteAllRealties } from '../../store/actions';
import SetRealty from './set-realty/set-realty';
import realtySifter from '../../helpers/realtySifter';
import './comparison.css';

const Comparison = (props) => {
  
  // isPending is inherited from parent!
  const [ isSettingRealty, setIsSettingRealty ] = useState({
    isShown: false,
    realty: null
  });
  
  const setRealty = (event, id = null) => {
    event.preventDefault();
    if (!props.prerequisites) return;
    setIsSettingRealty({
      isShown: true,
      realty: id ? realtySifter(props.realtyList.find(element => element.id === id)) : null
    });
  }

  const deleteRealty = (event, id) => {
    event.preventDefault();
    props.deleteRealty(id);
  }

  const deleteAllRealties = (event) => {
    event.preventDefault();
    if (props.realtyList.length === 0) return;
    props.deleteAllRealties();
  }

  return (
    <Fragment>
      {props.isPending ? 'Pending...' : null }
      {!props.isRealtyListUpdated ? (
        <h3>LIST NOT UPDATED</h3>
      ) : null }
      {props.realtyList && props.realtyList.length > 1 ?
        <button onClick={(event) => deleteAllRealties(event)}>Удалить все варианты</button>
      : null }
      <div className='ComparisonList'>
      {props.realtyList && props.realtyList.length > 0 ?
        props.realtyList.map(realty => (
          <div className='ComparisonListElement'
            key={realty.id}>

              <button onClick={(event) => deleteRealty(event, realty.id)}>X</button>
              { !isSettingRealty.isShown ?
                (<button onClick={(event) => setRealty(event, realty.id)}>Edit</button>)
                : null }
              <div className='RealtyDescription'>
              <h5>{realty.title}</h5>
              <h6>Ключи через {realty.gotkeys_month} мес.</h6>
              <h6>{realty.area} м<sup>2</sup></h6>
              <h6>До метро {realty.subway_distance} мин пеш.</h6>
              <h6>{realty.has_mall ? 'Есть' : 'Нет'} ТЦ рядом</h6>
              <h6>Цена: {realty.realty_cost} р.</h6>
              <h6>Регион: {realty.region}</h6>
              <h6>Ремонт за {realty.repairing.months} мес. {realty.repairing.expencies} р.</h6>
              <h6>На заселение {realty.settling_expencies} р.</h6>
              </div>
          
              <div className='MortgageSchemes'>
              {Object.entries(realty.schemes).map(([x, scheme],i) => (
                  <div className='MortgageScheme'
                  key={i}>
                  <div className='SchemeName'>
                      {i}
                      {x}
                  </div>
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
                  </div>
              ))}
              </div>
          
          </div>
        ))
        : 'No variants, click "setDefaultPrerequisites"' }
      </div><br/>
      {/* <button onClick={(event) => detalize(event, 3, 1, 'save')}>Детализация</button>
      <button onClick={(event) => detalize(event, 4, 1, 'save')}>Детализация</button> */}
      { props.prerequisites ?
        <Fragment>
          { !isSettingRealty.isShown ?
            <button onClick={(event) => setRealty(event)}>+</button>
          : null }
        </Fragment>
      : null }
      { isSettingRealty.isShown ?
        <SetRealty
          realty={isSettingRealty.realty}
          isPending={props.isPending}
          setIsPending={props.setIsPending}
          isSettingRealty={isSettingRealty}
          setIsSettingRealty={setIsSettingRealty} />
      : null }
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    prerequisites: state.prerequisites,
    realtyList: state.realtyList,
    isRealtyListUpdated: state.isRealtyListUpdated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteRealty: (...args) => dispatch(deleteRealty(...args)),
    deleteAllRealties: () => dispatch(deleteAllRealties()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comparison);

  // const detalize = (event, realtyId, schemeId, save_credit) => {
  //   event.preventDefault();
  //   console.log('detalize: ', realtyId, schemeId, save_credit);
  //   const requestData = {
  //     'personal_info': {
  //       'month_income': props.data.personalInfo.monthIncome,
  //       'current_savings': props.data.personalInfo.currentSavings,
  //       'month_rent': props.data.personalInfo.monthRent
  //     },
  //     'credit_scheme': {
  //       'interest_rate': props.data.creditScheme.interestRate,
  //       'months': props.data.creditScheme.totalMonths
  //     },
  //     'mortgage_scheme': props.data.mortgageSchemes[schemeId],
  //     'realty': props.data.realties[realtyId],
  //     'plan': props.comparison[realtyId].schemes[schemeId][save_credit]
  //   };
  //   props.startDetalize(requestData, (error) => {
  //       console.log(error);
  //       alert('Boom');
  //   });
  // };