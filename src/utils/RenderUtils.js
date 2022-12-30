import React from 'react';

import * as TestUtils from '../store/TestUtils';

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
    );
  } else {
    return <td key={`${rowIndex}-${COL_NAME}`}>{renderImageOrTextValue(row[COL_NAME])}</td>;
  }
}
