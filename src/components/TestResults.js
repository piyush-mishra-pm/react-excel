import React from 'react';
import { useSelector } from 'react-redux';
function TestResults() {
  const testResultsData = useSelector((state) => state.root.testResultsData);
  const movies = testResultsData;

  return (
    <div style={{ backgroundColor: 'beige' }}>
      <h3>Test results</h3>
      <table className="ui celled table" style={{ display: 'block', overflow: 'auto' }}>
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
                  <td key={`${index}-${rowKey}`}>
                    {row[rowKey].value}{' '}
                    {row[rowKey].testResults.map((testResult) => (
                      <div style={{ color: 'red' }}>{testResult}</div>
                    ))}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Tests not run yet!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TestResults;
