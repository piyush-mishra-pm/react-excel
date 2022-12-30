import React from 'react';
import { useDispatch } from 'react-redux';
import { read, utils } from 'xlsx';

import ACTION_TYPES from '../store/ACTION_TYPES';

function InputSheet() {
  const dispatch = useDispatch();

  const handleImport = ($event) => {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;
        const allSheetData = [];
        for (const sheet of sheets) {
          const readJsonData = utils.sheet_to_json(wb.Sheets[sheet], { defval: "" });
          allSheetData.push(readJsonData);
        }
        dispatch({ type: ACTION_TYPES.READ_SPREADSHEET, payload: allSheetData });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        name="file"
        id="inputGroupFile"
        required
        onChange={handleImport}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
    </div>
  );
}

export default InputSheet;
