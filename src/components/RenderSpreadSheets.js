import React from 'react';
import { useSelector } from 'react-redux';
function RenderSpreadSheets() {
  const state = useSelector((state) => state);
  const movies = state.root ? state.root.importedData : null;

  return (
    <table className="table">
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
              <th scope="row" key={`${index}`}>
                {index + 1}
              </th>
              {Object.keys(row).map((rowKey) => (
                <td key={`${index}-${rowKey}`}>{row[rowKey]}</td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center">
              No Movies Found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default RenderSpreadSheets;
