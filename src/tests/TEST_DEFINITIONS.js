import _ from 'lodash';

import * as TestUtils from './TestUtils';

const TEST_DEFINITIONS = {
  TESTS: {
    // Text Tests:
    TEST_TEXT_EMPTY: {
      id: 'TEST_TEXT_EMPTY',
      description: 'text is empty.',
      metadata: {},
      testFunction(testData, sheetNumber, rowNum, fieldName, testMetadata) {
        if (!testData) {
          TestUtils.dispatchTestItemAction(
            this.id,
            this.description,
            TEST_STATUS.TEST_FAILED,
            sheetNumber,
            rowNum,
            fieldName
          );
          return;
        } else {
          TestUtils.dispatchTestItemAction(this.id, '', TEST_STATUS.TEST_PASSED, sheetNumber, rowNum, fieldName);
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
              TEST_STATUS.TEST_FAILED,
              sheetNumber,
              rowNum,
              fieldName
            );
          } else {
            TestUtils.dispatchTestItemAction(this.id, '', TEST_STATUS.TEST_PASSED, sheetNumber, rowNum, fieldName);
          }
        } else {
          if (testData.length > this.metadata.MAX_CHAR_LEN) {
            TestUtils.dispatchTestItemAction(
              this.id,
              `${this.description} (Exists:${testData.length}/Max_Allowed:${this.metadata.MAX_CHAR_LEN})`,
              TEST_STATUS.TEST_FAILED,
              sheetNumber,
              rowNum,
              fieldName
            );
          } else {
            TestUtils.dispatchTestItemAction(this.id, '', TEST_STATUS.TEST_PASSED, sheetNumber, rowNum, fieldName);
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
              TEST_STATUS.TEST_FAILED,
              sheetNumber,
              rowNum,
              fieldName
            );
          } else {
            TestUtils.dispatchTestItemAction(this.id, '', TEST_STATUS.TEST_PASSED, sheetNumber, rowNum, fieldName);
          }
        } else {
          if (testData.length < this.metadata.MIN_CHAR_LEN) {
            TestUtils.dispatchTestItemAction(
              this.id,
              `${this.description} (Exists:${testData.length}/Min_Allowed:${this.metadata.MIN_CHAR_LEN})`,
              TEST_STATUS.TEST_FAILED,
              sheetNumber,
              rowNum,
              fieldName
            );
          } else {
            TestUtils.dispatchTestItemAction(this.id, '', TEST_STATUS.TEST_PASSED, sheetNumber, rowNum, fieldName);
          }
        }
      },
    },

    TEST_TEXT_ENUM_MATCHES: {
      id: 'TEST_TEXT_ENUM_MATCHES',
      description: 'Text not defined in possible text values.',
      metadata: {ALLOWED_VALUES: ['Y', 'N']},
      testFunction(testData, sheetNumber, rowNum, fieldName, testMetadata) {
        if (!testData) {
          TestUtils.dispatchTestItemAction(
            this.id,
            TEST_DEFINITIONS.TESTS.TEST_TEXT_EMPTY.description,
            TEST_STATUS.TEST_FAILED,
            sheetNumber,
            rowNum,
            fieldName
          );
          return;
        }
        if (testMetadata.ALLOWED_VALUES && testMetadata.ALLOWED_VALUES.length > 0) {
          if (!_.includes(testMetadata.ALLOWED_VALUES, testData)) {
            TestUtils.dispatchTestItemAction(
              this.id,
              `${this.description} (Exists:${testData}/Allowed:${testMetadata.ALLOWED_VALUES.join(' ')})`,
              TEST_STATUS.TEST_FAILED,
              sheetNumber,
              rowNum,
              fieldName
            );
          } else {
            TestUtils.dispatchTestItemAction(this.id, '', TEST_STATUS.TEST_PASSED, sheetNumber, rowNum, fieldName);
          }
        } else {
          if (!_.includes(this.metadata.ALLOWED_VALUES, testData)) {
            TestUtils.dispatchTestItemAction(
              this.id,
              `${this.description} (Exists:${testData.length}/Min_Allowed:${this.metadata.MIN_CHAR_LEN})`,
              TEST_STATUS.TEST_FAILED,
              sheetNumber,
              rowNum,
              fieldName
            );
          } else {
            TestUtils.dispatchTestItemAction(this.id, '', TEST_STATUS.TEST_PASSED, sheetNumber, rowNum, fieldName);
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
        if (!url) {
          TestUtils.dispatchTestItemAction(
            this.id,
            TEST_DEFINITIONS.TESTS.TEST_TEXT_EMPTY.description,
            TEST_STATUS.TEST_FAILED,
            sheetNumber,
            rowNum,
            fieldName
          );
          return;
        }

        TestUtils.dispatchTestItemAction(this.id, '', TEST_STATUS.TEST_LOADING, sheetNumber, rowNum, fieldName);
        TestUtils.getMeta(
          url,
          sheetNumber,
          rowNum,
          fieldName,
          testMetadata,
          TestUtils.onErrorLoadingTheImage,
          this.onImageLoadedCallback.bind(this),
          this.id,
          TEST_DEFINITIONS.TESTS.TEST_IMAGE_CANT_LOAD.description
        );
      },
      onImageLoadedCallback(imgElement, sheetNumber, rowNum, fieldName, testMetadata) {
        TestUtils.dispatchTestItemAction(this.id, '', TEST_STATUS.TEST_PASSED, sheetNumber, rowNum, fieldName);
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
        if (!url) {
          TestUtils.dispatchTestItemAction(
            this.id,
            TEST_DEFINITIONS.TESTS.TEST_TEXT_EMPTY.description,
            TEST_STATUS.TEST_FAILED,
            sheetNumber,
            rowNum,
            fieldName
          );
          return;
        }
        TestUtils.dispatchTestItemAction(this.id, '', TEST_STATUS.TEST_LOADING, sheetNumber, rowNum, fieldName);
        TestUtils.getMeta(
          url,
          sheetNumber,
          rowNum,
          fieldName,
          testMetadata,
          TestUtils.onErrorLoadingTheImage,
          this.onImageLoadedCallback.bind(this),
          this.id,
          TEST_DEFINITIONS.TESTS.TEST_IMAGE_CANT_LOAD.description
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
              TEST_STATUS.TEST_FAILED,
              sheetNumber,
              rowNum,
              fieldName
            );
          } else {
            TestUtils.dispatchTestItemAction(this.id, '', TEST_STATUS.TEST_PASSED, sheetNumber, rowNum, fieldName);
          }
        } else {
          if (
            imgElement.width !== this.metadata.WIDTH_IN_PIXELS ||
            imgElement.height !== this.metadata.HEIGHT_IN_PIXELS
          ) {
            TestUtils.dispatchTestItemAction(
              this.id,
              `${this.description} (Exists:${imgElement.height},${imgElement.width}/Allowed:${this.metadata.HEIGHT_IN_PIXELS},${this.metadata.WIDTH_IN_PIXELS})`,
              TEST_STATUS.TEST_FAILED,
              sheetNumber,
              rowNum,
              fieldName
            );
          } else {
            TestUtils.dispatchTestItemAction(this.id, '', TEST_STATUS.TEST_PASSED, sheetNumber, rowNum, fieldName);
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
        if (!url) {
          TestUtils.dispatchTestItemAction(
            this.id,
            TEST_DEFINITIONS.TESTS.TEST_TEXT_EMPTY.description,
            TEST_STATUS.TEST_FAILED,
            sheetNumber,
            rowNum,
            fieldName
          );
          return;
        }
        if (testMetadata.IMAGE_FORMATS_ALLOWED.length > 0) {
          if (!TestUtils.isImageUrlOfAllowedImageFormats(url, testMetadata.IMAGE_FORMATS_ALLOWED)) {
            TestUtils.dispatchTestItemAction(
              this.id,
              `${this.description} (Allowed:${testMetadata.IMAGE_FORMATS_ALLOWED.join()}`,
              TEST_STATUS.TEST_FAILED,
              sheetNumber,
              rowNum,
              fieldName
            );
          } else {
            TestUtils.dispatchTestItemAction(this.id, '', TEST_STATUS.TEST_PASSED, sheetNumber, rowNum, fieldName);
          }
        } else {
          if (!TestUtils.isImageUrlOfAllowedImageFormats(url, this.metadata.IMAGE_FORMATS_ALLOWED)) {
            TestUtils.dispatchTestItemAction(
              this.id,
              `${this.description} (Allowed:${this.metadata.IMAGE_FORMATS_ALLOWED.join()}`,
              TEST_STATUS.TEST_FAILED,
              sheetNumber,
              rowNum,
              fieldName
            );
          } else {
            TestUtils.dispatchTestItemAction(this.id, '', TEST_STATUS.TEST_PASSED, sheetNumber, rowNum, fieldName);
          }
        }
      },
    },

    // Schema Tests:
    TEST_SCHEMA_MATCH_COL_NAMES: {
      id: 'TEST_SCHEMA_MATCH_COL_NAMES',
      description: 'Schema mismatching.',
      metadata: {
        columnNames: [
          'Recommendation ID',
          'Category',
          'ORIGINAL\nlocale',
          'ORIGINAL\ntitle',
          'ORIGINAL\ndescription ',
          'Utility Defined Locale',
          'Utility Defined Title',
          'Utility Defined Description',
          'FCR \n(Y/N)',
          'Program Reco (Y/N)',
          'Tags\n(OBSOLETE COLUMN, DO NOT USE)',
          'Call To Action Text (To appear on the button to link, eg, "Enroll Now" or "Purchase Here")',
          'Link (To a detailed reco page, third-party product site, or utility program)',
          'CallToActionStyle - 0 is orange button, 1 is blue or white button\n(OBSOLETE COLUMN, DO NOT USE)',
          'Icon - (must be transparent so it works against the colored background in emails and responsive web pages)\n(Max link length = 250 char)',
          'Live Images - Thumbnail Res\n(Max link length = 250 char)',
          'Live Images - Elongated Res\n(Max link length = 250 char)',
          'Live Images - Shortened Res\n(Max link length = 250 char)',
          'Channel',
          '__EMPTY',
          '__EMPTY_1',
        ],
      },
      testFunction(existingColumnNames, sheetNumber, testMetadata) {
        if (!existingColumnNames) {
          TestUtils.dispatchTestSchemaAction(this.id, 'empty column names', TEST_STATUS.TEST_FAILED, sheetNumber, {
            existingColumnNames: [],
            allowedColumnNames: testMetadata.columnNames,
            columnNameDiff: [],
          });
          return;
        }
        if (testMetadata && testMetadata.columnNames) {
          const columnNameDiff = TestUtils.getDifferingColumnNames(existingColumnNames, testMetadata.columnNames);
          if (!columnNameDiff || columnNameDiff.length === 0) {
            TestUtils.dispatchTestSchemaAction(this.id, '', TEST_STATUS.TEST_PASSED, sheetNumber, {
              existingColumnNames,
              allowedColumnNames: testMetadata.columnNames,
              columnNameDiff,
            });
          } else {
            TestUtils.dispatchTestSchemaAction(
              this.id,
              `${
                this.description
              } (Allowed:${testMetadata.columnNames.join()} \n\nExisting:${existingColumnNames.join()}`,
              TEST_STATUS.TEST_FAILED,
              sheetNumber,
              {
                existingColumnNames,
                allowedColumnNames: testMetadata.columnNames,
                columnNameDiff,
              }
            );
          }
        } else {
          const columnNameDiff = TestUtils.getDifferingColumnNames(existingColumnNames, this.metadata.columnNames);
          if (!columnNameDiff || columnNameDiff.length === 0) {
            TestUtils.dispatchTestSchemaAction(this.id, '', TEST_STATUS.TEST_PASSED, sheetNumber, {
              existingColumnNames,
              allowedColumnNames: this.metadata.columnNames,
              columnNameDiff,
            });
          } else {
            TestUtils.dispatchTestSchemaAction(
              this.id,
              `${
                this.description
              } (Allowed: ${this.metadata.columnNames.join()} \n\nExisting:${existingColumnNames.join()}`,
              TEST_STATUS.TEST_FAILED,
              sheetNumber,
              {
                existingColumnNames,
                allowedColumnNames: this.metadata.columnNames,
                columnNameDiff,
              }
            );
          }
        }
      },
    },
  },
};

const TEST_STATUS = {
  TEST_PASSED: 'TEST_PASSED',
  TEST_FAILED: 'TEST_FAILED',
  TEST_LOADING: 'TEST_LOADING',
};

export {TEST_STATUS};

export default TEST_DEFINITIONS;
