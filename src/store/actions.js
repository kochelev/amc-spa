import requestHandler from '../helpers/requestHandler';

export const clearData = () => {
  return dispatch => {
    dispatch({ type: 'DATA_CLEAR' });
  }
};
export const startCompare = (data, failFunction) => {
  return dispatch => {
    requestHandler({
      method: 'post',
      url: '/compare',
      data,
      actions: {
        start: () => dispatch({ type: 'COMPARE_START' }),
        success: (data) => dispatch({ type: 'COMPARE_SUCCESS', data }),
        fail: (error) => {
          dispatch({ type: 'COMPARE_FAIL' });
          if (typeof failFunction === 'function') {
            failFunction(error);
          }
        }
      }
    });
  };
};
export const clearComparison = () => {
  return dispatch => {
    dispatch({ type: 'COMPARISON_CLEAR' });
  }
};
export const startDetalize = (data, failFunction) => {
  return dispatch => {
    requestHandler({
      method: 'post',
      url: '/expand',
      data,
      actions: {
        start: () => dispatch({ type: 'DETALIZE_START' }),
        success: (data) => dispatch({ type: 'DETALIZE_SUCCESS', data }),
        fail: (error) => {
          dispatch({ type: 'DETALIZE_FAIL' });
          if (typeof failFunction === 'function') {
            failFunction(error);
          }
        }
      }
    });
  };
};
export const clearDetalization = () => {
  return dispatch => {
    dispatch({ type: 'DETALIZATION_CLEAR' });
  }
}