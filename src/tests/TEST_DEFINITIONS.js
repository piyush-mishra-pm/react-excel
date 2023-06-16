import _ from 'lodash';

import * as TestUtils from './TestUtils';

const TEST_STATUS = {
  TEST_PASSED: 'TEST_PASSED',
  TEST_FAILED: 'TEST_FAILED',
  TEST_LOADING: 'TEST_LOADING',
};

const UNIQUE_OCCURRENCE_STATUS = {
  UNIQUE_OCCURRENCE: 'UNIQUE_OCCURRENCE',
  ABSENT: 'ABSENT',
  MULTIPLE_OCCURRENCE: 'MULTIPLE_OCCURRENCE',
};

const MINUS_ONE = -1;

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

    // Sheet level tests: (On 1 sheet)
    UNIQUE_ROW_AFTER_COLUMN_CONCAT: {
      id: 'UNIQUE_ROW_AFTER_COLUMN_CONCAT',
      description: 'After column concatenation, each row must be unique in this sheet.',
      metadata: {
        COLUMN_NUMS: [0, 1, 2],
        ROW_START: 1,
        ROW_END: MINUS_ONE,
        TEST_MESSAGE: 'Unique row test after column concat.',
      },
      testFunction(sheetNumber, testMetadata) {
        if (isNaN(sheetNumber) || Object.keys(testMetadata).length === 0) {
          TestUtils.dispatchSheetLevelTestAction(this.id, 'empty column names', TEST_STATUS.TEST_FAILED, sheetNumber, {
            COLUMN_NUMS: (testMetadata && testMetadata.COLUMN_NUMS) || [],
            ROW_START: (testMetadata && testMetadata.ROW_START) || MINUS_ONE,
            ROW_END: (testMetadata && testMetadata.ROW_END) || MINUS_ONE,
            MATCHED_ROWS: [],
          });
          return;
        }

        const columnNums = testMetadata.COLUMN_NUMS ? testMetadata.COLUMN_NUMS : this.metadata.COLUMN_NUMS;
        const rowStart = !isNaN(testMetadata.ROW_START) ? testMetadata.ROW_START : this.metadata.ROW_START;
        const rowEnd = !isNaN(testMetadata.ROW_END) ? testMetadata.ROW_END : this.metadata.ROW_END;
        const nonUniqueInstances = TestUtils.getUniqueRowsAfterColumnConcat(sheetNumber, columnNums, rowStart, rowEnd);
        if (!nonUniqueInstances || nonUniqueInstances.length === 0) {
          TestUtils.dispatchSheetLevelTestAction(
            this.id,
            `${testMetadata.TEST_MESSAGE}: Unique rows ${rowStart}-${
              rowEnd === -1 ? 'end' : rowEnd
            } and columns ${columnNums.join(',')} in sheet # ${sheetNumber}`,
            TEST_STATUS.TEST_PASSED,
            sheetNumber,
            {
              COLUMN_NUMS: columnNums,
              ROW_START: rowStart,
              ROW_END: rowEnd,
              MATCHED_ROWS: [],
            }
          );
        } else {
          TestUtils.dispatchSheetLevelTestAction(
            this.id,
            `${testMetadata.TEST_MESSAGE}: Repeated rows for ${rowStart}-${
              rowEnd === -1 ? 'end' : rowEnd
            } and columns ${columnNums.join(',')} in sheet # ${sheetNumber}`,
            TEST_STATUS.TEST_FAILED,
            sheetNumber,
            {
              COLUMN_NUMS: columnNums,
              ROW_START: rowStart,
              ROW_END: rowEnd,
              MATCHED_ROWS: nonUniqueInstances,
            }
          );
        }
      },
    },

    // Across Sheets tests: (On multiple sheets)
    UNIQUE_ROW_AFTER_COLUMN_CONCAT_ACROSS_SHEET: {
      id: 'UNIQUE_ROW_AFTER_COLUMN_CONCAT_ACROSS_SHEET',
      description:
        'Both the sheets must contain concatenated column string only once, within a collection of rows across those sheets. ',
      metadata: {
        COLUMN_NUMS_IN_THIS_SHEET: [0, 1, 2],
        ROW_START_IN_THIS_SHEET: 1,
        ROW_END_IN_THIS_SHEET: MINUS_ONE,
        OTHER_SHEET_NUM: 1,
        COLUMN_NUMS_IN_OTHER_SHEET: [0, 1, 2],
        ROW_START_IN_OTHER_SHEET: 1,
        ROW_END_IN_OTHER_SHEET: MINUS_ONE,
        TEST_MESSAGE: 'Unique row test after column concat across sheet.',
      },
      testFunction(sheetNumber, testMetadata) {
        if (
          isNaN(sheetNumber) ||
          isNaN(testMetadata.OTHER_SHEET_NUM) ||
          Object.keys(testMetadata).length === 0 ||
          (testMetadata.ROW_END_IN_THIS_SHEET !== MINUS_ONE &&
            testMetadata.ROW_START_IN_THIS_SHEET > testMetadata.ROW_END_IN_THIS_SHEET) ||
          (testMetadata.ROW_END_IN_THIS_SHEET !== MINUS_ONE &&
            testMetadata.ROW_START_IN_OTHER_SHEET > testMetadata.ROW_END_IN_OTHER_SHEET)
        ) {
          TestUtils.dispatchAcrossSheetTestAction(
            this.id,
            'Incorrect Test Attributes.',
            TEST_STATUS.TEST_FAILED,
            sheetNumber,
            {
              COLUMN_NUMS_IN_THIS_SHEET: (testMetadata && testMetadata.COLUMN_NUMS_IN_THIS_SHEET) || [],
              ROW_START_IN_THIS_SHEET: (testMetadata && testMetadata.ROW_START_IN_THIS_SHEET) || MINUS_ONE,
              ROW_END_IN_THIS_SHEET: (testMetadata && testMetadata.ROW_END_IN_THIS_SHEET) || MINUS_ONE,
              OTHER_SHEET_NUM: (testMetadata && testMetadata.OTHER_SHEET_NUM) || MINUS_ONE,
              COLUMN_NUMS_IN_OTHER_SHEET: (testMetadata && testMetadata.COLUMN_NUMS_IN_OTHER_SHEET) || [],
              ROW_START_IN_OTHER_SHEET: (testMetadata && testMetadata.ROW_START_IN_OTHER_SHEET) || MINUS_ONE,
              ROW_END_IN_OTHER_SHEET: (testMetadata && testMetadata.ROW_END_IN_OTHER_SHEET) || MINUS_ONE,
              MATCHED_ROWS: [],
            }
          );
          return;
        }

        const columnNumsThisSheet = testMetadata.COLUMN_NUMS_IN_THIS_SHEET
          ? testMetadata.COLUMN_NUMS_IN_THIS_SHEET
          : this.metadata.COLUMN_NUMS_IN_THIS_SHEET;
        const rowStartThisSheet = !isNaN(testMetadata.ROW_START_IN_THIS_SHEET)
          ? testMetadata.ROW_START_IN_THIS_SHEET
          : this.metadata.ROW_START_IN_THIS_SHEET;
        const rowEndThisSheet = !isNaN(testMetadata.ROW_END_IN_THIS_SHEET)
          ? testMetadata.ROW_END_IN_THIS_SHEET
          : this.metadata.ROW_END_IN_THIS_SHEET;
        const otherSheetNum = !isNaN(testMetadata.OTHER_SHEET_NUM)
          ? testMetadata.OTHER_SHEET_NUM
          : this.metadata.OTHER_SHEET_NUM;
        const columnNumsOtherSheet = testMetadata.COLUMN_NUMS_IN_OTHER_SHEET
          ? testMetadata.COLUMN_NUMS_IN_OTHER_SHEET
          : this.metadata.COLUMN_NUMS_IN_OTHER_SHEET;
        const rowStartOtherSheet = !isNaN(testMetadata.ROW_START_IN_OTHER_SHEET)
          ? testMetadata.ROW_START_IN_OTHER_SHEET
          : this.metadata.ROW_START_IN_OTHER_SHEET;
        const rowEndOtherSheet = !isNaN(testMetadata.ROW_END_IN_OTHER_SHEET)
          ? testMetadata.ROW_END_IN_OTHER_SHEET
          : this.metadata.ROW_END_IN_OTHER_SHEET;

        // Occurred None or Multiple times (but not uniquely once), across 2 sheets.
        const nonUniqueInstances = TestUtils.getUniqueRowsAfterColumnConcatAcross2Sheets(
          sheetNumber,
          columnNumsThisSheet,
          rowStartThisSheet,
          rowEndThisSheet,
          otherSheetNum,
          columnNumsOtherSheet,
          rowStartOtherSheet,
          rowEndOtherSheet
        );

        if (!nonUniqueInstances || nonUniqueInstances.length === 0) {
          TestUtils.dispatchAcrossSheetTestAction(
            this.id,
            `${testMetadata.TEST_MESSAGE}: Unique rows in ${rowStartThisSheet}-${
              rowEndThisSheet === MINUS_ONE ? 'end' : rowEndThisSheet
            } and columns ${columnNumsThisSheet.join(
              ','
            )} of sheet #${sheetNumber}, with rows in ${rowStartOtherSheet}-${
              rowEndOtherSheet === MINUS_ONE ? 'end' : rowEndOtherSheet
            } and columns ${columnNumsOtherSheet.join(',')} of sheet #${otherSheetNum}.`,
            TEST_STATUS.TEST_PASSED,
            sheetNumber,
            {
              COLUMN_NUMS_IN_THIS_SHEET: columnNumsThisSheet,
              ROW_START_IN_THIS_SHEET: rowStartThisSheet,
              ROW_END_IN_THIS_SHEET: rowEndThisSheet,
              OTHER_SHEET_NUM: otherSheetNum,
              COLUMN_NUMS_IN_OTHER_SHEET: columnNumsOtherSheet,
              ROW_START_IN_OTHER_SHEET: rowStartOtherSheet,
              ROW_END_IN_OTHER_SHEET: rowEndOtherSheet,
              MATCHED_ROWS: [],
            }
          );
        } else {
          TestUtils.dispatchAcrossSheetTestAction(
            this.id,
            `${testMetadata.TEST_MESSAGE}: Repeated rows in ${rowStartThisSheet}-${
              rowEndThisSheet === MINUS_ONE ? 'end' : rowEndThisSheet
            } and columns ${columnNumsThisSheet.join(
              ','
            )} of sheet #${sheetNumber}, with rows in ${rowStartOtherSheet}-${
              rowEndOtherSheet === MINUS_ONE ? 'end' : rowEndOtherSheet
            } and columns ${columnNumsOtherSheet.join(',')} of sheet #${otherSheetNum}.`,
            TEST_STATUS.TEST_FAILED,
            sheetNumber,
            {
              COLUMN_NUMS_IN_THIS_SHEET: columnNumsThisSheet,
              ROW_START_IN_THIS_SHEET: rowStartThisSheet,
              ROW_END_IN_THIS_SHEET: rowEndThisSheet,
              OTHER_SHEET_NUM: otherSheetNum,
              COLUMN_NUMS_IN_OTHER_SHEET: columnNumsOtherSheet,
              ROW_START_IN_OTHER_SHEET: rowStartOtherSheet,
              ROW_END_IN_OTHER_SHEET: rowEndOtherSheet,
              MATCHED_ROWS: nonUniqueInstances,
            }
          );
        }
      },
    },
  },
};

export {TEST_STATUS, MINUS_ONE as UNTIL_LAST_ROW, UNIQUE_OCCURRENCE_STATUS};

export default TEST_DEFINITIONS;
