import React from 'react';
import { useSelector } from 'react-redux';
function RenderSpreadSheets() {
  const movies = useSelector((state) => state.SpreadSheetReducer);

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Movie</th>
          <th scope="col">Category</th>
          <th scope="col">Director</th>
          <th scope="col">Rating</th>
        </tr>
      </thead>
      <tbody>
        {movies.length ? (
          movies.map((movie, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{movie.Movie}</td>
              <td>{movie.Category}</td>
              <td>{movie.Director}</td>
              <td>
                <span className="badge bg-warning text-dark">{movie.Rating}</span>
              </td>
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
