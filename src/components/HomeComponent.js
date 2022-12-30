import React, {useState} from 'react';

import InputSheet from './InputSheet';
import ExportSheet from './ExportSheet';
import RenderSpreadSheets from './RenderSpreadSheets';
import TestSheet from './TestSheet';
import RenderTestResults from './RenderTestResults';

const HomeComponent = () => {
  const [testResultsTabEnabled, setTestResultsTabEnabled] = useState(false);
  return (
    <>
      <div className="row">
        {/** Input Component */}
        <InputSheet />
        {/** Export Component */}
        <ExportSheet />
        {/** Test Controller */}
        <TestSheet setTestResultsTabEnabled={setTestResultsTabEnabled} />
      </div>

      <div className="ui top attached tabular menu">
        <div className={`${!testResultsTabEnabled && 'active'} item`} onClick={() => setTestResultsTabEnabled(false)}>
          Imported
        </div>
        <div className={`${testResultsTabEnabled && 'active'} item`} onClick={() => setTestResultsTabEnabled(true)}>
          TestResults
        </div>
      </div>
      <div className={`ui bottom attached ${!testResultsTabEnabled && 'active'} tab segment`}>
        {/** Visualisation */}
        <RenderSpreadSheets />
      </div>
      <div className={`ui bottom attached ${testResultsTabEnabled && 'active'} tab segment`}>
        {/** Test component */}
        <RenderTestResults />
      </div>
    </>
  );
};

export default HomeComponent;
