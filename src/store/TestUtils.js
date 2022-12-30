import _ from 'lodash';

import store from './store';
import ACTION_TYPES from './ACTION_TYPES';
import TEST_DEFINITIONS from './TEST_DEFINITIONS';

export function dispatchTestItemAction(testId, sheetNumber, rowNum, fieldName) {
    // Get latest state picture, since last test check. 
    // Each test check can dispatch (asyncronous) actions. 
    // Hence we need the latest state per test.
    const state = store.getState();
    const sheetWithError = state.root.testResultsData[sheetNumber];
    const rowWithError = sheetWithError[rowNum];
    let existingObjectStoredInField = rowWithError[fieldName];

    existingObjectStoredInField['testResults'] = _.cloneDeep(_.union(existingObjectStoredInField['testResults'], [testId]));

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

export function getMeta(url, sheetNumber, rowNum, fieldName, testMetadata, onImageFailedLoadedCallback, onImageLoadedCallback) {
    var img = new Image();
    img.addEventListener('load', function () {
        onImageLoadedCallback(this, sheetNumber, rowNum, fieldName, testMetadata);
    });
    // todo: incorporate these checks too: https://stackoverflow.com/questions/1977871/check-if-an-image-is-loaded-no-errors-with-jquery
    // https://keith.gaughan.ie/detecting-broken-images-js.html
    img.addEventListener('error', function () {
        onImageFailedLoadedCallback(sheetNumber, rowNum, fieldName, testMetadata);
    });
    img.src = url;
}

export function onErrorLoadingTheImage(sheetNumber, rowNum, fieldName, testMetadata) {
    dispatchTestItemAction(TEST_DEFINITIONS.TESTS.TEST_IMAGE_CANT_LOAD.id, sheetNumber, rowNum, fieldName);
}

export function isImageUrlOfAllowedImageFormats(url, formatsArray = TEST_DEFINITIONS.TESTS.TEST_IMAGE_FORMAT_INCORRECT.metadata.IMAGE_FORMATS_ALLOWED) {
    if (typeof url !== 'string') return false;
    const formatsConcatString = formatsArray.reduce((total, format) => total + '|' + format);
    const newRegExp = new RegExp(`^http[^\\?]*.(${formatsConcatString})(\\?(.*))?$`, 'gim');
    // eslint-disable-next-line
    return url.match(newRegExp) != null;
}

export function isPngImage(url) {
    return isImageUrlOfAllowedImageFormats(url, ['png']);
}