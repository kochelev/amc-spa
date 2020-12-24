const defaultPrerequisites = {
  personal_info: {
    current_savings: 1000000,
    month_income: 100000,
    month_rent: 30000,
    deal_month_start: 1,
    deal_month_finish: 12
  },
  credit_scheme: {
    interest_rate: 18,
    months: 24
  },
  mortgage_schemes: [
    {
      id: 2,
      title: 'Ипотека для семей с детьми от Сбербанка',
      initial_payment_percent: 10,
      initial_expencies: 60000,
      schedule: [
        {
          interest_rate: 4.8,
          months: 20
        },
        {
          interest_rate: 12.0,
          months: 280
        }
      ]
    },
    {
      id: 1,
      title: 'Ипотека с господдержкой от Сбербанка',
      initial_payment_percent: 15,
      initial_expencies: 60000,
      schedule: [
        {
          interest_rate: 6.1,
          months: 240
        }
      ]
    }
  ]
};

export default defaultPrerequisites;