import {
  SET_FACT_LIST_FAIL,
  SET_FACT_LIST_SUCCESS,
  MOVE_TO_DETAILED_LIST,
  MOVE_TO_FACT_LIST
} from "./types";

import FactsService from "../services/facts.service";

export const setFactsList = () => (dispatch) => {
  return FactsService.getFacts().then(
    (response) => {
      dispatch({
        type: SET_FACT_LIST_SUCCESS,
        payload: response
      });
      return Promise.resolve();

      },
    (error) => {
      dispatch({
        type: SET_FACT_LIST_FAIL,
        payload: error
      });
      return Promise.reject();
    }
  );
};


export const moveToDetailList = (fact) => (dispatch) => {
  dispatch({
    type: MOVE_TO_DETAILED_LIST,
    payload: fact
  });
  return Promise.resolve();
};

export const moveToFactList = (fact) => (dispatch) => {
  dispatch({
    type: MOVE_TO_FACT_LIST,
    payload: fact
  });
  return Promise.resolve();
};

// export const setUserList = () => (dispatch) => {
//   return factsService.getFacts().then(
//     (response) => {
//       if(response.data.status==RESPONSE_SUCCESS){
//         dispatch({
//           type: USER_ADDED_SUCCEFULLY,
//           payload: response.data.data
//         });
//         return Promise.resolve();
//       }
//       if(response.data.status==RESPONSE_ERROR){
//         const message =response.data.error;

//       dispatch({
//         type: USER_ADDED_FAIL,
//       });

//       dispatch({
//         type: SET_MESSAGE,
//         payload: message,
//       });

//       return Promise.reject();
//       }
//     },
//     (error) => {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       dispatch({
//         type: USER_ADDED_FAIL,
//       });

//       dispatch({
//         type: SET_MESSAGE,
//         payload: message,
//       });

//       return Promise.reject();
//     }
//   );
// };

// export const deleteUser = (userId) => (dispatch) => {
//   return UserService.deleteUser(userId).then(
//     (response) => {
//       if(response.data.status==RESPONSE_SUCCESS){
//         dispatch({
//           type: USER_DELETED_SUCCEFULLY,
//           payload: response.data.data
//         });
//         return Promise.resolve();
//       }
//       if(response.data.status==RESPONSE_ERROR){
//         const message =response.data.error;

//       dispatch({
//         type: USER_DELETED_FAIL,
//       });

//       dispatch({
//         type: SET_MESSAGE,
//         payload: message,
//       });

//       return Promise.reject();
//       }
//     },
//     (error) => {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       dispatch({
//         type: USER_DELETED_FAIL,
//       });

//       dispatch({
//         type: SET_MESSAGE,
//         payload: message,
//       });

//       return Promise.reject();
//     }
//   );
// };