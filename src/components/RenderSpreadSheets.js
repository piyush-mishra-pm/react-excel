import React from 'react';
import { useSelector } from 'react-redux';
function RenderSpreadSheets() {
  const state = useSelector((state) => state);
  const movies = state.root ? state.root.importedData : null;

  return (
    <div style={{ backgroundColor: 'cyan' }}>
      <h3>Render sheet</h3>
      <table className="ui celled table" style={{ display: 'block', overflow: 'auto', margin: '1rem' }}>
        <thead>
          <tr>
            {movies.length &&
              Object.keys(movies[0]).length &&
              Object.keys(movies[0][0]).length &&
              Object.keys(movies[0][0]).map((key) => (
                <th scope="col" key={key}>
                  {key}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {movies.length && movies[0].length ? (
            movies[0].map((row, index) => (
              <tr key={index}>
                {Object.keys(row).map((rowKey) => (
                  <td key={`${index}-${rowKey}`}>{row[rowKey]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Data uploaded.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RenderSpreadSheets;
