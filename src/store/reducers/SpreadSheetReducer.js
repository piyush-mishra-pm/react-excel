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
      state.testResultsData = modifyBySheetRowField(state.testResultsData, action.payload); // payload:{row, field, sheet, testID}
      break;

    case ACTION_TYPES.TEST_INIT:
      state.testResultsData = getInitTestData(state.importedData);
      break;

    case ACTION_TYPES.TEST_CLEAR:
      state.testResultsData = INITIAL_STATE.testResultsData;
      break;

    case ACTION_TYPES.TEST_SCHEMA_INIT:
      state.testResultsDataSchemaLevel = getInitSchemaTestData(state.importedData);
      break;

    case ACTION_TYPES.TEST_SPREADSHEET_SCHEMA:
      state.testResultsDataSchemaLevel = modifySchemaTestResultsBySheet(
        state.testResultsDataSchemaLevel,
        action.payload
      );
      break;

    case ACTION_TYPES.TEST_SHEET_LEVEL_ITEM_INIT:
      state.testResultsSheetLevelTest = getInitSheetLevelTestData(state.importedData);
      break;

    case ACTION_TYPES.TEST_SHEET_LEVEL_ITEM:
      state.testResultsSheetLevelTest = modifySheetLevelTestResults(state.testResultsSheetLevelTest, action.payload);
      break;

    case ACTION_TYPES.TEST_ACROSS_SHEET_ITEM_INIT:
      state.testResultsAcrossSheetTest = getInitAcrossSheetTestData(state.importedData);
      break;

    case ACTION_TYPES.TEST_ACROSS_SHEET_ITEM:
      state.testResultsAcrossSheetTest = modifyAcrossSheetTestResults(state.testResultsAcrossSheetTest, action.payload);
      break;

    default:
      break;
  }
  return state;
}

function modifyBySheetRowField(clonedTestResultsState, payload) {
  clonedTestResultsState[payload.sheet][payload.row][payload.field].testResults = payload.testResults;
  return clonedTestResultsState;
}

// Append value and test results fields to each cell value.
function getInitTestData(importedData) {
  const initTestData = _.cloneDeep(importedData);
  for (const sheet in importedData) {
    for (const row in importedData[sheet]) {
      for (const field of Object.keys(importedData[sheet][row])) {
        initTestData[sheet][row][field] = {value: importedData[sheet][row][field] || null, testResults: []};
      }
    }
  }
  return initTestData;
}

function getInitSchemaTestData(importedData) {
  const clonedImportedData = _.cloneDeep(importedData);
  const initSchemaTestData = [];
  for (const key in clonedImportedData) {
    initSchemaTestData[key] = {schemaTestResults: {}};
  }
  return initSchemaTestData;
}

function modifySchemaTestResultsBySheet(testResultsDataSchemaLevel, payload) {
  testResultsDataSchemaLevel[payload.sheet].schemaTestResults = payload.testResults;
  return testResultsDataSchemaLevel;
}

function getInitSheetLevelTestData(importedData) {
  const clonedImportedData = _.cloneDeep(importedData);
  const initSheetLevelTestData = [];
  for (const key in clonedImportedData) {
    initSheetLevelTestData[key] = {sheetLevelTestResults: {}};
  }
  return initSheetLevelTestData;
}

function modifySheetLevelTestResults(testResultsDataSheetLevel, payload) {
  testResultsDataSheetLevel[payload.sheet].sheetLevelTestResults = payload.testResults;
  return testResultsDataSheetLevel;
}

function getInitAcrossSheetTestData(importedData) {
  const clonedImportedData = _.cloneDeep(importedData);
  const initAcrossSheetTestData = [];
  for (const key in clonedImportedData) {
    initAcrossSheetTestData[key] = {acrossSheetTestResults: {}};
  }
  return initAcrossSheetTestData;
}

function modifyAcrossSheetTestResults(testResultsDataSheetLevel, payload) {
  testResultsDataSheetLevel[payload.sheet].acrossSheetTestResults = payload.testResults;
  return testResultsDataSheetLevel;
}

export default SpreadSheetReducer;
