import React from 'react';

import InputSheet from './InputSheet';
import ExportSheet from './ExportSheet';
import RenderSpreadSheets from './RenderSpreadSheets';
import TestSheet from './TestSheet';

const HomeComponent = () => {
  return (
    <>
      <div className="row">
        {/** Input Component */}
        <InputSheet />
        {/** Export Component */}
        <ExportSheet />
      </div>
      {/** Test component */}
      <TestSheet />
      {/** Visualisation */}
      <RenderSpreadSheets />
    </>
  );
};

export default HomeComponent;
