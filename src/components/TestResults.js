import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import RenderTestResultsForASheet from './RenderTestResultsForASheet';

function TestResults() {
  const sheetsData = useSelector((state) => state.root.testResultsData);
  const [activeTestResultTabNumber, setActiveTestResultTabNumber] = useState(0);

  return (
    <div style={{backgroundColor: 'beige'}}>
      <h3>Test results</h3>
      <div className="ui top attached tabular menu">
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
      {sheetsData.length ? (
        <div className="ui bottom attached active tab segment">
          <RenderTestResultsForASheet sheetData={sheetsData[activeTestResultTabNumber]} />
        </div>
      ) : (
        'No Test results yet!'
      )}
    </div>
  );
}

export default TestResults;
