import React from 'react';
import _, {uniqueId} from 'lodash';
import * as Diff from 'diff';

import * as TestUtils from '../tests/TestUtils';
import TEST_SETUP from '../tests/TEST_SETUP';
import {TEST_STATUS} from '../tests/TEST_DEFINITIONS';

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
      <td
        key={`${rowIndex}-${COL_NAME}`}
        className={
          hasAnyTestFailed(row[COL_NAME].testResults)
            ? 'negative'
            : IsAnyTestLoading(row[COL_NAME].testResults)
            ? 'warning'
            : 'positive'
        }
      >
        {renderImageOrTextValue(row[COL_NAME].value)}{' '}
        {row[COL_NAME].testResults.map((testResult, i) => (
          <div
            style={{
              color:
                testResult.testStatus === TEST_STATUS.TEST_PASSED
                  ? 'green'
                  : testResult.testStatus === TEST_STATUS.TEST_FAILED
                  ? 'red'
                  : 'blue', // loading test
              fontSize: '1rem',
              fontFamily: 'monospace',
            }}
            key={uniqueId(i)}
          >
            {testResult.testId}
            {testResult.testStatus !== TEST_STATUS.TEST_PASSED && ': '}
            {testResult.testStatus !== TEST_STATUS.TEST_PASSED && (
              <p style={{color: 'grey', fontSize: '0.75rem', fontFamily: 'monospace'}}>
                {testResult.testResultMessage}
              </p>
            )}
            {testResult.testStatus === TEST_STATUS.TEST_LOADING && (
              <div className="ui active centered inline loader"></div>
            )}
          </div>
        ))}
      </td>
    );
  } else {
    return <td key={`${rowIndex}-${COL_NAME}`}>{renderImageOrTextValue(row[COL_NAME])}</td>;
  }
}

function hasAnyTestFailed(testResultsArray) {
  return testResultsArray.find((testResult) => testResult.testStatus === TEST_STATUS.TEST_FAILED);
}

