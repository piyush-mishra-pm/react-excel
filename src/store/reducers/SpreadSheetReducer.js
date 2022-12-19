import _ from 'lodash';

import ACTION_TYPES from '../ACTION_TYPES';
import INITIAL_STATE from '../INITIAL_STATE';

function SpreadSheetReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION_TYPES.READ_SPREADSHEET:
      return _.cloneDeep(action.payload);
    default:
      return state;
  }
}

export default SpreadSheetReducer;
