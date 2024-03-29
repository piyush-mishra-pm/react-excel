import _ from 'lodash';

import store from '../store/store';
import ACTION_TYPES from '../store/ACTION_TYPES';
import TEST_DEFINITIONS, {TEST_STATUS, UNTIL_LAST_ROW, UNIQUE_OCCURRENCE_STATUS} from './TEST_DEFINITIONS';

export function dispatchTestItemAction(testId, testResultMessage, testStatus, sheetNumber, rowNum, fieldName) {
  // Get latest state picture, since last test check.
  // Each test check can dispatch (asyncronous) actions.
  // Hence we need the latest state per test.
  const state = store.getState();
  const sheetWithError = state.root.testResultsData[sheetNumber];
  const rowWithError = sheetWithError[rowNum];
  let existingObjectStoredInField = _.cloneDeep(rowWithError[fieldName]);
  existingObjectStoredInField['testResults'] = _.cloneDeep(
    _.uniqBy(
      _.compact(
        _.concat(_.cloneDeep({testId, testResultMessage, testStatus}), existingObjectStoredInField['testResults'])
      ),
      'testId'
    )
  );

  store.dispatch({
    type: ACTION_TYPES.TEST_SPREADSHEET_ITEM,
    payload: {
      testResults: _.cloneDeep(existingObjectStoredInField['testResults']),
      sheet: _.cloneDeep(sheetNumber),
      row: _.cloneDeep(rowNum),
      field: _.cloneDeep(fieldName),
    },
  });
}

export function dispatchTestSchemaAction(testId, testResultMessage, testStatus, sheetNumber, testResultMetadata = {}) {
  const state = store.getState();
  const sheetWithSchemaTestErrors = _.cloneDeep(state.root.testResultsDataSchemaLevel[sheetNumber]);

  sheetWithSchemaTestErrors['testResults'] = _.cloneDeep(
    _.uniqBy(
      _.compact(
        _.concat(
          _.cloneDeep({testId, testResultMessage, testStatus, testResultMetadata}),
          sheetWithSchemaTestErrors['testResults']
        )
      ),
      'testId'
    )
  );

  store.dispatch({
    type: ACTION_TYPES.TEST_SPREADSHEET_SCHEMA,
    payload: {
      testResults: _.cloneDeep(sheetWithSchemaTestErrors['testResults']),
      sheet: _.cloneDeep(sheetNumber),
    },
  });
}

export function dispatchSheetLevelTestAction(
  testId,
  testResultMessage,
  testStatus,
  sheetNumber,
  testResultMetadata = {}
) {
  const state = store.getState();
  let sheetWithSheetLevelTestErrors = _.cloneDeep(state.root.testResultsSheetLevelTest[sheetNumber]);

  sheetWithSheetLevelTestErrors['testResults'] = _.cloneDeep(
    _.uniqBy(
      _.compact(
        _.concat(
          _.cloneDeep({testId, testResultMessage, testStatus, testResultMetadata}),
          sheetWithSheetLevelTestErrors['testResults']
        )
      ),
      'testId'
    )
  );

  store.dispatch({
    type: ACTION_TYPES.TEST_SHEET_LEVEL_ITEM,
    payload: {
      testResults: _.cloneDeep(sheetWithSheetLevelTestErrors['testResults']),
      sheet: _.cloneDeep(sheetNumber),
    },
  });
}

export function dispatchAcrossSheetTestAction(
  testId,
  testResultMessage,
  testStatus,
  sheetNumber,
  testResultMetadata = {}
) {
  const state = store.getState();
  let sheetWithAcrossSheetLevelTestErrors = _.cloneDeep(state.root.testResultsAcrossSheetTest[sheetNumber]);

  sheetWithAcrossSheetLevelTestErrors['testResults'] = _.cloneDeep(
    _.uniqBy(
      _.compact(
        _.concat(
          _.cloneDeep({testId, testResultMessage, testStatus, testResultMetadata}),
          sheetWithAcrossSheetLevelTestErrors['testResults']
        )
      ),
      'testId'
    )
  );

  store.dispatch({
    type: ACTION_TYPES.TEST_ACROSS_SHEET_ITEM,
    payload: {
      testResults: _.cloneDeep(sheetWithAcrossSheetLevelTestErrors['testResults']),
      sheet: _.cloneDeep(sheetNumber),
    },
  });
}

