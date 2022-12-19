import INITIAL_STATE from '../INITIAL_STATE';

function DummyReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default DummyReducer;
