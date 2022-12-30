import React from 'react';

import {renderBodyCell} from '../utils/RenderUtils';

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
              <tr key={index}>{COLUMN_NAMES.map((COL_NAME) => renderBodyCell(COL_NAME, row, index))}</tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RenderSpreadSheet;
