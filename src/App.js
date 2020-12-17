import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { startCompare, startDetalize, clearData, clearComparison, clearDetalization } from './store/actions';
// import Home from './routes/home/home';
import Comparison from './components/comparison/comparison';
import Detalization from './components/detalization/detalization';
import NotFound from './routes/notFound/notFound';
import './App.css';

const App = (props) => {

  const [ data, setData ] = useState({  
    personalInfo: props.data ? props.data.personalInfo : null,
    useCredit: props.data ? props.data.useCredit : null,
    creditScheme: props.data ? props.data.creditScheme : null,
    mortgageSchemes: props.data ? props.data.mortgageSchemes : null,
    realties: props.data ? props.data.realties : null,
  });
  const [comparison, setComparison] = useState(null);
  const [detalization, setDetalization] = useState(null)

  useEffect(() => {
      if (localStorage.getItem('amc') !== null) {
        console.log('There is an amc object in local storage...')
          // props.init((errorMessage) => {
          //     setError(errorMessage);
          //     console.log('App, auth error: ', error);
          // });
      } else {
        console.log('ams is null in useEffect');
      }
      // setData({
      //   ...data,
      //   mortgageSchemes: 123
      // })
      window.addEventListener('storage', storageUpdateHandler);
  }, []);

  useEffect(() => {
    setComparison(props.comparison);
  }, [props.comparison]);

  useEffect(() => {
    setDetalization(props.detalization);
  }, [props.detalization]);

  useEffect(() => {
    const amcData = { 'data': data };
    if (comparison) amcData['comparison'] = comparison;
    if (detalization) amcData['detalization'] = detalization;
    localStorage.setItem('amc', JSON.stringify(amcData));
  }, [data, comparison, detalization]);
  
  const storageUpdateHandler = () => {
      if (localStorage.getItem('amc') !== null) {
        console.log('amc !== null');
          // props.init((errorMessage) => {
          //     setError(errorMessage);
          // });
      } else {
        console.log('amc == null');
          // props.logoutSoftly();
      }
  };

  const compare = (event) => {
    event.preventDefault();
    
    const requestData = {
      'personal_info': {
        'month_income': props.data.personalInfo.monthIncome,
        'current_savings': props.data.personalInfo.currentSavings,
        'month_rent': props.data.personalInfo.monthRent,
        'deal_month_start': props.data.personalInfo.startDealMonth,
        'deal_month_finish': props.data.personalInfo.finishDealMonth
      },
      'credit_scheme': {
          'interest_rate': props.data.creditScheme.interestRate,
          'months': props.data.creditScheme.totalMonths
      },
      'mortgage_schemes': props.data.mortgageSchemes,
      'realties': props.data.realties
    }
    props.startCompare(requestData, (error) => {
      console.log(error);
      alert('Boom');
    });
  };

  const clearAll = (event) => {
    event.preventDefault();
    props.clearDetalization()
    props.clearComparison();
    props.clearData();
  }
  
  const home = () => {
    return (
      <div className="App">
        <main className="App-main">

          <div className='Sidebar Column'>
            <div className='Header'>
              <h1>Awesome Mortgage Calculator</h1>
              <p>Description</p>
            </div>
            <form className='Form' onSubmit={(event) => compare(event)}>
              <div className='PersonalInfoForm'>
                <h2>Personal Information</h2>
                Bla-Bla
              </div>
              <div className='CreditForm'>
                <h2>Credit for repairing</h2>
                Bla-bla
              </div>
              <div className='MortgageSchemesForm'>
                <h2>Mortgage Schemes</h2>
                Bla-bla
              </div>
              <div className="RealtiesForm">
                <h2>Realties</h2>
                Bla-bla
              </div>
              <button onClick={(event) => compare(event)}>Сравнить</button>
              <button onClick={(event) => clearAll(event)}>Очистить все</button>
            </form>
          </div>
          {comparison ?
            <Comparison />
          : null}
          {detalization ?
            <Detalization />
          : null}

        </main>
      </div>
    )
  }

  return (
    <Switch>
      {/* <Route path='/' exact render={() => <Home />} /> */}
      <Route path='/' exact render={() => home()} />
      <Route><NotFound /></Route>
    </Switch>
  );
};

