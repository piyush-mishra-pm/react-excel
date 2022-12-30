import React from 'react';

import * as TestUtils from '../store/TestUtils';

function RenderTestResultsForASheet(props) {
  const sheetData = props.sheetData;
  const COLUMN_NAMES = Object.keys(sheetData[0]);

  return (
    <div>
      {sheetData.length && (
        <table className="ui celled table" style={{display: 'block', overflow: 'auto'}}>
          <thead>
            <tr>
              {COLUMN_NAMES.map((COL_NAME) => (
                <th scope="col" key={COL_NAME}>
                  {COL_NAME}
                </th>
              ))}
            </tr>
          </thead>
          {/** Render table body */}
          <tbody>
            {sheetData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {COLUMN_NAMES.map((COL_NAME) => (
                  <td key={`${rowIndex}-${COL_NAME}`} className={row[COL_NAME].testResults.length ? 'negative' : ''}>
                    {renderImageOrTextValue(row[COL_NAME].value)}{' '}
                    {/** todo: Show passed and failed test IDs.
                     * todo: Even if single check fails, mark red.
                     * todo: Show metadata of failed checks.
                     * todo: Show only ID of passed checks. */}
                    {row[COL_NAME].testResults.map((testID) => (
                      <div style={{color: 'red'}} key={`${rowIndex}-${COL_NAME}-${testID}`}>
                        {testID}
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function renderImageOrTextValue(content) {
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

export default RenderTestResultsForASheet;
