import React, {useState} from 'react';

import InputSheet from './InputSheet';
import ExportSheet from './ExportSheet';
import RenderSpreadSheets from './RenderSpreadSheets';
import TestController from './TestController';
import RenderTestResults from './RenderTestResults';

const HomeSheetValidatorComponent = () => {
  const [testResultsTabEnabled, setTestResultsTabEnabled] = useState(false);
  return (
    <div className="ui fluid container" style={{paddin: '1rem'}}>
      <div className="row">
        {/** Input Component */}
        <InputSheet />
        {/** Export Component */}
        <ExportSheet />
        {/** Test Controller */}
        <TestController setTestResultsTabEnabled={setTestResultsTabEnabled} />
      </div>

      <div className="ui top attached tabular menu">
        <div
          className={`${!testResultsTabEnabled ? 'active' : ''} item`}
          onClick={() => setTestResultsTabEnabled(false)}
        >
          Imported
        </div>
        <div className={`${testResultsTabEnabled ? 'active' : ''} item`} onClick={() => setTestResultsTabEnabled(true)}>
          TestResults
        </div>
      </div>
      <div className={`ui bottom attached ${!testResultsTabEnabled ? 'active' : ''} tab segment`}>
        {/** Visualisation */}
        {console.log(`ui bottom attached ${!testResultsTabEnabled ? 'active' : ''} tab segment`)}
        {!testResultsTabEnabled && <RenderSpreadSheets />}
      </div>
      <div className={`ui bottom attached ${testResultsTabEnabled ? 'active' : ''} tab segment`}>
        {console.log(`ui bottom attached ${testResultsTabEnabled ? 'active' : ''} tab segment`)}
        {/** Test component */}
        {testResultsTabEnabled && <RenderTestResults />}
      </div>
    </div>
  );
};

export default HomeSheetValidatorComponent;
