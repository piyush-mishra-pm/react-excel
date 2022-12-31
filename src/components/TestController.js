import React from 'react';
import {useDispatch} from 'react-redux';
import ACTION_TYPES from '../store/ACTION_TYPES';

import PerformTests from './PerformTests.js';

function TestController(props) {
  const dispatch = useDispatch();

  function startTestSuite() {
    // Clone imported sheet data as initial test results.
    dispatch({type: ACTION_TYPES.TEST_INIT});
    // Perform text tests.
    PerformTests();
    props.setTestResultsTabEnabled(true);
  }

  function clearTestSuite() {
    dispatch({type: ACTION_TYPES.TEST_CLEAR});
  }

  return (
    <div>
      <button onClick={() => startTestSuite()}>Run Tests</button>
      <button onClick={() => clearTestSuite()}>Clear Tests</button>
    </div>
  );
}

export default TestController;
