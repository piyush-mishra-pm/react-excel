import React from 'react';
import { useDispatch } from 'react-redux';
import ACTION_TYPES from '../store/ACTION_TYPES';

import TestResults from './TestResults';

function TestSheet() {
  const dispatch = useDispatch();

  function startTestSuite() {
    // Clone imported sheet data as initial test results.
    dispatch({ type: ACTION_TYPES.TEST_INIT });
  }

  return (
    <div>
      <button onClick={() => startTestSuite()}>Run Tests</button>
      <TestResults />
    </div>
  );
}

export default TestSheet;
