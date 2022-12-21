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

    case ACTION_TYPES.TEST_INIT:
      state.testResultsData = getInitTestData(state.importedData);
      break;

    default:
      break;
  }
  return state;
}

function modifyByRowAndField(clonedTestResultsState, payload) {
  return clonedTestResultsState;
}

// Append value and test results fields to each cell value.
function getInitTestData(importedData) {
  const initTestData = _.cloneDeep(importedData);
  console.log(importedData);
  for (const sheet in importedData) {
    for (const row in importedData[sheet]) {
      for (const field of Object.keys(importedData[sheet][row])) {
        initTestData[sheet][row][field] = { value: importedData[sheet][row][field], testResults: [] };
      }
    }
  }
  return initTestData;
}

export default SpreadSheetReducer;
