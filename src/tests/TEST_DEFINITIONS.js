import * as TestUtils from './TestUtils';

const TEST_DEFINITIONS = {
  TESTS: {
    TEST_TEXT_EMPTY: {
      id: 'TEST_TEXT_EMPTY',
      description: 'text is empty.',
      metadata: {},
      testFunction(testData, sheetNumber, rowNum, fieldName, testMetadata) {
        if (!testData) {
          TestUtils.dispatchTestItemAction(this.id, this.description, false, sheetNumber, rowNum, fieldName);
        } else {
          TestUtils.dispatchTestItemAction(this.id, '', true, sheetNumber, rowNum, fieldName);
        }
      },
    },

    TEST_TEXT_TOO_LONG: {
      id: 'TEST_TEXT_TOO_LONG',
      description: 'text too long.',
      metadata: {MAX_CHAR_LEN: 200},
      testFunction(testData, sheetNumber, rowNum, fieldName, testMetadata) {
        if (testMetadata.MAX_CHAR_LEN) {
          if (testData.length > testMetadata.MAX_CHAR_LEN) {
            TestUtils.dispatchTestItemAction(
              this.id,
              `${this.description} (Exists:${testData.length}/Max_Allowed:${testMetadata.MAX_CHAR_LEN})`,
              false,
              sheetNumber,
              rowNum,
              fieldName
            );
          } else {
            TestUtils.dispatchTestItemAction(this.id, '', true, sheetNumber, rowNum, fieldName);
          }
        } else {
          if (testData.length > this.metadata.MAX_CHAR_LEN) {
            TestUtils.dispatchTestItemAction(
              this.id,
              `${this.description} (Exists:${testData.length}/Max_Allowed:${this.metadata.MAX_CHAR_LEN})`,
              false,
              sheetNumber,
              rowNum,
              fieldName
            );
          } else {
            TestUtils.dispatchTestItemAction(this.id, '', true, sheetNumber, rowNum, fieldName);
          }
        }
      },
    },

    TEST_TEXT_TOO_SHORT: {
      id: 'TEST_TEXT_TOO_SHORT',
      description: 'text too short.',
      metadata: {MIN_CHAR_LEN: 20},
      testFunction(testData, sheetNumber, rowNum, fieldName, testMetadata) {
        if (testMetadata.MIN_CHAR_LEN) {
          if (testData.length < testMetadata.MIN_CHAR_LEN) {
            TestUtils.dispatchTestItemAction(
              this.id,
              `${this.description} (Exists:${testData.length}/Min_Allowed:${testMetadata.MIN_CHAR_LEN})`,
              false,
              sheetNumber,
              rowNum,
              fieldName
            );
          } else {
            TestUtils.dispatchTestItemAction(this.id, '', true, sheetNumber, rowNum, fieldName);
          }
        } else {
          if (testData.length < this.metadata.MIN_CHAR_LEN) {
            TestUtils.dispatchTestItemAction(
              this.id,
              `${this.description} (Exists:${testData.length}/Min_Allowed:${this.metadata.MIN_CHAR_LEN})`,
              false,
              sheetNumber,
              rowNum,
              fieldName
            );
          } else {
            TestUtils.dispatchTestItemAction(this.id, '', true, sheetNumber, rowNum, fieldName);
          }
        }
      },
    },

    // Image Tests:
    TEST_IMAGE_CANT_LOAD: {
      id: 'TEST_IMAGE_CANT_LOAD',
      metadata: {},
      description: 'cant load image.',
      testFunction(url, sheetNumber, rowNum, fieldName, testMetadata) {
        TestUtils.getMeta(
          url,
          sheetNumber,
          rowNum,
          fieldName,
          testMetadata,
          TestUtils.onErrorLoadingTheImage,
          this.onImageLoadedCallback.bind(this)
        );
      },
      onImageLoadedCallback(imgElement, sheetNumber, rowNum, fieldName, testMetadata) {
        TestUtils.dispatchTestItemAction(this.id, '', true, sheetNumber, rowNum, fieldName);
      },
    },

    TEST_IMAGE_DIMENSIONS_INCORRECT: {
      id: 'TEST_IMAGE_DIMENSIONS_INCORRECT',
      description: 'image dimensions incorrect.',
      metadata: {
        WIDTH_IN_PIXELS: 650,
        HEIGHT_IN_PIXELS: 650,
      },
      testFunction(url, sheetNumber, rowNum, fieldName, testMetadata) {
        TestUtils.getMeta(
          url,
          sheetNumber,
          rowNum,
          fieldName,
          testMetadata,
          TestUtils.onErrorLoadingTheImage,
          this.onImageLoadedCallback.bind(this)
        );
      },
      onImageLoadedCallback(imgElement, sheetNumber, rowNum, fieldName, testMetadata) {
        const DIMENSION_DESIRED_WIDTH = testMetadata.WIDTH_IN_PIXELS;
        const DIMENSION_DESIRED_HEIGHT = testMetadata.HEIGHT_IN_PIXELS;

        if (DIMENSION_DESIRED_HEIGHT && DIMENSION_DESIRED_WIDTH) {
          if (imgElement.height !== DIMENSION_DESIRED_HEIGHT || imgElement.width !== DIMENSION_DESIRED_WIDTH) {
            TestUtils.dispatchTestItemAction(
              this.id,
              `${this.description} (Exists:${imgElement.height},${imgElement.width}/Allowed:${DIMENSION_DESIRED_HEIGHT},${DIMENSION_DESIRED_WIDTH})`,
              false,
              sheetNumber,
              rowNum,
              fieldName
            );
          } else {
            TestUtils.dispatchTestItemAction(this.id, '', true, sheetNumber, rowNum, fieldName);
          }
        } else {
          if (
            imgElement.width !== this.metadata.WIDTH_IN_PIXELS ||
            imgElement.height !== this.metadata.HEIGHT_IN_PIXELS
          ) {
            TestUtils.dispatchTestItemAction(
              this.id,
              `${this.description} (Exists:${imgElement.height},${imgElement.width}/Allowed:${this.metadata.HEIGHT_IN_PIXELS},${this.metadata.WIDTH_IN_PIXELS})`,
              false,
              sheetNumber,
              rowNum,
              fieldName
            );
          } else {
            TestUtils.dispatchTestItemAction(this.id, '', true, sheetNumber, rowNum, fieldName);
          }
        }
      },
    },

    TEST_IMAGE_FORMAT_INCORRECT: {
      id: 'TEST_IMAGE_FORMAT_INCORRECT',
      description: 'image format incorrect.',
      metadata: {
        IMAGE_FORMATS_ALLOWED: ['png', 'jpg', 'jpeg'],
      },
      testFunction(url, sheetNumber, rowNum, fieldName, testMetadata) {
        if (testMetadata.IMAGE_FORMATS_ALLOWED.length > 0) {
          if (!TestUtils.isImageUrlOfAllowedImageFormats(url, testMetadata.IMAGE_FORMATS_ALLOWED)) {
            TestUtils.dispatchTestItemAction(
              this.id,
              `${this.description} (Allowed:${testMetadata.IMAGE_FORMATS_ALLOWED.join()}`,
              false,
              sheetNumber,
              rowNum,
              fieldName
            );
          } else {
            TestUtils.dispatchTestItemAction(this.id, '', true, sheetNumber, rowNum, fieldName);
          }
        } else {
          if (!TestUtils.isImageUrlOfAllowedImageFormats(url, this.metadata.IMAGE_FORMATS_ALLOWED)) {
            TestUtils.dispatchTestItemAction(
              this.id,
              `${this.description} (Allowed:${this.metadata.IMAGE_FORMATS_ALLOWED.join()}`,
              false,
              sheetNumber,
              rowNum,
              fieldName
            );
          } else {
            TestUtils.dispatchTestItemAction(this.id, '', true, sheetNumber, rowNum, fieldName);
          }
        }
      },
    },
  },
};

export default TEST_DEFINITIONS;
