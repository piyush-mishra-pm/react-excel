import React from 'react';

import InputSheet from './InputSheet';
import ExportSheet from './ExportSheet';
import RenderSpreadSheets from './RenderSpreadSheets';
const HomeComponent = () => {
  return (
    <>
      <div className="row">
        {/** Input Component */}
        <InputSheet />
        {/** Export Component */}
        <ExportSheet />
      </div>
      {/** Visualisation */}
      <RenderSpreadSheets />
    </>
  );
};

export default HomeComponent;
