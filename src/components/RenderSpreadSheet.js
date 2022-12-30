import React from 'react';

import * as TestUtils from '../store/TestUtils';

function RenderSpreadSheet(props) {
  const sheetData = props.sheetData;
  const COLUMN_NAMES = Object.keys(sheetData[0]);
  return (
    <div>
      {sheetData.length && (
        <table className="ui celled table" style={{display: 'block', overflow: 'auto', margin: '1rem'}}>
          {/** Render table header */}
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
            {sheetData.map((row, index) => (
              <tr key={index}>
                {Object.keys(row).map((rowKey) => (
                  <td key={`${index}-${rowKey}`}>{renderImageOrTextValue(row[rowKey])}</td>
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
            alt=""
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

export default RenderSpreadSheet;
