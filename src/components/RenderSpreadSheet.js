import React from 'react';

import {renderBodyCell, renderHeaderRow} from '../utils/RenderUtils';

function RenderSpreadSheet(props) {
  const sheetData = props.sheetData;
  const currentActiveSheetNumber = props.currentActiveSheetNumber;
  const COLUMN_NAMES = Object.keys(sheetData[0]);
  return (
    <div>
      {sheetData.length && (
        <table
          className="ui selectable striped compact celled table"
          style={{display: 'block', overflow: 'auto', margin: '1rem'}}
        >
          {/** Render table header */}
          <thead>{renderHeaderRow(sheetData[0], currentActiveSheetNumber)}</thead>
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
