import store from '../store/store';
import ACTION_TYPES from '../store/ACTION_TYPES';
import TEST_DEFINITIONS from '../store/TEST_DEFINITIONS';
import _ from 'lodash';

function TextTests() {
  const state = store.getState();
  performTextTests(state);
}

function performTextTests(state) {
  console.log('txt tests running');
  const FIELDS_FOR_TESTS = [3, 4];
  const SHEETS_FOR_TESTS = [0];
  const SIZE_LIMIT_MAX = 50;
  const SIZE_LIMIT_MIN = 50;
  for (const SHEET_FOR_TESTS of SHEETS_FOR_TESTS) {
    const sheetNumber = SHEETS_FOR_TESTS[SHEET_FOR_TESTS];
    const sheet = state.root.importedData[sheetNumber];
    const sheetWithError = state.root.testResultsData[sheetNumber];
    for (const rowNum in sheet) {
      const row = sheet[rowNum];
      const rowWithError = sheetWithError[rowNum];
      const ROW_KEYS = Object.keys(row);
      for (const FIELD_FOR_TESTS in FIELDS_FOR_TESTS) {
        const fieldIndex = FIELDS_FOR_TESTS[FIELD_FOR_TESTS];
        const fieldData = row[ROW_KEYS[fieldIndex]];
        const fieldName = ROW_KEYS[fieldIndex];
        const existingObjectStoredInField = _.cloneDeep(rowWithError[ROW_KEYS[fieldIndex]]);
        if (fieldData.length > SIZE_LIMIT_MAX) {
          existingObjectStoredInField['testResults'] = [
            ...existingObjectStoredInField['testResults'],
            TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_LONG.id,
          ];
        }

        if (fieldData.length < SIZE_LIMIT_MIN) {
          existingObjectStoredInField['testResults'] = [
            ...existingObjectStoredInField['testResults'],
            TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_SHORT.id,
          ];
        }

        if (fieldData.length === 0) {
          existingObjectStoredInField['testResults'] = [
            ...existingObjectStoredInField['testResults'],
            TEST_DEFINITIONS.TESTS.TEST_TEXT_EMPTY.id,
          ];
        }

        store.dispatch({
          type: ACTION_TYPES.TEST_SPREADSHEET_ITEM,
          payload: {
            testResults: _.cloneDeep(existingObjectStoredInField.testResults),
            sheet: _.cloneDeep(sheetNumber),
            row: _.cloneDeep(rowNum),
            field: _.cloneDeep(fieldName),
          },
        });
      }
    }
  }
}

export default TextTests;
