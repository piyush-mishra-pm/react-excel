import TEST_DEFINITIONS, {UNTIL_LAST_ROW} from './TEST_DEFINITIONS';

const TEST_SETUP = [
  {
    sheetNum: 0,
    sheetSchemaCheck: {
      testConfigs: [
        {
          testId: TEST_DEFINITIONS.TESTS.TEST_SCHEMA_MATCH_COL_NAMES.id,
          testMedata: {
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
        },
      ],
    },
    columnConfigs: [
      // Text tests:
      {
        columnNums: [3, 4],
        testConfigs: [
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_EMPTY.id,
            testMedata: {},
          },
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_LONG.id,
            testMedata: {
              MAX_CHAR_LEN: 120,
            },
          },
        ],
      },

      // Image tests:
      {
        columnNums: [14],
        testConfigs: [
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_DIMENSIONS_INCORRECT.id,
            testMedata: {
              WIDTH_IN_PIXELS: 650,
              HEIGHT_IN_PIXELS: 650,
            },
          },
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_FORMAT_INCORRECT.id,
            testMedata: {
              IMAGE_FORMATS_ALLOWED: ['png'],
            },
          },
        ],
      },
      {
        columnNums: [15, 16],
        testConfigs: [
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_FORMAT_INCORRECT.id,
            testMedata: {
              IMAGE_FORMATS_ALLOWED: ['jpg', 'jpeg'],
            },
          },
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_DIMENSIONS_INCORRECT.id,
            testMedata: {
              WIDTH_IN_PIXELS: 1982,
              HEIGHT_IN_PIXELS: 856,
            },
          },
        ],
      },
    ],
    sheetLevelTestConfigs: [
      {
        testConfig: {
          testId: TEST_DEFINITIONS.TESTS.UNIQUE_ROW_AFTER_COLUMN_CONCAT.id,
          testMedata: {
            COLUMN_NUMS: [0, 1, 2],
            ROW_START: 0,
            ROW_END: UNTIL_LAST_ROW,
            // Sheet is inherited from `sheetNum` property of this test object.
          },
        },
      },
      {
        testConfig: {
          testId: TEST_DEFINITIONS.TESTS.UNIQUE_ROW_AFTER_COLUMN_CONCAT.id,
          testMedata: {
            COLUMN_NUMS: [0, 1, 3],
            ROW_START: 0,
            ROW_END: UNTIL_LAST_ROW,
            // Sheet is inherited from `sheetNum` property of this test object.
          },
        },
      },
    ],
    acrossSheetTestConfigs: [
      {
        testConfig: {
          testId: TEST_DEFINITIONS.TESTS.UNIQUE_ROW_AFTER_COLUMN_CONCAT_ACROSS_SHEET.id,
          testMedata: {
            COLUMN_NUMS_IN_THIS_SHEET: [0, 1, 2],
            ROW_START_IN_THIS_SHEET: 0,
            ROW_END_IN_THIS_SHEET: UNTIL_LAST_ROW,
            OTHER_SHEET_NUM: 1,
            COLUMN_NUMS_IN_OTHER_SHEET: [0, 1, 2],
            ROW_START_IN_OTHER_SHEET: 0,
            ROW_END_IN_OTHER_SHEET: UNTIL_LAST_ROW,
          },
        },
      },
      {
        testConfig: {
          testId: TEST_DEFINITIONS.TESTS.UNIQUE_ROW_AFTER_COLUMN_CONCAT_ACROSS_SHEET.id,
          testMedata: {
            COLUMN_NUMS_IN_THIS_SHEET: [0, 1, 3],
            ROW_START_IN_THIS_SHEET: 0,
            ROW_END_IN_THIS_SHEET: UNTIL_LAST_ROW,
            OTHER_SHEET_NUM: 1,
            COLUMN_NUMS_IN_OTHER_SHEET: [0, 1, 3],
            ROW_START_IN_OTHER_SHEET: 0,
            ROW_END_IN_OTHER_SHEET: UNTIL_LAST_ROW,
          },
        },
      },
    ],
  },
  {
    sheetNum: 1,
    sheetSchemaCheck: {
      testConfigs: [
        {
          testId: TEST_DEFINITIONS.TESTS.TEST_SCHEMA_MATCH_COL_NAMES.id,
          testMedata: {
            columnNames: [
              'Recommendation ID',
              'Category',
              'Original\nLocale',
              'Utility Defined Locale',
              'Original\ntitle',
              'Utility Edited Title',
              'Char\n(35)',
              'Original Description ',
              'Utility Edited Description',
              'Char\n(105)',
              'Sources',
              'Featured Content',
              'Program',
              'CallToAction\n(12)',
              'CTA Link',
              'Icon',
              'Live Images - Thumbnail Res',
              'Live Images - Elongated Res',
              'Live Images - Shortened Res\n(For Featured Content in Emails and HERs)',
              'Channel',
              'Additional Comments',
            ],
          },
        },
      ],
    },
    columnConfigs: [
      // Text tests:
      {
        columnNums: [4, 5],
        testConfigs: [
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_EMPTY.id,
            testMedata: {},
          },
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_LONG.id,
            testMedata: {
              MAX_CHAR_LEN: 120,
            },
          },
        ],
      },
      {
        columnNums: [7],
        testConfigs: [
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_EMPTY.id,
            testMedata: {},
          },
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_LONG.id,
            testMedata: {
              MAX_CHAR_LEN: 120,
            },
          },
        ],
      },
      {
        columnNums: [11, 12],
        testConfigs: [
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_ENUM_MATCHES.id,
            testMedata: {
              ALLOWED_VALUES: ['Y', 'N'],
            },
          },
        ],
      },

      // Image tests:
      {
        columnNums: [15, 16, 17],
        testConfigs: [
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_EMPTY.id,
            testMedata: {},
          },
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_FORMAT_INCORRECT.id,
            testMedata: {
              IMAGE_FORMATS_ALLOWED: ['png', 'jpg'],
            },
          },
        ],
      },
      {
        columnNums: [15, 18],
        testConfigs: [
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_DIMENSIONS_INCORRECT.id,
            testMedata: {
              WIDTH_IN_PIXELS: 650,
              HEIGHT_IN_PIXELS: 650,
            },
          },
        ],
      },
      {
        columnNums: [16],
        testConfigs: [
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_DIMENSIONS_INCORRECT.id,
            testMedata: {
              WIDTH_IN_PIXELS: 519,
              HEIGHT_IN_PIXELS: 345,
            },
          },
        ],
      },
      {
        columnNums: [17],
        testConfigs: [
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_DIMENSIONS_INCORRECT.id,
            testMedata: {
              WIDTH_IN_PIXELS: 1982,
              HEIGHT_IN_PIXELS: 856,
            },
          },
        ],
      },
    ],
  },
];

export default TEST_SETUP;
