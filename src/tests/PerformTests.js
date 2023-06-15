import store from '../store/store';

import _ from 'lodash';
import TEST_SETUP from './TEST_SETUP';
import {getColumnNames, findTestFunctionByTestId} from './TestUtils';

function PerformTests() {
  const state = store.getState();
  performSchemaLevelTests(state);
  //performCellLevelTests(state);
  performSheetLevelTests();
  performAcrossSheetTests();
}

function performSchemaLevelTests(state) {
  for (const SHEET_OBJECT_TEST_CONFIG of TEST_SETUP) {
    const sheetNum = SHEET_OBJECT_TEST_CONFIG.sheetNum;
    // Get the column names from first row of the sheet.
    // todo: Refactor: May be not all schema level tests need to know column names.
    const columnNamesInSheet = getColumnNames(state, sheetNum, 0);
    if (!SHEET_OBJECT_TEST_CONFIG.sheetSchemaCheck) return;
    for (const SCHEMA_TEST_CONFIG of SHEET_OBJECT_TEST_CONFIG.sheetSchemaCheck.testConfigs) {
      if (!SCHEMA_TEST_CONFIG) return;
      const foundTestDefinition = findTestFunctionByTestId(SCHEMA_TEST_CONFIG.testId);
      foundTestDefinition.testFunction(_.cloneDeep(columnNamesInSheet), sheetNum, SCHEMA_TEST_CONFIG.testMedata);
    }
  }
}

function performSheetLevelTests() {
  for (const SHEET_LEVEL_TEST_CONFIG of TEST_SETUP) {
    const sheetNum = SHEET_LEVEL_TEST_CONFIG.sheetNum;
    if (!SHEET_LEVEL_TEST_CONFIG.sheetLevelTestConfigs) {
      console.info(`No Sheet level tests for sheet # ${sheetNum}!`);
      return;
    }
    console.info(`Performing sheet level tests for sheet # ${sheetNum}!`);
    for (const SHEET_TEST_ITEM of SHEET_LEVEL_TEST_CONFIG.sheetLevelTestConfigs) {
      const SHEET_TEST_ITEM_CONFIG = SHEET_TEST_ITEM.testConfig;
      if (!SHEET_TEST_ITEM_CONFIG) return;
      const foundTestDefinition = findTestFunctionByTestId(SHEET_TEST_ITEM_CONFIG.testId);
      foundTestDefinition.testFunction(sheetNum, SHEET_TEST_ITEM_CONFIG.testMedata);
    }
  }
}

function performAcrossSheetTests() {
  for (const SHEET_LEVEL_TEST_CONFIG of TEST_SETUP) {
    const sheetNum = SHEET_LEVEL_TEST_CONFIG.sheetNum;
    if (!SHEET_LEVEL_TEST_CONFIG.acrossSheetTestConfigs) {
      console.info(`No Across Sheet level tests for sheet # ${sheetNum}!`);
      return;
    }
    console.info(`Performing Across sheet level tests for sheet # ${sheetNum}!`);
    for (const SHEET_TEST_ITEM of SHEET_LEVEL_TEST_CONFIG.acrossSheetTestConfigs) {
      const SHEET_TEST_ITEM_CONFIG = SHEET_TEST_ITEM.testConfig;
      if (!SHEET_TEST_ITEM_CONFIG) return;
      const foundTestDefinition = findTestFunctionByTestId(SHEET_TEST_ITEM_CONFIG.testId);
      foundTestDefinition.testFunction(sheetNum, SHEET_TEST_ITEM_CONFIG.testMedata);
    }
  }
}

function performCellLevelTests(state) {
  const SHEETS_FOR_TESTS = TEST_SETUP.map((sheetTestConfig) => sheetTestConfig.sheetNum);
  for (const SHEET_FOR_TESTS of SHEETS_FOR_TESTS) {
    const sheetNumber = SHEETS_FOR_TESTS[SHEET_FOR_TESTS];
    const sheet = state.root.importedData[sheetNumber];
    for (const rowNum in sheet) {
      const row = sheet[rowNum];
      const ROW_KEYS = Object.keys(row);
      const COLUMN_CONFIG_OBJECTS = _.filter(TEST_SETUP, (sheet) => sheet.sheetNum === sheetNumber)[0].columnConfigs;
      for (const COLUMN_CONFIG of COLUMN_CONFIG_OBJECTS) {
        for (const COLUMN_NUM of COLUMN_CONFIG.columnNums) {
          let fieldData = _.cloneDeep(row[ROW_KEYS[COLUMN_NUM]]);
          const fieldName = ROW_KEYS[COLUMN_NUM];
          for (const testConfig of COLUMN_CONFIG.testConfigs) {
            // id is unique to every test, so there can only be one test found.
            const foundTestDefinition = findTestFunctionByTestId(testConfig.testId);
            foundTestDefinition.testFunction(
              _.cloneDeep(fieldData),
              _.cloneDeep(sheetNumber),
              _.cloneDeep(rowNum),
              _.cloneDeep(fieldName),
              _.cloneDeep(testConfig.testMedata)
            );
          }
        }
      }
    }
  }
}

export default PerformTests;