function IsAnyTestLoading(testResultsArray) {
  return testResultsArray.find((testResult) => testResult.testStatus === TEST_STATUS.TEST_LOADING);
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
            {getListOfAppliedTestForTheColumn(colIndex, sheetTestConfig).map((testConfig, testConfigIndex) => (
              <div
                style={{color: '#899499', fontStyle: 'normal', fontSize: '.85rem', fontFamily: 'monospace'}}
                key={`${_.uniqueId(testConfigIndex)}`}
              >
                <hr />
                {testConfig.testId}
                {' : '}
                {Object.keys(testConfig.testMedata).map((testMedataKey, testMedataIndex) => (
                  <p
                    style={{color: '#B2BEB5', fontSize: '.75rem', fontStyle: 'italic', fontFamily: 'monospace'}}
                    key={`${_.uniqueId(testMedataIndex)}`}
                  >
                    {testMedataKey}:{renderArrayOrPrimitive(testConfig.testMedata[testMedataKey])}
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
  if (!sheetTestConfig.length) return [];

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

export function renderSchemaLevelChecks(sheetLevelSchemaTestResults) {
  return (
    <div>
      <div className="ui red ribbon label">Schema Level checks:</div>
      {sheetLevelSchemaTestResults.map((testResult, index) => (
        <div
          className={`ui ${
            testResult.testStatus === TEST_STATUS.TEST_PASSED
              ? 'positive'
              : testResult.testStatus === TEST_STATUS.TEST_FAILED
              ? 'negative'
              : 'warning' //todo: loading icon when test status still loading.
          } message`}
          key={_.uniqueId(index)}
        >
          <p>{testResult.testId}</p>
          {/** Only show metadata if failed schema tests */}
          {testResult.testStatus === TEST_STATUS.TEST_FAILED && (
            <div>
              <div className="header">Expected:</div>
              <div>{testResult.testResultMetadata.allowedColumnNames.join('\t|\t')}</div>
              <div className="header">Existing:</div>
              <div>{testResult.testResultMetadata.existingColumnNames.join('\t|\t')}</div>
              <div className="header">Difference:</div>
              <div>
                {Diff.diffArrays(
                  testResult.testResultMetadata.allowedColumnNames,
                  testResult.testResultMetadata.existingColumnNames
                ).map((diffResult, iOut) => (
                  <div key={_.uniqueId(iOut)}>
                    {diffResult.value.map((item, iIn) => (
                      <div
                        className={`ui ${diffResult.added ? 'orange' : diffResult.removed ? 'red' : 'green'} label`}
                        key={_.uniqueId(iIn)}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="ui container segment">
                <div className="header">Legend:</div>
                <div>
                  <div className="ui green label">Exact Match</div>
                  <div className="ui red label">Missing Column</div>
                  <div className="ui orange label">Extra Column</div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function renderSingleSheetLevelChecks(singleSheetLevelTestResults) {
  return (
    <div>
      <div className="ui red ribbon label">Single Sheet Level Checks</div>
      {singleSheetLevelTestResults.map((testResult, index) => (
        <div
          className={`ui ${
            testResult.testStatus === TEST_STATUS.TEST_PASSED
              ? 'positive'
              : testResult.testStatus === TEST_STATUS.TEST_FAILED
              ? 'negative'
              : 'warning' //todo: loading icon when test status still loading.
          } message`}
          key={_.uniqueId(index)}
        >
          <div className="ui blue ribbon label">{String(index + 1) + '. ' + testResult.testId}</div>
          {testResult.testStatus === TEST_STATUS.TEST_PASSED && (
            <div>
              <div className="header">Message:</div>
              <div>{testResult.testResultMessage}</div>
            </div>
          )}
          {/** Only show metadata if failed schema tests */}
          {testResult.testStatus === TEST_STATUS.TEST_FAILED && (
            <div>
              <div className="header">Message:</div>
              <div>{testResult.testResultMessage}</div>
              <br />
              <div className="header">Duplicate Row Indices for the column text</div>
              <table className="ui celled table">
                <thead>
                  <tr>
                    <th>Concatenated Column text</th>
                    <th>Row Indices</th>
                  </tr>
                </thead>
                <tbody>
                  {testResult.testResultMetadata.MATCHED_ROWS.map((match) => (
                    <tr key={_.uniqueId()}>
                      <td>{match[0]}</td>
                      <td>{match[1].join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function renderAcrossSheetLevelChecks(acrossSheetLevelTestResults, thisSheetNum) {
  return (
    <div>
      <div className="ui red ribbon label">Across Sheet Level Checks</div>
      {acrossSheetLevelTestResults.map((testResult, index) => (
        <div
          className={`ui ${
            testResult.testStatus === TEST_STATUS.TEST_PASSED
              ? 'positive'
              : testResult.testStatus === TEST_STATUS.TEST_FAILED
              ? 'negative'
              : 'warning' //todo: loading icon when test status still loading.
          } message`}
          key={_.uniqueId(index)}
        >
          <div className="ui blue ribbon label">{String(index + 1) + '. ' + testResult.testId}</div>
          {testResult.testStatus === TEST_STATUS.TEST_PASSED && (
            <div>
              <div className="header">Message:</div>
              <div>{testResult.testResultMessage}</div>
            </div>
          )}
          {/** Only show metadata if failed schema tests */}
          {testResult.testStatus === TEST_STATUS.TEST_FAILED && (
            <div>
              <div className="header">Message:</div>
              <div>{testResult.testResultMessage}</div>
              <br />
              <div className="header">
                Non-Unique rows (Missing or multiple occurrences) for specified columns across 2 sheets.
                <br />
              </div>
              <div>
                Compared from [Sheet:{thisSheetNum}][Col:
                {testResult.testResultMetadata.COLUMN_NUMS_IN_THIS_SHEET.join(',')}
                ][Row:
                {testResult.testResultMetadata.ROW_START_IN_THIS_SHEET +
                  ':' +
                  testResult.testResultMetadata.ROW_END_IN_THIS_SHEET}
                ] to [Sheet:
                {testResult.testResultMetadata.OTHER_SHEET_NUM}][Col:
                {testResult.testResultMetadata.COLUMN_NUMS_IN_OTHER_SHEET.join(',')}
                ][Row:
                {testResult.testResultMetadata.ROW_START_IN_OTHER_SHEET +
                  ':' +
                  testResult.testResultMetadata.ROW_END_IN_OTHER_SHEET}
                ].
              </div>
              <table className="ui celled table">
                <thead>
                  <tr>
                    <th>Concatenated text</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {testResult.testResultMetadata.MATCHED_ROWS.map((match) => (
                    <tr key={_.uniqueId()}>
                      <td>{match.concatString}</td>
                      <td>
                        Sheet:
                        {match.from.sheetNum !== thisSheetNum ? `${match.from.sheetNum}` : thisSheetNum}
                        {match.from.sheetNum !== thisSheetNum ? <span className="ui label">[REVERSE]</span> : ''}
                        <br />
                        Rows:{match.from.rowIdx.join(',')}
                      </td>
                      <td>
                        Sheet:{match.to.sheetNum}
                        <br />
                        Rows:{match.to.rowIdx.join(',')}
                      </td>
                      <td>{match.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}