export function getMeta(
  url,
  sheetNumber,
  rowNum,
  fieldName,
  testMetadata,
  onImageFailedLoadedCallback,
  onImageLoadedCallback,
  sourceTestId,
  sourceTestDescription
) {
  var img = new Image();
  img.addEventListener('load', function () {
    onImageLoadedCallback(this, sheetNumber, rowNum, fieldName, testMetadata);
  });
  // todo: incorporate these checks too: https://stackoverflow.com/questions/1977871/check-if-an-image-is-loaded-no-errors-with-jquery
  // https://keith.gaughan.ie/detecting-broken-images-js.html
  img.addEventListener('error', function () {
    onImageFailedLoadedCallback(sourceTestId, sourceTestDescription, sheetNumber, rowNum, fieldName, testMetadata);
  });
  img.src = url;
}

export function onErrorLoadingTheImage(
  sourceTestId,
  sourceTestDescription,
  sheetNumber,
  rowNum,
  fieldName,
  testMetadata
) {
  dispatchTestItemAction(
    TEST_DEFINITIONS.TESTS.TEST_IMAGE_CANT_LOAD.id,
    TEST_DEFINITIONS.TESTS.TEST_IMAGE_CANT_LOAD.description,
    TEST_STATUS.TEST_FAILED,
    sheetNumber,
    rowNum,
    fieldName
  );
  dispatchTestItemAction(sourceTestId, sourceTestDescription, TEST_STATUS.TEST_FAILED, sheetNumber, rowNum, fieldName);
}

export function isImageUrlOfAllowedImageFormats(
  url,
  formatsArray = TEST_DEFINITIONS.TESTS.TEST_IMAGE_FORMAT_INCORRECT.metadata.IMAGE_FORMATS_ALLOWED
) {
  if (typeof url !== 'string') return false;
  const formatsConcatString = formatsArray.reduce((total, format) => total + '|' + format);
  const newRegExp = new RegExp(`^http[^\\?]*.(${formatsConcatString})(\\?(.*))?$`, 'gim');
  // eslint-disable-next-line
  return url.match(newRegExp) != null;
}

export function isPngImage(url) {
  return isImageUrlOfAllowedImageFormats(url, ['png']);
}

export function getDifferingColumnNames(colNames1, colNames2) {
  // Checking Number of Columns as same:
  if (colNames1.length !== colNames2.length) return _.difference(colNames1, colNames2);
  // Checking column names not be different:
  else if (_.difference(colNames1, colNames2).length > 0) return _.difference(colNames1, colNames2);
  // Checking column name or order are different:
  else {
    let unmatchedCols = [];
    for (let i = 0; i < colNames1.length; i++) {
      if (colNames1[i] !== colNames2[i]) {
        unmatchedCols.push({colNames1, colNames2});
      }
    }
    if (unmatchedCols.length > 0) return unmatchedCols;
    // todo: check column data type too (String, number, Image url, etc.)?
    return null;
  }
}

export function getUniqueRowsAfterColumnConcat(sheetNumber, columnNums, rowStart, rowEnd) {
  const state = store.getState();
  const importedSheetData = state.root.importedData[sheetNumber];
  if (rowEnd === UNTIL_LAST_ROW) {
    rowEnd = importedSheetData.length - 1;
  }

  const columnNames = Object.keys(importedSheetData[rowStart]);
  const seenRows = new Map();

  for (let rowIdx = rowStart; rowIdx <= rowEnd; rowIdx++) {
    let concatenatedRow = '';
    for (let colIdx of columnNums) {
      concatenatedRow += importedSheetData[rowIdx][columnNames[colIdx]];
    }

    if (seenRows.has(concatenatedRow)) {
      seenRows.set(concatenatedRow, [...seenRows.get(concatenatedRow), rowIdx]);
    } else {
      seenRows.set(concatenatedRow, [rowIdx]);
    }
  }
  const duplicatedRows = Array.from(seenRows).filter(([_concatRowText, _rowIndexes]) => _rowIndexes.length > 1);
  return duplicatedRows;
}

