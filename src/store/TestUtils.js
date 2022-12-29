import _ from 'lodash';

import store from './store';
import ACTION_TYPES from './ACTION_TYPES';
import TEST_DEFINITIONS from './TEST_DEFINITIONS';

export function dispatchTestItemAction(existingObjectStoredInField, sheetNumber, rowNum, fieldName) {
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

export function getMeta(url, existingObjectStoredInField, sheetNumber, rowNum, fieldName, testMetadata, onImageFailedLoadedCallback, onImageLoadedCallback) {
    var img = new Image();
    img.addEventListener('load', function () {
        onImageLoadedCallback(this, existingObjectStoredInField, sheetNumber, rowNum, fieldName, testMetadata);
    });
    // todo: incorporate these checks too: https://stackoverflow.com/questions/1977871/check-if-an-image-is-loaded-no-errors-with-jquery
    // https://keith.gaughan.ie/detecting-broken-images-js.html
    img.addEventListener('error', function () {
        onImageFailedLoadedCallback(existingObjectStoredInField, sheetNumber, rowNum, fieldName, testMetadata);
    });
    img.src = url;
}

export function analyzeLoadedImage(imgElement, existingObjectStoredInField, sheetNumber, rowNum, fieldName, testMetadata) {
    const DIMENSION_DESIRED_HEIGHT = testMetadata.WIDTH_IN_PIXELS;
    const DIMENSION_DESIRED_WIDTH = testMetadata.HEIGHT_IN_PIXELS;
    if (imgElement.height !== DIMENSION_DESIRED_HEIGHT || imgElement.width !== DIMENSION_DESIRED_WIDTH) {
        existingObjectStoredInField = _.cloneDeep(existingObjectStoredInField);
        existingObjectStoredInField['testResults'] = [
            ...existingObjectStoredInField['testResults'],
            TEST_DEFINITIONS.TESTS.TEST_IMAGE_DIMENSIONS_INCORRECT.id,
        ];
    }
    dispatchTestItemAction(existingObjectStoredInField, sheetNumber, rowNum, fieldName);
}

export function onErrorLoadingTheImage(existingObjectStoredInField, sheetNumber, rowNum, fieldName, testMetadata) {
    existingObjectStoredInField['testResults'] = [
        ...existingObjectStoredInField['testResults'],
        TEST_DEFINITIONS.TESTS.TEST_IMAGE_CANT_LOAD.id,
    ];

    dispatchTestItemAction(existingObjectStoredInField, sheetNumber, rowNum, fieldName);
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