import store from '../store/store';
import ACTION_TYPES from '../store/ACTION_TYPES';
import TEST_DEFINITIONS from '../store/TEST_DEFINITIONS';
import _ from 'lodash';

function ImageTests() {
  const state = store.getState();
  performImageTests(state);
}

function getMeta(url, existingObjectStoredInField, sheetNumber, rowNum, fieldName) {
  var img = new Image();
  img.addEventListener('load', function () {
    analyzeLoadedImage(this, existingObjectStoredInField, sheetNumber, rowNum, fieldName);
  });
  // todo: incorporate these checks too: https://stackoverflow.com/questions/1977871/check-if-an-image-is-loaded-no-errors-with-jquery
  // https://keith.gaughan.ie/detecting-broken-images-js.html
  img.addEventListener('error', function () {
    onErrorLoadingTheImage(existingObjectStoredInField, sheetNumber, rowNum, fieldName);
  });
  img.src = url;
}

function performImageTests(state) {
  console.log('img tests running');
  const FIELDS_FOR_TESTS = [12, 13];
  const SHEETS_FOR_TESTS = [0];

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
        const fieldName = ROW_KEYS[fieldIndex];
        const existingObjectStoredInField = _.cloneDeep(rowWithError[ROW_KEYS[fieldIndex]]);
        const imgUrl = existingObjectStoredInField.value;

        getMeta(imgUrl, existingObjectStoredInField, sheetNumber, rowNum, fieldName);
      }
    }
  }
}

function analyzeLoadedImage(imgElement, existingObjectStoredInField, sheetNumber, rowNum, fieldName) {
  const DIMENSION_DESIRED_HEIGHT = 650;
  const DIMENSION_DESIRED_WIDTH = 650;
  // todo: size list too, not just particular size for a column?
  // todo: allow different sizes for different columns.
  if (imgElement.height !== DIMENSION_DESIRED_HEIGHT || imgElement.width !== DIMENSION_DESIRED_WIDTH) {
    existingObjectStoredInField['testResults'] = [
      ...existingObjectStoredInField['testResults'],
      TEST_DEFINITIONS.TESTS.TEST_IMAGE_DIMENSIONS_INCORRECT.id,
    ];
  }
  // todo: allow selected image formats only.

  //   if (imgElement === 0) {
  //     existingObjectStoredInField['testResults'] = [
  //       ...existingObjectStoredInField['testResults'],
  //       TEST_DEFINITIONS.TESTS.TEST_IMAGE_FORMAT_INCORRECT.id,
  //     ];
  //   }
  dispatchTestItemAction(existingObjectStoredInField, sheetNumber, rowNum, fieldName);
}

function onErrorLoadingTheImage(existingObjectStoredInField, sheetNumber, rowNum, fieldName) {
  existingObjectStoredInField['testResults'] = [
    ...existingObjectStoredInField['testResults'],
    TEST_DEFINITIONS.TESTS.TEST_IMAGE_CANT_LOAD.id,
  ];

  dispatchTestItemAction(existingObjectStoredInField, sheetNumber, rowNum, fieldName);
}

function dispatchTestItemAction(existingObjectStoredInField, sheetNumber, rowNum, fieldName) {
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

export default ImageTests;