export function getUniqueRowsAfterColumnConcatAcross2Sheets(
  sheetNumber,
  columnNumsThisSheet,
  rowStartThisSheet,
  rowEndThisSheet,
  otherSheetNum,
  columnNumsOtherSheet,
  rowStartOtherSheet,
  rowEndOtherSheet
) {
  const state = store.getState();
  const importedThisSheetData = state.root.importedData[sheetNumber];
  const importedOtherSheetData = state.root.importedData[otherSheetNum];

  if (rowEndThisSheet === UNTIL_LAST_ROW) {
    rowEndThisSheet = importedThisSheetData.length - 1;
  }
  if (rowEndOtherSheet === UNTIL_LAST_ROW) {
    rowEndOtherSheet = importedOtherSheetData.length - 1;
  }

  const columnNamesThisSheet = Object.keys(importedThisSheetData[rowStartThisSheet]);
  const columnNamesOtherSheet = Object.keys(importedOtherSheetData[rowStartOtherSheet]);

  /*
  Construct Sheet 1 Map (concatRow -> [rowIdx])
  Construct Sheet 2 Map (concatRow -> [rowIdx])
  Compare:
    (This) Sheet 1 (row) -> Present in Sheet2 ?
                  -> Present Only once ?
                      -> Pass
                      -> Fail -> concatString, [sheetNum,rowIdxThis], [sheetNum,rowIdxOther]
    (Other) Sheet 2 (row) -> Present in Sheet1 ?
                -> Present Only once ?
                    -> Pass
                    -> Fail -> concatString, [sheetNum,rowIdxOther], [sheetNum,rowIdxThis]
  */

  const seenRowsInThisSheet = constructRowsSeenMap(
    rowStartThisSheet,
    rowEndThisSheet,
    columnNumsThisSheet,
    importedThisSheetData,
    columnNamesThisSheet
  );

  const seenRowsInOtherSheet = constructRowsSeenMap(
    rowStartOtherSheet,
    rowEndOtherSheet,
    columnNumsOtherSheet,
    importedOtherSheetData,
    columnNamesOtherSheet
  );

  const nonUniqueOcurrencesIn2Sheets = [
    ...findNonUniqueMatches(seenRowsInThisSheet, seenRowsInOtherSheet, sheetNumber, otherSheetNum),
    ...findNonUniqueMatches(seenRowsInOtherSheet, seenRowsInThisSheet, otherSheetNum, sheetNumber),
  ];

  return nonUniqueOcurrencesIn2Sheets;
}

function constructRowsSeenMap(
  rowStartInSheet,
  rowEndInSheet,
  columnNumsInSheet,
  importedInSheetData,
  columnNamesInSheet
) {
  const seenRowsInTheSheet = new Map();
  for (let rowIdx = rowStartInSheet; rowIdx <= rowEndInSheet; rowIdx++) {
    let concatenatedRow = '';
    for (let colIdx of columnNumsInSheet) {
      concatenatedRow += importedInSheetData[rowIdx][columnNamesInSheet[colIdx]];
    }

    if (seenRowsInTheSheet.has(concatenatedRow)) {
      seenRowsInTheSheet.set(concatenatedRow, [...seenRowsInTheSheet.get(concatenatedRow), rowIdx]);
    } else {
      seenRowsInTheSheet.set(concatenatedRow, [rowIdx]);
    }
  }
  return seenRowsInTheSheet;
}

function findNonUniqueMatches(fromMap, toMap, fromSheetNum, toSheetNum) {
  const nonUniqueOccurences = [];
  for (const [_concatRowText, _rowIndexes] of fromMap) {
    // ABSENCE:
    if (!toMap.has(_concatRowText) || (toMap.has(_concatRowText) && toMap.get(_concatRowText).length < 1)) {
      nonUniqueOccurences.push({
        concatString: _concatRowText,
        from: {sheetNum: fromSheetNum, rowIdx: [..._rowIndexes]},
        to: {sheetNum: toSheetNum, rowIdx: []},
        type: UNIQUE_OCCURRENCE_STATUS.ABSENT,
      });
    }
    // MULTIPLE OCCURRENCES:
    else if (toMap.get(_concatRowText).length > 1) {
      nonUniqueOccurences.push({
        concatString: _concatRowText,
        from: {sheetNum: fromSheetNum, rowIdx: [..._rowIndexes]},
        to: {sheetNum: toSheetNum, rowIdx: [...toMap.get(_concatRowText)]},
        type: UNIQUE_OCCURRENCE_STATUS.MULTIPLE_OCCURRENCE,
      });
    }
  }
  return nonUniqueOccurences;
}

export function getColumnNames(state, sheetNum, rowNum) {
  return Object.keys(state.root.importedData[sheetNum][rowNum]);
}

export function findTestFunctionByTestId(testId) {
  return _.filter(TEST_DEFINITIONS.TESTS, (key) => key.id === testId)[0];
}