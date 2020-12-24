export const prerequisites1 = {
  personal_info: {
    current_savings: 1400000,
    month_income: 170000,
    month_rent: 33000,
    deal_month_start: 1,
    deal_month_finish: 5
  },
  credit_scheme: {
    interest_rate: 18,
    months: 24
  },
  mortgage_schemes: [
    {
      id: 0,
      title: 'Mortgage Scheme 1',
      initial_payment_percent: 15,
      initial_expencies: 60000,
      schedule: [
        {
          interest_rate: 6.1,
          months: 240
        }
      ]
    },
    {
      id: 1,
      title: "Mortgage Scheme 2",
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
    }
  ]
};
export const prerequisites2 = {
  personal_info: {
    current_savings: 1200000,
    month_income: 150000,
    month_rent: 30000,
    deal_month_start: 6,
    deal_month_finish: 18
  },
  credit_scheme: {
    interest_rate: 22,
    months: 12
  },
  mortgage_schemes: [
    {
      id: 1,
      title: 'Mortgage Scheme 1',
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