import React from 'react';
import { useDispatch } from 'react-redux';
import ACTION_TYPES from '../store/ACTION_TYPES';

import TestResults from './TestResults';
import TextTests from './TextTests.js';
import ImageTests from './ImageTests';

function TestSheet() {
  const dispatch = useDispatch();

  function startTestSuite() {
    // Clone imported sheet data as initial test results.
    dispatch({ type: ACTION_TYPES.TEST_INIT });
    // Perform text tests.
    TextTests();
    ImageTests();
  }

  function clearTestSuite() {
    dispatch({ type: ACTION_TYPES.TEST_CLEAR });
  }

  return (
    <div>
      <button onClick={() => startTestSuite()}>Run Tests</button>
      <button onClick={() => clearTestSuite()}>Clear Tests</button>
      <TestResults />
    </div>
  );
}

export default TestSheet;
