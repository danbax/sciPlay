import {
  
  SET_FACT_LIST_FAIL,
  SET_FACT_LIST_SUCCESS,
  MOVE_TO_DETAILED_LIST,
  MOVE_TO_FACT_LIST
} from "../actions/types";


const initialState = { factsList: [], detailedList:[] };

export default function (state = initialState, action) {

  switch (action.type) {
    case SET_FACT_LIST_SUCCESS:
      return {
        ...state,
        factsList : [...action.payload],
      };
    case SET_FACT_LIST_FAIL:
      return {
        ...state,
      };
      case MOVE_TO_DETAILED_LIST:
        return {
          ...state,
          detailedList: [action.payload,...state.detailedList],
          factsList: state.factsList.filter(item => item !== action.payload),
        };
      case MOVE_TO_FACT_LIST:
        return {
          ...state,
          factsList: [action.payload,...state.factsList],
          detailedList: state.detailedList.filter(item => item !== action.payload),
        };
    default:
      return state;
  }
}
