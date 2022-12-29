import TEST_DEFINITIONS from "./TEST_DEFINITIONS";

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
                        testMedata: {
                        }
                    },
                    {
                        testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_SHORT.id,
                        testMedata: {
                            MIN_CHAR_LEN: 50
                        }
                    },
                    {
                        testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_LONG.id,
                        testMedata: {
                            MAX_CHAR_LEN: 200
                        }
                    },
                ]
            },
            {
                columnNums: [7],
                testConfigs: [
                    {
                        testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_EMPTY.id,
                        testMedata: {
                        }
                    },
                    {
                        testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_SHORT.id,
                        testMedata: {
                            MIN_CHAR_LEN: 10
                        }
                    },
                    {
                        testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_LONG.id,
                        testMedata: {
                            MAX_CHAR_LEN: 150
                        }
                    },
                ]
            },

            // Image tests:
            {
                columnNums: [12],
                testConfigs: [
                    {
                        testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_CANT_LOAD.id,
                        testMedata: {
                        }
                    },
                    {
                        testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_DIMENSIONS_INCORRECT.id,
                        testMedata: {
                            WIDTH_IN_PIXELS: 650,
                            HEIGHT_IN_PIXELS: 650
                        }
                    },
                    {
                        testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_FORMAT_INCORRECT.id,
                        testMedata: {
                            IMAGE_FORMATS_ALLOWED: ['png']
                        }
                    },
                ]
            },
            {
                columnNums: [13, 14],
                testConfigs: [
                    {
                        testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_CANT_LOAD.id,
                        testMedata: {
                        }
                    },
                    {
                        testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_DIMENSIONS_INCORRECT.id,
                        testMedata: {
                            WIDTH_IN_PIXELS: 1982,
                            HEIGHT_IN_PIXELS: 856
                        }
                    },
                    {
                        testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_FORMAT_INCORRECT.id,
                        testMedata: {
                            IMAGE_FORMATS_ALLOWED: ['jpeg', 'jpg']
                        }
                    },
                ]
            }
        ]
    },
    {
        sheetNum: 1,
        columnConfigs: [
            // Text tests:
            {
                columnNums: [0, 1],
                testConfigs: [
                    {
                        testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_EMPTY.id,
                        testMedata: {
                        }
                    },
                    {
                        testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_SHORT.id,
                        testMedata: {
                            MIN_CHAR_LEN: 50
                        }
                    },
                    {
                        testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_LONG.id,
                        testMedata: {
                            MAX_CHAR_LEN: 200
                        }
                    },
                ]
            },
            {
                columnNums: [2],
                testConfigs: [
                    {
                        testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_EMPTY.id,
                        testMedata: {
                        }
                    },
                    {
                        testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_SHORT.id,
                        testMedata: {
                            MIN_CHAR_LEN: 10
                        }
                    },
                    {
                        testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_LONG.id,
                        testMedata: {
                            MAX_CHAR_LEN: 150
                        }
                    },
                ]
            },

            // Image tests:
            {
                columnNums: [4],
                testConfigs: [
                    {
                        testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_CANT_LOAD.id,
                        testMedata: {
                        }
                    },
                    {
                        testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_DIMENSIONS_INCORRECT.id,
                        testMedata: {
                            WIDTH_IN_PIXELS: 1982,
                            HEIGHT_IN_PIXELS: 856
                        }
                    },
                    {
                        testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_FORMAT_INCORRECT.id,
                        testMedata: {
                            IMAGE_FORMATS_ALLOWED: ['jpeg', 'jpg']
                        }
                    },
                ]
            }
        ]
    }
];

