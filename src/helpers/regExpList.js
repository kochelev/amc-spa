const RegExpList = {
  zeroPosInt: {
    expression: new RegExp(`^[1-9][0-9]*$|^0$`),
    errorMessage: 'Zero or any positive integer',
  },
  posInt: {
    expression: new RegExp(`^[1-9][0-9]*$`),
    errorMessage: 'Positive integer more than zero',
  },
  zeroPosFloat: {
    expression: new RegExp(`^[1-9][0-9]*(.[0-9])?$|^0.[1-9]$|^0$`),
    errorMessage: 'Zero or positive floating point number',
  },
  posFloat: {
    expression: new RegExp(`^[1-9][0-9]*(.[0-9])?$|^0.[1-9]$`),
    errorMessage: 'Positive floating point number more than zero',
  }
};

export default RegExpList;