import { combineReducers } from 'redux';
import SpreadSheetReducer from './SpreadSheetReducer';

export default combineReducers({
  root: SpreadSheetReducer,
});