// const TEST_SETUP = [
//     {
//         sheetNum: 0,
//         columnConfigs: [
//             // Text tests:
//             {
//                 columnNums: [3, 4],
//                 testConfigs: [
//                     {
//                         testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_EMPTY.id,
//                         testMedata: {
//                         }
//                     },
//                     {
//                         testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_SHORT.id,
//                         testMedata: {
//                             MIN_CHAR_LEN: 50
//                         }
//                     },
//                     {
//                         testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_LONG.id,
//                         testMedata: {
//                             MAX_CHAR_LEN: 200
//                         }
//                     },
//                 ]
//             },
//             {
//                 columnNums: [7],
//                 testConfigs: [
//                     {
//                         testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_EMPTY.id,
//                         testMedata: {
//                         }
//                     },
//                     {
//                         testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_SHORT.id,
//                         testMedata: {
//                             MIN_CHAR_LEN: 10
//                         }
//                     },
//                     {
//                         testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_LONG.id,
//                         testMedata: {
//                             MAX_CHAR_LEN: 150
//                         }
//                     },
//                 ]
//             },

//             // Image tests:
//             {
//                 columnNums: [12, 13],
//                 testConfigs: [
//                     {
//                         testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_CANT_LOAD.id,
//                         testMedata: {
//                         }
//                     },
//                     {
//                         testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_DIMENSIONS_INCORRECT.id,
//                         testMedata: {
//                             WIDTH_IN_PIXELS: 650,
//                             HEIGHT_IN_PIXELS: 650
//                         }
//                     },
//                     {
//                         testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_FORMAT_INCORRECT.id,
//                         testMedata: {
//                             IMAGE_FORMATS_ALLOWED: ['png']
//                         }
//                     },
//                 ]
//             },
//             {
//                 columnNums: [14],
//                 testConfigs: [
//                     {
//                         testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_CANT_LOAD.id,
//                         testMedata: {
//                         }
//                     },
//                     {
//                         testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_DIMENSIONS_INCORRECT.id,
//                         testMedata: {
//                             WIDTH_IN_PIXELS: 1982,
//                             HEIGHT_IN_PIXELS: 856
//                         }
//                     },
//                     {
//                         testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_FORMAT_INCORRECT.id,
//                         testMedata: {
//                             IMAGE_FORMATS_ALLOWED: ['jpeg', 'jpg']
//                         }
//                     },
//                 ]
//             }
//         ]
//     },
//     {
//         sheetNum: 1,
//         columnConfigs: [
//             // Text tests:
//             {
//                 columnNums: [0, 1],
//                 testConfigs: [
//                     {
//                         testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_EMPTY.id,
//                         testMedata: {
//                         }
//                     },
//                     {
//                         testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_SHORT.id,
//                         testMedata: {
//                             MIN_CHAR_LEN: 50
//                         }
//                     },
//                     {
//                         testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_LONG.id,
//                         testMedata: {
//                             MAX_CHAR_LEN: 200
//                         }
//                     },
//                 ]
//             },
//             {
//                 columnNums: [2],
//                 testConfigs: [
//                     {
//                         testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_EMPTY.id,
//                         testMedata: {
//                         }
//                     },
//                     {
//                         testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_SHORT.id,
//                         testMedata: {
//                             MIN_CHAR_LEN: 10
//                         }
//                     },
//                     {
//                         testId: TEST_DEFINITIONS.TESTS.TEST_TEXT_TOO_LONG.id,
//                         testMedata: {
//                             MAX_CHAR_LEN: 150
//                         }
//                     },
//                 ]
//             },

//             // Image tests:
//             {
//                 columnNums: [4],
//                 testConfigs: [
//                     {
//                         testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_CANT_LOAD.id,
//                         testMedata: {
//                         }
//                     },
//                     {
//                         testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_DIMENSIONS_INCORRECT.id,
//                         testMedata: {
//                             WIDTH_IN_PIXELS: 1982,
//                             HEIGHT_IN_PIXELS: 856
//                         }
//                     },
//                     {
//                         testId: TEST_DEFINITIONS.TESTS.TEST_IMAGE_FORMAT_INCORRECT.id,
//                         testMedata: {
//                             IMAGE_FORMATS_ALLOWED: ['jpeg', 'jpg']
//                         }
//                     },
//                 ]
//             }
//         ]
//     }
// ];

export default TEST_SETUP;