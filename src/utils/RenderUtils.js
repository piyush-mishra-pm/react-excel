import React from 'react';
import _, {uniqueId} from 'lodash';

import * as TestUtils from '../tests/TestUtils';
import TEST_SETUP from '../tests/TEST_SETUP';

export function renderImageOrTextValue(content) {
  if (TestUtils.isImageUrlOfAllowedImageFormats(content)) {
    return (
      <React.Fragment>
        <a href={content} target="_blank" rel="noopener noreferrer">
          <p>{content}</p>
          <img
            src={content}
            alt={`rendered ${content}`}
            className="ui image"
            style={{
              backgroundColor: TestUtils.isPngImage(content) ? 'blue' : '',
              objectFit: 'cover',
              objectPosition: 'center',
              maxHeight: '200px',
              maxWidth: '400px',
            }}
          />
        </a>
      </React.Fragment>
    );
  }
  return content;
}

export function renderBodyCell(COL_NAME, row, rowIndex) {
  if (row[COL_NAME].testResults) {
    return (
      <td key={`${rowIndex}-${COL_NAME}`} className={row[COL_NAME].testResults.length ? 'negative' : ''}>
        {renderImageOrTextValue(row[COL_NAME].value)}{' '}
        {row[COL_NAME].testResults.map((testResult) => (
          <div
            style={{color: testResult.testPassed ? 'green' : 'red', fontSize: '1rem', fontFamily: 'monospace'}}
            key={uniqueId(
              `${rowIndex}-${COL_NAME}-${testResult.testId}-${testResult.testResultMessage}-${testResult.testPassed}-`
            )}
          >
            {testResult.testId}
            {!testResult.testPassed && ': '}
            {!testResult.testPassed && (
              <p style={{color: 'grey', fontSize: '0.75rem', fontFamily: 'monospace'}}>
                {testResult.testResultMessage}
              </p>
            )}
          </div>
        ))}
      </td>
    );
  } else {
    return <td key={`${rowIndex}-${COL_NAME}`}>{renderImageOrTextValue(row[COL_NAME])}</td>;
  }
}

export function renderHeaderRow(row, currentActiveSheetNumber) {
  const COLUMN_NAMES = Object.keys(row);
  const COL_NAME = COLUMN_NAMES[0];
  const anyCell = row[COL_NAME];
  const sheetTestConfig = _.filter(TEST_SETUP, (sheetConfig) => sheetConfig.sheetNum === currentActiveSheetNumber);
  if (anyCell.testResults) {
    return (
      <tr>
        {COLUMN_NAMES.map((COL_NAME, colIndex) => (
          <th scope="col" key={COL_NAME}>
            {COL_NAME}
            {<hr />}
            {getListOfAppliedTestForTheColumn(colIndex, sheetTestConfig).map((testConfig, index) => (
              <div
                style={{color: '#899499', fontStyle: 'normal', fontSize: '.85rem', fontFamily: 'monospace'}}
                key={`${testConfig.testId}-${index}`}
              >
                <hr />
                {testConfig.testId}
                {' : '}
                {Object.keys(testConfig.testMedata).map((key, index) => (
                  <p
                    style={{color: '#B2BEB5', fontSize: '.75rem', fontStyle: 'italic', fontFamily: 'monospace'}}
                    key={`${key}-${index}`}
                  >
                    {key}:{renderArrayOrPrimitive(testConfig.testMedata[key])}
                  </p>
                ))}
              </div>
            ))}
          </th>
        ))}
      </tr>
    );
  } else {
    return (
      <tr>
        {COLUMN_NAMES.map((COL_NAME) => (
          <th scope="col" key={COL_NAME}>
            {COL_NAME}
          </th>
        ))}
      </tr>
    );
  }
}

function getListOfAppliedTestForTheColumn(colIndex, sheetTestConfig) {
  // Warning: Only 1 sheetConfig allowed per sheet.
  const columnConfigsRelevantToTheColumn = sheetTestConfig[0].columnConfigs.filter((columnConfig) =>
    _.includes(columnConfig.columnNums, colIndex)
  );

  const flattenedColumnConfigsRelevantToTheColumn = _.flatten(
    columnConfigsRelevantToTheColumn.map((testConfig) => _.toArray(testConfig.testConfigs))
  );

  // todo: Taking the last mentioned config as over-riding one?
  // Alternatively,just show the entire list of tests applied, and remind that only the last test will be used to populate the results.
  //const uniqColumnTestConfigs = _.uniq(_.reverse(_.cloneDeep(flattenedColumnConfigsRelevantToTheColumn)), 'testId');

  return flattenedColumnConfigsRelevantToTheColumn;
}

function renderArrayOrPrimitive(content) {
  if (Array.isArray(content)) {
    return content.join();
  } else return content;
}