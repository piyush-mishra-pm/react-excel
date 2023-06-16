import TEST_DEFINITIONS, {UNTIL_LAST_ROW} from './TEST_DEFINITIONS';

const TEST_SETUP = [
  {
    sheetNum: 2,
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
              "Live Images - Thumbnail Res\n\nOnly review for email if you'd like the reco to be featured, otherwise review for paper recos only",
              "Live Images - Elongated Res\n\nOnly review for email if you'd like the reco to be featured, otherwise review for paper recos only",
              "Live Images - Shortened Res\n(For Featured Content in Emails and HERs)\n\nOnly review for email if you'd like the reco to be featured, otherwise review for paper recos only",
              'Channel',
              'Disable? (Select Yes or leave blank)',
            ],
          },
        },
      ],
    },

    // Cell Level Checks:
    columnConfigs: [
      // Text Empty:
      {
        columnNums: [0, 1, 4, 5, 7, 8, 11, 12, 15, 16, 17, 18, 19],
        testConfigs: [
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_EMPTY.id,
            testMedata: {},
          },
        ],
      },
      {
        columnNums: [4, 5],
        testConfigs: [
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_LONG.id,
            testMedata: {
              MAX_CHAR_LEN: 35,
            },
          },
        ],
      },
      {
        columnNums: [7, 8],
        testConfigs: [
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_LONG.id,
            testMedata: {
              MAX_CHAR_LEN: 105,
            },
          },
        ],
      },
      {
        columnNums: [11, 12],
        testConfigs: [
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_LONG.id,
            testMedata: {
              MAX_CHAR_LEN: 1,
            },
          },
        ],
      },
      {
        columnNums: [15, 16, 17, 18],
        testConfigs: [
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_LONG.id,
            testMedata: {
              MAX_CHAR_LEN: 250,
            },
          },
        ],
      },

      //Image tests:
      {
        columnNums: [15],
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
        columnNums: [16],
        testConfigs: [
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_FORMAT_INCORRECT.id,
            testMedata: {
              IMAGE_FORMATS_ALLOWED: ['png', 'jpg', 'jpeg'],
            },
          },
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
      {
        columnNums: [18],
        testConfigs: [
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_FORMAT_INCORRECT.id,
            testMedata: {
              IMAGE_FORMATS_ALLOWED: ['png'],
            },
          },
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_DIMENSIONS_INCORRECT.id,
            testMedata: {
              WIDTH_IN_PIXELS: 285,
              HEIGHT_IN_PIXELS: 340,
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
            COLUMN_NUMS: [0],
            ROW_START: 0,
            ROW_END: 18,
            TEST_MESSAGE: 'RecoID should occur only once in sheet.',
          },
        },
      },
      {
        testConfig: {
          testId: TEST_DEFINITIONS.TESTS.UNIQUE_ROW_AFTER_COLUMN_CONCAT.id,
          testMedata: {
            COLUMN_NUMS: [4],
            ROW_START: 0,
            ROW_END: 18,
            TEST_MESSAGE: 'Reco Title should occur only once in sheet.',
          },
        },
      },
      {
        testConfig: {
          testId: TEST_DEFINITIONS.TESTS.UNIQUE_ROW_AFTER_COLUMN_CONCAT.id,
          testMedata: {
            COLUMN_NUMS: [5],
            ROW_START: 0,
            ROW_END: 18,
            TEST_MESSAGE: 'Reco Utility Edited Title should not repeat in sheet.',
          },
        },
      },
      {
        testConfig: {
          testId: TEST_DEFINITIONS.TESTS.UNIQUE_ROW_AFTER_COLUMN_CONCAT.id,
          testMedata: {
            COLUMN_NUMS: [7],
            ROW_START: 0,
            ROW_END: 18,
            TEST_MESSAGE: 'Reco Description should not repeat in sheet.',
          },
        },
      },
      {
        testConfig: {
          testId: TEST_DEFINITIONS.TESTS.UNIQUE_ROW_AFTER_COLUMN_CONCAT.id,
          testMedata: {
            COLUMN_NUMS: [8],
            ROW_START: 0,
            ROW_END: 18,
            TEST_MESSAGE: 'Reco Utility Edited Description should not repeat in sheet.',
          },
        },
      },
      {
        testConfig: {
          testId: TEST_DEFINITIONS.TESTS.UNIQUE_ROW_AFTER_COLUMN_CONCAT.id,
          testMedata: {
            COLUMN_NUMS: [15],
            ROW_START: 0,
            ROW_END: 18,
            TEST_MESSAGE: "Icon url shouldn't repeat.",
          },
        },
      },
      {
        testConfig: {
          testId: TEST_DEFINITIONS.TESTS.UNIQUE_ROW_AFTER_COLUMN_CONCAT.id,
          testMedata: {
            COLUMN_NUMS: [16],
            ROW_START: 0,
            ROW_END: 18,
            TEST_MESSAGE: "Unique Live Images - Thumbnail Res shouldn't repeat.",
          },
        },
      },
      {
        testConfig: {
          testId: TEST_DEFINITIONS.TESTS.UNIQUE_ROW_AFTER_COLUMN_CONCAT.id,
          testMedata: {
            COLUMN_NUMS: [17],
            ROW_START: 0,
            ROW_END: 18,
            TEST_MESSAGE: "Unique Live Images - Elongated url shouldn't repeat.",
          },
        },
      },
      {
        testConfig: {
          testId: TEST_DEFINITIONS.TESTS.UNIQUE_ROW_AFTER_COLUMN_CONCAT.id,
          testMedata: {
            COLUMN_NUMS: [18],
            ROW_START: 0,
            ROW_END: 18,
            TEST_MESSAGE: "Unique Live Images - Shortened url shouldn't repeat.",
          },
        },
      },
    ],
    acrossSheetTestConfigs: [
      {
        testConfig: {
          testId: TEST_DEFINITIONS.TESTS.UNIQUE_ROW_AFTER_COLUMN_CONCAT_ACROSS_SHEET.id,
          testMedata: {
            COLUMN_NUMS_IN_THIS_SHEET: [0],
            ROW_START_IN_THIS_SHEET: 0,
            ROW_END_IN_THIS_SHEET: 18,
            OTHER_SHEET_NUM: 1,
            COLUMN_NUMS_IN_OTHER_SHEET: [2],
            ROW_START_IN_OTHER_SHEET: 8,
            ROW_END_IN_OTHER_SHEET: 26,
            TEST_MESSAGE: 'RecoID uniquely exist across sheets.',
          },
        },
      },
      {
        testConfig: {
          testId: TEST_DEFINITIONS.TESTS.UNIQUE_ROW_AFTER_COLUMN_CONCAT_ACROSS_SHEET.id,
          testMedata: {
            COLUMN_NUMS_IN_THIS_SHEET: [0, 1],
            ROW_START_IN_THIS_SHEET: 0,
            ROW_END_IN_THIS_SHEET: 18,
            OTHER_SHEET_NUM: 1,
            COLUMN_NUMS_IN_OTHER_SHEET: [2, 3],
            ROW_START_IN_OTHER_SHEET: 8,
            ROW_END_IN_OTHER_SHEET: 26,
            TEST_MESSAGE: 'Appliance ID and Appliance Category pair should remain same across sheet.',
          },
        },
      },
    ],
  },
];

export default TEST_SETUP;
