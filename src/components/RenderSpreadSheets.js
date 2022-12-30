import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import RenderSpreadSheet from './RenderSpreadSheet';

function RenderSpreadSheets() {
  const [activeSheetNumberTab, setActiveSheetNumberTab] = useState(0);
  const state = useSelector((state) => state);
  const sheetsData = state.root.importedData;
  return (
    <div style={{backgroundColor: 'cyan'}}>
      <h3>Render sheets</h3>
      <div className="ui top attached tabular menu">
        {sheetsData.length &&
          sheetsData.map((sheetNumber, index) => (
            <div
              className={`${activeSheetNumberTab === index && 'active'} item`}
              onClick={() => setActiveSheetNumberTab(index)}
              key={index}
            >
              Sheet-{index}
            </div>
          ))}
      </div>
      {sheetsData.length ? (
        <div className="ui bottom attached active tab segment">
          <RenderSpreadSheet sheetData={sheetsData[activeSheetNumberTab]} />
        </div>
      ) : (
        'No Imported sheet yet!'
      )}
    </div>
  );
}

export default RenderSpreadSheets;
