import store from '../store/store';

import _ from 'lodash';
import TEST_SETUP from '../store/TEST_SETUP';
import TEST_DEFINITIONS from '../store/TEST_DEFINITIONS';

function PerformTests() {
  const state = store.getState();
  performTextTests(state);
}

function performTextTests(state) {
  console.log('txt tests running');
  const SHEETS_FOR_TESTS = TEST_SETUP.map(sheetTestConfig => sheetTestConfig.sheetNum);
  for (const SHEET_FOR_TESTS of SHEETS_FOR_TESTS) {
    const sheetNumber = SHEETS_FOR_TESTS[SHEET_FOR_TESTS];
    const sheet = state.root.importedData[sheetNumber];
    const sheetWithError = state.root.testResultsData[sheetNumber];
    for (const rowNum in sheet) {
      const row = sheet[rowNum];
      const rowWithError = sheetWithError[rowNum];
      const ROW_KEYS = Object.keys(row);
      const COLUMN_CONFIG_OBJECTS = _.filter(TEST_SETUP, sheet => sheet.sheetNum === sheetNumber)[0].columnConfigs;
      for (const COLUMN_CONFIG of COLUMN_CONFIG_OBJECTS) {
        for (const COLUMN_NUM of COLUMN_CONFIG.columnNums) {
          const fieldData = row[ROW_KEYS[COLUMN_NUM]];
          const fieldName = ROW_KEYS[COLUMN_NUM];
          const existingObjectStoredInField = _.cloneDeep(rowWithError[ROW_KEYS[COLUMN_NUM]]);
          for (const testConfig of COLUMN_CONFIG.testConfigs) {
            // id is unique to every test, so there can only be one test found.
            const foundTestDefinition = _.filter(TEST_DEFINITIONS.TESTS, key => key.id === testConfig.testId)[0];
            //console.log(fieldData, typeof fieldData, fieldName);
            foundTestDefinition.testFunction(_.cloneDeep(fieldData), _.cloneDeep(existingObjectStoredInField), _.cloneDeep(sheetNumber), _.cloneDeep(rowNum), _.cloneDeep(fieldName), _.cloneDeep(testConfig.testMedata));
          }
        }
      }
    }
  }
}

export default PerformTests;