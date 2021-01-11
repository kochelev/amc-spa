import requestHandler from '../helpers/requestHandler';
import realtySifter from '../helpers/realtySifter';

export const init = (data, successFunction) => {
  return dispatch => {
      dispatch({ type: 'INIT', data });
      if (successFunction && typeof successFunction === 'function') {
        successFunction();
      }
  }
};

export const updatePrerequisites = (prerequisites, successFunction) => {
  return dispatch => {
      dispatch({ type: 'UPDATE_PREREQUISITES', prerequisites });
      if (successFunction && typeof successFunction === 'function') {
        successFunction(prerequisites);
      }
  }
};

export const addRealty = (prerequisites, realty, successFunction, failFunction) => {
  return dispatch => {
    const requestData = {
      ...prerequisites,
      realties: [realty]
    };
    requestHandler({
      method: 'post',
      url: '/compare',
      requestData,
      actions: {
        success: (response) => {
          const newRealty = response[0];
          dispatch({ type: 'ADD_REALTY', newRealty });
          if (successFunction && typeof successFunction === 'function') successFunction(response);
        },
        fail: (error) => {
          if (failFunction && typeof failFunction === 'function') failFunction(error);
        }
      }
    });
  };
};

export const updateRealty = (prerequisites, realty, successFunction, failFunction) => {
  const requestData = {
    ...prerequisites,
    realties: [realty]
  };
  return dispatch => {
    requestHandler({
      method: 'post',
      url: '/compare',
      requestData,
      actions: {
        success: (response) => {
          const updatedRealty = response[0];
          dispatch({ type: 'UPDATE_REALTY', updatedRealty })
          if (successFunction && typeof successFunction === 'function') successFunction(response);
        },
        fail: (error) => {
          if (failFunction && typeof failFunction === 'function') failFunction(error);
        }
      }
    });
  };
};

export const updateAllRealties = (prerequisites, all_realties, successFunction, failFunction) => {
  const requestData = {
    ...prerequisites,
    realties: [
      ...all_realties.map((rlt) => realtySifter(rlt))
    ]
  };
  return dispatch => {
    requestHandler({
      method: 'post',
      url: '/compare',
      requestData,
      actions: {
        success: (response) => {
          const updatedRealties = response;
          dispatch({ type: 'UPDATE_ALL_REALTIES', updatedRealties })
          if (successFunction && typeof successFunction === 'function') successFunction(response);
        },
        fail: (error) => {
          dispatch({ type: 'UPDATE_ALL_REALTIES_FAIL' });
          if (failFunction && typeof failFunction === 'function') failFunction(error);
        }
      }
    });
  };
};

export const deleteRealty = (id) => {
  return dispatch => {
    dispatch({ type: 'DELETE_REALTY', id })
  };
};

export const deleteAllRealties = () => {
  return dispatch => {
    dispatch({ type: 'DELETE_ALL_REALTIES' })
  };
};