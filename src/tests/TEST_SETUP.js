import TEST_DEFINITIONS from './TEST_DEFINITIONS';

const TEST_SETUP = [
  {
    sheetNum: 0,
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
            testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_SHORT.id,
            testMedata: {
              MIN_CHAR_LEN: 170,
            },
          },
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_LONG.id,
            testMedata: {
              MAX_CHAR_LEN: 100,
            },
          },
        ],
      },
      {
        columnNums: [3],
        testConfigs: [
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_EMPTY.id,
            testMedata: {},
          },
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_SHORT.id,
            testMedata: {
              MIN_CHAR_LEN: 10,
            },
          },
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_LONG.id,
            testMedata: {
              MAX_CHAR_LEN: 150,
            },
          },
        ],
      },

      // Image tests:
      {
        columnNums: [14],
        testConfigs: [
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_CANT_LOAD.id,
            testMedata: {},
          },
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
            testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_CANT_LOAD.id,
            testMedata: {},
          },
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
  },
  {
    sheetNum: 1,
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
            testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_SHORT.id,
            testMedata: {
              MIN_CHAR_LEN: 170,
            },
          },
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_LONG.id,
            testMedata: {
              MAX_CHAR_LEN: 10,
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
            testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_SHORT.id,
            testMedata: {
              MIN_CHAR_LEN: 170,
            },
          },
          {
            testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_LONG.id,
            testMedata: {
              MAX_CHAR_LEN: 11,
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
            testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_CANT_LOAD.id,
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
