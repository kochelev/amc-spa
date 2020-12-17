import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { clearDetalization } from '../../store/actions';
import './detalization.css';

const detalization = (props) => {
  const clearDetalization = (event) => {
    event.preventDefault();
    props.clearDetalization();
  }
  return (
    <Fragment>
      <div className='Detalization'>
        <button onClick={(event) => clearDetalization(event)}>Закрыть</button>
        <div className='DetalizationList'>
          <table>
            {props.detalization.map(month => (
              <tr key={month.id}>
                <td>{month.month}</td>
                <td>{month.earn}</td>
                <td>{month.rent}</td>
                <td>{Math.round(month.save)}</td>
                <td>{Math.round(month.savings)}</td>
                <td>
                  {month.debts && month.debts['Mortgage'] ?
                    'Ипотека: мин.' + Math.round(month.debts['Mortgage'].min_payment) +
                    ' факт ' + Math.round(month.debts['Mortgage'].payment) +
                    ' долг ' + Math.round(month.debts['Mortgage'].debt) +
                    ' ставка ' + month.debts['Mortgage'].interest_rate
                  : '–'}
                </td>
                <td>
                  {month.debts && month.debts['Repairing'] ?
                    'Кредит: мин.' + Math.round(month.debts['Repairing'].min_payment) +
                    ' факт ' + Math.round(month.debts['Repairing'].payment) +
                    ' долг ' + Math.round(month.debts['Repairing'].debt) +
                    ' ставка ' + month.debts['Repairing'].interest_rate
                  : '–'}
                </td>
                <td>
                  {month.expencies && month.expencies['buy_realty'] ?
                    'Покупка жилья:' + month.expencies['buy_realty'] + '</br>'
                  : null}
                  {month.expencies && month.expencies['mortgage_insurance'] ?
                    'Страховка и т.п.:' + month.expencies['mortgage_insurance'] + '</br>'
                  : null}
                  {month.expencies && month.expencies['repairing'] ?
                    'Оплата ремонта:' + month.expencies['repairing'] + '</br>'
                  : null}
                  {month.expencies && month.expencies['settling'] ?
                    'Заселение:' + month.expencies['settling'] + '</br>'
                  : null}
                  {!month.expencies || (month.expencies && Object.keys(month.expencies).length) ?
                    '-'
                  : null}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    detalization: state.detalization
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearDetalization: () => dispatch(clearDetalization())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(detalization);