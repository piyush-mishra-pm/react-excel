import * as TestUtils from './TestUtils';

const TEST_DEFINITIONS = {
  TESTS: {
    TEST_TEXT_EMPTY: {
      id: 'TEST_TEXT_EMPTY',
      description: 'text is empty.',
      metadata: {},
      testFunction(testData, existingObjectStoredInField, sheetNumber, rowNum, fieldName, testMetadata) {
        if (testData.length > 0) {
          existingObjectStoredInField['testResults'] = [
            ...existingObjectStoredInField['testResults'],
            this.id,
          ];
          TestUtils.dispatchTestItemAction(existingObjectStoredInField, sheetNumber, rowNum, fieldName);
        }
      },
    },

    TEST_TEXT_TOO_LONG: {
      id: 'TEST_TEXT_TOO_LONG',
      description: 'text too long.',
      metadata: { MAX_CHAR_LEN: 200 },
      testFunction(testData, existingObjectStoredInField, sheetNumber, rowNum, fieldName, testMetadata) {
        if (testData.length > testMetadata.MAX_CHAR_LEN || testData.length > this.MAX_CHAR_LEN) {
          existingObjectStoredInField['testResults'] = [
            ...existingObjectStoredInField['testResults'],
            this.id,
          ];
          TestUtils.dispatchTestItemAction(existingObjectStoredInField, sheetNumber, rowNum, fieldName);
        }
      },
    },

    TEST_TEXT_TOO_SHORT: {
      id: 'TEST_TEXT_TOO_SHORT', description: 'text too short.', metadata: { MIN_CHAR_LEN: 200 }, testFunction(testData, existingObjectStoredInField, sheetNumber, rowNum, fieldName, testMetadata) {
        if (testData.length < testMetadata.MIN_CHAR_LEN || testData.length < this.MIN_CHAR_LEN) {
          existingObjectStoredInField['testResults'] = [
            ...existingObjectStoredInField['testResults'],
            this.id,
          ];
          TestUtils.dispatchTestItemAction(existingObjectStoredInField, sheetNumber, rowNum, fieldName);
        }
      },
    },

    // Image Tests: 
    TEST_IMAGE_CANT_LOAD: {
      id: 'TEST_IMAGE_CANT_LOAD', metadata: {}, description: 'cant load image.',
      testFunction(url, existingObjectStoredInField, sheetNumber, rowNum, fieldName, testMetadata) {
        TestUtils.getMeta(url, existingObjectStoredInField, sheetNumber, rowNum, fieldName, testMetadata, TestUtils.onErrorLoadingTheImage, this.onImageLoadedCallback);
      },
      onImageLoadedCallback(...args) { }
    },

    TEST_IMAGE_DIMENSIONS_INCORRECT: {
      id: 'TEST_IMAGE_DIMENSIONS_INCORRECT',
      description: 'image dimensions incorrect.',
      metadata: {
        WIDTH_IN_PIXELS: 650,
        HEIGHT_IN_PIXELS: 650,
      },
      testFunction(url, existingObjectStoredInField, sheetNumber, rowNum, fieldName, testMetadata) {
        TestUtils.getMeta(url, existingObjectStoredInField, sheetNumber, rowNum, fieldName, testMetadata, TestUtils.onErrorLoadingTheImage, this.onImageLoadedCallback.bind(this));
      },
      onImageLoadedCallback(imgElement, existingObjectStoredInField, sheetNumber, rowNum, fieldName, testMetadata) {
        const DIMENSION_DESIRED_WIDTH = testMetadata.WIDTH_IN_PIXELS;
        const DIMENSION_DESIRED_HEIGHT = testMetadata.HEIGHT_IN_PIXELS;
        console.log(imgElement.src, testMetadata.WIDTH_IN_PIXELS, imgElement.width, testMetadata.HEIGHT_IN_PIXELS, imgElement.height);
        if ((DIMENSION_DESIRED_HEIGHT && imgElement.height !== DIMENSION_DESIRED_HEIGHT) || imgElement.height !== this.metadata.HEIGHT_IN_PIXELS) {
          existingObjectStoredInField['testResults'] = [
            ...existingObjectStoredInField['testResults'],
            this.id,
          ];
        } else if ((DIMENSION_DESIRED_WIDTH && imgElement.width !== DIMENSION_DESIRED_WIDTH) || imgElement.width !== this.metadata.WIDTH_IN_PIXELS) {
          existingObjectStoredInField['testResults'] = [
            ...existingObjectStoredInField['testResults'],
            this.id,
          ];
        }

        TestUtils.dispatchTestItemAction(existingObjectStoredInField, sheetNumber, rowNum, fieldName);
      }
    },

    TEST_IMAGE_FORMAT_INCORRECT: {
      id: 'TEST_IMAGE_FORMAT_INCORRECT',
      description: 'image format incorrect.',
      metadata: {
        IMAGE_FORMATS_ALLOWED: ['png', 'jpg', 'jpeg'],
      },
      testFunction(url, existingObjectStoredInField, sheetNumber, rowNum, fieldName, testMetadata) {
        if (!TestUtils.isImageUrlOfAllowedImageFormats(url, testMetadata.IMAGE_FORMATS_ALLOWED)) {
          existingObjectStoredInField['testResults'] = [
            ...existingObjectStoredInField['testResults'],
            this.id,
          ];
          TestUtils.dispatchTestItemAction(existingObjectStoredInField, sheetNumber, rowNum, fieldName);
        }
      }
    },
  },
};

export default TEST_DEFINITIONS;