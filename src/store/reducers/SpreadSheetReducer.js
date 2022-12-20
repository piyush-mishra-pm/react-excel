import _ from 'lodash';

import ACTION_TYPES from '../ACTION_TYPES';
import INITIAL_STATE from '../INITIAL_STATE';

function SpreadSheetReducer(state = INITIAL_STATE, action) {
  state = _.cloneDeep(state);
  action = _.cloneDeep(action);
  switch (action.type) {
    case ACTION_TYPES.READ_SPREADSHEET:
      state.importedData = action.payload;
      break;

    case ACTION_TYPES.TEST_SPREADSHEET_ITEM:
      state.testResultsData = modifyByRowAndField(state.testResultsData, action.payload); // payload:{row, field, sheet}
      break;

    default:
      break;
  }
  return state;
}

function modifyByRowAndField(clonedTestResultsState, payload) {
  return clonedTestResultsState;
}

export default SpreadSheetReducer;