const mapStateToProps = state => {
  return {
    isDataChanging: state.isDataChanging,
    data: state.data,
    isComparing: state.isComparing,
    comparison: state.comparison,
    isDetalizing: state.isDetalizing,
    detalization: state.detalization
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startCompare: (data, failFunction) => dispatch(startCompare(data, failFunction)),
    startDetalize: (data, failFunction) => dispatch(startDetalize(data, failFunction)),
    clearData: () => dispatch(clearData()),
    clearComparison: () => dispatch(clearComparison()),
    clearDetalization: () => dispatch(clearDetalization()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

//<InputNumber
//   placeholder='Процентная ставка'
//   value={form.fields.interestRate.value}
//   isTouched={element.config.isTouched}
//   isInvalid={!element.config.isValid}
//   errorMessages={element.config.errorMessages}
//   changed={(event) => inputChangeHandler(event, element.id)} />
// <Button
//     buttonType = {!props.logining ? 'SendForm' : 'SendFormWaiting'}
//     disabled = {!form.isValid || props.logining}>
//     {props.logining ? 'Подождите...' : 'Войти'}
// </Button>
// {error ?
//     <div className={styles.Login__Form__ErrorMessage}>
//         {error}
//     </div> : null}
//     </div>

//   // const inputChangeHandler = (event, inputIdentifier) => {
//   //   const result = formValidator(form, inputIdentifier, event.target.value);
//   //   setForm(result);
//   // };

//   const updatePersonalInfo = (event) => {
//     event.preventDefault();
//     const data = {
//       currentSavings: form.fields.currentSavings.value,
//       monthIncome: form.fields.monthIncome.value,
//       monthRent: form.fields.monthRent.value,
//       startDealMonth: form.fields.startDealMonth.value,
//       finishDealMonth: form.fields.finishDealMonth.value
//     };
//     if (localStorage.getItem('amc') !== null) {
//       const amcData = JSON.parse(localStorage.getItem('amc'));
//       amcData['personalInfo'] = {
//         currentSavings: data['currentSavings'],
//         monthIncome: data['monthIncome'],
//         monthRent: data['monthRent'],
//         startDealMonth: data['startDealMonth'],
//         finishDealMonth: data['finishDealMonth']
//       }
//       localStorage.setItem('amc', JSON.stringify(amcData));
//     } else {
//       const amcData = {'personalInfo': {}};
//       amcData['personalInfo'] = {
//         currentSavings: data['currentSavings'],
//         monthIncome: data['monthIncome'],
//         monthRent: data['monthRent'],
//         startDealMonth: data['startDealMonth'],
//         finishDealMonth: data['finishDealMonth']
//       }
//       localStorage.setItem('amc', JSON.stringify(amcData));
//     }
//   };

//   return (
//     <div>
//     <form onSubmit={(event) => updatePersonalInfo(event)}>
//       <input type='text' />
//       <input type='submit' />
//       {/* {inputElements.map(element => (
//         <Input
//           key={element.id}
//           type={element.properties.type}
//           placeholder={element.properties.placeholder}
//           value={element.config.value}
//           isTouched={element.config.isTouched}
//           isInvalid={!element.config.isValid}
//           errorMessages={element.config.errorMessages}
//           changed={(event) => inputChangeHandler(event, element.id)} />
//       ))} */}
//       {/* <Button
//         buttonType = {!props.logining ? 'SendForm' : 'SendFormWaiting'}
//         disabled = {!form.isValid || props.logining}>
//         {props.logining ? 'Подождите...' : 'Войти'}
//       </Button> */}
//       {/* {error ?
//         <div className={styles.Login__Form__ErrorMessage}>
//           {error}
//         </div> : null} */}
//     </form>
//     </div>
//   );
// };


//   // const updateCreditScheme = (event) => {
//   //   event.preventDefault();
//   //   const data = {
//   //     interestRate: form.fields.interestRate.value,
//   //     totalMonths: form.fields.totalMonths.value
//   //   };
//   //   if (localStorage.getItem('amc') !== null) {
//   //     const amcData = JSON.parse(localStorage.getItem('amc'));
//   //     amcData['creditScheme'] = {
//   //       interestRate: data['interestRate'],
//   //       totalMonths: data['totalMonths']
//   //     }
//   //     localStorage.setItem('amc', JSON.stringify(amcData));
//   //   } else {
//   //     const amcData = {'creditScheme': {}};
//   //     amcData['creditScheme'] = {
//   //       currentSavings: data['currentSavings'],
//   //       totalMonths: data['totalMonths']
//   //     }
//   //     localStorage.setItem('amc', JSON.stringify(amcData));
//   //   }
//   // };

//   // const inputChangeHandler = (event, inputIdentifier) => {
//   //   const result = formValidator(form, inputIdentifier, event.target.value);
//   //   setForm(result);
//   // };

//   return (
//     <div className='PersonalInfo'>
//       {/* <h1>Персональная информация</h1>
//       <form className='Form' onSubmit={(event) => updateCreditScheme(event)}>
//           <InputNumber
//             placeholder='Процентная ставка'
//             value={form.fields.interestRate.value}
//             isTouched={element.config.isTouched}
//             isInvalid={!element.config.isValid}
//             errorMessages={element.config.errorMessages}
//             changed={(event) => inputChangeHandler(event, element.id)} />
//           <Button
//               buttonType = {!props.logining ? 'SendForm' : 'SendFormWaiting'}
//               disabled = {!form.isValid || props.logining}>
//               {props.logining ? 'Подождите...' : 'Войти'}
//           </Button>
//           {error ?
//               <div className={styles.Login__Form__ErrorMessage}>
//                   {error}
//               </div> : null}
//               </div>
//     <div>
//     <form onSubmit={(event) => updateCreditScheme(event)}>
//       <input type='text' value='Credit Scheme' />
//       <input type='button' />
//     </form> */}
//     </div>
//   );
// };

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
// 
// export default App;
