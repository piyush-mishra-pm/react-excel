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
                  <td key={`${index}-${rowKey}`} className={row[rowKey].testResults.length ? 'negative' : ''}>
                    {renderImageOrTextValue(row[rowKey].value)}{' '}
                    {/** todo: Show passed and failed test IDs.
                     * todo: Even if single check fails, mark red.
                     * todo: Show metadata of failed checks.
                     * todo: Show only ID of passed checks. */}
                    {row[rowKey].testResults.map((testResult) => (
                      <div style={{ color: 'red' }} key={testResult}>
                        {testResult}
                      </div>
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

function renderImageOrTextValue(content) {
  if (isImageUrl(content)) {
    return (
      <React.Fragment>
        <a href={content} target="_blank" rel="noopener noreferrer">
          <p>{content}</p>
          <img
            src={content}
            alt={`rendered ${content}`}
            className="ui image"
            style={{
              backgroundColor: isPngImage(content) ? 'blue' : '',
              objectFit: 'cover',
              objectPosition: 'center',
              maxHeight: '200px',
              maxWidth: '400px',
            }}
          />
        </a>
      </React.Fragment>
    );
  }
  return content;
}

function isImageUrl(url) {
  if (typeof url !== 'string') return false;
  // eslint-disable-next-line
  return url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) != null;
}

function isPngImage(url) {
  if (typeof url !== 'string') return false;
  // eslint-disable-next-line
  return url.match(/^http[^\?]*.(png)(\?(.*))?$/gim) != null;
}


export default TestResults;
