import React from 'react';
import { utils, writeFile } from 'xlsx';
import { useSelector } from 'react-redux';

function ExportSheet() {
  const movies = useSelector((state) => state);

  const handleExport = () => {
    const headings = [['Movie', 'Category', 'Director', 'Rating']];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, movies, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Report');
    writeFile(wb, 'Movie Report.xlsx');
  };

  return (
    <div className="col-md-6">
      <button onClick={handleExport} className="btn btn-primary float-right">
        Export <i className="fa fa-download"></i>
      </button>
    </div>
  );
}

export default ExportSheet;
