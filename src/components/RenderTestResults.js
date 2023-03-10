import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {renderSchemaLevelChecks} from '../utils/RenderUtils';

import RenderSpreadSheet from './RenderSpreadSheet';

function RenderTestResults() {
  const sheetsData = useSelector((state) => state.root.testResultsData);
  const testResultsDataSchemaLevel = useSelector((state) => state.root.testResultsDataSchemaLevel);
  const [activeTestResultTabNumber, setActiveTestResultTabNumber] = useState(0);

  return (
    <div style={{backgroundColor: 'beige'}}>
      <h3>Test results</h3>

      {/** Render Tabs of different sheets*/}
      <div className="ui top attached tabular menu" key={0}>
        {sheetsData.length &&
          sheetsData.map((sheetNumber, index) => (
            <div
              className={`${activeTestResultTabNumber === index && 'active'} item`}
              onClick={() => setActiveTestResultTabNumber(index)}
              key={index}
            >
              Sheet-{index}
            </div>
          ))}
      </div>

      {/** Render Schema level checks: */}
      {testResultsDataSchemaLevel.length ? (
        <div className="ui bottom attached active tab segment" key={1}>
          {testResultsDataSchemaLevel[activeTestResultTabNumber].schemaTestResults.length
            ? renderSchemaLevelChecks(testResultsDataSchemaLevel[activeTestResultTabNumber].schemaTestResults)
            : ' '}
        </div>
      ) : (
        'No Test results yet!'
      )}

      {/** Render Spreadsheet level checks: */}
      {sheetsData.length ? (
        <div className="ui bottom attached active tab segment" key={2}>
          <RenderSpreadSheet
            sheetData={sheetsData[activeTestResultTabNumber]}
            currentActiveSheetNumber={activeTestResultTabNumber}
          />
        </div>
      ) : (
        'No Test results yet!'
      )}
    </div>
  );
}

export default RenderTestResults;
